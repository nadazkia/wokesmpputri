import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ScrollText, Brain, PersonStanding, Paintbrush,
  Users, Volleyball, ChevronLeft, ChevronRight, Trophy, Group, UserRoundPlus
} from 'lucide-react';
import CategoryCard from './CategoryCard';
import { SITE_CONFIG } from '../config/siteConfig';


const Categories = () => {
  // Filter jenjang: 'ALL' | 'SD' | 'SMP'
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [activeIndex, setActiveIndex] = useState(0);

  // Daftar Resmi Kompetisi Wonderkind Festival
  const rawCategories = [
    {
      id: 'mewarnai',
      name: 'Mewarnai',
      icon: Paintbrush,
      description: 'Lomba mewarnai tingkat SD/MI untuk mengasah kreativitas estetika, komposisi warna, dan imajinasi seni anak bangsa.',
      participants: 'Siswa Individu SD/MI',
      level: 'SD',
      fee: 'Rp55.000 / peserta',
      color: 'from-wk-red to-pink-500',
      mascot: '/img/maskot/mewarnai.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1p6Yjj3PJVxvqaGOv9g9d1iV52cf4gI10',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Mewarnai* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`
    },
    {
      id: 'mhq',
      name: 'MHQ',
      icon: BookOpen,
      description: 'Musabaqah Hifdzil Qur-an tingkat SD untuk mencetak generasi penghafal Al-Qur-an yang berkarakter rabbani.',
      participants: 'Siswa Individu SD/MI',
      level: 'SD',
      fee: 'Rp75.000 / peserta',
      color: 'from-amber-500 to-yellow-500',
      mascot: '/img/maskot/mhq.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1MNKmi9QNF5k1ZGYfc4mKsW5Tj0Co9Ilm',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba MHQ* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`

    },
    {
      id: 'dongeng',
      name: 'Dongeng',
      icon: ScrollText,
      description: 'Kompetisi menceritakan cerita rakyat nusantara untuk siswa SD, melestarikan kekayaan budaya dan nilai moral bangsa.',
      participants: 'Siswa Individu SD/MI',
      level: 'SD',
      fee: 'Rp75.000 / peserta',
      color: 'from-fuchsia-500 to-indigo-500',
      mascot: '/img/maskot/dongeng.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1vLv_khEquEWS-FYHPf3-GgpYl0yjVn-o',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Dongeng* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`
    },
    {
      id: 'lccu',
      name: 'LCCU',
      icon: Brain,
      description: 'Lomba Cerdas Cermat Umum & Sains untuk siswa SD, melatih kecepatan berpikir analitis, wawasan umum, dan kerjasama regu.',
      participants: 'Tim SD/MI',
      level: 'SD',
      fee: 'Rp150.000 / tim',
      color: 'from-rose-500 to-purple-600',
      mascot: '/img/maskot/lccu.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1cFJ0G9MOUFvpoepUTO2Iv23Pos8dCAYw',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba LCCU* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`

    },
    {
      id: 'pantonim',
      name: 'Pantonim',
      icon: Users,
      description: 'Kompetisi ekspresi teatrikal non-verbal siswa SD dengan gestur imajinatif dan pesan edukatif inspiratif.',
      participants: 'Tim Siswa SD/MI',
      level: 'SD',
      fee: 'Rp100.000 / tim',
      color: 'from-wk-darkRed to-purple-900',
      mascot: '/img/maskot/pantonim.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1xTaC0mQ08FbKP3wk6tZjPfUA1xKbLTUs',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Pantonim* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`
    },
    {
      id: 'tari-tradisional-sd',
      name: 'Tari Tradisional SD',
      icon: PersonStanding,
      description: 'Kompetisi tari tradisional untuk siswa SD, menampilkan keindahan budaya nusantara melalui gerak dan ekspresi artistik.',
      participants: 'Tim SD/MI',
      level: 'SD',
      fee: 'Rp150.000 / tim',
      color: 'from-wk-gold to-wk-orange',
      mascot: '/img/maskot/tari-tradisional.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1Z9gv8DjgW5TQgkCjDPsRnNKI0OVYXWre',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Tari Tradisional SD* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`

    },
    {
      id: 'basket',
      name: 'Basket',
      icon: Volleyball,
      description: 'Kompetisi bola basket untuk siswa SMP, mengasah keterampilan dribbling, passing, shooting, dan strategi tim dalam permainan yang kompetitif.',
      participants: 'Tim SMP',
      level: 'SMP',
      fee: 'Rp280.000 / tim',
      color: 'from-wk-gold to-wk-orange',
      mascot: '/img/maskot/basket.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=16Vc8WqFmj2tSOaPAHnrpl3r8cElp2_X-',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Basket* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`

    },
    {
      id: 'paskibra',
      name: 'Paskibra',
      icon: Group,
      description: 'Kompetisi Paskibra untuk siswa SMP, menampilkan formasi baris-berbaris, disiplin, dan koordinasi tim.',
      participants: 'Tim SMP',
      level: 'SMP',
      fee: 'Rp370.000 / tim',
      color: 'from-wk-gold to-wk-orange',
      mascot: '/img/maskot/paskibra.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1dIqUWmnSHjBtk15ZrFv38F9tbGAi6fBG',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Paskibra* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`

    },
    {
      id: 'tari-tradisional-smp',
      name: 'Tari Tradisional SMP/MTs',
      icon: PersonStanding,
      description: 'Kompetisi tari tradisional untuk siswa SMP/MTs, menampilkan keindahan budaya nusantara melalui gerak dan ekspresi artistik.',
      participants: 'Tim SMP/MTs',
      level: 'SMP',
      fee: 'Rp200.000 / tim',
      color: 'from-wk-gold to-wk-orange',
      mascot: '/img/maskot/tari-tradisional.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1hga9gchR2XjdmnK9AddIDTRZrC7FaJfc',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Tari Tradisional SMP/MTs* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`

    },
    {
      id: 'pramuka',
      name: 'Pramuka',
      icon: UserRoundPlus,
      description: 'Kompetisi Pramuka untuk siswa SMP, menampilkan keterampilan kepramukaan, kepemimpinan, dan kerjasama tim dalam berbagai tantangan lapangan.',
      participants: 'Tim SMP',
      level: 'SMP',
      fee: 'Rp280.000 / tim',
      color: 'from-wk-gold to-wk-orange',
      mascot: '/img/maskot/pramuka.png',
      bookUrl: 'https://drive.google.com/uc?export=download&id=1Ms6GJhqDsNrbDFZojYZGSXJKUf729l2c',
      formUrl: `https://wa.me/${SITE_CONFIG.cplomba1}?text=${encodeURIComponent(`Halo kak Nova, saya ingin mendaftar *lomba Pramuka* di ${SITE_CONFIG.festivalName} ${SITE_CONFIG.edition}. Mohon informasi lebih lanjut. Terima kasih!`)}`
    }
  ];

  // Filter daftar lomba berdasarkan jenjang aktif
  const filteredCategories = rawCategories.filter((cat) => {
    if (selectedLevel === 'ALL') return true;
    if (selectedLevel === 'SD') return cat.level === 'SD' || cat.level === 'ALL';
    if (selectedLevel === 'SMP') return cat.level === 'SMP' || cat.level === 'ALL';
    return true;
  });

  // Reset index jika melebihi panjang data terfilter
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedLevel]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? filteredCategories.length - 1 : prev - 1));
  }, [filteredCategories.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === filteredCategories.length - 1 ? 0 : prev + 1));
  }, [filteredCategories.length]);

  // Keyboard navigation untuk aksesibilitas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section id="categories" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-wk-gold/20 text-wk-darkRed px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Trophy className="w-4 h-4 text-wk-red" /> Wonder Competition 2026/2027
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-wk-darkRed mb-4 tracking-tight">
            Pusat Kompetisi Pelajar
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pilih jenjang sekolah Anda dan jelajahi cabang lomba eksternal tingkat SD/MI dan SMP/MTs.
            Geser kartu ke samping untuk melihat detail kompetisi beserta buku panduan resmi.
          </p>

          {/* ====================================================================
              SEGMENTED CONTROL / FILTER JENJANG SD DAN SMP
              ==================================================================== */}
          <div className="inline-flex p-1.5 mt-8 bg-gray-100/90 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-inner">
            <button
              onClick={() => setSelectedLevel('ALL')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${selectedLevel === 'ALL'
                ? 'bg-wk-red text-white shadow-md scale-102'
                : 'text-gray-600 hover:text-wk-darkRed hover:bg-white/60'
                }`}
            >
              Semua Lomba ({rawCategories.length})
            </button>

            <button
              onClick={() => setSelectedLevel('SD')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${selectedLevel === 'SD'
                ? 'bg-wk-red text-white shadow-md scale-102'
                : 'text-gray-600 hover:text-wk-darkRed hover:bg-white/60'
                }`}
            >
              Tingkat SD / MI ({rawCategories.filter(c => c.level === 'SD' || c.level === 'ALL').length})
            </button>

            <button
              onClick={() => setSelectedLevel('SMP')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${selectedLevel === 'SMP'
                ? 'bg-wk-red text-white shadow-md scale-102'
                : 'text-gray-600 hover:text-wk-darkRed hover:bg-white/60'
                }`}
            >
              Tingkat SMP / MTs ({rawCategories.filter(c => c.level === 'SMP' || c.level === 'ALL').length})
            </button>
          </div>
        </motion.div>

        {/* ====================================================================
            CAROUSEL HORIZONTAL 3D DENGAN EFEK PERSPEKTIF
            Kartu aktif di tengah paling menonjol, kartu kiri/kanan mengecil 3D
            ==================================================================== */}
        <div className="relative w-full overflow-visible py-6 md:py-10">

          {/* Navigasi Panah Kiri */}
          <button
            onClick={handlePrev}
            aria-label="Kompetisi Sebelumnya"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-wk-red text-wk-darkRed hover:text-white shadow-xl hover:shadow-2xl border border-gray-200 flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Navigasi Panah Kanan */}
          <button
            onClick={handleNext}
            aria-label="Kompetisi Selanjutnya"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-wk-red text-wk-darkRed hover:text-white shadow-xl hover:shadow-2xl border border-gray-200 flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3D Carousel Stage */}
          <div
            className="relative h-[530px] md:h-[500px] flex items-center justify-center perspective-[1200px]"
          >
            <AnimatePresence initial={false} mode="sync">
              {filteredCategories.map((cat, idx) => {
                // Hitung offset relatif terhadap kartu aktif
                let offset = idx - activeIndex;

                // Tangani wrap-around visual sederhana untuk item yang berdekatan
                if (offset < -1 && idx === 0 && activeIndex === filteredCategories.length - 1) {
                  offset = 1;
                } else if (offset > 1 && idx === filteredCategories.length - 1 && activeIndex === 0) {
                  offset = -1;
                }

                const isActive = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                // Hanya render kartu aktif dan tetangga terdekatnya untuk efisiensi performa 60fps
                if (!isActive && !isLeft && !isRight) {
                  return null;
                }

                // Variasi kalkulasi 3D transform
                let xPosition = '0%';
                let rotateY = 0;
                let scale = 1;
                let zIndex = 30;
                let opacity = 1;

                if (isLeft) {
                  xPosition = '-55%';
                  rotateY = 16;
                  scale = 0.86;
                  zIndex = 20;
                  opacity = 0.65;
                } else if (isRight) {
                  xPosition = '55%';
                  rotateY = -16;
                  scale = 0.86;
                  zIndex = 20;
                  opacity = 0.65;
                }

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity,
                      scale,
                      x: xPosition,
                      rotateY,
                      zIndex,
                    }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    onClick={() => {
                      if (!isActive) setActiveIndex(idx);
                    }}
                    drag={isActive ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_e, { offset: dragOffset, velocity }) => {
                      if (dragOffset.x > 40 || velocity.x > 300) {
                        handlePrev();
                      } else if (dragOffset.x < -40 || velocity.x < -300) {
                        handleNext();
                      }
                    }}
                    style={{
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      cursor: isActive ? 'grab' : 'pointer',
                    }}
                    className="w-full max-w-sm md:max-w-md px-2"
                  >
                    <CategoryCard category={cat} isActive={isActive} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Indikator Posisi Carousel (Dots) */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {filteredCategories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Ke kartu nomor ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${activeIndex === i
                  ? 'w-8 h-2.5 bg-wk-red shadow-sm'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-wk-orange/60'
                  }`}
              />
            ))}
          </div>

          <div className="text-center text-xs text-gray-400 mt-2 font-mono">
            {activeIndex + 1} dari {filteredCategories.length} cabang lomba • Geser kartu atau gunakan tombol panah
          </div>
        </div>

      </div>
    </section>
  );
};

export default Categories;
