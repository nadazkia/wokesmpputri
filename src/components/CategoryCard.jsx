import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
// import { useToast } from './ui/use-toast';

const CategoryCard = ({ category, index }) => {
    // const { toast } = useToast();

    const handleRegister = () => {
        // const element = document.getElementById('register-form');
        // element?.scrollIntoView({ behavior: 'smooth' });

        const url = category.formUrl;
        // + encodeURIComponent(category.name);
        window.open(url, '_blank');
        url?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleBook = () => {
        const url = category.bookUrl;
        window.open(url, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-wk-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-wk-lightOrange/30"
        >
            <div className={`h-3 bg-gradient-to-r ${category.color}`}></div>
            <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                    <category.icon className="w-8 h-8 text-wk-white" />
                </div>
                <h3 className="text-2xl font-bold text-wk-darkRed mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="font-semibold text-wk-orange">Peserta:</span>
                    <span className="ml-2">{category.participants}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-6 gap-4">
                    <Button
                        onClick={handleBook}
                        className="w-full bg-wk-red hover:bg-wk-darkRed text-wk-white rounded-xl group"
                    >
                        Rulebook
                        <Newspaper className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button
                        onClick={handleRegister}
                        className="w-full bg-wk-red hover:bg-wk-darkRed text-wk-white rounded-xl group"
                    >
                        Daftar
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;