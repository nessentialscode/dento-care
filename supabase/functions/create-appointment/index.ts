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
  "Dento Care — Veliyancode Clinic",
  "Dento Care Multispeciality Dental Clinic",
  "Ponnani",
  "Veliyancode",
];

// Approved clinic time slots matching official operating hours (Monday-Saturday: 10:00 AM - 7:00 PM)
const VALID_TIME_SLOTS = [
  "Morning (10:00 AM - 1:00 PM)",
  "Afternoon (2:00 PM - 5:00 PM)",
  "Evening (5:00 PM - 7:00 PM)",
];

// Approved clinic services
const VALID_SERVICES = [
  "Dental Implants",
  "Root Canal Treatment",
  "Braces & Aligners",
  "Teeth Whitening",
  "Veneers & Crowns",
  "Preventive & Family Care",
  "General Consultation & Checkup",
  "General Consultation",
  "Emergency Tooth Pain Relief",
  "Emergency Tooth Pain",
  "Cosmetic Dentistry",
  "Pediatric Dentistry",
  "Orthodontics",
  "Dental Checkup",
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
 * Checks if a YYYY-MM-DD date string falls on a Sunday.
 * Official clinic hours are Monday-Saturday (Sunday: Closed).
 */
function isSundayDate(dateStr: string): boolean {
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCDay() === 0;
}

// In-isolate sliding window rate limiter (anti-spam protection)
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(clientIp: string): boolean {
  if (!clientIp) return false;
  const now = Date.now();
  const timestamps = ipRequestHistory.get(clientIp) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  recent.push(now);
  ipRequestHistory.set(clientIp, recent);
  if (ipRequestHistory.size > 1000) {
    for (const [k, v] of ipRequestHistory.entries()) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        ipRequestHistory.delete(k);
      }
    }
  }
  return false;
}

/**
 * Validates preferred appointment time slot against the approved clinic time slots.
 */
