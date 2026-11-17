"use client";

import Image from "next/image";
import { useState } from "react";

export interface ColorOption {
  name: string;
  color: string;
}

export interface ProductCardProps {
  title?: string;
  tagline?: string;
  category?: string;
  price?: number;
  originalPrice?: number;
  imageSrc?: string;
  badge?: string;
  specs?: string[];
  colors?: ColorOption[];
  inStock?: boolean;
  onAddToCart?: () => void;
}

const DEFAULT_COLORS: ColorOption[] = [
  { name: "Natural Titanium", color: "#9c968f" },
  { name: "Blue Titanium", color: "#36414e" },
  { name: "White Titanium", color: "#e8e7e3" },
  { name: "Black Titanium", color: "#313236" },
];

export function ProductCard({
  title = "iPhone 15 Pro",
  tagline,
  category = "Smartphone",
  price = 999.99,
  originalPrice,
  imageSrc = "/images/iphone.png",
  badge,
  specs,
  colors = DEFAULT_COLORS,
  inStock = true,
  onAddToCart,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? null);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Dynamic discount calculation
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const displayBadge =
    badge ?? (discountPercent ? `${discountPercent}% OFF` : null);

  const handleAddToCart = () => {
    if (!inStock) return;
    setIsAdded(true);
    onAddToCart?.();
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <article className="group relative w-full max-w-[340px] select-none rounded-[28px] border border-zinc-200/80 bg-white/95 p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]">
      {/* Top Header: Badge & Favorite */}
      <div className="flex items-center justify-between">
        {displayBadge ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {displayBadge}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setIsFavorite(!isFavorite)}
          className="group/btn relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100/80 text-zinc-500 transition-all duration-300 hover:bg-rose-50 hover:text-rose-500 active:scale-90 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 transition-transform duration-300 ${
              isFavorite ? "scale-110 text-rose-500 dark:text-rose-400" : ""
            }`}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative my-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-50/80 to-zinc-100/40 p-6 dark:from-zinc-800/40 dark:to-zinc-800/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.8),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_70%)]" />

        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src={imgError ? "/images/iphone.png" : imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 340px"
            onError={() => setImgError(true)}
            priority
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-108 group-hover:-rotate-1"
          />
        </div>
      </div>

      {/* Color Swatches */}
      {colors && colors.length > 0 && (
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            {colors.map((colorItem) => {
              const isSelected = selectedColor?.name === colorItem.name;
              return (
                <button
                  key={colorItem.name}
                  type="button"
                  title={colorItem.name}
                  aria-label={colorItem.name}
                  onClick={() => setSelectedColor(colorItem)}
                  className={`relative flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-200 hover:scale-115 ${
                    isSelected ? "scale-110" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full shadow-inner"
                    style={{ backgroundColor: colorItem.color }}
                  />
                  {isSelected && (
                    <span
                      className="absolute -inset-0.5 rounded-full border-2 border-zinc-900/60 dark:border-white/70"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
            {selectedColor?.name}
          </span>
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {category}
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              Sold Out
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold capitalize tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          {tagline && (
            <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
              {tagline}
            </p>
          )}
        </div>

        {/* Specs Pills */}
        {specs && specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {specs.map((spec) => (
              <span
                key={spec}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/70">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                ${price.toLocaleString()}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs text-zinc-400 line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={!inStock}
            onClick={handleAddToCart}
            className={`group/btn relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl px-4 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 active:scale-95 ${
              !inStock
                ? "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                : isAdded
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-zinc-900 text-white shadow-md shadow-zinc-950/20 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            }`}
          >
            {!inStock ? (
              <span>Out of Stock</span>
            ) : isAdded ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Added</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-110"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
