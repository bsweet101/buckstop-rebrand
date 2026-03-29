'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <label
          htmlFor="pdp-quantity"
          className="text-sm font-medium text-[#2d2d2d]"
        >
          Quantity:
        </label>
        <div className="flex items-center rounded-md border border-[#2d2d2d]/20">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex h-10 w-10 items-center justify-center text-lg text-[#2d2d2d] transition-colors hover:bg-[#f5f0e8] disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <select
            id="pdp-quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-10 w-14 appearance-none border-x border-[#2d2d2d]/20 bg-white text-center text-sm font-medium text-[#2d2d2d] focus:outline-none"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="flex h-10 w-10 items-center justify-center text-lg text-[#2d2d2d] transition-colors hover:bg-[#f5f0e8] disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`w-full rounded-md px-6 py-4 text-lg font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          added
            ? 'bg-[#1a3c2a]'
            : 'bg-[#c8932a] hover:bg-[#b07e22]'
        }`}
      >
        {!product.inStock
          ? 'Out of Stock'
          : added
            ? 'Added to Cart!'
            : 'Add to Cart'}
      </button>
    </div>
  );
}
