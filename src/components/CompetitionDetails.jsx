import { motion } from 'framer-motion';
import { Award, FileText, MapPin, Ticket } from 'lucide-react';

const CompetitionDetails = () => {
    const details = [
        {
            icon: MapPin,
            title: 'Lokasi & Waktu',
            items: [
                'Lokasi: SMPIT Darul Qur-an Mulia',
                'Timeline Utama: 11-13 Februari 2026',
                'Lomba Eksternal (SD): 13 Februari 2026',
                'Pra-Event: Oktober-Desember 2025',
                'Technical Meeting: 5 Februari 2026'
            ]
        },
        {
            icon: FileText,
            title: 'Syarat Peserta',
            items: [
                'Siswa/i Sekolah Dasar (SD/MI)',
                'Membawa Surat Ket. Sekolah',
                'Sehat jasmani dan rohani',
                'Mengisi formulir pendaftaran',
                'Membayar biaya registrasi lomba'
            ]
        },
        {
            icon: Ticket,
            title: 'Tiket Umum',
            items: [
                'Tersedia untuk Masyarakat Umum',
                'Akses ke Wonder Talk (12 Feb)',
                'Akses ke Wonder Qur\'an (11 Feb)',
                'Pembelian via Website'
            ]
        },
        {
            icon: Award,
            title: 'Hadiah & Apresiasi',
            items: [
                'Total Hadiah 20+ Juta Rupiah',
                'Trophy Juara 1, 2, 3',
                'Sertifikat Peserta',
                'Merchandise Eksklusif'
            ]
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-wk-lightOrange/20 to-wk-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-red mb-4">
                        Detail & Informasi Tiket
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Informasi lengkap mengenai pelaksanaan Wonder Competition (Khusus SD) pada 13 Februari dan rangkaian event lainnya.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {details.map((detail, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-wk-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-wk-orange/20"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-wk-gold to-wk-orange rounded-xl flex items-center justify-center mr-4">
                                    <detail.icon className="w-6 h-6 text-wk-darkRed" />
                                </div>
                                <h3 className="text-2xl font-bold text-wk-darkRed">{detail.title}</h3>
                            </div>
                            <ul className="space-y-3">
                                {detail.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="w-2 h-2 bg-wk-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompetitionDetails;