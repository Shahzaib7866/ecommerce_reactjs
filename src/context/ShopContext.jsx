'use client'

import React, { useState, useEffect } from 'react';
import all_product from '../constants/all_product.js';
import { ShopContext } from './ShopContextValue.js';

const CART_KEY = "wearit_cart";
const WISHLIST_KEY = "wearit_wishlist";
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// PKR Currency Formatter Helper
export const formatPKR = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;

const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return {};
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

const loadWishlistFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Initial Load on Mount
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setWishlist(loadWishlistFromStorage());
    setHydrated(true);
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    if (!hydrated) return;
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

  // Save Wishlist to LocalStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addtoCart = (itemId, size = 'M') => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId, size = 'M') => {
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

  const removeItemFromCart = (itemId, size = 'M') => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const itemId = Number(key.split('_')[0]);
        const itemInfo = all_product.find((p) => p.id === itemId);
        if (itemInfo) {
          const itemPrice = itemInfo.new_price || itemInfo.price || 0;
          total += itemPrice * cartItems[key];
        }
      }
    }
    return total;
  };

  const getDiscountedCartAmount = () => {
    const subtotal = getTotalCartAmount();
    const discount = (subtotal * discountPercent) / 100;
    return Math.max(0, subtotal - discount);
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const key in cartItems) {
      total += cartItems[key];
    }
    return total;
  };

  const applyCoupon = (code) => {
    if (code?.trim()?.toUpperCase() === 'WEARIT15') {
      setDiscountPercent(15);
      return { success: true, message: '15% Atelier VIP Discount Applied!' };
    }
    return { success: false, message: 'Invalid Coupon Code. Try "WEARIT15".' };
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem(CART_KEY);
  };

  const contextValue = {
    all_product,
    cartItems,
    wishlist,
    toggleWishlist,
    addtoCart,
    removeFromCart,
    removeItemFromCart,
    clearCart,
    getTotalCartItems,
    getTotalCartAmount,
    getDiscountedCartAmount,
    discountPercent,
    applyCoupon,
    formatPKR,
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