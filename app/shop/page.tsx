"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "../../lib/data";
import ProductCard from "../../components/ProductCard";
import { Filter, SlidersHorizontal, Search, ArrowUpDown, X } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search parameters parsing
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialBadge = searchParams.get("badge") || "";

  // State management
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBadge, setSelectedBadge] = useState(initialBadge);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL search parameters
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    setSearchQuery(searchParams.get("search") || "");
    setSelectedBadge(searchParams.get("badge") || "");
  }, [searchParams]);

  // Handle URL updates
  const updateURL = (category: string, search: string, badge: string) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (search) params.set("search", search);
    if (badge) params.set("badge", badge);
    router.push(`/shop?${params.toString()}`);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    updateURL(category, searchQuery, selectedBadge);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Debouncing or on-submit is fine, but for instant UI response we update the URL or just filter local state
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(selectedCategory, searchQuery, selectedBadge);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedBadge("");
    setMinPrice(0);
    setMaxPrice(500);
    setSortBy("featured");
    router.push("/shop");
  };

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBadge = !selectedBadge || product.badge === selectedBadge;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesBadge && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // default (featured or index order)
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
      {/* Top Banner/Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200/60 pb-6 dark:border-zinc-800/60">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Catalog Browse
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Aesthetics and performance gear for your personal desk setup.
          </p>
        </div>

        {/* Sort select & Mobile filter button */}
        <div className="mt-4 flex items-center gap-3 md:mt-0">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 md:hidden dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1.5 bg-white dark:bg-zinc-950">
            <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-transparent border-none outline-none pr-1 dark:text-zinc-200 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: Highest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        {/* Desktop Sidebar Filters (Col 3) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-24">
          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              Categories
            </h3>
            <div className="flex flex-col space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-left text-sm py-1.5 px-3 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              Price Range
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <span>$0</span>
                <span className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
                  Max: ${maxPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Badges Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              Collections
            </h3>
            <div className="flex flex-wrap gap-2">
              {["New", "Best Seller", "Sale", "Trending"].map((badge) => (
                <button
                  key={badge}
                  onClick={() => {
                    const nextBadge = selectedBadge === badge ? "" : badge;
                    setSelectedBadge(nextBadge);
                    updateURL(selectedCategory, searchQuery, nextBadge);
                  }}
                  className={`text-xs py-1 px-3 rounded-full border transition-all ${
                    selectedBadge === badge
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-850 dark:text-indigo-400 font-bold"
                      : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters CTA */}
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-2.5 text-xs font-bold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-850 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
          >
            <X className="h-3.5 w-3.5" /> Clear All Filters
          </button>
        </aside>

        {/* Product Grid Area (Col 9) */}
        <div className="lg:col-span-9 flex flex-col flex-1">
          {/* Active Filter Badges & Search feedback */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* Category tag */}
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                  Category: {selectedCategory}
                  <button onClick={() => handleCategorySelect("All")}>
                    <X className="h-3 w-3 hover:text-zinc-950" />
                  </button>
                </span>
              )}
              {/* Search tag */}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                  Search: &ldquo;{searchQuery}&rdquo;
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      updateURL(selectedCategory, "", selectedBadge);
                    }}
                  >
                    <X className="h-3 w-3 hover:text-zinc-950" />
                  </button>
                </span>
              )}
              {/* Badge tag */}
              {selectedBadge && (
                <span className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                  Tag: {selectedBadge}
                  <button
                    onClick={() => {
                      setSelectedBadge("");
                      updateURL(selectedCategory, searchQuery, "");
                    }}
                  >
                    <X className="h-3 w-3 hover:text-zinc-950" />
                  </button>
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              Showing {filteredProducts.length} of {PRODUCTS.length} products
            </p>
          </div>

          {/* Search bar inside content grid */}
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-6 max-w-md flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products in catalog..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 pl-10 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-zinc-950 px-5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Search
            </button>
          </form>

          {/* Catalog Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-zinc-50/50 dark:bg-zinc-900/10 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <SlidersHorizontal className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                No products found
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-[280px]">
                Try adjusting your filters, modifying your price range, or searching for something else.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-full bg-indigo-650 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Reset Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Slide In Filters */}
      {showMobileFilters && (
        <>
          <div
            onClick={() => setShowMobileFilters(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
          />
          <div className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl dark:bg-zinc-950 md:hidden">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800 mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Filter className="h-4.5 w-4.5" /> Filters
              </h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-1">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                  Categories
                </h3>
                <div className="flex flex-col space-y-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`text-left text-sm py-1.5 px-3 rounded-lg font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    <span>$0</span>
                    <span className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
                      Max: ${maxPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                  Collections
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["New", "Best Seller", "Sale", "Trending"].map((badge) => (
                    <button
                      key={badge}
                      onClick={() => {
                        const nextBadge = selectedBadge === badge ? "" : badge;
                        setSelectedBadge(nextBadge);
                        updateURL(selectedCategory, searchQuery, nextBadge);
                      }}
                      className={`text-xs py-1 px-3 rounded-full border transition-all ${
                        selectedBadge === badge
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-850 dark:text-indigo-400 font-bold"
                          : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-850 space-y-2">
              <button
                onClick={() => {
                  clearFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-2.5 text-xs font-bold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-850 dark:text-zinc-400"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full rounded-xl bg-zinc-950 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 text-xs font-bold text-white hover:bg-zinc-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600 border-r-2 mb-3" />
        <span className="text-sm text-zinc-500">Loading catalog...</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
