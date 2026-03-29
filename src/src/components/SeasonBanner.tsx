'use client';

import { useState } from 'react';

export default function SeasonBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-50 bg-[#1a3c2a] py-2 text-sm text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-center">
          <span className="font-semibold text-[#c8932a]">Rut Season Essentials</span>
          {' '}&mdash; Free Shipping on Orders $49+ | Call to Order:{' '}
          <a href="tel:+18004772368" className="underline hover:text-[#c8932a]">
            (800) 477-2368
          </a>
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="ml-4 flex-shrink-0 text-white/70 transition-colors hover:text-white"
          aria-label="Dismiss banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
