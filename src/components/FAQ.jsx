import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Kapan timeline acara Wonderkind Festival 2026?',
            answer: 'Festival utama dilaksanakan 3 hari pada 11-13 Februari 2026. Namun, Wonder Competition (Lomba SD) dilaksanakan khusus pada hari Jumat, 13 Februari 2026.'
        },
        {
            question: 'Siapa saja yang boleh mengikuti lomba?',
            answer: 'Lomba Eksternal (Angklung, Mini Soccer, Paint Rumble, Cultural Flow) dikhususkan untuk siswa Sekolah Dasar (SD) dan dilaksanakan pada 13 Februari.'
        },
        {
            question: 'Apakah masyarakat umum bisa menonton acara?',
            answer: 'Ya! Kami membuka penjualan tiket untuk masyarakat umum yang ingin menyaksikan Wonder Talk (12 Feb), Wonder Qur\'an (11 Feb), dan Wonder Concert (13 Feb).'
        },
        {
            question: 'Apa itu Wonderkindness?',
            answer: 'Wonderkindness adalah pra-event (5-10 Feb) dengan konsep berbagi kepada masyarakat. Ini adalah wujud inisiatif dan empati kemanusiaan peserta.'
        },
        {
            question: 'Dimana lokasi Wonderkind Festival?',
            answer: 'Seluruh rangkaian acara dilaksanakan di SMPIT Darul Qur\'an Mulia, Gunung Sindur, Bogor.'
        },
        {
            question: 'Bagaimana cara mendaftar lomba untuk sekolah?',
            answer: 'Pendaftaran dapat dilakukan dengan mengisi formulir online di website ini. Pastikan melampirkan surat keterangan dari sekolah asal.'
        }
    ];

    return (
        <section id="faq" className="py-20 bg-wk-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-darkRed mb-4">
                        Pertanyaan Umum
                    </h2>
                    <p className="text-lg text-gray-600">
                        Seputar Pelaksanaan 11-13 Februari 2026
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-wk-white rounded-xl border border-wk-orange/20 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-wk-lightOrange/10 transition-colors"
                            >
                                <span className="font-semibold text-wk-darkRed pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-wk-orange flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-5 text-gray-600 border-t border-wk-orange/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;