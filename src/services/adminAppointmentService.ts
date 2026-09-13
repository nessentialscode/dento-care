import { supabase } from './supabaseClient';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  full_name: string;
  phone: string;
  branch: string;
  service: string | null;
  doctor: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface AppointmentFilterOptions {
  searchQuery?: string;
  status?: AppointmentStatus | 'all';
  branch?: string | 'all';
  doctor?: string | 'all';
  service?: string | 'all';
  preferredDate?: string;
}

export interface DashboardMetrics {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  todayCount: number;
}

/**
 * Fetches all appointments ordered newest first (created_at DESC).
 * Filtering and searching can be performed server-side or client-side.
 */
export async function fetchAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to fetch appointments from database.');
  }

  return (data as Appointment[]) || [];
}

/**
 * Updates an appointment's status according to the strict state machine.
 * Validates atomic transition and handles stale state / database exceptions.
 */
export async function updateAppointmentStatus(
  id: string,
  newStatus: AppointmentStatus,
  currentStatus?: AppointmentStatus
): Promise<Appointment> {
  let query = supabase
    .from('appointments')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (currentStatus) {
    query = query.eq('status', currentStatus);
  }

  const { data, error } = await query.select().single();

  if (error) {
    if (
      error.code === 'PGRST116' ||
      error.message?.includes('Invalid appointment status transition') ||
      error.message?.includes('check_violation')
    ) {
      throw new Error('This appointment status has already changed. Please refresh and try again.');
    }
    throw new Error(error.message || `Failed to update appointment status to ${newStatus}.`);
  }

  if (!data) {
    throw new Error('This appointment status has already changed. Please refresh and try again.');
  }

  return data as Appointment;
}

/**
 * Computes dashboard statistics from appointment list.
 */
export function calculateDashboardMetrics(appointments: Appointment[]): DashboardMetrics {
  const todayStr = new Date().toISOString().split('T')[0];

  let pending = 0;
  let confirmed = 0;
  let completed = 0;
  let cancelled = 0;
  let todayCount = 0;

  for (const appt of appointments) {
    if (appt.status === 'pending') pending++;
    else if (appt.status === 'confirmed') confirmed++;
    else if (appt.status === 'completed') completed++;
    else if (appt.status === 'cancelled') cancelled++;

    if (appt.preferred_date === todayStr) {
      todayCount++;
    }
  }

  return {
    total: appointments.length,
    pending,
    confirmed,
    completed,
    cancelled,
    todayCount,
  };
}

/**
 * Applies search and filtering to appointment records.
 */
export function filterAppointments(
  appointments: Appointment[],
  filters: AppointmentFilterOptions
): Appointment[] {
  return appointments.filter((appt) => {
    // Search query (name or phone)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchName = appt.full_name?.toLowerCase().includes(q);
      const matchPhone = appt.phone?.toLowerCase().includes(q);
      if (!matchName && !matchPhone) return false;
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (appt.status !== filters.status) return false;
    }

    // Branch filter
    if (filters.branch && filters.branch !== 'all') {
      if (appt.branch !== filters.branch) return false;
    }

    // Doctor filter
    if (filters.doctor && filters.doctor !== 'all') {
      if (appt.doctor !== filters.doctor) return false;
    }

    // Service filter
    if (filters.service && filters.service !== 'all') {
      if (appt.service !== filters.service) return false;
    }

    // Preferred Date filter
    if (filters.preferredDate && filters.preferredDate.trim() !== '') {
      if (appt.preferred_date !== filters.preferredDate) return false;
    }

    return true;
  });
}
