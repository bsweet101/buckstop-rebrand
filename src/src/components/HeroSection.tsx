import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: 'home' | 'page';
}

/**
 * Decorative antler rack SVG silhouette (10-point mature buck, front view).
 * Used as a large background element at low opacity.
 */
function AntlerSilhouette({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M400 580c0 0-4-30-4-60v-40c-8-2-16-6-22-12l-30 20c-12 8-28 4-36-8l-10-18c-6-10-4-22 2-30l34-38c-4-8-6-18-6-28l-48 10c-14 2-26-8-28-22l-2-20c-2-14 8-26 20-28l58-12c2-10 8-20 16-26l-42-36c-10-10-12-26-4-38l12-16c8-12 24-14 36-6l50 38c8-6 18-10 28-12l-14-56c-4-14 6-28 18-32l18-4c14-4 28 6 32 18l18 62c10 2 18 8 26 16l26-52c6-12 22-18 34-12l18 8c12 6 18 22 12 34l-28 58c6 8 8 18 8 28l54-18c14-4 28 4 32 18l4 18c4 14-4 28-18 32l-60 22c-2 10-6 20-14 28l38 32c10 10 14 26 6 38l-12 16c-8 12-24 16-36 8l-44-30c-8 6-16 10-26 12v40c0 30-4 60-4 60h-8z" />
    </svg>
  );
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref = '/',
  secondaryCtaText,
  secondaryCtaHref,
  variant = 'page',
}: HeroSectionProps) {
  const isHome = variant === 'home';

  return (
    <section
      className={`relative flex w-full items-center overflow-hidden ${
        isHome
          ? 'min-h-[480px] py-20 lg:py-32'
          : 'min-h-[300px] py-16'
      }`}
      style={{
        background: isHome
          ? 'linear-gradient(135deg, #0f2419 0%, #1a3c2a 45%, #2a5c40 100%)'
          : 'linear-gradient(135deg, #0f2419 0%, #1a3c2a 60%, #2d2d2d 100%)',
      }}
      aria-label={title}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==\")",
        }}
        aria-hidden="true"
      />

      {/* Decorative antler silhouette — right side, low opacity */}
      {isHome && (
        <AntlerSilhouette className="pointer-events-none absolute -right-20 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-white/[0.06] lg:h-[640px] lg:w-[640px]" />
      )}

      {/* Animated gradient shimmer (CSS-only) */}
      {isHome && (
        <div
          className="hero-shimmer pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      {isHome ? (
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Left column — text */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#c8932a]">
              Since 1953
            </span>

            <h1 className="font-serif text-4xl font-bold leading-tight text-[#f5f0e8] sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#f5f0e8]/80 sm:text-xl">
                {subtitle}
              </p>
            )}

            {ctaText && (
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={ctaHref}
                  className="inline-block rounded-md bg-[#c8932a] px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b07e22] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2 focus:ring-offset-[#1a3c2a]"
                >
                  {ctaText}
                </Link>
                {secondaryCtaText && secondaryCtaHref && (
                  <Link
                    href={secondaryCtaHref}
                    className="inline-block rounded-md border-2 border-white/70 px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-white/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a3c2a]"
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right column — logo / decorative */}
          <div className="hidden items-center justify-center lg:flex">
            <img
              src="/images/logo.png"
              alt="Buck Stop Lure Co."
              className="h-auto max-h-[320px] w-auto drop-shadow-2xl"
            />
          </div>
        </div>
      ) : (
        /* Page variant — centered, simpler */
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Eyebrow badge for consistency */}
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8932a]">
            Since 1953
          </span>

          <h1 className="font-serif text-3xl font-bold leading-tight text-[#f5f0e8] sm:text-4xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#f5f0e8]/80 sm:text-lg">
              {subtitle}
            </p>
          )}

          {ctaText && (
            <div className="mt-6">
              <Link
                href={ctaHref}
                className="inline-block rounded-md bg-[#c8932a] px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b07e22] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2 focus:ring-offset-[#1a3c2a]"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="ml-4 inline-block rounded-md border-2 border-white/70 px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-white/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a3c2a]"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      {/* CSS-only shimmer animation */}
      <style>{`
        .hero-shimmer {
          background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 40%,
            rgba(255,255,255,0.03) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
