import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      {/* Deer silhouette */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="mb-6 h-24 w-24 text-[#c8932a]/40"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
      </svg>

      <h1 className="mb-3 font-serif text-4xl font-bold text-[#1a3c2a] sm:text-5xl">
        Trail Gone Cold
      </h1>
      <p className="mx-auto mb-8 max-w-md text-lg text-[#2d2d2d]/60">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved or removed.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-[#1a3c2a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a5c40]"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="rounded-lg border border-[#c8932a] px-6 py-3 text-sm font-semibold text-[#c8932a] transition-colors hover:bg-[#c8932a] hover:text-white"
        >
          Shop Products
        </Link>
      </div>
    </div>
  );
}
