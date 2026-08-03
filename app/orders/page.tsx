"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { Package, Calendar, Clock, MapPin, Receipt, ExternalLink } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useCart();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900";
      case "shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900";
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Order Dashboard
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Track and manage your simulated checkout transactions.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-zinc-50/50 dark:bg-zinc-900/10 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 mb-4 text-zinc-400">
            <Package className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">No orders placed yet</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-[280px]">
            Once you complete a mock checkout, your simulated order details will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-zinc-950 px-6 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Order Header Info */}
              <div className="border-b border-zinc-150 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-zinc-450" />
                    <span>ID: <span className="font-mono text-zinc-900 dark:text-white">{order.id}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-zinc-450" />
                    <span>Date: <span className="text-zinc-900 dark:text-white">{order.date}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Receipt className="h-4 w-4 text-zinc-450" />
                    <span>Total: <span className="text-indigo-600 dark:text-indigo-400">${order.total}</span></span>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Details Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Items List (Col 7) */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-2">
                    Purchased Items
                  </h3>
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/40 dark:border-zinc-800/40">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="flex-1 text-sm">
                          <div className="flex justify-between font-semibold text-zinc-900 dark:text-white">
                            <Link
                              href={`/product/${item.product.id}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-0.5"
                            >
                              {item.product.name} <ExternalLink className="h-3 w-3 inline text-zinc-400" />
                            </Link>
                            <p>${item.product.price * item.quantity}</p>
                          </div>
                          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                            Quantity {item.quantity}{" "}
                            {item.selectedColor && `• Color: ${item.selectedColor}`}{" "}
                            {item.selectedSize && `• Option: ${item.selectedSize}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information (Col 5) */}
                <div className="md:col-span-5 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-100 dark:border-zinc-900 p-4 rounded-xl space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 flex items-center gap-1.5 mb-2">
                      <MapPin className="h-4 w-4" /> Shipping Destination
                    </h4>
                    <div className="text-xs text-zinc-650 dark:text-zinc-400 space-y-1">
                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {order.shippingAddress.fullName}
                      </p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                      <p className="text-[10px] text-zinc-400 pt-1">
                        Contact: {order.shippingAddress.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 flex items-center gap-1.5 mb-2">
                      <Clock className="h-4 w-4" /> Ship Status History
                    </h4>
                    <div className="space-y-2 relative pl-3.5 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                      <div className="relative text-xs">
                        <span className="absolute -left-[16.5px] top-1 flex h-2 w-2 rounded-full bg-indigo-500" />
                        <p className="font-semibold text-zinc-850 dark:text-zinc-200">Processing order</p>
                        <p className="text-[10px] text-zinc-450 dark:text-zinc-500">
                          {order.date} - Packaging and preparing shipment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
