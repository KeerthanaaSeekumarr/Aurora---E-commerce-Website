"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { ShoppingBag, Sun, Moon, Menu, X, Search } from "lucide-react";

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "My Orders", href: "/orders" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-widest text-zinc-950 dark:text-white transition-opacity hover:opacity-90"
          >
            AURORA
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-zinc-950 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Search, Theme, Cart, Mobile Menu Controls */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex relative items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 pl-9 text-xs transition-all focus:w-64 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:bg-zinc-950"
            />
            <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-400" />
          </form>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white animate-bounce-short dark:bg-indigo-500 dark:ring-zinc-950">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 md:hidden transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200/50 bg-white/95 px-4 py-4 dark:border-zinc-800/50 dark:bg-zinc-950/95 transition-all animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 pl-10 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
