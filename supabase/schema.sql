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
-- Appointment creation and management is handled securely via the backend Edge Function
-- using the service_role key, preventing unauthorized access or credential exposure.
