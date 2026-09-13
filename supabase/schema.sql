-- Dento Care Appointments Database Schema
-- Table: public.appointments
-- Used for appointment requests submitted via Dento Care website

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    branch TEXT NOT NULL,
    service TEXT,
    doctor TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Security Policy:
-- Public/anonymous users do NOT have direct INSERT, SELECT, UPDATE, or DELETE access.
-- Appointment creation is handled securely via the backend Edge Function using the service_role key.
--
-- Authorized Admin Access Policies:
-- Administrator authorization is based exclusively on the server-controlled Supabase app_metadata role claim. user_metadata must never be used for administrator authorization.
-- Only authenticated users with app_metadata.role = 'admin' can SELECT or UPDATE appointments.
-- Normal authenticated users without admin authorization cannot read or update appointments.
-- DELETE is denied to all roles.

CREATE POLICY "Allow authorized admin to select appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

CREATE POLICY "Allow authorized admin to update appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
)
WITH CHECK (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

-- ==================================================
-- Rigid Appointment Lifecycle Enforcement (Trigger)
-- ==================================================
-- State Machine:
-- pending -> confirmed
-- pending -> cancelled
-- confirmed -> completed
-- All other transitions are rejected at the database level.
-- Terminal states: completed, cancelled.

CREATE OR REPLACE FUNCTION public.enforce_appointment_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate only when status is modified
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Verify target status is one of the strictly supported statuses
    IF NEW.status NOT IN ('pending', 'confirmed', 'completed', 'cancelled') THEN
      RAISE EXCEPTION 'Unsupported appointment status: %', NEW.status
        USING ERRCODE = 'check_violation';
    END IF;

    -- Strict State Machine:
    -- 1. pending -> confirmed
    -- 2. pending -> cancelled
    -- 3. confirmed -> completed
    IF (OLD.status = 'pending' AND NEW.status = 'confirmed') OR
       (OLD.status = 'pending' AND NEW.status = 'cancelled') OR
       (OLD.status = 'confirmed' AND NEW.status = 'completed') THEN
      -- Valid transition
      NEW.updated_at = now();
      RETURN NEW;
    ELSE
      -- Any other transition is rejected
      RAISE EXCEPTION 'Invalid appointment status transition from "%" to "%"', OLD.status, NEW.status
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  -- If status was not changed (other fields updated), update updated_at
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_appointment_status_transition ON public.appointments;

CREATE TRIGGER trg_enforce_appointment_status_transition
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.enforce_appointment_status_transition();

-- ==================================================
-- Clinic Branch Availability Management Table
-- ==================================================

CREATE TABLE IF NOT EXISTS public.clinic_branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    location TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clinic_branches ENABLE ROW LEVEL SECURITY;

-- 1. Public (anon + authenticated) can view ONLY active clinic branches
CREATE POLICY "Allow public read active clinic branches"
ON public.clinic_branches
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- 2. Authenticated Admin can view ALL clinic branches
CREATE POLICY "Allow admin read all clinic branches"
ON public.clinic_branches
FOR SELECT
TO authenticated
USING (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

-- 3. Authenticated Admin can update clinic branches (toggle active/inactive)
CREATE POLICY "Allow admin update clinic branches"
ON public.clinic_branches
FOR UPDATE
TO authenticated
USING (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
)
WITH CHECK (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

-- 4. Authenticated Admin can insert clinic branches
CREATE POLICY "Allow admin insert clinic branches"
ON public.clinic_branches
FOR INSERT
TO authenticated
WITH CHECK (
  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

-- ==========================================================
-- STEP 16: DOCTORS & PATIENT FEEDBACK TABLES AND POLICIES
-- ==========================================================

-- 1. DOCTORS AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  specialty TEXT NOT NULL,
  is_present BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Public/anon read doctors
CREATE POLICY "Allow public read doctors"
  ON public.doctors
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin read all doctors
CREATE POLICY "Allow admin read doctors"
  ON public.doctors
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Admin update doctors
CREATE POLICY "Allow admin update doctors"
  ON public.doctors
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Admin insert doctors
CREATE POLICY "Allow admin insert doctors"
  ON public.doctors
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 2. PATIENT FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  treatment TEXT,
  branch TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public/anon can INSERT feedback with pending status only
CREATE POLICY "Allow public insert pending feedback"
  ON public.feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');

-- Public/anon can SELECT only approved feedback
CREATE POLICY "Allow public read approved feedback"
  ON public.feedback
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Admin can SELECT all feedback
CREATE POLICY "Allow admin read all feedback"
  ON public.feedback
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Admin can UPDATE feedback (moderation)
CREATE POLICY "Allow admin update feedback"
  ON public.feedback
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Admin can DELETE feedback
CREATE POLICY "Allow admin delete feedback"
  ON public.feedback
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
