import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import CompetitionDetails from "./components/CompetitionDetails";
import Schedule from "./components/Schedule";
import Merchandise from "./components/Merchandise";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Helmet>
        <title>
          Wonderkind Festival - Karsa Cendekia, Wujudkan Lokasamgraha | 11-13
          Februari 2026
        </title>
        <meta
          name="description"
          content="Wonderkind Festival 2026: Karsa Cendekia, Wujudkan Lokasamgraha. Timeline: 11-13 Februari 2026. Wonder Competition (SD) pada 13 Februari. Ikuti 20+ lomba internal dan event umum."
        />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <About />
        <Categories />
        <CompetitionDetails />
        <Schedule />
        <Merchandise />
        <FAQ />
        <CTA />
        <Footer />
        <Cart />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;
