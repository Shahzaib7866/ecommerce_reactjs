'use client'

import React, { useState, useEffect } from 'react';
import all_product from '../constants/all_product.js';
import { ShopContext } from './ShopContextValue.js'

const CART_KEY = "wearit_cart";
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 15 din

// Naya helper — file ke top pe, component se bahar
const loadCartFromStorage = () => {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return {};
  try {
    const { items, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > EXPIRY_MS) {
      localStorage.removeItem(CART_KEY);
      return {};
    }
    return items || {};
  } catch {
    localStorage.removeItem(CART_KEY);
    return {};
  }
};

const ShopContextProvider = (props) => {
  // CHANGE: useState({}) → lazy init from localStorage
  const [cartItems, setCartItems] = useState({});
    const [hydrated, setHydrated] = useState(false); // pehla effect track karne ke liye

  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

// sirf ek dafa, mount ke baad, localStorage se load karo
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setHydrated(true);
  }, []);

  // Ye effect ab sirf hydration ke baad hi localStorage ko update kare
  useEffect(() => {
    if (!hydrated) return; // pehli render pe skip — warna load hote hi khali cart save ho jayega
    const isEmpty = Object.keys(cartItems).length === 0;
    if (isEmpty) {
      localStorage.removeItem(CART_KEY);
      return;
    }
    localStorage.setItem(CART_KEY, JSON.stringify({
      items: cartItems,
      savedAt: Date.now(),
    }));
  }, [cartItems, hydrated]);

  const addtoCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[key] > 1) {
        updated[key] -= 1;
      } else {
        delete updated[key];
      }
      return updated;
    });
  };

  const removeItemFromCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const itemId = Number(key.split('_')[0]);
        const itemInfo = all_product.find((p) => p.id === itemId);
        if (itemInfo) total += itemInfo.new_price * cartItems[key];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const key in cartItems) {
      total += cartItems[key];
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem(CART_KEY);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addtoCart,
    removeFromCart,
    removeItemFromCart,
    clearCart,

    // 🆕 EXPORTS
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
