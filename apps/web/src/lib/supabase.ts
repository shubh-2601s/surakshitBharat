import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zyfrbyzfhpgamdozeiua.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qzN-3acD6DEtdlLJ15ogKQ_tZFZNZAU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'surakshit'
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Helper to test connectivity
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const { data, error } = await supabase.from('states').select('code, name').limit(5);
    if (error) {
      return { connected: false, message: error.message };
    }
    return { connected: true, message: `Successfully connected. Loaded ${data?.length || 0} states.` };
  } catch (err: any) {
    return { connected: false, message: err?.message || 'Connection error' };
  }
}
