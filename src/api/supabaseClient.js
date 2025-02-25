import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

/**
 * Creates a Supabase client instance.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);
