-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
  questions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(material_id)
);

-- Enable RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access for Quizzes"
ON quizzes FOR SELECT TO public USING (true);

-- Allow authenticated users (Admin) to manage quizzes
-- (In a real app, we'd check for an admin role, but for now we'll allow all auth users for simplicity as requested earlier)
CREATE POLICY "Full Access for Authenticated Users"
ON quizzes FOR ALL TO authenticated USING (true);
