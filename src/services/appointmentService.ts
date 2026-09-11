export interface CreateAppointmentPayload {
  fullName: string;
  phone: string;
  branch: string;
  service?: string;
  doctor?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  // Anti-abuse honeypot fields
  website?: string;
  botCheck?: string;
  _hp?: string;
}

export interface AppointmentApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  appointmentId?: string;
}

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://mybbxtkjmdfmgtqndboz.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmJ4dGtqbWRmbWd0cW5kYm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMDUyOTcsImV4cCI6MjEwNDY4MTI5N30.PN5xMA4RsnyTN_0EWtjTexLgKLFqtkHFqWoZyEXszFc';

/**
 * Submits an appointment request to the Supabase create-appointment Edge Function.
 */
export async function submitAppointment(
  payload: CreateAppointmentPayload
): Promise<AppointmentApiResponse> {
  const endpoint = `${SUPABASE_URL}/functions/v1/create-appointment`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  let data: AppointmentApiResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error('Unexpected server response. Please try again or book via WhatsApp.');
  }

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit appointment request. Please try again.');
  }

  return data;
}
