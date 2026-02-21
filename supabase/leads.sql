-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS leads (
  id          uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text         NOT NULL,
  company     text,
  email       text         NOT NULL,
  phone       text,
  service     text,
  message     text,
  created_at  timestamptz  NOT NULL DEFAULT now()
);

ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
