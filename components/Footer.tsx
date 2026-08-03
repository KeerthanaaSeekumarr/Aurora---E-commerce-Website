"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <span className="text-xl font-bold tracking-widest text-zinc-950 dark:text-white">
              AURORA
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Sleek aesthetics, high-performance electronics, and premium lifestyle accessories curated for the modern desk.
            </p>
          </div>

          {/* Catalog Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 tracking-wider uppercase mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {["Audio", "Wearables", "Electronics", "Lifestyle"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${cat}`}
                    className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {["About Us", "Sustainability", "Careers", "Journal"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 tracking-wider uppercase">
              Stay Updated
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Subscribe to receive early-access announcements, editorial stories, and product launches.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-4 pr-12 text-sm transition-all focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <span className="text-xs font-bold text-emerald-500">✓</span>
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
                Thank you for subscribing!
              </span>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200/50 pt-8 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} AURORA & Keerthana Namminikkara. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-400 dark:text-zinc-500">
            <Link href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
