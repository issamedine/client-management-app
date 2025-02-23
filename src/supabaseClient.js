// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jmipucdabookqwrxuqej.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptaXB1Y2RhYm9va3F3cnh1cWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDg5MzksImV4cCI6MjA1NTgyNDkzOX0.ajAmBA-hDgwgFWIs6TbOgl7GlRjQsW0ym8PDpSxA8aY';
export const supabase = createClient(supabaseUrl, supabaseKey);