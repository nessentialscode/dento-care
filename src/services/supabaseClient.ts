import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://mybbxtkjmdfmgtqndboz.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmJ4dGtqbWRmbWd0cW5kYm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMDUyOTcsImV4cCI6MjEwNDY4MTI5N30.PN5xMA4RsnyTN_0EWtjTexLgKLFqtkHFqWoZyEXszFc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
