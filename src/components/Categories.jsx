import { motion } from 'framer-motion';
import { Music, Dribbble, Palette, Sparkles, School } from 'lucide-react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const categories = [
        {
            id: 'angklung',
            name: 'Angklung',
            icon: Music,
            description: 'Kompetisi musik tradisional angklung tingkat SD dengan harmonisasi yang memukau',
            participants: 'Tim Sekolah Dasar',
            color: 'from-wk-red to-wk-darkRed',
            bookUrl: 'https://drive.google.com/drive/folders/1F3WJABZOHQIUVnYdivgcXyoiASPHfCuC',
            formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScqt0Ltag8U161Xs9TEWN7GCpXftpSkC2GdWbK7NKYsSKyhUw/viewform?usp=pp_url&entry.580535696='
        },
        {
            id: 'mini-soccer',
            name: 'Mini Soccer',
            icon: Dribbble,
            description: 'Turnamen sepak bola mini untuk siswa SD dengan semangat sportivitas tinggi',
            participants: 'Tim Sekolah Dasar',
            color: 'from-wk-orange to-wk-red',
            bookUrl: 'https://drive.google.com/drive/folders/1F3WJABZOHQIUVnYdivgcXyoiASPHfCuC',
            formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScqt0Ltag8U161Xs9TEWN7GCpXftpSkC2GdWbK7NKYsSKyhUw/viewform?usp=pp_url&entry.580535696='
        },
        {
            id: 'paint-rumble',
            name: 'Paint Rumble',
            icon: Palette,
            description: 'Lomba melukis tingkat SD dengan tema "Karsa Cendekia"',
            participants: 'Individu SD',
            color: 'from-wk-gold to-wk-orange',
            bookUrl: '',
            formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfp5f-aw0geix1sE46Q_i7OAyW6H1D0RyK4VzwE_k6mqpY9RA/viewform?usp=header'
        },
        {
            id: 'cultural-flow',
            name: 'Cultural Flow',
            icon: Sparkles,
            description: 'Kompetisi tari kreasi daerah untuk siswa SD, melestarikan budaya bangsa',
            participants: 'Tim Sekolah Dasar',
            color: 'from-wk-darkRed to-purple-900',
            bookUrl: '',
            formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScl_7gtMVDAYYt-klHJe6kn_7YDr_TAdGPKxkSto2bnV6ynsQ/viewform?usp=publish-editor'
        }
    ];

    return (
        <section id="categories" className="py-20 bg-wk-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center bg-wk-gold/20 rounded-full px-4 py-1 mb-4">
                        <School className="w-4 h-4 text-wk-darkRed mr-2" />
                        <span className="text-wk-darkRed text-sm font-semibold">Khusus Tingkat Sekolah Dasar (SD)</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-darkRed mb-4">
                        Kategori Lomba Eksternal
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Berikut adalah 4 kategori lomba utama yang dibuka untuk sekolah eksternal.
                        Selain ini, terdapat 20+ lomba internal yang memeriahkan Wonderkind Festival.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;