INSERT INTO storage.buckets (id, name, public) VALUES ('materiale-lectii', 'materiale-lectii', true) ON CONFLICT (id) DO NOTHING;

-- Policies for the bucket
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'materiale-lectii' );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin Upload' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'materiale-lectii' AND auth.role() = 'authenticated' );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin Delete' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Admin Delete" ON storage.objects FOR ALL USING ( bucket_id = 'materiale-lectii' AND auth.role() = 'authenticated' );
    END IF;
END
$$;
