import { supabase } from './supabaseClient';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

export interface AdminUser {
  id: string;
  email?: string;
  role: string;
}

/**
 * Validates if the authenticated user possesses verified administrative privileges.
 * Administrator authorization is based exclusively on the server-controlled Supabase app_metadata role claim.
 * user_metadata must never be used for administrator authorization.
 */
export function isAuthorizedAdmin(user: User | null): boolean {
  if (!user) return false;
  const appRole = user.app_metadata?.role;
  return appRole === 'admin';
}

/**
 * Signs in an administrator using email and password.
 */
export async function signInAdmin(email: string, password: string):Promise<{ session: Session | null; user: User | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw error;
  }

  return { session: data.session, user: data.user };
}

/**
 * Signs out the current user session.
 */
export async function signOutAdmin(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

/**
 * Retrieves the current session, if one exists.
 */
export async function getAdminSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return null;
  }
  return data.session;
}

/**
 * Subscribes to Supabase authentication state transitions.
 */
export function onAdminAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return data.subscription;
}
