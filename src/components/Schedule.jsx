import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from "../config/siteConfig";

const Schedule = () => {
    const scheduleData = [
        {
            day: 'Pra-Event (Oktober-Desember 2026)',
            theme: 'Wonderkindness Week',
            isHighlight: true,
            events: [
                {
                    time: 'Fleksibel',
                    activity: 'Implementasi & Inisiatif Sosial',
                    location: 'Gunung Sindur',
                    description: 'Gerakan sosial langsung ke masyarakat sekitar sebagai bentuk kepedulian dan kontribusi nyata dari panitia dan peserta.'
                },
                {
                    time: 'Fleksibel',
                    activity: 'Penyaluran Bantuan & Empati',
                    location: 'Gunung Sindur',
                    description: 'Distribusi bantuan kemanusiaan serta program berbagi kepada warga yang membutuhkan di wilayah Gunung Sindur.'
                },
            ]
        },
        {
            day: 'Hari 1 - 20 Januari 2027',
            theme: 'Opening & Internal Competitions',
            isHighlight: false,
            events: [
                {
                    time: '07.00 - 08.30',
                    activity: 'Grand Opening Wonderkind 2026',
                    location: 'Main Stage',
                    description: 'Seremoni pembukaan resmi festival yang dimeriahkan oleh sambutan, penampilan seni, dan simbolis dimulainya acara.'
                },
                {
                    time: '10.00 - 15.00',
                    activity: 'Internal Competitions',
                    location: 'All Venues',
                    description: 'Ajang unjuk bakat dan kompetisi seru antar internal peserta untuk memperebutkan tiket ke babak selanjutnya.'
                },
            ]
        },
        {
            day: 'Hari 2 - 21 Januari 2027',
            theme: 'Inspiration & Knowledge Day',
            isHighlight: false,
            events: [
                {
                    time: '08.00 - 11.30',
                    activity: 'Wonder Talk (Tiket Umum)',
                    location: 'Main Stage',
                    description: 'Sesi inspiratif dan bincang-bincang interaktif bersama narasumber/pembicara hebat yang terbuka untuk umum.'
                },
                {
                    time: '13.00 - 15.30',
                    activity: 'Wonder Preacher (Tiket Umum)',
                    location: 'Main Stage',
                    description: 'Tausiyah atau siraman rohani penuh makna untuk memperkuat motivasi spiritual peserta dan pengunjung.'
                },
            ]
        },
        {
            day: 'Hari 3 - 22 Januari 2027',
            theme: 'Wonder Competition (SD) & Celebration',
            isHighlight: false,
            events: [
                {
                    time: '07.00 - 15.00',
                    activity: 'Wonder Competition (Lomba SD Eksternal)',
                    location: 'All Venues',
                    description: 'Kompetisi seru tingkat Sekolah Dasar (SD) se-eksternal yang mempertemukan talenta-talenta muda berbakat.'
                },
                {
                    time: '16.00 - 17.30',
                    activity: 'Awarding Ceremony',
                    location: 'Main Stage',
                    description: 'Momen penganugerahan trofi, penghargaan, dan apresiasi bagi para juara dari berbagai cabang perlombaan.'
                },
                {
                    time: '19.30 - 22.00',
                    activity: 'Grand Closing Wonderkind 2026',
                    location: 'Main Stage',
                    description: 'Puncak perayaan penutupan festival dengan sajian hiburan spektakuler untuk seluruh hadirin.'
                }
            ]
        },
        {
            day: 'Closing Ceremony - 23 Januari 2027',
            theme: 'Konser Amal Palestina',
            isHighlight: true,
            events: [
                {
                    time: '07.00 - 15.00',
                    activity: 'Penggalangan hadiah untuk Palestina',
                    location: 'On Progress',
                    description: 'Aksi solidaritas dan penggalangan dana/bantuan kemanusiaan khusus untuk saudara-saudara kita di Palestina.'
                },
            ]
        }
    ];

    return (
        // <section id="schedule" className="py-20 bg-wk-white" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/background.jpeg'})` }}>
        <section
            id="schedule"
            className="py-20 from-white via-white to-[#fdfff7] bg-gradient-to-b"
        >

            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-darkRed mb-4">
                        Jadwal Rangkaian Acara
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {SITE_CONFIG.festivalName} dilaksanakan 4 hari pada{" "}
                        {SITE_CONFIG.dates}. Lomba eksternal untuk SD/MI dan SMP/MTs
                        dilaksanakan pada 20-22 Januari 2027.
                    </p>
                </motion.div>

                {/* Main Timeline Wrapper */}
                <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 space-y-12">
                    {scheduleData.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative group">

                            {/* Timeline Dot (Penanda Utama Hari) */}
                            <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white shadow-md transition-transform duration-200 group-hover:scale-125 ${section.isHighlight ? 'bg-wk-lightOrange' : 'bg-wk-orange'
                                }`} />

                            {/* Day & Theme Header */}
                            <div className="mb-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-wk-darkRed bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                                        {section.day}
                                    </span>
                                    {section.isHighlight && (
                                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-wk-gold/30 text-amber-700 border border-wk-gold font-semibold">
                                            <Sparkles className="w-3 h-3" /> Special Event
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl sm:text-2xl font-extrabold text-wk-darkRed mt-1">
                                    {section.theme}
                                </h3>
                            </div>

                            {/* Events Card Container */}
                            <div className="space-y-4">
                                {section.events.map((ev, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`p-5 rounded-2xl border duration-300 transition-all ${section.isHighlight
                                            ? 'bg-gradient-to-br from-wk-darkRed/5 to-wk-red/10 text-white border-rose-300 shadow-md hover:shadow-lg'
                                            : 'bg-white text-white border-slate-200/80 shadow-md hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                            {/* Time Badge */}
                                            <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${section.isHighlight ? 'bg-pink-200/40 text-wk-darkRed' : 'bg-pink-100/50 text-wk-darkRed'
                                                }`}>
                                                <Clock className="w-3.5 h-3.5 text-wk-darkRed" />
                                                <span>{ev.time}</span>
                                            </div>

                                            {/* Location */}
                                            <div className={`flex items-center text-sm font-medium gap-1 ${section.isHighlight ? 'text-wk-textgelap' : 'text-wk-textgelap'
                                                }`}>
                                                <MapPin className="w-3.5 h-3.5 text-wk-textgelap" />
                                                <span>{ev.location}</span>
                                            </div>
                                        </div>

                                        {/* Activity Title */}
                                        <h4 className={`text-lg sm:text-xl font-bold mb-1.5 ${section.isHighlight ? 'text-wk-orange' : 'text-wk-orange'
                                            }`}>
                                            {ev.activity}
                                        </h4>

                                        {/* Activity Description */}
                                        <p className={`text-sm sm:text-md leading-relaxed ${section.isHighlight ? 'text-slate-800' : 'text-slate-600'
                                            }`}>
                                            {ev.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Schedule;