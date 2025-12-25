import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('wonderkind-cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wonderkind-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) =>
                    item.id === product.id &&
                    item.selectedVariation === product.selectedVariation &&
                    item.selectedColor === product.selectedColor
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id &&
                        item.selectedVariation === product.selectedVariation &&
                        item.selectedColor === product.selectedColor
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }

            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const updateQuantity = (id, variation, color, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.selectedVariation === variation && item.selectedColor === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const removeFromCart = (id, variation, color) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.id === id && item.selectedVariation === variation && item.selectedColor === color)
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                toggleCart,
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};