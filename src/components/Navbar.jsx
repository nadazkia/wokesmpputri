import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const {
        toggleCart,
        cartItems
    } = useCart();
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [{
        name: 'Beranda',
        href: '#hero'
    }, {
        name: 'Tentang',
        href: '#about'
    }, {
        name: 'Lomba',
        href: '#categories'
    }, {
        name: 'Jadwal',
        href: '#schedule'
    }, {
        name: 'Merchandise',
        href: '#merchandise'
    }, {
        name: 'Sponsor',
        href: '#sponsor'
    }, {
        name: 'FAQ',
        href: '#faq'
    }];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return <motion.nav initial={{
        y: -100
    }} animate={{
        y: 0
    }} transition={{
        duration: 0.5
    }} className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-wk-white shadow-lg' : 'bg-wk-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <motion.div whileHover={{
                    scale: 1.05
                }} className="flex items-center space-x-2">

                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        {/* <span className="bg-gradient-to-br from-wk-red to-wk-darkRed text-wk-white font-bold text-xl">W</span> */}
                        <img alt="WOKE26" className="object-cover rounded-lg mix-blend-multiply" src={process.env.PUBLIC_URL + '/img/WOKE26.png'} />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-wk-red to-wk-orange bg-clip-text text-transparent">Wonderkind Festival</span>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => <a key={link.name} href={link.href} className="text-gray-700 hover:text-wk-red transition-colors duration-200 font-medium">
                        {link.name}
                    </a>)}
                    <Button onClick={toggleCart} variant="outline" className="relative border-wk-orange/20 hover:bg-wk-lightOrange/10 hover:text-wk-red">
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-wk-red text-wk-white text-xs rounded-full w-5 h-5 flex items-center justify-center border border-white">
                            {totalItems}
                        </span>}
                    </Button>
                </div>

                <div className="md:hidden flex items-center space-x-2">
                    <Button onClick={toggleCart} variant="outline" size="icon" className="relative border-wk-orange/20">
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-wk-red text-wk-white text-xs rounded-full w-5 h-5 flex items-center justify-center border border-white">
                            {totalItems}
                        </span>}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="hover:text-wk-red">
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>
        </div>

        {isOpen && <motion.div initial={{
            opacity: 0,
            height: 0
        }} animate={{
            opacity: 1,
            height: 'auto'
        }} exit={{
            opacity: 0,
            height: 0
        }} className="md:hidden bg-wk-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-4 space-y-2">
                {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-wk-red transition-colors duration-200 font-medium">
                    {link.name}
                </a>)}
            </div>
        </motion.div>}
    </motion.nav>;
};
export default Navbar;