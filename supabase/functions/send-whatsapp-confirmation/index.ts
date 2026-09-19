import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

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
  body: {
    success: boolean;
    whatsappSent?: boolean;
    messageId?: string;
    error?: string;
    metaCode?: number;
  },
  status: number,
  origin: string | null
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin),
    },
  });
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
 * Retrieves the elevated Supabase credential (service_role or secret key)
 * for secure server-side database access.
 */
function getElevatedSupabaseKey(): { key: string; isSecretKey: boolean } | null {
  const directSecret = Deno.env.get("SUPABASE_SECRET_KEY") || Deno.env.get("SB_SECRET_KEY");
  if (directSecret && directSecret.trim().length > 0) {
    const trimmed = directSecret.trim();
    return { key: trimmed, isSecretKey: trimmed.startsWith("sb_secret_") };
  }

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
      }
    } catch {
      const tokens = secretKeysRaw.split(",").map((t) => t.trim());
      const sbSecret = tokens.find((t) => t.startsWith("sb_secret_"));
      if (sbSecret) return { key: sbSecret, isSecretKey: true };
      if (tokens[0]) return { key: tokens[0], isSecretKey: tokens[0].startsWith("sb_secret_") };
    }
  }

  const legacyKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacyKey && legacyKey.trim().length > 0) {
    const trimmed = legacyKey.trim();
    return { key: trimmed, isSecretKey: trimmed.startsWith("sb_secret_") };
  }

  return null;
}

/**
 * Normalizes Indian patient phone numbers to WhatsApp international format.
 * WhatsApp Cloud API expects recipient numbers in digits only without leading '+' or '0'.
 * For India: 10-digit mobile number 7510355355 becomes 917510355355.
 */
function normalizeWhatsAppPhone(rawPhone: string): { valid: boolean; normalized: string; error?: string } {
  if (!rawPhone || typeof rawPhone !== "string") {
    return { valid: false, normalized: "", error: "Phone number is required." };
  }

  // Remove all non-digit characters
  let digits = rawPhone.replace(/\D/g, "");

  // Strip leading zeroes (e.g. 07510355355 -> 7510355355)
  digits = digits.replace(/^0+/, "");

  // If 10 digits, assume standard Indian mobile number (+91)
  if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    // Already formatted with Indian country code
  } else if (digits.length < 10 || digits.length > 15) {
    return {
      valid: false,
      normalized: "",
      error: `Invalid phone number length (${digits.length} digits). Expected 10 to 15 digits.`,
    };
  }

  return { valid: true, normalized: digits };
}

/**
 * Formats appointment date string (YYYY-MM-DD) into a human-friendly format.
 */
