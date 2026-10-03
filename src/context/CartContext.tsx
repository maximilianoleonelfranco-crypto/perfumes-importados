"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, useStore } from "@/context/StoreContext";

export interface CartItem {
  product: Product;
  quantity: number;
  isDecant?: boolean;
  itemPrice: number; // Price of full bottle or decant sample
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, isDecant?: boolean) => void;
  removeFromCart: (productId: string, isDecant?: boolean) => void;
  updateQuantity: (productId: string, quantity: number, isDecant?: boolean) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  formatPrice: (price: number) => string;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedPillar: string | null;
  setSelectedPillar: (pillar: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { appliedCoupon } = useStore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("perfumes_importtados_cart_v3");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignorar en SSR
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("perfumes_importtados_cart_v3", JSON.stringify(cart));
    } catch {
      // Ignorar en SSR
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, isDecant: boolean = false) => {
    const unitPrice = isDecant && product.decantPrice ? product.decantPrice : product.price;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && Boolean(item.isDecant) === isDecant
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && Boolean(item.isDecant) === isDecant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isDecant, itemPrice: unitPrice }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, isDecant: boolean = false) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && Boolean(item.isDecant) === isDecant)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, isDecant: boolean = false) => {
    if (quantity <= 0) {
      removeFromCart(productId, isDecant);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && Boolean(item.isDecant) === isDecant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  );

  // Cálculo del Descuento por Cupón
  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString("es-UY")}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discountAmount,
        grandTotal,
        formatPrice,
        quickViewProduct,
        setQuickViewProduct,
        selectedPillar,
        setSelectedPillar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de un CartProvider");
  }
  return context;
}
