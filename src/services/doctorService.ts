import { supabase } from './supabaseClient';
import { executeAdminOperation } from './adminQueryHelper';
import { clinicDoctors, type DoctorProfile } from '../data/doctors';

export interface DoctorRecord {
  id: string;
  name: string;
  specialty: string;
  is_present: boolean;
  created_at?: string;
  updated_at?: string;
  profile?: DoctorProfile;
}

/**
 * Normalizes a doctor name for flexible matching (e.g. ignoring 'Professor', 'Prof.', 'Dr.', extra symbols, extra spaces).
 */
export function normalizeDoctorName(name: string): string {
  return (name || '')
    .toLowerCase()
    .replace(/\b(professor|prof\.|prof|dr\.|dr|ph\b)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Checks if two doctor names match, with support for doctor aliases.
 */
export function isDoctorMatch(nameA: string, nameB: string): boolean {
  if (!nameA || !nameB) return false;
  const normA = normalizeDoctorName(nameA);
  const normB = normalizeDoctorName(nameB);
  if (normA === normB || normA.includes(normB) || normB.includes(normA)) return true;
  if (nameA.toLowerCase() === nameB.toLowerCase()) return true;
  // Handle Abdul Mufeed / Abdullah Mufeed alias
  if (normA.includes('mufeed') && normB.includes('mufeed')) return true;
  // Handle Haris / Mohammed Haris PM alias
  if (normA.includes('haris') && normB.includes('haris')) return true;
  // Handle Nidhash / Nidhash Siddik alias
  if (normA.includes('nidhash') && normB.includes('nidhash')) return true;
  // Handle Aslif / Mohamed Aslif alias
  if (normA.includes('aslif') && normB.includes('aslif')) return true;
  // Handle Ratheesh / Ratheesh TK alias
  if (normA.includes('ratheesh') && normB.includes('ratheesh')) return true;
  // Handle Shoukath Ali PM / PH alias
  if (normA.includes('shoukath') && normB.includes('shoukath')) return true;
  // Handle Nasreen / Nasreen Nazeer Hussain alias
  if (normA.includes('nasreen') && normB.includes('nasreen')) return true;
  return false;
}

/**
 * Finds matching profile from clinicDoctors for a given doctor name or record.
 */
export function findDoctorProfile(nameOrSpecialty: string): DoctorProfile | undefined {
  if (!nameOrSpecialty) return undefined;
  return clinicDoctors.find((d) => isDoctorMatch(d.name, nameOrSpecialty));
}

/**
 * Fetches doctor presence list for public display and modal filtering.
 * Guaranteed to return entries for all clinicDoctors.
 */
export async function fetchDoctorAvailability(): Promise<DoctorRecord[]> {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('id, name, specialty, is_present')
      .order('name', { ascending: true });

    if (error) {
      console.warn('Error fetching doctor availability from DB, using fallback:', error);
      return clinicDoctors.map((d) => ({
        id: d.id,
        name: d.name,
        specialty: d.specialization,
        is_present: true,
        profile: d,
      }));
    }

    const rows = (data || []) as DoctorRecord[];

    // Ensure all clinicDoctors have an entry
    const results: DoctorRecord[] = clinicDoctors.map((p) => {
      const match = rows.find((r) => isDoctorMatch(r.name, p.name));
      return {
        id: match ? match.id : p.id,
        name: p.name,
        specialty: p.specialization,
        is_present: match ? match.is_present : true,
        profile: p,
      };
    });

    return results;
  } catch (err) {
    console.warn('Exception in fetchDoctorAvailability, using default presence:', err);
    return clinicDoctors.map((d) => ({
      id: d.id,
      name: d.name,
      specialty: d.specialization,
      is_present: true,
      profile: d,
    }));
  }
}

/**
 * Fetches all doctor records for the admin portal.
 * Merges Supabase records with clinicDoctors to ensure every doctor is visible.
 */
export async function fetchAllDoctorsForAdmin(): Promise<DoctorRecord[]> {
  try {
    const rows = (await executeAdminOperation<DoctorRecord[]>('Fetch doctors for admin', async () => {
      return await supabase
        .from('doctors')
        .select('*')
        .order('name', { ascending: true });
    })) || [];

    // Ensure all clinicDoctors are included in the admin doctor list
    const results: DoctorRecord[] = clinicDoctors.map((p) => {
      const match = rows.find((r) => isDoctorMatch(r.name, p.name));
      return {
        id: match ? match.id : p.id,
        name: p.name,
        specialty: p.specialization,
        is_present: match ? match.is_present : true,
        created_at: match?.created_at,
        updated_at: match?.updated_at,
        profile: p,
      };
    });

    // Add any extra doctors in DB not matching clinicDoctors
    rows.forEach((r) => {
      const matched = results.some((res) => isDoctorMatch(r.name, res.name));
      if (!matched) {
        results.push(r);
      }
    });

    return results;
  } catch (err) {
    console.warn('Error in fetchAllDoctorsForAdmin, returning clinicDoctors fallback:', err);
    return clinicDoctors.map((d) => ({
      id: d.id,
      name: d.name,
      specialty: d.specialization,
      is_present: true,
      profile: d,
    }));
  }
}

/**
 * Updates a doctor's presence status (Admin only).
 * Handles both UUID matching and named upsert for newly added faculty.
 */
export async function updateDoctorPresence(
  id: string,
  is_present: boolean
): Promise<DoctorRecord> {
  return executeAdminOperation<DoctorRecord>('Update doctor presence', async () => {
    // Attempt standard update by id
    const res = await supabase
      .from('doctors')
      .update({
        is_present,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (res.data) {
      return res;
    }

    // If update did not affect any rows (e.g. static fallback id like 'dr-jasmine')
    const profile = clinicDoctors.find((d) => d.id === id);
    if (profile) {
      const upsertRes = await supabase
        .from('doctors')
        .upsert(
          {
            name: profile.name,
            specialty: profile.specialization,
            is_present,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'name' }
        )
        .select()
        .single();

      if (upsertRes.data) {
        return upsertRes;
      }
    }

    return res;
  });
}

