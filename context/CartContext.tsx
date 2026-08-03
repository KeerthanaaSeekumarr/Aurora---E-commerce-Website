"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem, ShippingAddress, Order } from "../lib/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;
  orders: Order[];
  placeOrder: (address: ShippingAddress) => Order;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedOrders = localStorage.getItem("orders");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Error parsing orders", e);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, mounted]);

  // Save orders to localStorage when they change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders, mounted]);

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart((prevCart) => {
      // Find matching item with SAME product, SAME color, and SAME size
      const uniqueId = `${product.id}-${color || ""}-${size || ""}`;
      const existingItemIndex = prevCart.findIndex((item) => item.id === uniqueId);

      // Open the cart sidebar automatically for visual confirmation
      setIsCartOpen(true);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const newQty = updatedCart[existingItemIndex].quantity + quantity;
        updatedCart[existingItemIndex].quantity = Math.max(1, newQty);
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: uniqueId,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.08 * 100) / 100; // 8% sales tax
  const cartShipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15; // Free shipping over $150
  const cartTotal = Math.round((cartSubtotal + cartTax + cartShipping) * 100) / 100;

  const placeOrder = (shippingAddress: ShippingAddress): Order => {
    const newOrder: Order = {
      id: `ord-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      shippingAddress,
      subtotal: cartSubtotal,
      tax: cartTax,
      shippingCost: cartShipping,
      total: cartTotal,
      date: new Date().toISOString().split("T")[0],
      status: "processing",
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,
        orders,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