function formatAppointmentDate(dateStr: string | null): string {
  if (!dateStr) return "Flexible Date";
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(Date.UTC(year, month, day));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        });
      }
    }
  } catch {
    // fallback
  }
  return dateStr;
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
      origin
    );
  }

  // 1. Verify caller authorization: require valid JWT with admin role claim
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return jsonResponse(
      {
        success: false,
        error: "Missing or invalid Authorization header.",
      },
      401,
      origin
    );
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const elevatedCred = getElevatedSupabaseKey();

  if (!supabaseUrl || !elevatedCred) {
    return jsonResponse(
      {
        success: false,
        error: "Server configuration error: elevated database credentials missing.",
      },
      500,
      origin
    );
  }

  // Create elevated client for auth check and data lookup
  const supabase = createClient(supabaseUrl, elevatedCred.key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  // Verify the calling user's token and admin role
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user || user.app_metadata?.role !== "admin") {
    return jsonResponse(
      {
        success: false,
        error: "Unauthorized: Administrator privileges required to send confirmation notifications.",
      },
      403,
      origin
    );
  }

  // 2. Parse request payload
  let appointmentId = "";
  try {
    const rawBody = await req.text();
    const parsed = JSON.parse(rawBody);
    if (parsed && typeof parsed === "object" && typeof parsed.appointmentId === "string") {
      appointmentId = parsed.appointmentId.trim();
    }
  } catch {
    return jsonResponse(
      {
        success: false,
        error: "Malformed JSON payload. Expected { appointmentId: string }.",
      },
      400,
      origin
    );
  }

  if (!appointmentId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(appointmentId)) {
    return jsonResponse(
      {
        success: false,
        error: "Invalid or missing appointmentId UUID.",
      },
      400,
      origin
    );
  }

  // 3. Fetch appointment from database to get dynamic values and ensure status is confirmed
  const { data: appointment, error: fetchError } = await supabase
    .from("appointments")
    .select("id, full_name, phone, branch, service, doctor, preferred_date, preferred_time, status")
    .eq("id", appointmentId)
    .single();

  if (fetchError || !appointment) {
    return jsonResponse(
      {
        success: false,
        error: "Appointment record not found.",
      },
      404,
      origin
    );
  }

  // Strict check: Only send notification if appointment is genuinely CONFIRMED
  if (appointment.status !== "confirmed") {
    return jsonResponse(
      {
        success: false,
        error: `Cannot send WhatsApp confirmation: appointment status is '${appointment.status}', expected 'confirmed'.`,
      },
      400,
      origin
    );
  }

  // 4. Normalize patient phone number
  const phoneCheck = normalizeWhatsAppPhone(appointment.phone);
  if (!phoneCheck.valid) {
    return jsonResponse(
      {
        success: false,
        whatsappSent: false,
        error: `Cannot dispatch WhatsApp: ${phoneCheck.error} (Received: "${appointment.phone}")`,
      },
      422,
      origin
    );
  }
  const recipientPhone = phoneCheck.normalized;

  // 5. Extract dynamic variables for template / message
  const patientName = appointment.full_name?.trim() || "Patient";
  const branchName = appointment.branch?.trim() || "Dento Care Dental Clinic";
  const dateFormatted = formatAppointmentDate(appointment.preferred_date);
  const timeFormatted = appointment.preferred_time?.trim() || "Clinic Hours";
  const serviceName = appointment.service?.trim() || "General Dental Care";
  const doctorName = appointment.doctor?.trim() || "Specialist On Duty";

  // 6. Check Meta WhatsApp API configuration
  const metaAccessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
  const metaPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  const metaTemplateName = Deno.env.get("WHATSAPP_TEMPLATE_NAME") || "appointment_confirmation";
  const metaTemplateLang = Deno.env.get("WHATSAPP_TEMPLATE_LANG") || "en";
  const metaMessageType = Deno.env.get("WHATSAPP_MESSAGE_TYPE") || "template";
  const metaApiVersion = Deno.env.get("WHATSAPP_API_VERSION") || "v21.0";

  // If server secrets are not yet configured, return graceful descriptive response
  if (!metaAccessToken || !metaPhoneNumberId) {
    console.warn("WhatsApp dispatch skipped: WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID is not configured in Supabase Secrets.");
    return jsonResponse(
      {
        success: false,
        whatsappSent: false,
        error: "Meta WhatsApp credentials not configured on server. Please set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID in Supabase Secrets.",
      },
      200,
      origin
    );
  }

  // 7. Construct Meta Cloud API Payload
  // Required message content:
  // Hello {{patient_name}} 👋
  // Your appointment at {{branch}} has been confirmed. ✅
  // 📅 Date: {{date}}
  // ⏰ Time: {{time}}
  // 🦷 Treatment: {{service}}
  // 👨⚕️ Specialist: {{doctor}}
  // If you need to reschedule or have any questions, please contact us at +91 7510355355.
  // Thank you for choosing Dento Care. We look forward to welcoming you. 🦷

  let metaPayload: Record<string, unknown>;

  if (metaMessageType === "text") {
    // Freeform text message (usable within 24-hour service window or Meta developer test numbers)
    const textBody = [
      `Hello ${patientName} 👋`,
      ``,
      `Your appointment at ${branchName} has been confirmed. ✅`,
      ``,
      `📅 Date: ${dateFormatted}`,
      `⏰ Time: ${timeFormatted}`,
      `🦷 Treatment: ${serviceName}`,
      `👨‍⚕️ Specialist: ${doctorName}`,
      ``,
      `If you need to reschedule or have any questions, please contact us at +91 7510355355.`,
      ``,
      `Thank you for choosing Dento Care. We look forward to welcoming you. 🦷`,
    ].join("\n");

    metaPayload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhone,
      type: "text",
      text: {
        preview_url: false,
        body: textBody,
      },
    };
  } else {
    // Official WhatsApp Business Template Message (Standard transactional pattern for business-initiated conversations)
    metaPayload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhone,
      type: "template",
      template: {
        name: metaTemplateName,
        language: {
          code: metaTemplateLang,
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: patientName },
              { type: "text", text: branchName },
              { type: "text", text: dateFormatted },
              { type: "text", text: timeFormatted },
              { type: "text", text: serviceName },
              { type: "text", text: doctorName },
            ],
          },
        ],
      },
    };
  }

  // 8. Dispatch to Meta Cloud API with 10-second timeout
  const metaUrl = `https://graph.facebook.com/${metaApiVersion}/${metaPhoneNumberId}/messages`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const metaRes = await fetch(metaUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${metaAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metaPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const metaJson = await metaRes.json().catch(() => null);

    if (!metaRes.ok) {
      const metaErrorCode = metaJson?.error?.code;
      const metaErrorMessage = metaJson?.error?.message || `Meta WhatsApp API responded with HTTP ${metaRes.status}`;
      
      // Sanitize log: log only error code and status, never access tokens or sensitive payload
      console.error(`Meta WhatsApp dispatch failed. HTTP status: ${metaRes.status}, Error code: ${metaErrorCode}`);

      return jsonResponse(
        {
          success: false,
          whatsappSent: false,
          error: `Meta WhatsApp delivery error: ${metaErrorMessage}`,
          metaCode: metaErrorCode,
        },
        200,
        origin
      );
    }

    // Verify Meta confirmed message acceptance
    const messageId = metaJson?.messages?.[0]?.id;
    if (!messageId) {
      console.warn("Meta WhatsApp API responded 200 but did not return a message ID.");
      return jsonResponse(
        {
          success: false,
          whatsappSent: false,
          error: "Meta WhatsApp API accepted the request but did not return a confirmed message ID.",
        },
        200,
        origin
      );
    }

    // Success: Message queued and confirmed by Meta Cloud API
    const maskedPhone = `***${recipientPhone.slice(-4)}`;
    console.log(`WhatsApp confirmation successfully queued via Meta API (ID: ${messageId}) for patient ending in ${maskedPhone}`);

    return jsonResponse(
      {
        success: true,
        whatsappSent: true,
        messageId,
      },
      200,
      origin
    );
  } catch (err: unknown) {
    const isTimeout = err instanceof DOMException && err.name === "AbortError";
    const errorMessage = isTimeout
      ? "Meta WhatsApp API timed out after 10 seconds."
      : "Network error communicating with Meta WhatsApp API.";

    console.error("WhatsApp dispatch network error:", isTimeout ? "Timeout" : "Connection failure");

    return jsonResponse(
      {
        success: false,
        whatsappSent: false,
        error: errorMessage,
      },
      200,
      origin
    );
  }
});
