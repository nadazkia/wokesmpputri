import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isExiting = false }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-wk-darkRed via-[#420d0d] to-[#250606] text-white pointer-events-auto"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center">
        {/* Glow halo behind logo */}
        <div className="absolute w-44 h-44 rounded-full bg-wk-gold/20 blur-3xl animate-pulse pointer-events-none" />

        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6"
        >
          <img
            src="/img/WOKE.png"
            alt="Wonderkind Festival Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            onError={(e) => {
              // Fallback jika WOKE.png bermasalah
              e.currentTarget.src = '/img/WOKE26.png';
            }}
          />
        </motion.div>

        {/* Festival Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center px-4"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-wk-gold font-poppins uppercase">
            WONDERKIND FESTIVAL
          </h1>
          <p className="text-xs md:text-sm text-wk-lightOrange/80 tracking-widest mt-1">
            Cakrawala Perubahan, Arah Peradaban
          </p>
        </motion.div>

        {/* Progress bar indicator */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-wk-orange via-wk-gold to-wk-orange rounded-full"
          />
        </div>
        <span className="text-[11px] text-gray-400 mt-2 font-mono">Memuat Festival...</span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
