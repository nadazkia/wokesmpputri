import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import CompetitionDetails from "./components/CompetitionDetails";
import Schedule from "./components/Schedule";
// import TicketSection from "./components/TicketSection";
// import Merchandise from "./components/Merchandise";
import SponsorSection from "./components/SponsorSection";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import GlobalBackground from "./components/common/GlobalBackground";
import LoadingScreen from "./components/common/LoadingScreen";
import { getCurrentUser, onAuthStateChange } from "./services/authService";

function App() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin' ||
      window.location.search.includes('page=admin')
    );
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inisialisasi awal & loading screen halus
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (
        window.location.pathname.startsWith('/admin') ||
        window.location.hash === '#admin' ||
        window.location.search.includes('page=admin')
      ) {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    // Cek auth saat ini
    getCurrentUser().then((user) => {
      if (user) setCurrentUser(user);
    });

    const { data: authListener } = onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (isAdminView) {
    if (currentUser) {
      return (
        <AdminDashboard
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
          onBackToSite={() => {
            setIsAdminView(false);
            window.location.hash = '';
          }}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={(user) => setCurrentUser(user)}
        onBackToSite={() => {
          setIsAdminView(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <CartProvider>
      <Helmet>
        <title>
          Wonderkind Festival - Karsa Cendekia, Wujudkan Lokasamgraha | 11-13
          Februari 2026
        </title>
        <meta
          name="description"
          content="Wonderkind Festival 2026: Karsa Cendekia, Wujudkan Lokasamgraha. Timeline: 11-13 Februari 2026. Wonder Competition (SD & SMP) pada 13 Februari. Ikuti 20+ lomba internal dan event umum."
        />
      </Helmet>

      {/* Loading Screen Awal dengan Transisi Halus */}
      <AnimatePresence>
        {isLoading && <LoadingScreen key="festival-loader" />}
      </AnimatePresence>

      <div className="min-h-screen relative overflow-x-hidden text-gray-900 selection:bg-wk-gold selection:text-wk-darkRed">
        {/* Background Tunggal Global & Dekorasi Partikel Animasi Ringan */}
        <GlobalBackground />

        {/* Konten Halaman Utama Website */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Categories />
          <CompetitionDetails />
          <Schedule />
          {/* <TicketSection /> */}
          {/* <Merchandise /> */}
          <SponsorSection />
          <FAQ />
          <CTA />
          <Footer />
          <Cart />
          <Toaster />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
