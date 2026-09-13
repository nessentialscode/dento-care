import { supabase } from './supabaseClient';
import { executeAdminOperation } from './adminQueryHelper';

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
  return executeAdminOperation<DoctorRecord[]>('Fetch doctors for admin', async () => {
    return await supabase
      .from('doctors')
      .select('*')
      .order('name', { ascending: true });
  });
}

/**
 * Updates a doctor's presence status (Admin only).
 */
export async function updateDoctorPresence(
  id: string,
  is_present: boolean
): Promise<DoctorRecord> {
  return executeAdminOperation<DoctorRecord>('Update doctor presence', async () => {
    return await supabase
      .from('doctors')
      .update({
        is_present,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
  });
}
