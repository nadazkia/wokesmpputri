import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle, Copy, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from './ui/use-toast';
import { createOrder } from '../services/orderService';
import { SITE_CONFIG } from '../config/siteConfig';

const Cart = () => {
    const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const { toast } = useToast();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [buyerName, setBuyerName] = useState('');
    const [buyerWhatsapp, setBuyerWhatsapp] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('DQ2 Putri');
    const [buyerAsrama, setBuyerAsrama] = useState('');
    const [buyerKelas, setBuyerKelas] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast({
                title: "Keranjang Kosong",
                description: "Tambahkan produk terlebih dahulu",
                variant: "destructive"
            });
            return;
        }

        if (!buyerName.trim() || !buyerWhatsapp.trim() || !buyerAsrama.trim() || !buyerKelas.trim()) {
            toast({
                title: "Data belum lengkap",
                description: "Silakan masukkan semua data pembeli (Nama, No. WhatsApp, Asrama, dan Kelas)",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createOrder({
                buyer: {
                    name: buyerName,
                    whatsapp: buyerWhatsapp,
                    unit: selectedUnit,
                    asrama: buyerAsrama,
                    kelas: buyerKelas
                },
                cartItems,
                totalPrice
            });

            if (result.success) {
                setCompletedOrder({
                    orderCode: result.orderCode,
                    whatsappUrl: result.whatsappUrl,
                    totalPrice
                });

                // Buka WhatsApp di tab baru
                window.open(result.whatsappUrl, '_blank');

                toast({
                    title: "Pesanan Berhasil Dibuat!",
                    description: `Kode: ${result.orderCode}. Silakan selesaikan konfirmasi via WhatsApp.`,
                });

                // Kosongkan keranjang
                clearCart();
            }
        } catch (error) {
            console.error('Error saat checkout:', error);
            toast({
                title: "Terjadi Kendala",
                description: "Gagal memproses pesanan. Silakan coba lagi.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyCode = () => {
        if (completedOrder?.orderCode) {
            navigator.clipboard.writeText(completedOrder.orderCode);
            toast({
                title: "Tersalin!",
                description: "Kode pesanan telah disalin ke clipboard",
            });
        }
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
                            <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Pembeli
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama "
                                        value={buyerName}
                                        onChange={(e) => setBuyerName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wk-red"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        No. Whatsapp
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan No.Whatsapp"
                                        value={buyerWhatsapp}
                                        onChange={(e) => setBuyerWhatsapp(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wk-red"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Unit DQM
                                    </label>
                                    <select
                                        value={selectedUnit}
                                        onChange={(e) => setSelectedUnit(e.target.value)}
                                        className="w-full px-4 py-4 rounded-xl border border-gray-300 text-gray-700 hover:border-wk-red focus:outline-none focus:ring-2 focus:ring-wk-red"
                                    >
                                        <option value="DQ2 Putri">DQ2 Putri</option>
                                        <option value="DQ4 IS">DQ4 IS</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Asrama
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Asrama"
                                        value={buyerAsrama}
                                        onChange={(e) => setBuyerAsrama(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wk-red"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Kelas
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Kelas"
                                        value={buyerKelas}
                                        onChange={(e) => setBuyerKelas(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wk-red"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-semibold text-gray-700">Total:</span>
                                <span className="text-2xl font-bold text-wk-red">
                                    Rp {totalPrice.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-wk-red hover:bg-wk-darkRed text-wk-white py-6 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50"
                                disabled={cartItems.length === 0 || isSubmitting}
                            >
                                {isSubmitting ? 'Memproses Pesanan...' : 'Checkout via WhatsApp'}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}

            {/* Modal Sukses Pemesanan */}
            {completedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-4 border-wk-gold text-center"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-wk-darkRed mb-2">Pesanan Berhasil Dibuat!</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Silakan salin kode pesanan Anda dan lanjutkan pembayaran.
                        </p>

                        <div className="bg-wk-lightOrange/20 border border-wk-orange/30 rounded-xl p-4 mb-4">
                            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Kode Pesanan</span>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-xl font-mono font-bold text-wk-red">{completedOrder.orderCode}</span>
                                <Button size="sm" variant="outline" onClick={handleCopyCode} className="h-8 px-2">
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="text-left text-xs bg-gray-50 rounded-xl p-4 mb-5 space-y-1.5 border border-gray-200">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total Pembayaran:</span>
                                <span className="font-bold text-wk-red text-sm">Rp {completedOrder.totalPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Transfer ke Bank:</span>
                                <span className="font-semibold">{SITE_CONFIG.payment.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">No. Rekening:</span>
                                <span className="font-mono font-bold">{SITE_CONFIG.payment.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Atas Nama:</span>
                                <span>{SITE_CONFIG.payment.accountHolder}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5 rounded-xl shadow-md"
                                onClick={() => window.open(completedOrder.whatsappUrl, '_blank')}
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Buka WhatsApp Panitia
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-gray-300 py-5 rounded-xl"
                                onClick={() => {
                                    setCompletedOrder(null);
                                    toggleCart();
                                }}
                            >
                                Tutup & Selesai
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Cart;