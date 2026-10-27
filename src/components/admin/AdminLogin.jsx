import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { loginAdmin } from '../../services/authService';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { SITE_CONFIG } from '../../config/siteConfig';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Mohon masukkan email dan password');
      return;
    }

    setLoading(true);
    const { data, error } = await loginAdmin(email, password);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Gagal login. Periksa email dan password Anda.');
    } else if (data?.user) {
      onLoginSuccess(data.user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wk-darkRed via-wk-red to-wk-orange flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-wk-gold relative"
      >
        <button
          onClick={onBackToSite}
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-wk-red mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Website
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-wk-lightOrange/30 text-wk-red rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-wk-darkRed">Admin Dashboard</h2>
          <p className="text-xs text-gray-500 mt-1">{SITE_CONFIG.festivalName} — {SITE_CONFIG.schoolName}</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 mb-6 flex items-start gap-2.5 text-xs text-amber-800">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
            <div>
              <p className="font-semibold">Konfigurasi Supabase Belum Terpasang</p>
              <p className="mt-0.5">Isi <code>REACT_APP_SUPABASE_URL</code> dan <code>REACT_APP_SUPABASE_ANON_KEY</code> di file <code>.env</code> untuk mengaktifkan login autentikasi resmi.</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 mb-6">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
              Email Panitia
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dqm.sch.id"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-wk-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-wk-red"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-wk-red hover:bg-wk-darkRed text-white py-6 rounded-xl font-bold text-base shadow-lg transition-all"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Hanya untuk panitia dan administrator resmi Wonderkind Festival.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
