import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Login Admin dengan Email dan Password (Supabase Auth)
 */
export const loginAdmin = async (email, password) => {
  if (!isSupabaseConfigured) {
    return { data: null, error: { message: 'Koneksi Supabase belum dikonfigurasi di file .env' } };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { data: null, error };
    }

    // Periksa apakah user memiliki role admin/panitia di tabel profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.warn('[Auth] Gagal memverifikasi profil admin:', profileError);
    }

    return { data: { ...data, profile }, error: null };
  } catch (err) {
    return { data: null, error: { message: err.message } };
  }
};

/**
 * Logout Admin
 */
export const logoutAdmin = async () => {
  if (!isSupabaseConfigured) return { error: null };
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: { message: err.message } };
  }
};

/**
 * Ambil User Saat Ini
 */
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
};

/**
 * Listener Perubahan Status Autentikasi
 */
export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange(callback);
};
