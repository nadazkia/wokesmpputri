import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from './ui/use-toast';

const ProductModal = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [displayImage, setDisplayImage] = useState(product.imgName);

    const getPriceByVariation = (variation) => {
        return product.variationPrices?.[variation] || product.price;
    };
    const [currentPrice, setCurrentPrice] = useState(
        getPriceByVariation(product.variations[0])
    );

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedVariation,
            selectedSize,
            quantity,
            selectedImage: displayImage,
            price: currentPrice,
        });
        toast({
            title: "Berhasil ditambahkan!",
            description: `${quantity}x ${product.name} telah ditambahkan ke keranjang`,
        });
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-wk-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-wk-gold"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-10 rounded-full hover:bg-wk-red hover:text-wk-white"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </Button>

                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        <div className="bg-gradient-to-br from-wk-lightOrange to-wk-orange/30 rounded-2xl p-8 flex items-center justify-center">
                            {/* <img alt={product.name} className="w-full h-full object-cover rounded-xl mix-blend-multiply" src={process.env.PUBLIC_URL + '/img/merch/' + product.imgName} /> */}
                            <img
                                alt={product.name}
                                className="w-full h-full object-contain rounded-xl"
                                src={process.env.PUBLIC_URL + '/img/merch/' + displayImage}
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-wk-darkRed mb-2">{product.name}</h2>
                                <p className="text-gray-600">{product.description}</p>
                            </div>

                            <div className="text-3xl font-bold text-wk-red">
                                Rp {currentPrice.toLocaleString('id-ID')}
                            </div>

                            {product.sizes.length > 1 && (
                                <div>
                                    <p className="font-semibold text-gray-700 mb-3">Pilih Ukuran:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
                                                className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedSize === size
                                                    ? 'border-wk-red bg-wk-red text-wk-white'
                                                    : 'border-gray-300 hover:border-wk-red hover:text-wk-red'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="font-semibold text-gray-700 mb-3">Pilih Design:</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.variations.map((variation) => (
                                        <button
                                            key={variation}
                                            onClick={() => {
                                                setSelectedVariation(variation);
                                                if (product.variationImages?.[variation]) {
                                                    setDisplayImage(product.variationImages[variation]);
                                                }
                                                setCurrentPrice(getPriceByVariation(variation));
                                            }}
                                            className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedVariation === variation
                                                ? 'border-wk-red bg-wk-red text-wk-white'
                                                : 'border-gray-300 hover:border-wk-red hover:text-wk-red'
                                                }`}
                                        >
                                            {variation}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-700 mb-3">Jumlah:</p>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-wk-orange text-wk-orange hover:bg-wk-orange hover:text-wk-white"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="text-2xl font-bold w-12 text-center text-wk-darkRed">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-wk-orange text-wk-orange hover:bg-wk-orange hover:text-wk-white"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-wk-orange/20">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-600">Total:</span>
                                    <span className="text-2xl font-bold text-wk-red">
                                        Rp {(currentPrice * quantity).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full bg-wk-red hover:bg-wk-darkRed text-wk-white py-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Tambah ke Keranjang
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductModal;