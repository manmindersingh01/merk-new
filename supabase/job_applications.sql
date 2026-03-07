-- Run this in Supabase SQL editor

CREATE TABLE IF NOT EXISTS job_applications (
  id           uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    text         NOT NULL,
  email        text         NOT NULL,
  phone        text,
  applied_for  text,
  resume_path  text         NOT NULL,
  created_at   timestamptz  NOT NULL DEFAULT now()
);

ALTER TABLE job_applications
  ADD COLUMN IF NOT EXISTS applied_for text;

ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;
