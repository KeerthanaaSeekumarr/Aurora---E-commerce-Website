"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleBackToShop = () => {
    setIsCartOpen(false);
    router.push("/shop");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart Drawer */}
      <div
        ref={sidebarRef}
        className={`fixed bottom-0 right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-zinc-950 sm:max-w-md ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-5 dark:border-zinc-800 sm:px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Shopping Cart
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900/50 mb-4 text-zinc-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-[240px]">
                Add some sleek items to your desk layout to get started.
              </p>
              <button
                onClick={handleBackToShop}
                className="mt-6 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm active:scale-98"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-zinc-100 p-3 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-sm font-semibold text-zinc-900 dark:text-white">
                      <h4 className="line-clamp-1">{item.product.name}</h4>
                      <p className="ml-4">${item.product.price * item.quantity}</p>
                    </div>
                    
                    {/* Selected Options */}
                    <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                      {item.selectedColor && item.selectedSize && " • "}
                      {item.selectedSize && `Option: ${item.selectedSize}`}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Billing calculations & CTA */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-6 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-6">
            <div className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  ${cartSubtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {cartShipping === 0 ? "Free" : `$${cartShipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  ${cartTax}
                </span>
              </div>
              <div className="flex justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800 text-base font-bold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
            </div>

            {cartShipping > 0 && (
              <p className="mt-2.5 text-center text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                Add <span className="font-bold text-zinc-600 dark:text-zinc-400">${Math.max(0, 150 - cartSubtotal)}</span> more to qualify for Free Shipping.
              </p>
            )}

            <button
              onClick={handleCheckout}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-zinc-950 py-3 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 active:scale-98"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
