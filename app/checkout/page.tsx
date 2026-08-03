"use client";

import React from "react";
import CheckoutFlow from "../../components/CheckoutFlow";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full flex-1">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Secure Checkout
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Complete your simulated purchase below to test the ordering mechanics.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <CheckoutFlow />
      </div>
    </div>
  );
}
