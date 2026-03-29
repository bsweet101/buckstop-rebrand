import Link from 'next/link';
import type { CategorySummary } from '@/lib/types';

interface CategoryCardProps {
  category: CategorySummary;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-lg p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{ backgroundColor: category.color }}
    >
      {/* Decorative deer icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="absolute top-4 right-4 h-16 w-16 text-white/10"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20 8c0 0-4-6-8-6s-2 4-2 4l4 6-4 4s6 2 8 0l2-4v8l-8 12v12h4l4-8 4 8h4V28l6-6 4 2c2-2 4-6 2-8l-4-2-4 4-2-4V8h-4l-2 4z" />
      </svg>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />

      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white">{category.name}</h3>
        <p className="mt-1 text-sm text-white/70">
          {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#c8932a] transition-colors group-hover:text-[#f5f0e8]">
          Shop Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
