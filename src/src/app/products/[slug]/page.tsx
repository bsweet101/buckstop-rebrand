import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { products, getProductBySlug, getProductsByCategory } from '@/lib/products';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema';
import type { Product } from '@/lib/types';
import AddToCartButton from '@/components/AddToCartButton';

// ── Static Generation ───────────────────────────────────────────

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// ── Dynamic Metadata ────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const categoryLabel = product.category.replace(/-/g, ' ');

  return {
    title: `${product.name} | Buck Stop Lure Co.`,
    description: `${product.description.slice(0, 155)}...`,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
      url: `https://www.buckstopscents.com/products/${product.slug}`,
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
    keywords: [
      product.name,
      categoryLabel,
      'deer scent',
      'hunting lure',
      'Buck Stop',
      ...product.seasonalTags,
    ],
  };
}

// ── Category Colors ─────────────────────────────────────────────

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

// ── Related Products Helper ─────────────────────────────────────

function getRelatedProducts(current: Product, count: number): Product[] {
  const sameCat = getProductsByCategory(current.category).filter(
    (p) => p.id !== current.id
  );
  if (sameCat.length >= count) return sameCat.slice(0, count);
  // Backfill from other categories if not enough
  const others = products.filter(
    (p) => p.id !== current.id && p.category !== current.category
  );
  return [...sameCat, ...others].slice(0, count);
}

// ── Page Component ──────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryLabel = product.category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const bgColor = categoryColors[product.category] ?? '#2d2d2d';
  const related = getRelatedProducts(product, 4);

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#2d2d2d]/10 bg-[#f5f0e8]"
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-[#2d2d2d]/60">
            <li>
              <Link href="/" className="transition-colors hover:text-[#1a3c2a]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-[#1a3c2a]"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#1a3c2a] truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Column - Product Image */}
          <div className="relative overflow-hidden rounded-xl border border-[#2d2d2d]/10 bg-[#f5f0e8] p-8 shadow-md">
            {product.image ? (
              <div className="relative aspect-square">
                {/* Subtle category-colored gradient backdrop */}
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `radial-gradient(ellipse at center, ${bgColor}10 0%, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative h-full w-full object-contain mix-blend-multiply"
                />
                {/* Soft vignette */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.04)',
                  }}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div
                className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-lg"
                style={{ backgroundColor: bgColor }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="h-28 w-28 text-white/20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
                </svg>
                <span className="text-4xl font-serif font-bold text-white/30">
                  {product.name
                    .split(' ')
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
            )}

            {/* Badges */}
            {product.badges.length > 0 && (
              <div className="absolute top-10 left-10 flex flex-col gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-[#1a3c2a] px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <Link
              href={`/products?category=${product.category}`}
              className="mb-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: bgColor }}
            >
              {categoryLabel}
            </Link>

            {/* Product Name */}
            <h1 className="font-serif text-3xl font-bold text-[#2d2d2d] sm:text-4xl">
              {product.name}
            </h1>

            {/* Star Rating */}
            {product.rating && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center" aria-label={`Rated ${product.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill={star <= Math.round(product.rating!) ? '#d97706' : '#d1d5db'}
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-[#2d2d2d]/60">
                  {product.rating} out of 5 ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Seasonal Tags */}
            {product.seasonalTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.seasonalTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1a3c2a]/20 bg-[#1a3c2a]/5 px-3 py-1 text-xs font-medium text-[#1a3c2a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <p className="mt-6 text-4xl font-bold text-[#1a3c2a]">
              ${product.price.toFixed(2)}
            </p>

            {/* Size */}
            <p className="mt-2 text-sm text-[#2d2d2d]/60">
              Size: <span className="font-medium text-[#2d2d2d]">{product.size}</span>
            </p>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-[#2d2d2d]/80">
              {product.description}
            </p>

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Trust Micro-Copy */}
            <p className="mt-4 text-center text-sm text-[#2d2d2d]/50">
              100% Money-Back Guarantee | Free Shipping $49+
            </p>

            {/* Phone Order */}
            <p className="mt-2 text-center text-sm text-[#2d2d2d]/60">
              Call to Order:{' '}
              <a
                href="tel:+18004772368"
                className="font-semibold text-[#1a3c2a] hover:underline"
              >
                (800) 477-2368
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="border-t border-[#2d2d2d]/10 bg-[#f5f0e8]">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="mb-8 font-serif text-2xl font-bold text-[#1a3c2a]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-[#2d2d2d]/10 bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div
                    className="relative aspect-square overflow-hidden"
                    style={{
                      backgroundColor:
                        categoryColors[item.category] ?? '#2d2d2d',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="h-16 w-16 text-white/20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-1 text-xs font-medium uppercase tracking-wider text-[#c8932a]">
                      {item.category.replace(/-/g, ' ')}
                    </span>
                    <h3 className="text-sm font-semibold text-[#2d2d2d] transition-colors group-hover:text-[#1a3c2a]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-lg font-bold text-[#1a3c2a]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
