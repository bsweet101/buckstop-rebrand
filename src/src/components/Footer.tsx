'use client';

import { useState } from 'react';
import Link from 'next/link';

const productLinks = [
  { label: 'Estrus Scents', href: '/products' },
  { label: 'Buck Scents', href: '/products' },
  { label: 'Cover Scents', href: '/products' },
  { label: 'Blends & Combos', href: '/products' },
  { label: 'All Products', href: '/products' },
];

const resourceLinks = [
  { label: 'Scent Guide & FAQ', href: '/scent-guide' },
  { label: 'Hunting Tips', href: '/hunting-tips' },
  { label: 'Find a Dealer', href: '/find-a-dealer' },
];

const trustBadges = [
  { label: 'Since 1953', icon: 'clock' },
  { label: 'Family Owned', icon: 'heart' },
  { label: 'Made in Michigan', icon: 'pin' },
  { label: '100% Guaranteed', icon: 'shield' },
] as const;

function TrustIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'clock':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case 'heart':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      );
    case 'pin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      );
    case 'shield':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <footer className="bg-[#f5f0e8]" role="contentinfo">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block" aria-label="Buck Stop Lure Co. Home">
              <img
                src="/images/logo.png"
                alt="Buck Stop Lure Co."
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#2d2d2d]/80">
              Crafting premium deer scents and hunting attractants since 1953.
              Family-owned and proudly made in Michigan.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/BuckStopLureCompany"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d2d2d]/60 transition-colors hover:text-[#1a3c2a]"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/buck_stop_lure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d2d2d]/60 transition-colors hover:text-[#1a3c2a]"
                aria-label="X (formerly Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCPdiYUD0f8ZkfMvC2vY4z9Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d2d2d]/60 transition-colors hover:text-[#1a3c2a]"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a3c2a]">
              Products
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#2d2d2d]/70 transition-colors hover:text-[#1a3c2a]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a3c2a]">
              Resources
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#2d2d2d]/70 transition-colors hover:text-[#1a3c2a]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a3c2a]">
              Contact
            </h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-[#2d2d2d]/70">
              <p>Buck Stop Lure Company</p>
              <p>Stanton, Michigan</p>
              <p>
                <a href="tel:+18004772368" className="transition-colors hover:text-[#1a3c2a]">
                  (800) 477-2368
                </a>
              </p>
              <p>
                <a href="mailto:info@buckstopscents.com" className="transition-colors hover:text-[#1a3c2a]">
                  info@buckstopscents.com
                </a>
              </p>
              <p className="font-semibold text-[#1a3c2a]">Free Shipping on Orders $49+</p>
              <p className="text-[#2d2d2d]/50">We accept all major credit cards</p>
            </address>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-[#1a3c2a]">Newsletter</h4>
              {subscribed ? (
                <p className="mt-2 text-sm text-[#1a3c2a]">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0 flex-1 rounded-md border border-[#2d2d2d]/20 bg-white px-3 py-2 text-sm text-[#2d2d2d] placeholder:text-[#2d2d2d]/40 focus:border-[#c8932a] focus:outline-none focus:ring-1 focus:ring-[#c8932a]"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-[#c8932a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#b07e22]"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-[#2d2d2d]/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-[#1a3c2a]">
                <TrustIcon icon={badge.icon} />
                <span className="text-xs font-medium uppercase tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#2d2d2d]/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[#2d2d2d]/50">
            &copy; {new Date().getFullYear()} Buck Stop Lure Company. All rights reserved.
          </p>
          <div className="mt-3 text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs text-[#2d2d2d]/40 transition-colors hover:text-[#1a3c2a]"
              aria-label="Back to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
