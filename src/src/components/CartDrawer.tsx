'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

// ── Shipping cost helper ───────────────────────────────────────────

const FLAT_SHIPPING = 5.99;

function shippingCost(total: number, threshold: number): number {
  return total >= threshold ? 0 : FLAT_SHIPPING;
}

// ── Component ──────────────────────────────────────────────────────

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  // Focus trap & escape key
  useEffect(() => {
    if (!isCartOpen) return;

    // Focus close button when drawer opens
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        return;
      }

      // Basic focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  const shipping = shippingCost(cartTotal, freeShippingThreshold);
  const estimatedTotal = cartTotal + shipping;
  const freeShippingProgress = Math.min(
    (cartTotal / freeShippingThreshold) * 100,
    100
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isCartOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2d2d2d]/10 px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-[#2d2d2d]">
            Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-md p-2 text-[#2d2d2d]/60 transition-colors hover:bg-[#f5f0e8] hover:text-[#2d2d2d]"
            aria-label="Close cart"
          >
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="border-b border-[#2d2d2d]/10 px-6 py-3">
            {freeShippingRemaining > 0 ? (
              <>
                <p className="mb-2 text-sm text-[#2d2d2d]/70">
                  You&apos;re{' '}
                  <span className="font-semibold text-[#c8932a]">
                    ${freeShippingRemaining.toFixed(2)}
                  </span>{' '}
                  away from free shipping!
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#1a3c2a]/20">
                  <div
                    className="h-full rounded-full bg-[#c8932a] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 text-[#1a3c2a]"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="text-sm font-semibold text-[#1a3c2a]">
                  You&apos;ve earned free shipping!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cart Items or Empty State */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              {/* Deer icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="mb-4 h-20 w-20 text-[#2d2d2d]/15"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
              </svg>
              <p className="mb-2 font-serif text-xl font-bold text-[#2d2d2d]">
                Your cart is empty
              </p>
              <p className="mb-6 text-sm text-[#2d2d2d]/60">
                Find the perfect scent for your next hunt.
              </p>
              <Link
                href="/products"
                onClick={() => setIsCartOpen(false)}
                className="rounded-md bg-[#c8932a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b07e22]"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#2d2d2d]/10 px-6">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-[#2d2d2d]/10 bg-[#f5f0e8]"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="h-8 w-8 text-[#2d2d2d]/20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
                        </svg>
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-semibold text-[#2d2d2d] transition-colors hover:text-[#1a3c2a]"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs text-[#2d2d2d]/50">
                      {product.size}
                    </span>
                    <span className="mt-1 text-sm font-bold text-[#1a3c2a]">
                      ${(product.price * quantity).toFixed(2)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#2d2d2d]/20 text-sm text-[#2d2d2d] transition-colors hover:bg-[#f5f0e8]"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium text-[#2d2d2d]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        disabled={quantity >= 10}
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#2d2d2d]/20 text-sm text-[#2d2d2d] transition-colors hover:bg-[#f5f0e8] disabled:opacity-40"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        +
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto text-xs text-red-600/70 transition-colors hover:text-red-700"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary & Actions */}
        {items.length > 0 && (
          <div className="border-t border-[#2d2d2d]/10 px-6 py-4">
            {/* Summary */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#2d2d2d]/70">
                <span>Subtotal</span>
                <span className="font-medium text-[#2d2d2d]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#2d2d2d]/70">
                <span>Shipping</span>
                <span
                  className={`font-medium ${
                    shipping === 0
                      ? 'text-[#1a3c2a]'
                      : 'text-[#2d2d2d]'
                  }`}
                >
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#2d2d2d]/10 pt-2 text-base font-bold text-[#2d2d2d]">
                <span>Estimated Total</span>
                <span>${estimatedTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => setCheckoutMessage(true)}
              className="mt-4 w-full rounded-md bg-[#c8932a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b07e22] focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="mt-2 w-full py-2 text-center text-sm font-medium text-[#1a3c2a] transition-colors hover:text-[#1a3c2a]/70"
            >
              Continue Shopping
            </button>

            {/* Clear Cart */}
            <button
              type="button"
              onClick={clearCart}
              className="mt-1 w-full py-1 text-center text-xs text-[#2d2d2d]/40 transition-colors hover:text-red-600/70"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Checkout Coming Soon Modal */}
      {checkoutMessage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60"
          onClick={() => setCheckoutMessage(false)}
        >
          <div
            className="mx-4 max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a3c2a]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 text-[#1a3c2a]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-[#2d2d2d]">
              Checkout Coming Soon!
            </h3>
            <p className="mb-4 text-sm text-[#2d2d2d]/70">
              Online checkout is on its way. In the meantime, give us a call to
              place your order.
            </p>
            <a
              href="tel:+18004772368"
              className="inline-block rounded-md bg-[#1a3c2a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a3c2a]/90"
            >
              Call (800) 477-2368
            </a>
            <button
              type="button"
              onClick={() => setCheckoutMessage(false)}
              className="mt-3 block w-full text-center text-sm text-[#2d2d2d]/50 transition-colors hover:text-[#2d2d2d]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
