import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Newspaper, Users, Calendar } from 'lucide-react';

const CategoryCard = ({ category, isActive = true }) => {
  const handleRegister = (e) => {
    e.stopPropagation();
    if (category.formUrl) {
      window.open(category.formUrl, '_blank');
    } else {
      const ticketsSection = document.getElementById('tickets');
      if (ticketsSection) {
        ticketsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Pendaftaran lomba dapat dikonfirmasikan ke WhatsApp resmi panitia.');
      }
    }
  };

  const handleBook = (e) => {
    e.stopPropagation();
    if (category.bookUrl) {
      window.open(category.bookUrl, '_blank');
    } else {
      alert('Buku panduan lomba (juknis) sedang disiapkan oleh panitia.');
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none overflow-visible pt-10 px-2 pb-4">
      {/* ====================================================================
          MASKOT BERBEDA MENGAMBANG DI TEPI KARTU (Protruding & Floating)
          pointer-events: none memastikan maskot TIDAK menutupi tombol/klik
          ==================================================================== */}

      {/* Main Card Body */}
      <div
        className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border-2 relative z-10 ${isActive
          ? 'shadow-[0_20px_50px_rgba(93,19,19,0.2)] border-wk-gold'
          : 'shadow-lg border-wk-orange/20 opacity-90'
          }`}
      >
        {/* Header Strip with Category Gradient */}
        <div className={`h-3 bg-gradient-to-r ${category.color}`} />

        <div className="p-6 md:p-8">
          {/* Top Row: Icon & Level Badge */}
          <div className="flex items-center justify-between mb-4 pr-16 md:pr-20">
            <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-md`}>
              <category.icon className="w-7 h-7 text-white" />
            </div>

            <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider ${category.level === 'SD'
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : category.level === 'SMP'
                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
              {category.level === 'SD' ? 'Tingkat SD/MI' : category.level === 'SMP' ? 'Tingkat SMP/MTs' : 'SD & SMP'}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold text-wk-darkRed mb-2 pr-12 line-clamp-2">
            {category.name}
          </h3>
          {/* Maskot */}
          {category.mascot && (
            <div
              className="pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: isActive ? 'scale(1.08) translateY(-6px)' : 'scale(0.95)',
              }}
            >
              <div className="relative h-48">
                <img
                  src={category.mascot}
                  alt={`Maskot ${category.name}`}
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_18px_rgba(93,19,19,0.35)]"
                  onError={(e) => {
                    // Fallback jika aset spesifik belum tersedia
                    e.currentTarget.src = '/img/WOKE.png';
                  }}
                />
                {/* Subtle glow spark behind mascot */}
                <div className="absolute inset-0 bg-wk-gold/25 rounded-full blur-xl -z-10" />
              </div>
            </div>
          )}

          <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[44px] line-clamp-3">
            {category.description}
          </p>

          {/* Metadata Badges */}
          <div className="space-y-2 mb-6 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 text-xs">
            <div className="flex items-center text-gray-700">
              <Users className="w-4 h-4 text-wk-orange mr-2 flex-shrink-0" />
              <span className="font-semibold text-gray-500 mr-1.5">Peserta:</span>
              <span className="font-bold text-gray-800">{category.participants}</span>
            </div>

            {category.fee && (
              <div className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 text-wk-red mr-2 flex-shrink-0" />
                <span className="font-semibold text-gray-500 mr-1.5">Registrasi:</span>
                <span className="font-bold text-wk-darkRed">{category.fee}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleBook}
              variant="outline"
              className="w-full border-wk-orange/40 text-wk-darkRed hover:bg-wk-orange/10 font-bold text-xs py-5 rounded-2xl group transition-all"
            >
              Juknis Lomba
              <Newspaper className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>

            <Button
              onClick={handleRegister}
              className="w-full bg-wk-red hover:bg-wk-darkRed text-white font-bold text-xs py-5 rounded-2xl shadow-md group transition-all"
            >
              Daftar Lomba
              <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
