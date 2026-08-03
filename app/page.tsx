"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../lib/data";
import ProductCard from "../components/ProductCard";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Headphones, Layers } from "lucide-react";

export default function Home() {
  // Get featured products
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  const categories = [
    {
      name: "Audio",
      desc: "Acoustic perfection & hybrid ANC",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop",
      color: "from-blue-500/10 to-indigo-500/10"
    },
    {
      name: "Wearables",
      desc: "Track health in unmatched style",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
      color: "from-purple-500/10 to-pink-500/10"
    },
    {
      name: "Electronics",
      desc: "Gasket keyboards & responsive tech",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
      color: "from-emerald-500/10 to-teal-500/10"
    },
    {
      name: "Lifestyle",
      desc: "Felt mats & full-grain cardholders",
      image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=400&auto=format&fit=crop",
      color: "from-amber-500/10 to-orange-500/10"
    }
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Decorative Blur Blobs */}
      <div className="absolute -left-48 top-0 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/5" />
      <div className="absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-400/10 blur-3xl dark:bg-purple-500/5" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32 flex flex-col items-center text-center">
        {/* Sub-header badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/20 dark:text-indigo-400 mb-6 transition-all hover:scale-105">
          <Sparkles className="h-3.5 w-3.5 fill-current animate-pulse" />
          The Desk Collection is Live
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl dark:text-white leading-[1.1] md:leading-[1.05]">
          Aesthetics Meet Performance. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-pink-400">
            Elevate Your Setup.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Meticulously crafted mechanical keyboards, high-fidelity active headphones, and premium leather accessories engineered to inspire your creative workflow.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/shop"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-8 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-150 transition-all shadow-lg shadow-zinc-950/10 dark:shadow-none hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Shop
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/shop?badge=New"
            className="flex h-12 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 px-8 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            View New Releases
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Curated Collections
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Browse workspace essentials by workspace layer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.name}`}
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl border border-zinc-200/40 p-6 dark:border-zinc-800/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/20"
            >
              {/* Category BG Image */}
              <div className="absolute inset-0 -z-10 bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center opacity-85 dark:opacity-60 transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient tint */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent`} />
              </div>

              {/* Text */}
              <div className="text-white">
                <h3 className="text-lg font-bold tracking-tight">{cat.name}</h3>
                <p className="mt-1 text-xs text-zinc-300 line-clamp-1">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-indigo-300 group-hover:text-white transition-colors">
                  Browse items <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-950/20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Trending Workspace Gear
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              The products creatives are using to perfect their workspaces.
            </p>
          </div>
          <Link
            href="/shop"
            className="group hidden sm:flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
          >
            See all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Selling Points Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100/50 dark:border-zinc-900/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-5">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Complimentary Shipping</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Receive free standard shipping on all orders over $150. Carefully packaged and fully tracked.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100/50 dark:border-zinc-900/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">2-Year Limited Warranty</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              We stand fully behind our craftsmanship. Every hardware item includes a comprehensive two-year warranty.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100/50 dark:border-zinc-900/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 mb-5">
              <Headphones className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Lifetime Desk Support</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Need installation or setup assistance? Our responsive helpdesk is here to assist with firmware, setups, and integration.
            </p>
          </div>
        </div>
      </section>

      {/* Premium testimonial banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200/50 dark:border-zinc-800/50 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-950/20 rounded-3xl mb-12">
        <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/5 blur-2xl" />
        <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          CREATIVE COMMONS
        </span>
        <blockquote className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white leading-relaxed">
          &ldquo;Aurora's Helix keyboard and Felt Desk mat have completely transformed how my workspace looks and sounds. The typing experience is rain-drop crisp, and the minimalist aesthetics are unmatched.&rdquo;
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-200 relative dark:border-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
              alt="Reviewer avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left text-sm font-semibold">
            <p className="text-zinc-900 dark:text-white">Jessica Laurent</p>
            <p className="text-xs text-zinc-400">Creative Lead at Studio-Y</p>
          </div>
        </div>
      </section>
    </div>
  );
}
