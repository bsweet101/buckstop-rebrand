'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  }

  return (
    <section className="bg-[#1a3c2a] py-16" aria-label="Newsletter signup">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[#f5f0e8] sm:text-4xl">
          Join the Hunt
        </h2>
        <p className="mt-3 text-lg text-[#f5f0e8]/80">
          Get field-tested tips &amp; exclusive deals delivered to your inbox.
        </p>
        <p className="mt-2 text-sm font-semibold text-[#c8932a]">
          Sign up today and get 10% off your first order.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-lg bg-[#f5f0e8]/10 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto h-10 w-10 text-[#c8932a]"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="mt-3 text-lg font-semibold text-[#f5f0e8]">
              You&apos;re in! Check your inbox for your 10% discount code.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 rounded-md border-0 bg-white/10 px-4 py-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/50 focus:outline-none focus:ring-2 focus:ring-[#c8932a] sm:max-w-sm"
            />
            <button
              type="submit"
              className="rounded-md bg-[#c8932a] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b07e22] focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2 focus:ring-offset-[#1a3c2a]"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-[#f5f0e8]/50">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
