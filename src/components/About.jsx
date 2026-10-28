import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Heart, Music, Ticket } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';


const About = () => {
    const mainEvents = [
        {
            icon: Trophy,
            title: 'Wonder Competition',
            description: `Lomba tingkat SD/MI dan SMP/MTs yang diadakan untuk mengasah kreativitas, kemampuan berpikir kritis, dan keterampilan peserta dalam berbagai bidang. Lomba ini akan dilaksanakan pada ${SITE_CONFIG.dates}.`
        },
        {
            icon: Heart,
            title: 'Wonderkindness',
            description: 'Pra-event berupa implementasi nyata, inisiatif, dan empati kemanusiaan untuk menjawab problematika masyarakat yang berfokus pada aksi sosial, kegiatan ini juga menumbuhkan rasa kepedulian yang tinggi dan menyalurkan kebaikan yang bertujuan untuk memberikan manfaat bagi masyarakat sekitar'
        },
        {
            icon: Users,
            title: 'Wonder Talk',
            description: 'Sesi diskusi dan berbagi pengalaman dengan narasumber inspiratif yang akan membahas topik-topik menarik seputar pendidikan, kreativitas, dan pengembangan diri.'
        },
        {
            icon: Music,
            title: 'Wonder Concert',
            description: 'Konser Amal berbasis musik dan kreativitas yang menggalang solidaritas generasi muda untuk Palestina yang akan dilaksanakan pada 23 Januari 2027.'
        }
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-wk-white via-wk-lightOrange/20 to-transparent">
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
                        Tentang {SITE_CONFIG.festivalName} {SITE_CONFIG.edition}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
                        Wonderkind Festival merupakan acara tahunan Pesantren Terpadu Darul Qur’an Mulia. Wonderkind Festival di unit SMP pertama kali dilaksanakan tahun 2024.
                        Dengan semangat "{SITE_CONFIG.tagline}", festival ini kembali hadir selama 4 hari pada {SITE_CONFIG.dates}.
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
                            <div className="w-14 h-14 bg-gradient-to-br from-wk-gold to-wk-orange rounded-xl flex items-center justify-center mb-4">
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