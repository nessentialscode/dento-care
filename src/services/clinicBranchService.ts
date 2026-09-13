import { supabase } from './supabaseClient';
import { executeAdminOperation } from './adminQueryHelper';

export interface ClinicBranch {
  id: string;
  name: string;
  location: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches all currently active clinic branches for public appointment booking.
 * Returns only branches where is_active is true.
 */
export async function fetchActiveClinicBranches(): Promise<ClinicBranch[]> {
  const { data, error } = await supabase
    .from('clinic_branches')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Failed to fetch active clinic branches.');
  }

  return (data as ClinicBranch[]) || [];
}

/**
 * Fetches all clinic branches with their active status for public card display.
 * Accessible to public anon client to show real-time ACTIVE / INACTIVE status badges.
 */
export async function fetchAllClinicBranchesPublic(): Promise<ClinicBranch[]> {
  const { data, error } = await supabase
    .from('clinic_branches')
    .select('id, name, location, is_active, created_at, updated_at')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching public clinic branches:', error);
    throw new Error(error.message || 'Failed to fetch clinic branches.');
  }

  return (data as ClinicBranch[]) || [];
}

/**
 * Fetches all clinic branches (both active and inactive) for administrative management.
 * Requires authenticated administrator session (enforced by RLS).
 */
export async function fetchAllClinicBranchesForAdmin(): Promise<ClinicBranch[]> {
  return executeAdminOperation<ClinicBranch[]>('Fetch clinic branches for admin', async () => {
    return await supabase
      .from('clinic_branches')
      .select('*')
      .order('name', { ascending: true });
  });
}

/**
 * Updates a clinic branch availability status (active/inactive).
 * Requires authenticated administrator session with app_metadata.role = 'admin'.
 */
export async function updateClinicBranchAvailability(
  id: string,
  isActive: boolean
): Promise<ClinicBranch> {
  return executeAdminOperation<ClinicBranch>('Update clinic branch availability', async () => {
    return await supabase
      .from('clinic_branches')
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
  });
}
