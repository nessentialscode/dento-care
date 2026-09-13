import { supabase } from './supabaseClient';

export interface DoctorRecord {
  id: string;
  name: string;
  specialty: string;
  is_present: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetches doctor presence list for public display and modal filtering.
 */
export async function fetchDoctorAvailability(): Promise<DoctorRecord[]> {
  const { data, error } = await supabase
    .from('doctors')
    .select('id, name, specialty, is_present')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching doctor availability:', error);
    throw new Error('Failed to fetch doctor availability.');
  }

  return (data || []) as DoctorRecord[];
}

/**
 * Fetches all doctor records for the admin portal.
 */
export async function fetchAllDoctorsForAdmin(): Promise<DoctorRecord[]> {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching doctors for admin:', error);
    throw new Error('Failed to fetch doctor management records.');
  }

  return (data || []) as DoctorRecord[];
}

/**
 * Updates a doctor's presence status (Admin only).
 */
export async function updateDoctorPresence(
  id: string,
  is_present: boolean
): Promise<DoctorRecord> {
  const { data, error } = await supabase
    .from('doctors')
    .update({
      is_present,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating doctor presence:', error);
    throw new Error(error.message || 'Failed to update doctor presence.');
  }

  return data as DoctorRecord;
}
