import React from "react";
import { motion } from "framer-motion";
import { Button } from './ui/button';

const sponsors = [
    { name: "Sponsor Platinum", logo: "/img/sponsor/platinum1.png", tier: "platinum" },
    { name: "Sponsor Gold 1", logo: "/img/sponsor/gold1.png", tier: "gold" },
    { name: "Sponsor Gold 2", logo: "/img/sponsor/gold2.png", tier: "media" },
    { name: "Sponsor Silver 1", logo: "/img/sponsor/silver1.png", tier: "silver" },
    { name: "Sponsor Silver 2", logo: "/img/sponsor/silver2.png", tier: "gold" },
];

const mediaPartners = [
    { name: "Media Partner 1", logo: "/img/sponsor/media1.png" },
    { name: "Media Partner 2", logo: "/img/sponsor/media2.png" },
];


const sponsorSize = {
    platinum: "w-72 h-36",
    gold: "w-56 h-28",
    silver: "w-44 h-24",
    media: "w-40 h-20",
};

const SectionTitle = ({ title, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
    >
        <h2 className="text-4xl md:text-5xl font-bold text-wk-darkRed mb-4">
            {title}
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
    </motion.div>
);


const SponsorSection = () => {
    return (
        <section
            id="sponsor"
            className="py-24 bg-gradient-to-b from-wk-white via-wk-lightOrange/20 to-wk-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionTitle
                    title="Sponsor & Media Partner"
                    subtitle="Terima kasih kepada sponsor dan media partner yang telah mendukung terselenggaranya Wonderkind Festival."
                />

                {/* ================= SPONSOR CONTAINER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h3 className="text-center text-2xl font-bold text-wk-red mb-10">
                        Sponsor
                    </h3>

                    <div className="flex flex-wrap justify-center gap-10">
                        {sponsors.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.06 }}
                                className={`bg-wk-white rounded-2xl shadow-lg border border-wk-lightOrange/40
                  flex items-center justify-center p-6 ${sponsorSize[item.tier]}`}
                            >
                                <img
                                    src={process.env.PUBLIC_URL + item.logo}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ================= MEDIA PARTNER CONTAINER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-28"
                >
                    <h3 className="text-center text-xl font-semibold text-gray-700 mb-8">
                        Media Partner
                    </h3>

                    <div className="flex flex-wrap justify-center gap-8">
                        {mediaPartners.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-wk-white rounded-xl shadow-md border border-wk-lightOrange/30 flex items-center justify-center p-5 w-40 h-20"
                            >
                                <img
                                    src={process.env.PUBLIC_URL + item.logo}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ================= CTA ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-wk-darkRed to-wk-red rounded-3xl p-10 text-center text-wk-white shadow-2xl"
                >
                    <h3 className="text-3xl font-bold mb-4">
                        Tertarik Menjadi Sponsor Wonderkind Festival?
                    </h3>
                    <p className="max-w-2xl mx-auto mb-8 text-wk-lightOrange">
                        Dapatkan exposure brand ke ratusan peserta, orang tua, dan institusi
                        pendidikan melalui berbagai paket sponsorship.
                    </p>
                    <Button
                        asChild
                        className="bg-wk-gold text-wk-darkRed hover:bg-wk-lightOrange font-bold px-10 py-6 rounded-xl text-lg"
                    >
                        <a
                            href="https://wa.me/6281297727368?text=Saya%20tertarik%20untuk%20menjadi%20sponsor%20Wonderkind%20Festival"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ajukan Sponsorship
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default SponsorSection;
