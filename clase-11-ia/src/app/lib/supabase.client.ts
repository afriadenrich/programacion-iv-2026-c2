import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

const { supabaseUrl, supabaseKey } = environment;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Missing Supabase credentials. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set in .env',
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
