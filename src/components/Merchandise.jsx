import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const Merchandise = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            id: 1,
            name: 'T-Shirt Wonderkind',
            price: 150000,
            image: 'Premium cotton t-shirt with Wonderkind Festival logo',
            description: 'T-shirt premium dengan desain eksklusif Wonderkind Festival, nyaman dipakai untuk berbagai aktivitas',
            variations: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Putih', 'Merah Maroon', 'Hitam']
        },
        {
            id: 2,
            name: 'Keychain Eksklusif',
            price: 25000,
            image: 'Metal keychain with Wonderkind Festival emblem',
            description: 'Gantungan kunci metal dengan logo Wonderkind Festival, cocok untuk koleksi atau hadiah',
            variations: ['Standard'],
            colors: ['Silver', 'Gold']
        },
        {
            id: 3,
            name: 'Kipas Wonderkind',
            price: 35000,
            image: 'Foldable hand fan with festival design',
            description: 'Kipas lipat dengan desain menarik dan praktis, sempurna untuk menemani hari-hari panas',
            variations: ['Standard'],
            colors: ['Merah', 'Putih', 'Kombinasi']
        },
        {
            id: 4,
            name: 'Totebag Premium',
            price: 75000,
            image: 'Canvas totebag with Wonderkind Festival print',
            description: 'Tas belanja kanvas berkualitas tinggi dengan sablon print yang tahan lama',
            variations: ['Standard'],
            colors: ['Natural', 'Terracotta']
        },
        {
            id: 5,
            name: 'Cermin Saku',
            price: 30000,
            image: 'Compact pocket mirror with festival branding',
            description: 'Cermin saku praktis dengan desain cantik, mudah dibawa kemana-mana',
            variations: ['Standard'],
            colors: ['Merah', 'Oranye', 'Putih']
        },
        {
            id: 6,
            name: 'Notebook A5',
            price: 45000,
            image: 'A5 notebook with Wonderkind Festival cover design',
            description: 'Buku catatan A5 dengan cover eksklusif dan kertas berkualitas',
            variations: ['Lined', 'Dotted', 'Blank'],
            colors: ['Merah', 'Putih', 'Emas']
        },
        {
            id: 7,
            name: 'Buttonpin Set',
            price: 20000,
            image: 'Set of collectible button pins with various designs',
            description: 'Set pin koleksi dengan berbagai desain menarik (isi 5 pcs)',
            variations: ['Set A', 'Set B', 'Set C'],
            colors: ['Mix']
        }
    ];

    return (
        <section id="merchandise" className="py-20 bg-gradient-to-b from-wk-white to-wk-lightOrange/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-wk-darkRed mb-4">
                        Merchandise Eksklusif
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Koleksi merchandise eksklusif Wonderkind Festival. Dapatkan sekarang dengan harga spesial!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            onSelect={setSelectedProduct}
                        />
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
};

export default Merchandise;