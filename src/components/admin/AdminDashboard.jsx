import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, ShoppingCart, Award, Settings, LogOut, CheckCircle, 
  XCircle, Eye, ArrowLeft, RefreshCw, Phone, MessageSquare,
  Ticket, QrCode
} from 'lucide-react';
import { Button } from '../ui/button';
import { logoutAdmin } from '../../services/authService';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import { getActiveProducts } from '../../services/productService';
import { getAllTickets, verifyTicketPayment } from '../../services/ticketService';
import { SITE_CONFIG } from '../../config/siteConfig';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import QRScanner from './QRScanner';

const AdminDashboard = ({ currentUser, onLogout, onBackToSite }) => {
  const [activeTab, setActiveTab] = useState('orders'); // 'overview' | 'orders' | 'tickets' | 'scanner' | 'products' | 'settings'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterTicketStatus, setFilterTicketStatus] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    const [ordersRes, productsRes, ticketsRes] = await Promise.all([
      getAllOrders(),
      getActiveProducts(),
      getAllTickets()
    ]);
    if (ordersRes.data) setOrders(ordersRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    if (ticketsRes.data) setTickets(ticketsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatePayment = async (orderId, status) => {
    const { error } = await updateOrderStatus(orderId, { paymentStatus: status });
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, payment_status: status } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, payment_status: status });
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    const { error } = await updateOrderStatus(orderId, { orderStatus: status });
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: status } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, order_status: status });
      }
    }
  };

  // Statistik
  const totalSales = orders
    .filter(o => o.payment_status === 'lunas')
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const pendingOrders = orders.filter(o => o.payment_status === 'menunggu_verifikasi');
  const paidOrders = orders.filter(o => o.payment_status === 'lunas');

  const filteredOrders = orders.filter(o => {
    if (filterPayment === 'all') return true;
    return o.payment_status === filterPayment;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-wk-darkRed text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <span className="bg-wk-gold text-wk-darkRed font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
              PANEL ADMIN
            </span>
            <h1 className="text-lg font-bold">{SITE_CONFIG.festivalName}</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToSite}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg flex items-center transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Lihat Website
            </button>
            <button
              onClick={async () => {
                await logoutAdmin();
                onLogout();
              }}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center transition-all font-semibold"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-all ${
              activeTab === 'overview'
                ? 'bg-wk-red text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <Award className="w-4 h-4 mr-2" /> Ringkasan Statistik
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-all ${
              activeTab === 'scanner'
                ? 'bg-wk-gold text-wk-darkRed shadow-md font-bold'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <QrCode className="w-4 h-4 mr-2 text-wk-darkRed" /> Scan Kehadiran QR
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-all ${
              activeTab === 'tickets'
                ? 'bg-wk-red text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <Ticket className="w-4 h-4 mr-2" /> Tiket Festival ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-all ${
              activeTab === 'orders'
                ? 'bg-wk-red text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Pesanan Merch
            {pendingOrders.length > 0 && (
              <span className="ml-2 bg-wk-gold text-wk-darkRed text-xs px-2 py-0.5 rounded-full font-bold">
                {pendingOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-all ${
              activeTab === 'products'
                ? 'bg-wk-red text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <Package className="w-4 h-4 mr-2" /> Katalog Merchandise
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-all ${
              activeTab === 'settings'
                ? 'bg-wk-red text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" /> Pengaturan & Kontak
          </button>

          <Button
            size="sm"
            variant="outline"
            onClick={fetchData}
            className="ml-auto"
            disabled={loading}
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </Button>
        </div>

        {/* Tab 1: Ringkasan Statistik */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Penjualan Lunas</span>
                <p className="text-2xl font-bold text-wk-red mt-2">Rp {totalSales.toLocaleString('id-ID')}</p>
                <span className="text-xs text-green-600 font-semibold mt-1 block">Dari {paidOrders.length} transaksi lunas</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Pesanan Masuk</span>
                <p className="text-2xl font-bold text-gray-900 mt-2">{orders.length}</p>
                <span className="text-xs text-gray-500 mt-1 block">Semua pesanan tercatat</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Menunggu Verifikasi</span>
                <p className="text-2xl font-bold text-amber-600 mt-2">{pendingOrders.length}</p>
                <span className="text-xs text-amber-700 mt-1 block">Perlu konfirmasi admin</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Produk Terdaftar</span>
                <p className="text-2xl font-bold text-wk-darkRed mt-2">{products.length}</p>
                <span className="text-xs text-gray-500 mt-1 block">Item merchandise aktif</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-wk-darkRed mb-4">Informasi Sistem</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-xs text-gray-500 block mb-1">Status Koneksi Supabase</span>
                  <span className={`inline-flex items-center font-bold px-2.5 py-1 rounded-full text-xs ${
                    isSupabaseConfigured ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isSupabaseConfigured ? 'Terhubung (Online)' : 'Mode Offline / Belum Terpasang di .env'}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-xs text-gray-500 block mb-1">Akun Admin Terautentikasi</span>
                  <span className="font-semibold text-gray-800">{currentUser?.email || 'Admin Sesi Lokal'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Scanner: Scan Kehadiran QR */}
        {activeTab === 'scanner' && (
          <QRScanner />
        )}

        {/* Tab Tickets: Manajemen Tiket Festival */}
        {activeTab === 'tickets' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-wk-darkRed">Data Tiket Festival Wonderkind</h3>
                <p className="text-xs text-gray-500">Kelola tiket terjual, verifikasi pembayaran, dan pantau status check-in</p>
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'Semua Tiket' },
                  { key: 'menunggu_verifikasi', label: 'Belum Lunas' },
                  { key: 'lunas', label: 'Lunas' },
                  { key: 'checked_in', label: 'Sudah Hadir' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilterTicketStatus(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filterTicketStatus === tab.key
                        ? 'bg-wk-red text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500 text-sm">Memuat data tiket...</div>
            ) : tickets.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm">
                Belum ada tiket yang dipesan.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b text-xs text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Kode Tiket</th>
                      <th className="p-4">Nama Pemesan</th>
                      <th className="p-4">Kategori Tiket</th>
                      <th className="p-4">Harga</th>
                      <th className="p-4">Status Bayar</th>
                      <th className="p-4">Kehadiran</th>
                      <th className="p-4 text-right">Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tickets
                      .filter(t => {
                        if (filterTicketStatus === 'all') return true;
                        if (filterTicketStatus === 'checked_in') return t.checked_in;
                        return t.payment_status === filterTicketStatus;
                      })
                      .map(t => (
                        <tr key={t.id || t.ticket_code} className="hover:bg-gray-50/80 transition-colors">
                          <td className="p-4 font-mono font-bold text-wk-red text-xs">{t.ticket_code}</td>
                          <td className="p-4 font-semibold text-gray-900">
                            <div>{t.buyer_name}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-0.5">
                              <Phone className="w-3 h-3 mr-1" /> {t.buyer_whatsapp}
                            </div>
                          </td>
                          <td className="p-4 text-xs font-medium text-gray-700">
                            {t.ticket_type}
                          </td>
                          <td className="p-4 font-bold text-gray-900 text-xs">
                            Rp {(t.price || 0).toLocaleString('id-ID')}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              t.payment_status === 'lunas'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {t.payment_status === 'lunas' ? 'Lunas' : 'Menunggu'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              t.checked_in
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {t.checked_in ? 'Hadir' : 'Belum'}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1">
                            {t.payment_status !== 'lunas' ? (
                              <Button
                                size="sm"
                                onClick={async () => {
                                  await verifyTicketPayment(t.ticket_code, 'lunas');
                                  setTickets(tickets.map(item => item.ticket_code === t.ticket_code ? { ...item, payment_status: 'lunas' } : item));
                                }}
                                className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                              >
                                Tandai Lunas
                              </Button>
                            ) : (
                              <span className="text-xs text-green-600 font-bold">Terverifikasi</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Manajemen Pesanan */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-wk-darkRed">Daftar Pesanan Merchandise</h3>
                <p className="text-xs text-gray-500">Kelola dan verifikasi pembayaran manual dari pembeli</p>
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'Semua' },
                  { key: 'menunggu_verifikasi', label: 'Menunggu' },
                  { key: 'lunas', label: 'Lunas' },
                  { key: 'dibatalkan', label: 'Dibatalkan' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilterPayment(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filterPayment === tab.key
                        ? 'bg-wk-red text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500 text-sm">Memuat data pesanan...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm">
                Tidak ada pesanan yang sesuai dengan filter ini.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b text-xs text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Kode Order</th>
                      <th className="p-4">Pembeli</th>
                      <th className="p-4">Unit / Asrama</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status Bayar</th>
                      <th className="p-4">Status Proses</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map(order => (
                      <tr key={order.id || order.order_code} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-wk-red text-xs">{order.order_code}</td>
                        <td className="p-4 font-semibold text-gray-900">
                          <div>{order.buyer_name}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-0.5">
                            <Phone className="w-3 h-3 mr-1" /> {order.buyer_whatsapp}
                          </div>
                        </td>
                        <td className="p-4 text-xs text-gray-600">
                          <div>{order.unit}</div>
                          <div>{order.asrama} - Kelas {order.kelas}</div>
                        </td>
                        <td className="p-4 font-bold text-gray-900">
                          Rp {(order.total_amount || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            order.payment_status === 'lunas'
                              ? 'bg-green-100 text-green-800'
                              : order.payment_status === 'dibatalkan'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.payment_status === 'lunas' ? 'Lunas' : order.payment_status === 'dibatalkan' ? 'Batal' : 'Menunggu'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs capitalize font-medium text-gray-700">
                            {order.order_status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrder(order)}
                            className="h-8 text-xs font-semibold"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" /> Detail
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Produk */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg text-wk-darkRed">Katalog Produk Merchandise</h3>
                <p className="text-xs text-gray-500">Daftar item merchandise Wonderkind Festival</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="border rounded-xl p-4 flex gap-4 bg-gray-50">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2 border flex-shrink-0">
                    <img
                      src={process.env.PUBLIC_URL + '/img/merch/' + product.imgName}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                    <p className="text-sm font-bold text-wk-red mt-1">Rp {(product.price || 0).toLocaleString('id-ID')}</p>
                    <div className="text-[11px] text-gray-500 mt-1">
                      Variasi: {product.variations?.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Pengaturan */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-3xl">
            <h3 className="font-bold text-lg text-wk-darkRed mb-2">Pengaturan Website & Kontak</h3>
            <p className="text-xs text-gray-500 mb-6">Informasi kontak dan rekening yang tampil kepada pembeli dan pengunjung</p>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 block mb-1">Nomor WhatsApp Resmi Panitia</span>
                <span className="font-mono font-bold text-gray-900">+{SITE_CONFIG.officialWhatsapp}</span>
                <p className="text-xs text-gray-400 mt-1">Nomor ini menjadi tujuan pesan checkout otomatis dari pembeli.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 block mb-1">Email Sekretariat</span>
                <span className="font-bold text-gray-900">{SITE_CONFIG.officialEmail}</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 block mb-1">Rekening Pembayaran Manual</span>
                <div className="font-semibold text-gray-900">{SITE_CONFIG.payment.bankName}</div>
                <div className="font-mono text-wk-red font-bold">{SITE_CONFIG.payment.accountNumber}</div>
                <div className="text-xs text-gray-600">a.n. {SITE_CONFIG.payment.accountHolder}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border-2 border-wk-gold max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <span className="text-xs text-gray-500 font-bold uppercase">Detail Pesanan</span>
                <h3 className="text-xl font-bold font-mono text-wk-red">{selectedOrder.order_code}</h3>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setSelectedOrder(null)}>
                ✕
              </Button>
            </div>

            {/* Info Pembeli */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-xs space-y-1.5 border">
              <div className="flex justify-between"><span className="text-gray-500">Nama:</span> <span className="font-bold">{selectedOrder.buyer_name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">WhatsApp:</span> <span className="font-bold">{selectedOrder.buyer_whatsapp}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Unit:</span> <span>{selectedOrder.unit}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Asrama / Kelas:</span> <span>{selectedOrder.asrama} - Kelas {selectedOrder.kelas}</span></div>
            </div>

            {/* Item Pesanan */}
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Item yang Dipesan</h4>
            <div className="space-y-2 mb-4">
              {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                selectedOrder.order_items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold">{item.product_name}</span>
                      <span className="text-gray-500 block">Ukuran: {item.size} • Var: {item.variation}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</span>
                      <div className="font-bold text-wk-red">Rp {item.subtotal.toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 italic">Detail item tersimpan dalam ringkasan pesanan.</div>
              )}
            </div>

            <div className="flex justify-between items-center py-3 border-t border-b mb-6 text-sm">
              <span className="font-bold text-gray-700">Total Tagihan:</span>
              <span className="text-xl font-bold text-wk-red">Rp {(selectedOrder.total_amount || 0).toLocaleString('id-ID')}</span>
            </div>

            {/* Kontrol Aksi Verifikasi */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Verifikasi Pembayaran:</span>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleUpdatePayment(selectedOrder.id, 'lunas')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-5"
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Tandai Lunas
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleUpdatePayment(selectedOrder.id, 'dibatalkan')}
                  className="border-red-300 text-red-600 hover:bg-red-50 font-semibold text-xs py-5"
                >
                  <XCircle className="w-4 h-4 mr-1.5" /> Batalkan Pesanan
                </Button>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Status Pengerjaan Pesanan:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {['diproses', 'siap_diambil', 'selesai'].map(statusKey => (
                    <button
                      key={statusKey}
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, statusKey)}
                      className={`py-2 px-1 text-xs rounded-lg font-semibold border transition-all capitalize ${
                        selectedOrder.order_status === statusKey
                          ? 'bg-wk-darkRed text-white border-wk-darkRed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                      }`}
                    >
                      {statusKey.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full bg-wk-darkRed hover:bg-wk-red text-white text-xs py-5"
                  onClick={() => {
                    const waText = `Halo ${selectedOrder.buyer_name}, kami dari panitia Wonderkind Festival mengenai pesanan ${selectedOrder.order_code}...`;
                    window.open(`https://wa.me/${selectedOrder.buyer_whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`, '_blank');
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-1.5" /> Hubungi Pembeli via WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
