// Supabase Configuration
const SUPABASE_URL = 'https://xphdoboeuekubalrziqd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaGRvYm9ldWVrdWJhbHJ6aXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MDMyOTQsImV4cCI6MjA4MDk3OTI5NH0.RtKcNeQKqcpdoxeEkGa7yTDZJEOAA8RvPrz40TPjz4g';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { supabaseClient };
}

