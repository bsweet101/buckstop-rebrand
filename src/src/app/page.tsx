import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import TrustBanner from '@/components/TrustBanner';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getFeaturedProducts } from '@/lib/products';
import { testimonials, categories } from '@/lib/content';
import { generateLocalBusinessSchema } from '@/lib/schema';
import type { CategorySummary } from '@/lib/types';

export const metadata: Metadata = {
  title: "Buck Stop Lure Co. | Deer Scents Since 1953",
  description:
    "America's original deer scent since 1953. Shop estrus scents, buck lures & cover scents. Michigan-made, 100% guaranteed. Shop now.",
};

// Map Category to CategorySummary for the CategoryCard component
const categoryColors: Record<string, string> = {
  'estrus-scents': '#1a3c2a',
  'buck-scents': '#2a5c40',
  'blend-combos': '#4a6741',
  'buck-beads': '#c8932a',
  'cover-scents': '#5a3e1b',
  'training': '#3d5c4a',
  'odor-elimination': '#2d2d2d',
  'trapping': '#6b4423',
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const localBusinessSchema = generateLocalBusinessSchema();
  const highlightedTestimonials = testimonials.slice(0, 2);

  const categorySummaries: CategorySummary[] = categories
    .filter((cat) => cat.productCount > 0)
    .slice(0, 6)
    .map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      productCount: cat.productCount,
      color: categoryColors[cat.slug] ?? '#1a3c2a',
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="America's Original Deer Scent Company"
        subtitle="Trusted by hunters since 1953. Family owned, Michigan made."
        ctaText="Shop Our Scents"
        ctaHref="/products"
        variant="home"
        secondaryCtaText="Best Sellers from $6.99"
        secondaryCtaHref="#featured-products"
      />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Featured Products */}
      <section id="featured-products" className="animate-fade-in py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="featured-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-4">
              What Hunters Are Reaching For
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Our most popular scents and lures, trusted by hunters across America.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Inline Testimonial */}
          <div className="mt-10 rounded-lg bg-[#1a3c2a] px-6 py-5 text-center">
            <p className="text-sm italic text-white/90">
              &ldquo;Took an 8-point buck with an 18-inch spread weighing 190 pounds using 200 Proof and Scent Stop products. The combination of a quality attractant and scent elimination was unbeatable.&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold text-[#c8932a]">&mdash; Brian</p>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block bg-amber text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="animate-fade-in py-16 px-4 sm:px-6 lg:px-8 bg-cream" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-4">
              Find Your Scent Strategy
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Find the right scent for every season and situation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySummaries.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white" aria-labelledby="heritage-heading">
        <div className="max-w-5xl mx-auto text-center">
          <h2 id="heritage-heading" className="text-3xl sm:text-4xl font-serif font-bold mb-6">
            Our Heritage
          </h2>
          <p className="text-lg leading-relaxed mb-4 text-white/90 max-w-3xl mx-auto">
            Founded in 1953 by Don Garbow in Stanton, Michigan, Buck Stop Lure Company
            pioneered the deer scent industry. What started as a passion for whitetail
            hunting became America&apos;s first commercially produced deer scent.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-white/90 max-w-3xl mx-auto">
            Now led by Bonnie and Brian Johansen, the tradition of quality and innovation
            continues. Every product is still made in Michigan with the same commitment
            to excellence that has defined our brand for over 70 years.
          </p>
          <Link
            href="/about"
            className="inline-block bg-amber text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
          >
            Read Our Story
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark" aria-labelledby="testimonials-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest text-center mb-12">
            What Hunters Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlightedTestimonials.map((testimonial) => (
              <blockquote
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-[#c8932a]"
              >
                <h3 className="text-lg font-serif font-bold text-forest mb-3">
                  {testimonial.title}
                </h3>
                <p className="text-charcoal/80 italic mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="text-sm font-semibold text-forest">
                  {testimonial.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
