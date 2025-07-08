import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fzctszmibaulbkycnckp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Y3Rzem1pYmF1bGJreWNuY2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzQ3MzQsImV4cCI6MjA2NzU1MDczNH0.mADlesHuLZINUeUjVW5DIjgBesi5hQnEg4Eht-PR3MQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 