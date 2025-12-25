import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Heart, BookOpen, Mic, Music, Ticket } from 'lucide-react';

const About = () => {
    const mainEvents = [
        {
            icon: Heart,
            title: 'Wonderkindness',
            description: 'Pra-event implementasi nyata, inisiatif, dan empati kemanusiaan untuk menjawab problematika masyarakat.'
        },
        {
            icon: Trophy,
            title: 'Wonder Competition',
            description: 'Kompetisi Eksternal Tingkat SD dilaksanakan khusus pada 13 Februari 2026.'
        },
        {
            icon: Users,
            title: 'Wonder Talk',
            description: 'Talkshow inspiratif bersama tokoh nasional. Tiket terbuka untuk masyarakat umum.'
        },
        {
            icon: BookOpen,
            title: "Wonder Qur'an",
            description: "Kajian Qur'an bersama penghafal Quran untuk menambah wawasan dan motivasi terhadap Al-Qur'an. Tiket penonton tersedia untuk umum."
        },
        // {
        //     icon: Mic,
        //     title: 'Wonder Preacher',
        //     description: "Lomba da'i cilik dan pidato inspiratif. Dibuka untuk penonton umum dengan tiket."
        // },
        {
            icon: Music,
            title: 'Wonder Concert',
            description: 'Konser Amal spektakuler yang akan dilaksanakan pada bulan Mei 2026.'
        }
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-wk-white to-wk-lightOrange/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center bg-wk-lightOrange/20 rounded-full px-4 py-1 mb-4">
                        <Ticket className="w-4 h-4 text-wk-red mr-2" />
                        <span className="text-wk-darkRed text-sm font-semibold">Tiket Umum Tersedia!</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-red mb-4">
                        Tentang Wonderkind Festival 2026
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
                        Wonderkind Festival merupakan acara tahunan Pesantren Terpadu Darul Qur’an Mulia. Wonderkind Festival di unit SMP pertama kali dilaksanakan tahun 2024.
                        Dengan semangat "Karsa Cendekia, Wujudkan Lokasamgraha", festival ini kembali hadir selama 3 hari pada 11-13 Februari 2026.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mainEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-wk-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-wk-orange/20 relative overflow-hidden"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-wk-red to-wk-orange rounded-xl flex items-center justify-center mb-4">
                                <event.icon className="w-7 h-7 text-wk-white" />
                            </div>
                            <h3 className="text-xl font-bold text-wk-darkRed mb-2">{event.title}</h3>
                            <p className="text-gray-600">{event.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;