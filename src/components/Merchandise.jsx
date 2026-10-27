import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { getActiveProducts, DEFAULT_PRODUCTS } from '../services/productService';

const Merchandise = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            const { data } = await getActiveProducts();
            if (isMounted && data && data.length > 0) {
                setProducts(data);
            }
        };
        fetchProducts();
        return () => { isMounted = false; };
    }, []);

    return (
        <section id="merchandise" className="py-20 bg-gradient-to-b from-wk-white via-wk-lightOrange/20 to-wk-white">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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