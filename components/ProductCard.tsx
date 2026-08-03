"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/types";
import { useCart } from "../context/CartContext";
import { Star, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0], product.sizes[0]);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "New":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800";
      case "Best Seller":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800";
      case "Sale":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-800";
    }
  };

  return (
    <div className="[perspective:1000px] w-full">
      <Link
        href={`/product/${product.id}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/60 bg-white transition-all duration-500 ease-out [transform-style:preserve-3d] hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateY(-4px)] hover:border-zinc-300/80 hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-900 dark:hover:border-zinc-700/80 dark:hover:shadow-black/40"
      >
        {/* Product Image & Badge */}
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 [transform-style:preserve-3d]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Floating Badge */}
          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase shadow-sm transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:translateZ(25px)] ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}

          {/* Quick Add Button Overlay */}
          <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [transform-style:preserve-3d]">
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-zinc-400 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-950 dark:disabled:bg-zinc-700 group-hover:[transform:translateZ(30px)]"
              aria-label="Quick Add to Cart"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-5 [transform-style:preserve-3d]">
          <span className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold transition-transform duration-500 group-hover:[transform:translateZ(10px)]">
            {product.category}
          </span>
          <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-500 group-hover:[transform:translateZ(15px)]">
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="mt-2 flex items-center gap-1 transition-transform duration-500 group-hover:[transform:translateZ(10px)]">
            <div className="flex items-center text-amber-400">
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {product.rating}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price & Stock Indicator */}
          <div className="mt-auto pt-4 flex items-center justify-between transition-transform duration-500 group-hover:[transform:translateZ(12px)]">
            <span className="text-base font-bold text-zinc-950 dark:text-zinc-50">
              ${product.price}
            </span>

            {!product.inStock && (
              <span className="text-[10px] font-medium text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-full border border-rose-100 dark:border-rose-900/30">
                Out of stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