function isValidTimeSlot(timeStr: string): boolean {
  return VALID_TIME_SLOTS.includes(timeStr);
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
 * Validates dental service against approved clinic services.
 */
function isValidService(serviceStr: string | null): boolean {
  if (!serviceStr) return true;
  const lower = serviceStr.trim().toLowerCase();
  return VALID_SERVICES.some((s) => {
    const sLower = s.toLowerCase();
    return sLower === lower || lower.includes(sLower) || sLower.includes(lower);
  });
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

  // Anti-abuse rate limiting (5 requests/minute per client IP)
  const clientIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  if (clientIp && isRateLimited(clientIp)) {
    return jsonResponse(
      {
        success: false,
        error: "Too many appointment requests. Please try again in a few minutes or book via WhatsApp.",
      },
      429,
      origin,
      { "Retry-After": "60" }
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

  // 1. Required fields validation
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

  const branch = sanitizeString(body.branch, 120);
  if (!branch) {
    return jsonResponse(
      {
        success: false,
        error: "Please select a clinic branch.",
      },
      400,
      origin
    );
  }

  const rawDate = sanitizeString(body.preferredDate, 30);
  if (!rawDate) {
    return jsonResponse(
      {
        success: false,
        error: "Preferred appointment date is required.",
      },
      400,
      origin
    );
  }

  const rawTime = sanitizeString(body.preferredTime, 60);
  if (!rawTime) {
    return jsonResponse(
      {
        success: false,
        error: "Preferred appointment time slot is required.",
      },
      400,
      origin
    );
  }

  // Optional fields: service, doctor, message
  const service = sanitizeString(body.service, 120);
  const doctor = sanitizeString(body.doctor, 120);
  const message = sanitizeString(body.message, 1000);

  // 2. Anti-abuse / Honeypot bot protection
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

  // 3. Valid branch check
  if (!isValidBranch(branch)) {
    return jsonResponse(
      {
        success: false,
        error: "Please select a valid clinic branch.",
      },
      400,
      origin
    );
  }

  // Initialize Supabase Client with elevated credentials for database checks
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

  console.log(`Using ${elevatedCred.isSecretKey ? "new Secret API key (sb_secret_***)" : "legacy service_role key"} for database verification & insertion.`);

  const supabase = createClient(supabaseUrl, elevatedCred.key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  // 4. Branch is currently active in database
  const branchQuery = branch.toLowerCase().includes("veliyancode") ? "Veliyancode" : "Ponnani";
  const { data: branchRecord, error: branchLookupError } = await supabase
    .from("clinic_branches")
    .select("name, is_active")
    .ilike("name", `%${branchQuery}%`)
    .maybeSingle();

  if (branchLookupError) {
    console.error("Database error while checking clinic branch availability:", branchLookupError.message);
    return jsonResponse(
      {
        success: false,
        error: "Unable to verify clinic availability. Please try again later.",
      },
      500,
      origin
    );
  }

  if (!branchRecord || !branchRecord.is_active) {
    return jsonResponse(
      {
        success: false,
        error: "This clinic is currently unavailable for appointment requests. Please select another clinic.",
      },
      400,
      origin
    );
  }

  const canonicalBranchName = branchRecord.name;

  // 5. Valid service check
  if (service && !isValidService(service)) {
    return jsonResponse(
      {
        success: false,
        error: "Please select a valid dental service.",
      },
      400,
      origin
    );
  }

  // 6. Valid doctor & 7. Doctor is currently present check
  let canonicalDoctorName: string | null = null;
  const isAnySpecialist = !doctor || doctor.trim().toLowerCase() === "any available specialist";

  if (!isAnySpecialist && doctor) {
    const trimmedDoctor = doctor.trim();
    const { data: doctorRecord, error: doctorLookupError } = await supabase
      .from("doctors")
      .select("name, is_present")
      .ilike("name", trimmedDoctor)
      .maybeSingle();

    if (doctorLookupError) {
      console.error("Database error while checking doctor availability:", doctorLookupError.message);
      return jsonResponse(
        {
          success: false,
          error: "Unable to verify doctor availability. Please try again later.",
        },
        500,
        origin
      );
    }

    // 6. Valid doctor: reject arbitrary/unknown doctor names
    if (!doctorRecord) {
      return jsonResponse(
        {
          success: false,
          error: "The selected doctor is unavailable. Please select another doctor or Any Available Specialist.",
        },
        400,
        origin
      );
    }

    // 7. Doctor is currently present: reject absent doctors
    if (!doctorRecord.is_present) {
      return jsonResponse(
        {
          success: false,
          error: "The selected doctor is currently unavailable. Please select another doctor or Any Available Specialist.",
        },
        400,
        origin
      );
    }

    canonicalDoctorName = doctorRecord.name;
  } else {
    // 2. Any Available Specialist: valid without requiring a specific doctor record
    canonicalDoctorName = "Any Available Specialist";
  }

  // 8. Valid appointment date
  if (!isValidDate(rawDate)) {
    return jsonResponse(
      {
        success: false,
        error: "Preferred appointment date is required in YYYY-MM-DD format.",
      },
      400,
      origin
    );
  }

  // Clinic Sunday closure enforcement (Monday-Saturday: 10:00 AM - 7:00 PM, Sunday: Closed)
  if (isSundayDate(rawDate)) {
    return jsonResponse(
      {
        success: false,
        error: "The clinic is closed on Sundays. Please select Monday–Saturday.",
      },
      400,
      origin
    );
  }
  const preferredDate = rawDate;

  // 9. Valid approved time slot
  if (!isValidTimeSlot(rawTime)) {
    return jsonResponse(
      {
        success: false,
        error: "Preferred appointment time slot must be one of the approved clinic slots: Morning (10:00 AM - 1:00 PM), Afternoon (2:00 PM - 5:00 PM), or Evening (5:00 PM - 7:00 PM).",
      },
      400,
      origin
    );
  }
  const preferredTime = rawTime;

  // 10. Insert appointment into database
  const appointmentRecord: AppointmentRecord = {
    full_name: fullName,
    phone,
    branch: canonicalBranchName,
    service: service || null,
    doctor: canonicalDoctorName,
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
