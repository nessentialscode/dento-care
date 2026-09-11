import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Maximum allowable request body size in bytes (10 KB)
const MAX_REQUEST_BODY_SIZE = 10 * 1024;

interface CreateAppointmentInput {
  fullName?: unknown;
  phone?: unknown;
  branch?: unknown;
  service?: unknown;
  doctor?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  message?: unknown;
  // Anti-abuse / honeypot fields
  website?: unknown;
  botCheck?: unknown;
  _hp?: unknown;
}

interface AppointmentRecord {
  full_name: string;
  phone: string;
  branch: string;
  service: string | null;
  doctor: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: "pending";
}

// Known valid branches matching application data
const VALID_BRANCHES = [
  "Dento Care — Ponnani Clinic",
  "Dento Care Multispeciality Dental Clinic",
  "Ponnani",
  "Veliyancode",
];

/**
 * Builds standard CORS headers for browser and API clients.
 */
function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin || "*";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

/**
 * Uniform JSON response builder.
 */
function jsonResponse(
  body: { success: boolean; message?: string; error?: string; appointmentId?: string },
  status: number,
  origin: string | null,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin),
      ...extraHeaders,
    },
  });
}

/**
 * Sanitizes and trims string inputs, removing dangerous control characters.
 */
function sanitizeString(val: unknown, maxLength: number): string | null {
  if (typeof val !== "string") return null;
  // eslint-disable-next-line no-control-regex
  const cleaned = val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
  if (!cleaned) return null;
  return cleaned.slice(0, maxLength);
}

/**
 * Validates date string in YYYY-MM-DD format and ensures not in the distant past.
 */
function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;

  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (year < 2024 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return false;
  }

  // Ensure appointment is not older than yesterday (allow today or future)
  const now = new Date();
  const yesterdayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
  return date >= yesterdayUtc;
}

/**
 * Validates preferred time format.
 */
function isValidTimeFormat(timeStr: string): boolean {
  if (timeStr.length < 2 || timeStr.length > 60) return false;
  return /^[a-zA-Z0-9\s:()\-–—./]+$/.test(timeStr);
}

/**
 * Validates phone numbers (must contain 7 to 20 digits).
 */
function isValidPhone(phoneStr: string): boolean {
  if (!/^\+?[0-9\s\-().]{7,25}$/.test(phoneStr)) return false;
  const digits = (phoneStr.match(/\d/g) || []).length;
  return digits >= 7 && digits <= 20;
}

/**
 * Validates branch against known clinic locations.
 */
function isValidBranch(branchStr: string): boolean {
  if (VALID_BRANCHES.includes(branchStr)) return true;
  const lower = branchStr.toLowerCase();
  return lower.includes("ponnani") || lower.includes("veliyancode");
}

/**
 * Detects honeypot / bot submission attempts.
 */
function isHoneypotTriggered(body: CreateAppointmentInput): boolean {
  const isFilled = (val: unknown): boolean => {
    if (typeof val === "string") return val.trim().length > 0;
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val > 0;
    return val !== undefined && val !== null;
  };
  return isFilled(body.website) || isFilled(body.botCheck) || isFilled(body._hp);
}

/**
 * Helper to safely extract a key string from potential key candidate objects or strings.
 */
function extractKeyFromCandidate(candidate: unknown): string | null {
  if (typeof candidate === "string" && candidate.trim().length > 0) {
    return candidate.trim();
  }
  if (candidate && typeof candidate === "object") {
    const obj = candidate as Record<string, unknown>;
    if (typeof obj.api_key === "string" && obj.api_key.trim().length > 0) {
      return obj.api_key.trim();
    }
    if (typeof obj.secret === "string" && obj.secret.trim().length > 0) {
      return obj.secret.trim();
    }
    if (typeof obj.key === "string" && obj.key.trim().length > 0) {
      return obj.key.trim();
    }
  }
  return null;
}

/**
 * Retrieves the elevated Supabase credential, prioritizing the new Supabase Secret API key
 * (`sb_secret_...`) over the legacy service_role key.
 */
