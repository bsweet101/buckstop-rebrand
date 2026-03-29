import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'

export const dynamic = 'force-static'

const BASE_URL = 'https://www.buckstopscents.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/scent-guide`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hunting-tips`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/find-a-dealer`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/scent-finder`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/find-a-guide`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/best-deer-scents`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/rut-calendar`,
      lastModified: new Date('2026-03-29'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/first-hunt`,
      lastModified: new Date('2026-03-29'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/products/estrus-scents`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/products/buck-scents`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/products/buck-beads`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/products/combos-kits`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date('2025-01-01'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
