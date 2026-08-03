"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { ShippingAddress } from "../lib/types";
import { ShoppingBag, ChevronRight, CheckCircle2, CreditCard, Truck, Receipt } from "lucide-react";
import Image from "next/image";

export default function CheckoutFlow() {
  const { cart, cartSubtotal, cartTax, cartShipping, cartTotal, placeOrder } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<"shipping" | "payment" | "success">("shipping");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{2})/g, '$1/').trim();
      if (formattedValue.endsWith("/")) formattedValue = formattedValue.slice(0, -1);
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }
    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    if (!shippingAddress.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shippingAddress.email.trim() || !/\S+@\S+\.\S+/.test(shippingAddress.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!shippingAddress.address.trim()) newErrors.address = "Address is required";
    if (!shippingAddress.city.trim()) newErrors.city = "City is required";
    if (!shippingAddress.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (cardDetails.cardNumber.length < 15 || cardDetails.expiryDate.length < 5 || cardDetails.cvc.length < 3) {
      alert("Please enter valid card details (simulated checkout).");
      return;
    }
    const finalOrder = placeOrder(shippingAddress);
    setPlacedOrder(finalOrder);
    setStep("success");
  };

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mb-4" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Your cart is empty</h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">Add products to your cart before checking out.</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-6 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all shadow-sm"
        >
          View Shop
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Checkout Forms (Col 7) */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 sm:p-8">
        {/* Step Indicator Header */}
        {step !== "success" && (
          <div className="flex items-center gap-2 mb-8 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <span className={step === "shipping" ? "text-indigo-600 dark:text-indigo-400" : ""}>1. Shipping</span>
            <ChevronRight className="h-3 w-3" />
            <span className={step === "payment" ? "text-indigo-600 dark:text-indigo-400" : ""}>2. Payment</span>
          </div>
        )}

        {step === "shipping" && (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Truck className="h-5 w-5 text-zinc-400" /> Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleShippingChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleShippingChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleShippingChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleShippingChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                {errors.postalCode && <p className="text-xs text-rose-500 mt-1">{errors.postalCode}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleShippingChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-full bg-zinc-950 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-lg active:scale-98"
            >
              Continue to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-zinc-400" /> Simulated Payment
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
              This is a demonstration environment. Please enter mock credentials below. (Any 16-digit card works).
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="4000 1234 5678 9010"
                  required
                  value={cardDetails.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                    value={cardDetails.expiryDate}
                    onChange={handlePaymentChange}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                    CVC
                  </label>
                  <input
                    type="password"
                    name="cvc"
                    placeholder="•••"
                    required
                    value={cardDetails.cvc}
                    onChange={handlePaymentChange}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep("shipping")}
                className="flex-1 rounded-full border border-zinc-200 dark:border-zinc-800 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="flex-2 flex justify-center rounded-full bg-zinc-950 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-lg active:scale-98"
              >
                Complete Payment (${cartTotal})
              </button>
            </div>
          </form>
        )}

        {step === "success" && placedOrder && (
          <div className="text-center py-6">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce-short" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Order Confirmed</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Thank you for your order! Your simulated shipment is being packaged.
            </p>
            <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 p-6 text-left space-y-4">
              <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <span>Order ID</span>
                <span className="font-mono text-zinc-950 dark:text-white">{placedOrder.id}</span>
              </div>
              <div className="text-sm space-y-1 text-zinc-500 dark:text-zinc-400">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Shipping Destination:</p>
                <p>{placedOrder.shippingAddress.fullName}</p>
                <p>{placedOrder.shippingAddress.address}</p>
                <p>{placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.postalCode}</p>
                <p>{placedOrder.shippingAddress.country}</p>
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between font-bold text-zinc-950 dark:text-white">
                <span>Total Amount</span>
                <span>${placedOrder.total}</span>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/orders")}
                className="rounded-full bg-zinc-950 text-white px-6 py-2.5 text-sm font-semibold hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all"
              >
                Track Orders
              </button>
              <button
                onClick={() => router.push("/shop")}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Summary (Col 5) - Hidden during Success screen */}
      {step !== "success" && (
        <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Receipt className="h-5 w-5 text-zinc-400" /> Order Summary
          </h2>

          <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 max-h-80 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/40 dark:border-zinc-800/40">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover object-center" />
                </div>
                <div className="flex-1 text-sm">
                  <div className="flex justify-between font-semibold text-zinc-900 dark:text-white">
                    <h4 className="line-clamp-1">{item.product.name}</h4>
                    <p>${item.product.price * item.quantity}</p>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    Qty {item.quantity} {item.selectedColor && `• Color: ${item.selectedColor}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 pt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900 dark:text-white">${cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {cartShipping === 0 ? "Free" : `$${cartShipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span className="font-semibold text-zinc-900 dark:text-white">${cartTax}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200/60 dark:border-zinc-800/60 pt-3 text-base font-bold text-zinc-900 dark:text-white">
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
