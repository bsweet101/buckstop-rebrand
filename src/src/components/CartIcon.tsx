'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';

export default function CartIcon() {
  const { cartCount, setIsCartOpen } = useCart();
  const [pulse, setPulse] = useState(false);

  // Animate badge when count increases
  useEffect(() => {
    if (cartCount > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <button
      type="button"
      onClick={() => setIsCartOpen(true)}
      className="relative rounded-md p-2 text-[#f5f0e8] transition-colors hover:bg-[#f5f0e8]/10"
      aria-label={`Shopping cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
    >
      {/* Shopping bag SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>

      {/* Item count badge */}
      {cartCount > 0 && (
        <span
          className={`absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#c8932a] text-[10px] font-bold text-white shadow-sm transition-transform duration-300 ${
            pulse ? 'scale-125' : 'scale-100'
          }`}
        >
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </button>
  );
}
