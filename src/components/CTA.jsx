import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Mail } from 'lucide-react';

const CTA = () => {
    const handleRegister = () => {
        const element = document.getElementById('categories');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="register-form" className="py-20 bg-gradient-to-br from-wk-darkRed via-wk-red to-wk-orange relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-wk-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-wk-gold rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-white mb-6">
                        Siap Bergabung dengan Wonderkind Festival?
                    </h2>
                    <p className="text-xl text-wk-lightOrange mb-10 max-w-2xl mx-auto">
                        Daftarkan diri Anda sekarang dan raih kesempatan untuk menjadi bagian dari kompetisi terbesar tahun ini!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={handleRegister}
                            className="bg-wk-gold hover:bg-wk-lightOrange text-wk-darkRed text-lg px-8 py-6 rounded-full font-bold shadow-2xl group transition-all"
                        >
                            Daftar Sekarang
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-2 border-wk-white text-wk-white hover:bg-wk-white hover:text-wk-darkRed text-lg px-8 py-6 rounded-full font-semibold transition-all"
                            onClick={() => window.open('mailto:info@wonderkindfestival.com', '_blank')}
                        >
                            <Mail className="mr-2 w-5 h-5" />
                            Hubungi Kami
                        </Button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-wk-white/20">
                        <p className="text-wk-lightOrange mb-4">Ikuti kami di media sosial untuk update terbaru!</p>
                        <div className="flex justify-center gap-4">
                            <Button
                                key="Instagram"
                                variant="ghost"
                                className="text-wk-white hover:bg-wk-white/10 rounded-full hover:text-wk-gold"
                                onClick={() => window.open(`https://instagram.com/wokefest.smpputri`, '_blank')}
                            >
                                Instagram
                            </Button>
                            <Button
                                key="Tiktok"
                                variant="ghost"
                                className="text-wk-white hover:bg-wk-white/10 rounded-full hover:text-wk-gold"
                                onClick={() => window.open(`https://www.tiktok.com/@wokefest.smputri`, '_blank')}
                            >
                                Tiktok
                            </Button>

                            {/* {['Instagram', 'Tiktok', 'YouTube'].map((social) => (
                                <Button
                                    key={social}
                                    variant="ghost"
                                    className="text-wk-white hover:bg-wk-white/10 rounded-full hover:text-wk-gold"
                                    onClick={() => window.open(`https://${social.toLowerCase()}.com/wonderkindfestival`, '_blank')}
                                >
                                    {social}
                                </Button>
                            ))} */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;