import React from 'react';

/**
 * GlobalBackground
 * Menerapkan satu background terpusat untuk seluruh website,
 * dilengkapi dekorasi animasi CSS ultra-ringan (bintang & gelembung lembut)
 * dengan pointer-events: none agar tidak mengganggu klik/form/scanner.
 */
const GlobalBackground = () => {
  // Posisi bintang & partikel statis deterministik untuk performa maksimal tanpa kalkulasi JS konstan
  const stars = [
    { top: '8%', left: '12%', size: 'w-2 h-2', delay: '0s' },
    { top: '15%', left: '85%', size: 'w-1.5 h-1.5', delay: '1.2s' },
    { top: '25%', left: '4%', size: 'w-2.5 h-2.5', delay: '2.1s' },
    { top: '35%', left: '92%', size: 'w-2 h-2', delay: '0.8s' },
    { top: '48%', left: '8%', size: 'w-1.5 h-1.5', delay: '1.7s' },
    { top: '58%', left: '88%', size: 'w-2 h-2', delay: '2.8s' },
    { top: '70%', left: '15%', size: 'w-2 h-2', delay: '0.5s' },
    { top: '82%', left: '90%', size: 'w-1.5 h-1.5', delay: '1.9s' },
    { top: '92%', left: '22%', size: 'w-2 h-2', delay: '3.1s' },
  ];

  const floatingOrbs = [
    { top: '18%', left: '10%', size: 'w-32 h-32', color: 'bg-wk-gold/10', delay: '0s' },
    { top: '45%', right: '8%', size: 'w-48 h-48', color: 'bg-wk-orange/10', delay: '3s' },
    { top: '75%', left: '6%', size: 'w-40 h-40', color: 'bg-wk-red/10', delay: '6s' },
  ];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 1. Gambar Background Global */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-15"
        style={{
          backgroundImage: "url('/img/background.jpeg')",
        }}
      />

      {/* 2. Overlay Gradasi untuk Menjaga Keterbacaan Konten */}
      <div className="absolute inset-0 bg-gradient-to-b from-wk-white/90 via-wk-white/80 to-wk-white/95" />

      {/* 3. Dekorasi Gelembung Cahaya Lembut (CSS Floating Orbs) */}
      {floatingOrbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-3xl animate-particle-float ${orb.size} ${orb.color}`}
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* 4. Dekorasi Bintang Berkelap-Kelip Ringan (CSS Twinkling Stars) */}
      {stars.map((star, idx) => (
        <div
          key={`star-${idx}`}
          className={`absolute rounded-full bg-wk-gold/70 animate-star-twinkle ${star.size} shadow-[0_0_8px_rgba(228,192,42,0.8)]`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default GlobalBackground;
