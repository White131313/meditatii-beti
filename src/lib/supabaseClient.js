import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://npngltgflarmtbhjafpp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmdsdGdmbGFybXRiaGphZnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MDUwNjEsImV4cCI6MjA4NTE4MTA2MX0.EwqhSK8SmSuhieOsMteQG2duWWX1WyPgBsNwtjLkRTs'

export const supabase = createClient(supabaseUrl, supabaseKey)
