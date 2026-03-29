'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, getActiveCategories } from '@/lib/products';
import { categories } from '@/lib/content';
import type { CategorySlug } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import HeroSection from '@/components/HeroSection';

const categoryLabels: Record<string, string> = {};
categories.forEach((c) => {
  categoryLabels[c.slug] = c.name;
});

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<CategorySlug | 'all'>('all');
  const activeSlugs = getActiveCategories();

  // Read category from URL on mount and when search params change
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && activeSlugs.includes(catParam as CategorySlug)) {
      setActiveCategory(catParam as CategorySlug);
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  /** Update category and sync URL */
  function handleCategoryChange(cat: CategorySlug | 'all') {
    setActiveCategory(cat);
    const url = cat === 'all' ? '/products' : `/products?category=${cat}`;
    window.history.pushState({}, '', url);
  }

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <HeroSection
        title="Our Products"
        subtitle="Over 150 proven deer scents, lures, and attractants trusted by hunters since 1953."
        variant="page"
      />

      {/* SEO Intro */}
      <section className="bg-white border-b border-cream-dark">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center">
          <p className="text-charcoal/80 leading-relaxed max-w-3xl mx-auto">
            Browse the complete lineup from America&apos;s original deer scent company. Since 1953,
            Buck Stop Lure Co. has manufactured premium deer scents, buck lures, estrus attractants,
            cover scents, and scent elimination products in Stanton, Michigan. Every product is made
            from natural ingredients, field-tested by hunters, and backed by over 70 years of proven
            results. From our flagship Mate-Triks Doe-In-Heat to our innovative Buck Beads
            slow-release system, you will find the right scent for every season and every strategy.
          </p>
        </div>
      </section>

      <section className="bg-cream border-b border-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-forest text-white'
                  : 'bg-white text-charcoal hover:bg-forest-light hover:text-white'
              }`}
            >
              All Products ({products.length})
            </button>
            {activeSlugs.map((slug) => {
              const count = products.filter((p) => p.category === slug).length;
              return (
                <button
                  key={slug}
                  onClick={() => handleCategoryChange(slug)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === slug
                      ? 'bg-forest text-white'
                      : 'bg-white text-charcoal hover:bg-forest-light hover:text-white'
                  }`}
                >
                  {categoryLabels[slug] || slug} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="mb-8 text-charcoal-light transition-all duration-300">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'all' && (
            <>
              {' in '}
              <span className="font-semibold text-forest">
                {categoryLabels[activeCategory] || activeCategory}
              </span>
            </>
          )}
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="mx-auto mb-4 h-16 w-16 text-charcoal/20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
            </svg>
            <p className="text-lg font-serif font-semibold text-charcoal/60 mb-2">No products found</p>
            <p className="text-sm text-charcoal-light">Try selecting a different category or browse all products.</p>
          </div>
        )}
      </section>
    </>
  );
}
