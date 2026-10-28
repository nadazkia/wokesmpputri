import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-wk-darkRed to-wk-red text-wk-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-wk-white rounded-full flex items-center justify-center">
                                <img alt="Profile" className="object-cover mix-blend-multiply" src={process.env.PUBLIC_URL + '/img/WOKE.png'} />
                            </div>
                            <span className="text-xl font-bold">{SITE_CONFIG.festivalName}</span>
                        </div>
                        <p className="text-wk-lightOrange text-sm mb-2">
                            {SITE_CONFIG.tagline}
                        </p>
                        <p className="text-wk-white/80 text-sm">
                            Event kompetisi terbesar untuk SD, SMP, dan masyarakat umum.
                        </p>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block text-wk-gold">Navigasi</span>
                        <nav className="space-y-2">
                            <a href="#hero" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Beranda</a>
                            <a href="#about" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Tentang Event</a>
                            <a href="#categories" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Lomba SD & SMP</a>
                            <a href="#schedule" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Jadwal</a>
                            {/* <a href="#merchandise" className="block text-wk-white/80 hover:text-wk-gold transition-colors">Tiket & Merch</a> */}
                        </nav>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block text-wk-gold">Kontak & Lokasi</span>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <a href={SITE_CONFIG.socialMedia.maps} target="_blank" rel="noopener noreferrer" className='block text-wk-white/80 hover:text-wk-gold transition-colors'>
                                    <span className="text-sm">{SITE_CONFIG.schoolName}, {SITE_CONFIG.location}</span>
                                </a>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <a href={`mailto:${SITE_CONFIG.officialEmail}`} className="text-wk-white/80 text-sm hover:text-wk-gold transition-colors">
                                    {SITE_CONFIG.officialEmail}
                                </a>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <a href={`https://wa.me/${SITE_CONFIG.cphumas1}`} target="_blank" rel="noopener noreferrer" className='block text-wk-white/80 hover:text-wk-gold transition-colors'>
                                    <span className="text-sm">+{SITE_CONFIG.cphumas1} ({SITE_CONFIG.namacphumas1})</span>
                                </a>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-wk-gold" />
                                <a href={`https://wa.me/${SITE_CONFIG.cphumas2}`} target="_blank" rel="noopener noreferrer" className='block text-wk-white/80 hover:text-wk-gold transition-colors'>
                                    <span className="text-sm">+{SITE_CONFIG.cphumas2} ({SITE_CONFIG.namacphumas2})</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block text-wk-gold">Media Sosial</span>
                        <div className="flex gap-3">
                            <a
                                href={SITE_CONFIG.socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-wk-white/10 rounded-lg flex items-center justify-center hover:bg-wk-gold hover:text-wk-darkRed transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-wk-white/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-wk-white/60 text-sm">
                            © {currentYear} {SITE_CONFIG.festivalName}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-wk-white/60">
                            <span>SMPIT Darul Qur-an Mulia</span>
                            <span>Cakrawala</span>
                            <a href="#admin" className="hover:text-wk-gold transition-colors font-medium">
                                Portal Panitia
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
