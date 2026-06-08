-- Run this in your Supabase SQL editor

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Allow anyone to insert their email
create policy "Anyone can join waitlist"
  on waitlist for insert
  to anon
  with check (true);

-- Allow reading the count (needed for position display)
create policy "Anyone can read count"
  on waitlist for select
  to anon
  using (true);

-- Enable Row Level Security
alter table waitlist enable row level security;
