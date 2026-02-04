-- Add quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
  title TEXT,
  questions JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for quizzes
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to quizzes
CREATE POLICY "Public Read Quizzes"
ON quizzes
FOR SELECT
TO public
USING (true);

-- Allow admins to manage quizzes (Simplified: authenticating as any user for now, or we can use a specific email check)
CREATE POLICY "Manage Quizzes"
ON quizzes
FOR ALL
USING (auth.uid() IN (SELECT id FROM profiles WHERE subscription_status = 'active')); -- Temporary, ideally we'd have a 'role' column
