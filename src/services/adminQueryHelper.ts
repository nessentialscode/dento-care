import { refreshAdminSession } from './authService';

export interface SupabaseQueryResult<T> {
  data: T | null;
  error: {
    message?: string;
    details?: string;
    code?: string;
    hint?: string;
  } | null;
}

/**
 * Executes an authenticated Supabase PostgREST operation with automatic
 * clock-skew recovery and token refresh for transient "JWT issued at future" (PGRST301) errors.
 *
 * In distributed cloud architectures, a slight container clock drift (1-2s) between
 * the Auth issuer (GoTrue) and the database (PostgREST) causes PostgREST to reject
 * fresh JWTs where iat > current_timestamp.
 *
 * This runner handles this transparently:
 * 1. On first future-JWT error: waits 1200ms for database clock to catch up with iat.
 * 2. On second future-JWT error: calls refreshSession() to mint a fresh JWT.
 * 3. Never bypasses JWT authentication or weakens RLS.
 */
export async function executeAdminOperation<T>(
  operationName: string,
  operation: () => Promise<SupabaseQueryResult<T>>
): Promise<T> {
  const maxAttempts = 3;
  let lastError: SupabaseQueryResult<T>['error'] = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { data, error } = await operation();

    if (!error) {
      return data as T;
    }

    lastError = error;
    const msg = (error.message || '').toLowerCase();
    const details = (error.details || '').toLowerCase();
    const isClockSkewOrFutureJwt =
      msg.includes('jwt issued at future') ||
      details.includes('jwt issued at future') ||
      (error.code === 'PGRST301' && msg.includes('future'));

    if (isClockSkewOrFutureJwt && attempt < maxAttempts) {
      if (attempt === 1) {
        // Leeway wait for database clock to catch up with GoTrue token iat
        await new Promise((res) => setTimeout(res, 1200));
        continue;
      }

      if (attempt === 2) {
        // Attempt fresh token refresh
        try {
          await refreshAdminSession();
          await new Promise((res) => setTimeout(res, 500));
        } catch {
          // If refresh fails, continue to final attempt
        }
        continue;
      }
    }

    // Non-retryable error
    break;
  }

  const finalMessage = lastError?.message || `${operationName} failed.`;
  throw new Error(finalMessage);
}
