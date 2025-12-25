import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from './ui/use-toast';

const ProductCard = ({ product, index, onSelect }) => {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({
            ...product,
            selectedVariation: product.variations[0],
            selectedColor: product.colors[0]
        });
        toast({
            title: "Berhasil ditambahkan!",
            description: `${product.name} telah ditambahkan ke keranjang`,
        });
    };

    const getDisplayPrice = (product) => {
        if (product.variationPrices) {
            return Math.min(...Object.values(product.variationPrices));
        }
        return product.price;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-wk-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-wk-lightOrange/30 cursor-pointer"
            onClick={() => onSelect(product)}
        >
            <div className="relative h-64 bg-gradient-to-br from-wk-lightOrange to-wk-orange/30 flex items-center justify-center p-6 overflow-hidden">
                <img alt={product.name} className="w-full h-full rounded-lg mix-blend-multiply" src={process.env.PUBLIC_URL + '/img/merch/' + product.imgName} />
                <div className="absolute top-4 right-4">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg bg-wk-white hover:bg-wk-gold text-wk-darkRed"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(product);
                        }}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-wk-darkRed mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-wk-red">
                        Rp {getDisplayPrice(product).toLocaleString('id-ID')}
                    </span>
                    <Button
                        onClick={() => onSelect(product)}
                        className="bg-wk-red hover:bg-wk-darkRed rounded-xl"
                        size="sm"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buka
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;