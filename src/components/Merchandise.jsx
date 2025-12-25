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
            price: 130000,
            image: 'Premium cotton t-shirt 24s with Wonderkind Festival logo',
            description: 'T-shirt premium dengan desain eksklusif Wonderkind Festival, nyaman dipakai untuk berbagai aktivitas',
            sizes: ['M', 'L', 'XL', 'XXL'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'T-Shirt-D1.png',
                D2: 'T-Shirt-D2.png',
                D3: 'T-Shirt-D3.png',
                D4: 'T-Shirt-D4.png',
            },
            imgName: 'T-Shirt.png'
        },
        {
            id: 2,
            name: 'Keychain Eksklusif',
            price: 12000,
            image: 'Metal keychain with Wonderkind Festival emblem',
            description: 'Gantungan kunci metal dengan logo Wonderkind Festival, cocok untuk koleksi atau hadiah',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Keychain-D1.png',
                D2: 'Keychain-D2.png',
                D3: 'Keychain-D3.png',
                D4: 'Keychain-D4.png',
            },
            imgName: 'Keychain.png'
        },
        {
            id: 3,
            name: 'Kipas Wonderkind',
            price: 15000,
            image: 'Eksklusif hand fan with festival design',
            description: 'Kipas dengan desain menarik dan praktis, sempurna untuk menemani hari-hari panas',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Kipas-D1.png',
                D2: 'Kipas-D2.png',
                D3: 'Kipas-D3.png',
                D4: 'Kipas-D4.png',
            },
            imgName: 'Kipas.png'
        },
        {
            id: 4,
            name: 'Totebag Premium',
            image: 'Canvas totebag with Wonderkind Festival print',
            description: 'Tas belanja kanvas berkualitas tinggi dengan sablon print yang tahan lama',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Totebag-D1.png',
                D2: 'Totebag-D2.png',
                D3: 'Totebag-D3.png',
                D4: 'Totebag-D4.png',
            },
            variationPrices: {
                D1: 55000,      // variasi pertama totebag love
                D2: 45000,
                D3: 45000,
                D4: 45000
            },
            imgName: 'Totebag.png'
        },
        {
            id: 5,
            name: 'Sticker Vinyl',
            price: 8000,
            image: 'Sticker with Wonderkind Festival cover design',
            description: 'Sticker dengan design eksklusif dan kertas berkualitas',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Sticker-D1.png',
                D2: 'Sticker-D2.png',
                D3: 'Sticker-D3.png',
                D4: 'Sticker-D4.png',
            },
            imgName: 'Sticker.png'
        },
        {
            id: 6,
            name: 'Cermin Saku',
            price: 12000,
            image: 'Compact pocket mirror with festival branding',
            description: 'Cermin saku praktis dengan desain cantik, mudah dibawa kemana-mana',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Cermin-D1.png',
                D2: 'Cermin-D2.png',
                D3: 'Cermin-D3.png',
                D4: 'Cermin-D4.png',
            },
            imgName: 'Cermin.png'
        },
        {
            id: 7,
            name: 'Notebook A5',
            price: 35000,
            image: 'A5 notebook with Wonderkind Festival cover design',
            description: 'Buku catatan A5 dengan cover eksklusif dan kertas berkualitas',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Notebook-D1.png',
                D2: 'Notebook-D2.png',
                D3: 'Notebook-D3.png',
                D4: 'Notebook-D4.png',
            },
            imgName: 'Notebook.png'
        },
        {
            id: 8,
            name: 'Buttonpin Set',
            price: 12000,
            image: 'Set of collectible button pins with various designs',
            description: 'Set pin koleksi dengan berbagai desain menarik',
            sizes: ['Standard'],
            variations: ['D1', 'D2', 'D3', 'D4'],
            variationImages: {
                D1: 'Buttonpin-D1.png',
                D2: 'Buttonpin-D2.png',
                D3: 'Buttonpin-D3.png',
                D4: 'Buttonpin-D4.png',
            },
            imgName: 'Buttonpin.png'
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