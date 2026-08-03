"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../../../lib/data";
import { Product, Review } from "../../../lib/types";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../../../components/ProductCard";
import { Star, ChevronLeft, Plus, Minus, Shield, Award, RotateCcw } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);

  // Active Interactive States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");

  // New review form state
  const [newReview, setNewReview] = useState({ author: "", rating: 5, comment: "" });
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setLocalReviews(foundProduct.reviews || []);
      // Set defaults
      if (foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
      if (foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[0]);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Product not found</h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">The product you are looking for does not exist.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-indigo-650 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) {
      alert("Please fill in both name and comments.");
      return;
    }
    const addedReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setLocalReviews((prev) => [addedReview, ...prev]);
    setNewReview({ author: "", rating: 5, comment: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full flex-1">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center mb-8">
        <Link
          href="/shop"
          className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Catalog
        </Link>
        <span className="mx-2 text-zinc-350 dark:text-zinc-800">/</span>
        <span className="text-xs text-zinc-450 dark:text-zinc-500">{product.category}</span>
        <span className="mx-2 text-zinc-350 dark:text-zinc-800">/</span>
        <span className="text-xs font-semibold text-zinc-850 dark:text-zinc-200 line-clamp-1">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery (Col 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-850/50 dark:bg-zinc-900">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-xl border bg-zinc-50 dark:bg-zinc-900 transition-all ${
                    activeImageIndex === idx
                      ? "border-indigo-600 ring-2 ring-indigo-600/15"
                      : "border-zinc-200/60 hover:border-zinc-400 dark:border-zinc-800"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specs and Cart controls (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {product.badge && (
              <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-850 dark:text-indigo-400">
                {product.badge}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span>{product.rating}</span>
              <span className="text-zinc-350 dark:text-zinc-700">•</span>
              <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                {localReviews.length} customer reviews
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              ${product.price}
            </p>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Swatches selectors */}
          <div className="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <span className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Select Color: <span className="font-semibold text-zinc-900 dark:text-white">{selectedColor}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                        selectedColor === c
                          ? "bg-zinc-950 border-zinc-950 text-white dark:bg-white dark:border-white dark:text-zinc-950 font-semibold"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <span className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Select Option: <span className="font-semibold text-zinc-900 dark:text-white">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-4 py-2 rounded-xl border transition-all ${
                        selectedSize === s
                          ? "bg-zinc-950 border-zinc-950 text-white dark:bg-white dark:border-white dark:text-zinc-950 font-semibold"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 items-end pt-4">
              <div>
                <span className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Quantity
                </span>
                <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-zinc-855 dark:text-zinc-150 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex justify-center items-center gap-2 rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-colors disabled:bg-zinc-450 disabled:cursor-not-allowed active:scale-98"
              >
                {product.inStock ? "Add to Cart" : "Out of stock"}
              </button>
            </div>
          </div>

          {/* Shipping/Return guarantees badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mb-1" />
              <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mb-1" />
              <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mb-1" />
              <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">30-Day Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Overview, Specs, Reviews */}
      <section className="mt-16 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-10">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-6">
          {([
            { id: "overview", label: "Product Description" },
            { id: "specs", label: "Specifications" },
            { id: "reviews", label: `Reviews (${localReviews.length})` },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-indigo-600 text-zinc-950 dark:border-indigo-400 dark:text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-850 dark:text-zinc-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="py-8">
          {activeTab === "overview" && (
            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-550 dark:text-zinc-400 space-y-4">
              <p>{product.description}</p>
              <p>
                Machined and calibrated to fit seamless desk layouts, our items are constructed from eco-friendly sourcing and certified high-grade components. Enhance comfort, typing sound profiles, and visual clarity effortlessly.
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/30" : ""}
                    >
                      <td className="px-6 py-4 font-bold text-zinc-700 dark:text-zinc-300 w-1/3 border-b border-zinc-100 dark:border-zinc-900">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-900">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Reviews List */}
              <div className="md:col-span-7 space-y-6">
                {localReviews.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
                    No reviews for this product yet. Be the first to write one!
                  </p>
                ) : (
                  localReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 rounded-2xl p-5"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">
                          {rev.author}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          {rev.date}
                        </span>
                      </div>
                      <div className="flex items-center text-amber-400 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < rev.rating ? "fill-current" : "text-zinc-200 dark:text-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4">
                  Write a Review
                </h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.author}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, author: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide mb-2">
                      Rating
                    </label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Poor</option>
                      <option value={1}>1 Star - Very Bad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide mb-2">
                      Review Comments
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-zinc-950 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-12 mb-12">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl mb-8">
            Complete the Layout
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
