-- Create materials table
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('Gramatică', 'Vorbire', 'Examen')),
  target_audience TEXT CHECK (target_audience IN ('Copii', 'Adulți')),
  price NUMERIC,
  demo_file_url TEXT, -- Public URL
  full_file_url TEXT, -- Private Path
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public SELECT access (everyone can see materials)
CREATE POLICY "Public Read Access"
ON materials
FOR SELECT
TO public
USING (true);

-- Create a table for public profiles (Subscription Tracking)
create table profiles (
  id uuid references auth.users not null primary key,
  subscription_status text default 'inactive' check (subscription_status in ('active', 'inactive')),
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Handle new user signup automatically
create function public.handle_new_user()
returns trigger as 2923
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
2923 language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
