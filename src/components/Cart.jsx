import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from './ui/use-toast';

const Cart = () => {
    const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const { toast } = useToast();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [buyerName, setBuyerName] = useState('');
    const [buyerWhatsapp, setBuyerWhatsapp] = useState('');

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast({
                title: "Keranjang Kosong",
                description: "Tambahkan produk terlebih dahulu",
                variant: "destructive"
            });
            return;
        }

        if (!buyerName.trim()) {
            toast({
                title: "Nama belum diisi",
                description: "Silakan masukkan nama pembeli terlebih dahulu",
                variant: "destructive",
            });
            return;
        }

        const orderId = "WK-" + Date.now();

        const res = await fetch("/api/create-transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderId,
                amount: totalPrice,
                customer: {
                    name: buyerName,
                    whatsapp: buyerWhatsapp,
                    items: cartItems.map(item => ({
                        id: item.id,
                        name: `${item.name} (${item.selectedSize}, ${item.selectedVariation})`,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                },
            }),
        });

        const data = await res.json();

        window.snap.pay(data.token, {
            onSuccess: () => redirectToWhatsapp("LUNAS"),
            onPending: () => redirectToWhatsapp("MENUNGGU PEMBAYARAN"),
        });
        const redirectToWhatsapp = (paymentStatus) => {
            const message = `*[PESAN MERCH - ${buyerName}]*\n\nAssalamu'alaikum, saya ingin memesan Merchandise Wonderkind Festival:\n\n${cartItems
                .map(
                    (item) =>
                        `${item.quantity}x ${item.name} (${item.selectedSize}, ${item.selectedVariation}) - Rp ${(
                            item.price * item.quantity
                        ).toLocaleString('id-ID')}`
                )
                .join('\n')}\n\n*Total: Rp ${totalPrice.toLocaleString('id-ID')}*\nStatus Pembayaran: ${paymentStatus}\n\nTerima kasih!`;
            const whatsappUrl = `https://wa.me/6285179988420?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
        toast({
            title: "Mengarahkan ke WhatsApp",
            description: "Selesaikan pemesanan Anda melalui WhatsApp",
        });
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={toggleCart}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-wk-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-wk-darkRed to-wk-red text-wk-white">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6" />
                                <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={toggleCart} className="text-wk-white hover:bg-white/20">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg">Keranjang belanja Anda kosong</p>
                                    <p className="text-gray-400 text-sm mt-2">Tambahkan produk untuk melanjutkan</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={`${item.id}-${item.selectedSize}-${item.selectedVariation}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                                        >
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 bg-gradient-to-br from-wk-lightOrange to-wk-orange/30 rounded-lg flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            '/img/merch/' +
                                                            (item.selectedImage || item.imgName)
                                                        }
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {item.selectedSize} • {item.selectedVariation}
                                                    </p>
                                                    <p className="text-lg font-bold text-wk-red mt-1">
                                                        Rp {item.price.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 border-wk-orange text-wk-orange hover:bg-wk-orange hover:text-wk-white"
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedVariation, Math.max(1, item.quantity - 1))}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 border-wk-orange text-wk-orange hover:bg-wk-orange hover:text-wk-white"
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedVariation, item.quantity + 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedVariation)}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border-t p-6 bg-gray-50">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Pembeli
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama Anda"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wk-red"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    No. Whatsapp Pembeli
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nomor whatsapp Anda"
                                    value={buyerWhatsapp}
                                    onChange={(e) => setBuyerWhatsapp(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wk-red"
                                />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-semibold text-gray-700">Total:</span>
                                <span className="text-2xl font-bold text-wk-red">
                                    Rp {totalPrice.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-wk-red hover:bg-wk-darkRed text-wk-white py-6 rounded-xl text-lg font-semibold shadow-lg"
                                disabled={cartItems.length === 0}
                            >
                                Checkout via WhatsApp
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;