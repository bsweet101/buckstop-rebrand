'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartIcon from '@/components/CartIcon';

/* Primary nav: 7 links max for clean desktop layout */
const navLinks: { label: string; href: string }[] = [
  { label: 'Products', href: '/products' },
  { label: 'Scent Guide', href: '/scent-guide' },
  { label: 'Rut Calendar', href: '/rut-calendar' },
  { label: 'Hunting Tips', href: '/hunting-tips' },
  { label: 'Find a Guide', href: '/find-a-guide' },
  { label: 'About', href: '/about' },
];

/* Mobile-only extra links (shown in drawer below primary) */
const mobileExtraLinks: { label: string; href: string }[] = [
  { label: 'Find Your Scent', href: '/scent-finder' },
  { label: 'Best Scents 2026', href: '/best-deer-scents' },
  { label: 'First Hunt Guide', href: '/first-hunt' },
  { label: 'Find a Dealer', href: '/find-a-dealer' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1a3c2a] shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" aria-label="Buck Stop Lure Co. Home">
            <img
              src="/images/logo.png"
              alt="Buck Stop Lure Co."
              className="h-8 w-auto lg:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-[#f5f0e8]/90 transition-colors hover:bg-[#f5f0e8]/10 hover:text-[#f5f0e8]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/first-hunt"
              className="rounded-md border border-[#c8932a]/40 px-4 py-2 text-sm font-semibold text-[#c8932a] transition-colors hover:bg-[#c8932a]/10"
            >
              First Hunt Guide
            </Link>
            <Link
              href="/scent-finder"
              className="rounded-md bg-[#c8932a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b07e22]"
            >
              Find Your Scent
            </Link>
            <CartIcon />
          </div>

          {/* Mobile Cart + Menu */}
          <div className="flex items-center gap-1 lg:hidden">
            <CartIcon />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-md p-2 text-[#f5f0e8] lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer — always rendered, animated via translate/opacity */}
      <div
        className={`fixed inset-0 top-16 z-40 lg:hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 top-16 bg-black/40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <nav
          id="mobile-menu"
          className={`fixed top-16 right-0 bottom-0 w-72 overflow-y-auto bg-[#1a3c2a] px-4 py-6 shadow-xl transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-base font-medium text-[#f5f0e8] transition-colors hover:bg-[#f5f0e8]/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-[#f5f0e8]/20 pt-4">
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-[#f5f0e8]/50">More</p>
            <ul className="space-y-1">
              {mobileExtraLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm text-[#f5f0e8]/80 transition-colors hover:bg-[#f5f0e8]/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
