import { createClient } from '@supabase/supabase-js';

// Ambil konfigurasi dari environment variables (CRA menggunakan prefix REACT_APP_)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

/**
 * Cek apakah konfigurasi Supabase sudah terisi dengan valid
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

if (!isSupabaseConfigured) {
  console.info(
    '[Supabase] Kredensial Supabase belum diatur di file .env. Website akan menggunakan mode offline data / fallback.'
  );
}

/**
 * Inisialisasi Supabase Client resmi
 * Menggunakan dummy fallback URL saat belum dikonfigurasi agar aplikasi tidak crash saat di-build atau dimuat pertama kali.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
