'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-[#1a3c2a] text-white',
  'Web Only': 'bg-[#c8932a] text-white',
  'Limited': 'bg-red-700 text-white',
  'Pro Pick': 'bg-[#5a3e1b] text-white',
  'Value Pack': 'bg-[#4a6741] text-white',
  'New': 'bg-[#8B1A1A] text-white',
};

/** Map category slugs to background colors for the placeholder */
const categoryColors: Record<string, string> = {
  'estrus-scents': '#8B1A1A',
  'buck-scents': '#1a3c2a',
  'blend-combos': '#4a6741',
  'buck-beads': '#c8932a',
  'cover-scents': '#5a3e1b',
  'training': '#3d5c4a',
  'odor-elimination': '#4a4a4a',
  'trapping': '#6b4423',
};

interface ProductCardProps {
  product: Product;
}

function ProductInitials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <span className="text-2xl font-serif font-bold text-white/40" aria-hidden="true">
      {initials}
    </span>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [added, setAdded] = useState(false);
  const bgColor = categoryColors[product.category] ?? '#2d2d2d';

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-[#2d2d2d]/10 bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      {/* Badge */}
      {product.badges.length > 0 && (
        <span
          className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[product.badges[0]] ?? 'bg-gray-600 text-white'}`}
        >
          {product.badges[0]}
        </span>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-[#f5f0e8]">
          {product.image ? (
            <>
              {/* Category-colored gradient backdrop */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${bgColor}10 0%, ${bgColor}08 50%, transparent 100%)`,
                }}
                aria-hidden="true"
              />
              <div className="relative h-full w-full p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Soft vignette / inner shadow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.04)',
                }}
                aria-hidden="true"
              />
              {/* Bottom gradient overlay for clean transition to content */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
                style={{
                  background: 'linear-gradient(to top, white, transparent)',
                }}
                aria-hidden="true"
              />
            </>
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-3"
              style={{ backgroundColor: bgColor }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="h-16 w-16 text-white/20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
              </svg>
              <ProductInitials name={product.name} />
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <span className="mb-1 text-xs font-medium uppercase tracking-wider text-[#c8932a]">
          {product.category.replace(/-/g, ' ')}
        </span>

        {/* Size */}
        <span className="text-[11px] text-[#2d2d2d]/50">{product.size}</span>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#2d2d2d] transition-colors group-hover:text-[#1a3c2a]">
            {product.name}
          </h3>
        </Link>

        {/* Seasonal Tags */}
        {product.seasonalTags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {product.seasonalTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#1a3c2a]/15 bg-[#1a3c2a]/5 px-2 py-0.5 text-[10px] font-medium text-[#1a3c2a]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="mt-2 text-lg font-bold text-[#1a3c2a]">
          ${product.price.toFixed(2)}
        </p>

        {/* Star Rating */}
        {product.rating && (
          <div className="mt-1 flex items-center gap-1">
            <div className="flex items-center" aria-label={`Rated ${product.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={star <= Math.round(product.rating!) ? '#d97706' : '#d1d5db'}
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-[#2d2d2d]/60">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.inStock === false}
          className={`mt-4 w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            added
              ? 'bg-[#1a3c2a]'
              : 'bg-[#c8932a] hover:bg-[#b07e22]'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {product.inStock === false ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
        </button>
        <p className="mt-2 text-center text-[10px] text-[#2d2d2d]/50">100% Money-Back Guarantee</p>
        {product.inStock !== false && (
          <p className="mt-1 text-center text-[10px] text-green-600">In Stock &mdash; Ships Today</p>
        )}
      </div>
    </article>
  );
}
