import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Heart } from 'lucide-react';

const Schedule = () => {
    const schedules = [
        {
            day: 'Pra-Event (Oktober-Desember 2025)',
            theme: 'Wonderkindness Week',
            isHighlight: true,
            events: [
                { time: 'Fleksibel', activity: 'Implementasi & Inisiatif Sosial', location: 'Gunung Sindur' },
                { time: 'Fleksibel', activity: 'Penyaluran Bantuan & Empati', location: 'Gunung Sindur' },
            ]
        },
        {
            day: 'Pra-Event (Sabtu, 3 Januari 2026)',
            theme: 'Wonderkindness Fun Run 5K',
            events: [
                { time: '06.00 - 07.00', activity: 'Start - Finish Fun Run 5K', location: 'TMII' },
                { time: '07.00 - 07.30', activity: 'Pembagian Medali dan Konsumsi', location: 'TMII' },
                { time: '08.40 - 10.00', activity: 'Hiburan dan Materi dari Guest Star', location: 'TMII' },
                { time: '10.30 - 12.10', activity: 'Screening Kesehatan Gratis', location: 'TMII' },
            ]
        },
        {
            day: 'Hari 1 - Rabu, 11 Februari 2026',
            theme: 'Opening & Internal Competitions',
            events: [
                { time: '07.00 - 08.30', activity: 'Grand Opening Wonderkind 2026', location: 'Main Stage' },
                { time: '10.00 - 15.00', activity: 'Internal Competitions', location: 'All Venues' },
            ]
        },
        {
            day: 'Hari 2 - Kamis, 12 Februari 2026',
            theme: 'Inspiration & Knowledge Day',
            events: [
                { time: '08.00 - 11.30', activity: 'Wonder Talk (Tiket Umum)', location: 'Main Stage' },
                { time: '13.00 - 15.30', activity: 'Wonder Preacher (Tiket Umum)', location: 'Main Stage' },
            ]
        },
        {
            day: 'Hari 3 - Jumat, 13 Februari 2026',
            theme: 'Wonder Competition (SD) & Celebration',
            events: [
                { time: '07.00 - 15.00', activity: 'Wonder Competition (Lomba SD Eksternal)', location: 'All Venues' },
                { time: '16.00 - 17.30', activity: 'Awarding Ceremony', location: 'Main Stage' },
                { time: '19.30 - 22.00', activity: 'Grand Closing Wonderkind 2026', location: 'Main Stage' }
            ]
        },
        {
            day: 'Mei 2026',
            theme: 'Konser Amal Palestina',
            events: [
                { time: '07.00 - 15.00', activity: 'Penggalangan hadiah untuk Palestina', location: 'On Progress' },
            ]
        }
    ];

    return (
        <section id="schedule" className="py-20 bg-wk-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        Festival utama dilaksanakan 3 hari pada 11-13 Februari 2026. Lomba eksternal untuk SD dipusatkan pada hari terakhir, Jumat 13 Februari.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {schedules.map((schedule, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center mb-6">
                                <h3 className="text-2xl font-bold text-wk-red flex items-center mr-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${schedule.isHighlight ? 'from-wk-gold to-wk-orange' : 'from-wk-red to-wk-darkRed'} rounded-xl flex items-center justify-center mr-4 shadow-md`}>
                                        {schedule.isHighlight ? <Heart className="text-wk-white" /> : <span className="text-wk-white font-bold text-xl">{index}</span>}
                                    </div>
                                    {schedule.day}
                                </h3>
                                <span className="hidden md:inline-block h-1 w-12 bg-wk-orange/30 mr-4"></span>
                                <span className="text-wk-orange font-semibold italic">{schedule.theme}</span>
                            </div>

                            <div className="space-y-4 ml-0 md:ml-16">
                                {schedule.events.map((event, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-gradient-to-r from-wk-lightOrange/10 to-wk-white rounded-xl p-6 border border-wk-orange/20 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex items-start md:items-center gap-4 flex-1">
                                                <div className="flex items-center text-wk-darkRed font-semibold min-w-[120px]">
                                                    <Clock className="w-5 h-5 mr-2" />
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center text-gray-700 font-medium flex-1">
                                                    <Users className="w-5 h-5 mr-2 text-wk-orange" />
                                                    {event.activity}
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray-600 md:ml-4">
                                                <MapPin className="w-5 h-5 mr-2 text-wk-orange" />
                                                {event.location}
                                            </div>
                                        </div>
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