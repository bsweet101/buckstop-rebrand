// Buck Stop Lure Company - JSON-LD Schema Generators for SEO

import type { Product, FAQ, BreadcrumbItem } from './types';
import { companyInfo } from './content';

/**
 * Generates Product schema (Schema.org) for a single product page.
 * Helps search engines display rich product snippets with price and availability.
 */
export function generateProductSchema(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(product.image ? { image: `https://www.buckstopscents.com${product.image}` } : {}),
    sku: `BS-${String(product.id).padStart(3, '0')}`,
    brand: {
      '@type': 'Brand',
      name: 'Buck Stop Lure Company',
    },
    ...(product.rating ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.toString(),
        reviewCount: (product.reviewCount || 0).toString(),
        bestRating: '5',
        worstRating: '1',
      }
    } : {}),
    offers: {
      '@type': 'Offer',
      url: `https://www.buckstopscents.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: companyInfo.name,
      },
    },
  };
}

/**
 * Generates LocalBusiness schema for the company.
 * Helps search engines display business info in local search results and knowledge panels.
 */
export function generateLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    description:
      'Premium deer scents and hunting lures since 1953. Manufacturer of Doe-In-Heat estrus scents, buck urine, glandular lures, and odor elimination products.',
    url: 'https://www.buckstopscents.com',
    logo: 'https://www.buckstopscents.com/images/logo.png',
    // image omitted - no storefront image available
    telephone: companyInfo.phoneOrders,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3600 Grow Road, PO Box 636',
      addressLocality: companyInfo.city,
      addressRegion: companyInfo.state,
      postalCode: companyInfo.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.2928,
      longitude: -85.0814,
    },
    sameAs: [
      companyInfo.social.facebook,
      companyInfo.social.twitter,
      companyInfo.social.youtube,
    ],
    foundingDate: '1953',
    priceRange: '$6.99 - $19.99',
    paymentAccepted: 'Credit Card, Debit Card',
    openingHours: 'Mo-Fr 08:00-17:00',
  };
}

/**
 * Generates FAQPage schema for the FAQ section.
 * Enables rich FAQ snippets in Google search results.
 */
export function generateFAQSchema(faqs: FAQ[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates BreadcrumbList schema for navigation breadcrumbs.
 * Helps search engines understand site hierarchy and display breadcrumb trails in results.
 */
/**
 * Generates HowTo schema for step-by-step instructional content.
 * Enables rich how-to snippets in Google search results.
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[],
  totalTime?: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * Generates Article schema for informational content pages.
 * Helps search engines display article rich snippets with author and date info.
 */
export function generateArticleSchema(
  title: string,
  description: string,
  datePublished: string,
  dateModified: string,
  authorName: string = 'Brian Johansen',
  url?: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: authorName },
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'Buck Stop Lure Company',
      url: 'https://www.buckstopscents.com',
    },
    ...(url ? { url } : {}),
  };
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `https://www.buckstopscents.com${item.url}`,
    })),
  };
}