function getElevatedSupabaseKey(): { key: string; isSecretKey: boolean } | null {
  // 1. Direct single secret key environment variable (SUPABASE_SECRET_KEY / SB_SECRET_KEY)
  const directSecret = Deno.env.get("SUPABASE_SECRET_KEY") || Deno.env.get("SB_SECRET_KEY");
  if (directSecret && directSecret.trim().length > 0) {
    const trimmed = directSecret.trim();
    return { key: trimmed, isSecretKey: trimmed.startsWith("sb_secret_") };
  }

  // 2. Secret keys collection injected by Supabase platform (SUPABASE_SECRET_KEYS)
  const secretKeysRaw = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (secretKeysRaw) {
    try {
      const parsed = JSON.parse(secretKeysRaw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          const k = extractKeyFromCandidate(item);
          if (k && k.startsWith("sb_secret_")) {
            return { key: k, isSecretKey: true };
          }
        }
        for (const item of parsed) {
          const k = extractKeyFromCandidate(item);
          if (k) return { key: k, isSecretKey: k.startsWith("sb_secret_") };
        }
      } else {
        const k = extractKeyFromCandidate(parsed);
        if (k) return { key: k, isSecretKey: k.startsWith("sb_secret_") };
      }
    } catch {
      const tokens = secretKeysRaw.split(",").map((t) => t.trim());
      const sbSecret = tokens.find((t) => t.startsWith("sb_secret_"));
      if (sbSecret) return { key: sbSecret, isSecretKey: true };
      if (tokens[0]) return { key: tokens[0], isSecretKey: tokens[0].startsWith("sb_secret_") };
    }
  }

  // 3. Fallback to legacy service_role key during rotation transition
  const legacyKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacyKey && legacyKey.trim().length > 0) {
    const trimmed = legacyKey.trim();
    return { key: trimmed, isSecretKey: trimmed.startsWith("sb_secret_") };
  }

  return null;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("Origin");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: getCorsHeaders(origin),
    });
  }

  // Accept ONLY POST requests
  if (req.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed. Only POST requests are supported.",
      },
      405,
      origin,
      { Allow: "POST, OPTIONS" }
    );
  }

  // Anti-abuse: check request size
  const contentLength = req.headers.get("content-length");
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (!isNaN(size) && size > MAX_REQUEST_BODY_SIZE) {
      return jsonResponse(
        {
          success: false,
          error: "Request body exceeds maximum allowed size.",
        },
        400,
        origin
      );
    }
  }

  // Verify Content-Type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(
      {
        success: false,
        error: "Invalid Content-Type. Expected application/json.",
      },
      400,
      origin
    );
  }

  // Read body safely
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return jsonResponse(
      {
        success: false,
        error: "Unable to read request payload.",
      },
      400,
      origin
    );
  }

  if (rawBody.length > MAX_REQUEST_BODY_SIZE) {
    return jsonResponse(
      {
        success: false,
        error: "Request body exceeds maximum allowed size.",
      },
      400,
      origin
    );
  }

  // Parse JSON safely
  let body: CreateAppointmentInput;
  try {
    const parsed = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return jsonResponse(
        {
          success: false,
          error: "Malformed JSON payload.",
        },
        400,
        origin
      );
    }
    body = parsed as CreateAppointmentInput;
  } catch {
    return jsonResponse(
      {
        success: false,
        error: "Malformed JSON payload.",
      },
      400,
      origin
    );
  }

  // Anti-abuse: Honeypot check
  if (isHoneypotTriggered(body)) {
    return jsonResponse(
      {
        success: false,
        error: "Invalid appointment submission.",
      },
      400,
      origin
    );
  }

  // Field validation: fullName (Required, 2-100 chars)
  const fullName = sanitizeString(body.fullName, 100);
  if (!fullName || fullName.length < 2) {
    return jsonResponse(
      {
        success: false,
        error: "Full name is required (minimum 2 characters).",
      },
      400,
      origin
    );
  }

  // Field validation: phone (Required, 7-20 digits)
  const phone = sanitizeString(body.phone, 25);
  if (!phone || !isValidPhone(phone)) {
    return jsonResponse(
      {
        success: false,
        error: "Please provide a valid phone number (7 to 20 digits).",
      },
      400,
      origin
    );
  }

  // Field validation: branch (Required, must match clinic branches)
  const branch = sanitizeString(body.branch, 120);
  if (!branch || !isValidBranch(branch)) {
    return jsonResponse(
      {
        success: false,
        error: "Please select a valid clinic branch.",
      },
      400,
      origin
    );
  }

  // Field validation: preferredDate (Required, YYYY-MM-DD, not in past)
  const rawDate = sanitizeString(body.preferredDate, 30);
  if (!rawDate || !isValidDate(rawDate)) {
    return jsonResponse(
      {
        success: false,
        error: "Preferred appointment date is required in YYYY-MM-DD format.",
      },
      400,
      origin
    );
  }
  const preferredDate = rawDate;

  // Field validation: preferredTime (Required, valid format)
  const rawTime = sanitizeString(body.preferredTime, 60);
  if (!rawTime || !isValidTimeFormat(rawTime)) {
    return jsonResponse(
      {
        success: false,
        error: "Preferred appointment time slot is required.",
      },
      400,
      origin
    );
  }
  const preferredTime = rawTime;

  // Optional fields: service, doctor, message
  const service = sanitizeString(body.service, 120);
  const doctor = sanitizeString(body.doctor, 120);
  const message = sanitizeString(body.message, 1000);

  // Initialize Supabase Client with elevated credentials (prioritizing new Secret API key)
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const elevatedCred = getElevatedSupabaseKey();

  if (!supabaseUrl || !elevatedCred) {
    console.error("Missing server credentials: SUPABASE_URL or elevated key is not configured.");
    return jsonResponse(
      {
        success: false,
        error: "Server configuration error. Unable to submit appointment.",
      },
      500,
      origin
    );
  }

  // Log credential type without exposing any secret or token contents
  console.log(`Using ${elevatedCred.isSecretKey ? "new Secret API key (sb_secret_***)" : "legacy service_role key"} for database insertion.`);

  const supabase = createClient(supabaseUrl, elevatedCred.key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const appointmentRecord: AppointmentRecord = {
    full_name: fullName,
    phone,
    branch,
    service: service || null,
    doctor: doctor || null,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    message: message || null,
    status: "pending",
  };

  try {
    const { data, error: dbError } = await supabase
      .from("appointments")
      .insert(appointmentRecord)
      .select("id")
      .single();

    if (dbError) {
      console.error("Database insertion failure code:", dbError.code, "message:", dbError.message);
      return jsonResponse(
        {
          success: false,
          error: "Database insertion failure.",
        },
        500,
        origin
      );
    }

    return jsonResponse(
      {
        success: true,
        message: "Appointment request submitted successfully.",
        appointmentId: data?.id,
      },
      201,
      origin
    );
  } catch (err) {
    console.error("Unexpected error during appointment processing:", err instanceof Error ? err.message : String(err));
    return jsonResponse(
      {
        success: false,
        error: "Database insertion failure.",
      },
      500,
      origin
    );
  }
});
