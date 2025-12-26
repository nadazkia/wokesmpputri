import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
// import { useToast } from './ui/use-toast';

const Hero = () => {
    // const { toast } = useToast();

    const handleRegister = () => {
        const element = document.getElementById('categories');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleBuy = () => {
        const element = document.getElementById('merchandise');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <div className="absolute inset-0 bg-gradient-to-br from-wk-darkRed via-wk-red to-wk-orange">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-wk-gold rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-wk-lightOrange rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-wk-orange rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center mb-6"
                >
                    <div className="bg-wk-white/10 backdrop-blur-sm border border-wk-white/20 rounded-full px-6 py-2 flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-wk-gold" />
                        <span className="text-wk-white font-medium">11-13 Februari 2026 • SMPIT Darul Qur-an Mulia</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-wk-white mb-6 drop-shadow-lg"
                >
                    Wonderkind Festival
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8"
                >
                    <p className="text-xl md:text-3xl text-wk-lightOrange font-semibold italic tracking-wide">
                        "Karsa Cendekia, Wujudkan Lokasamgraha"
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-wk-white/90 mb-12 max-w-3xl mx-auto"
                >
                    Event akbar 3 hari (11-13 Feb)! Kompetisi tingkat SD dilaksanakan khusus 13 Februari. Hadir dengan lebih dari 20 lomba internal dan panggung inspirasi untuk umum.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        size="lg"
                        onClick={handleRegister}
                        className="bg-wk-gold hover:bg-wk-orange text-wk-darkRed hover:text-wk-white text-lg px-8 py-6 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                    >
                        Daftar Lomba
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        size="lg"
                        onClick={handleBuy}
                        variant="outline"
                        className="bg-transparent border-2 border-wk-white text-wk-white hover:bg-wk-white hover:text-wk-red text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300"
                    >
                        Beli Tiket Umum
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-20"
                >
                    <div className="flex flex-wrap justify-center gap-8 text-wk-white">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-wk-gold">1000+</p>
                            <p className="text-wk-lightOrange">Audiences</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-wk-gold">13 Feb</p>
                            <p className="text-wk-lightOrange">Lomba SD</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-wk-gold">60+</p>
                            <p className="text-wk-lightOrange">Sekolah Terdaftar</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-wk-gold">3 Hari</p>
                            <p className="text-wk-lightOrange">Full Event</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-wk-gold">Open</p>
                            <p className="text-wk-lightOrange">Tiket Umum</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-wk-white to-transparent"></div>
        </section>
    );
};

export default Hero;