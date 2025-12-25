import React from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-wk-darkRed to-wk-red text-wk-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-wk-white rounded-lg flex items-center justify-center">
                                <span className="text-wk-red font-bold text-xl">W</span>
                            </div>
                            <span className="text-xl font-bold">Wonderkind Festival</span>
                        </div>
                        <p className="text-wk-lightOrange text-sm mb-2">
                            Karsa Cendekia, Wujudkan Lokasamgraha
                        </p>
                        <p className="text-wk-white/80 text-sm">
                            Event kompetisi terbesar untuk SD dan masyarakat umum.
                        </p>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block text-wk-gold">Navigasi</span>
                        <nav className="space-y-2">
                            <a href="#hero" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Beranda</a>
                            <a href="#about" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Tentang Event</a>
                            <a href="#categories" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Lomba SD</a>
                            <a href="#schedule" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Jadwal</a>
                            <a href="#merchandise" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Tiket & Merch</a>
                        </nav>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block text-wk-gold">Kontak & Lokasi</span>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <span className="text-wk-white/80 text-sm">SMPIT Darul Qur-an Mulia, Gunung Sindur, Bogor</span>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <span className="text-wk-white/80 text-sm">wokesmpputri@dqm.sch.id</span>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <a href="http://wa.me/62895622984364" target="_blank" rel="noopener noreferrer" className=' block text-wk-white/80 hover:text-wk-gold transition-colors'>
                                    <span className="text-sm">0895-6229-84364</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block text-wk-gold">Media Sosial</span>
                        <div className="flex gap-3">
                            <a
                                href="https://instagram.com/wokefest.smpputri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-wk-white/10 rounded-lg flex items-center justify-center hover:bg-wk-gold hover:text-wk-darkRed transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-wk-white/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-wk-white/60 text-sm">
                            © {currentYear} Wonderkind Festival. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-wk-white/60 hover:text-wk-gold transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="text-wk-white/60 hover:text-wk-gold transition-colors">Syarat & Ketentuan</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;