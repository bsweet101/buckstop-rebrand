// Buck Stop Lure Company - Product Data & Helper Functions

import type { Product, CategorySlug } from './types';

export const products: Product[] = [
  // ── Estrus Scents ──────────────────────────────────────────────
  {
    id: 1,
    name: 'MATE-TRIKS Original Doe-In-Heat 1.25oz',
    slug: 'mate-triks-original-doe-in-heat-1-25oz',
    price: 7.99,
    description:
      'The scent that started the industry in 1972. MATE-TRIKS is the original doe-in-heat estrus formula -- collected from live whitetail does at peak cycle and trusted by more deer camps than any other bottle on the shelf. Seven decades of fills, seven decades of filled tags. Squeeze bottle for precise placement on drag rags, scrapes, and boot pads.',
    category: 'estrus-scents',
    size: '1.25 oz',
    image: '/images/products/mate-triks-original.jpg',
    inStock: true,
    badges: ['Best Seller'],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: 2,
    name: 'MATE-TRIKS SPRAY Doe-In-Heat 2oz',
    slug: 'mate-triks-spray-doe-in-heat-2oz',
    price: 9.99,
    description:
      'Same proven MATE-TRIKS Doe-In-Heat formula in a convenient spray bottle. Ideal for quick application on scrapes, licking branches, and scent wicks. Fine mist spray covers a wider area for maximum scent dispersal.',
    category: 'estrus-scents',
    size: '2 oz',
    image: '/images/products/mate-triks-spray.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: 3,
    name: 'MATE-TRIKS PRO-SIZE Doe-In-Heat 4oz',
    slug: 'mate-triks-pro-size-doe-in-heat-4oz',
    price: 12.99,
    description:
      'Professional-size bottle of MATE-TRIKS Doe-In-Heat for serious hunters who need more scent for extended hunts and multiple stand locations. Same trusted estrus formula, twice the volume.',
    category: 'estrus-scents',
    size: '4 oz',
    image: '/images/products/mate-triks-pro.jpg',
    inStock: true,
    badges: ['Value Pack'],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.7,
    reviewCount: 68,
  },
  {
    id: 4,
    name: '200 PROOF Ultimate Doe-In-Heat 2oz',
    slug: '200-proof-ultimate-doe-in-heat-2oz',
    price: 13.99,
    description:
      'When a mature buck is locked down with a doe and nothing else will move him, 200 PROOF pulls him away. Single-doe collection at peak estrus delivers a concentrated scent signature that cuts through the noise of the rut. This is the bottle trophy hunters reach for when the stakes are highest.',
    category: 'estrus-scents',
    size: '2 oz',
    image: '/images/products/200-proof.png',
    inStock: true,
    badges: ['Best Seller', 'Pro Pick'],
    seasonalTags: ['Peak Rut'],
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 5,
    name: 'X-CEL Fresh Estrus Buck Lure 1.25oz',
    slug: 'x-cel-fresh-estrus-buck-lure-1-25oz',
    price: 10.99,
    description:
      'A fresh estrus-based buck lure designed to attract dominant bucks looking for does. Works as both an attractant and a curiosity lure. Effective from pre-rut through post-rut periods.',
    category: 'estrus-scents',
    size: '1.25 oz',
    image: '/images/products/x-cel.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['Pre-Rut', 'Peak Rut', 'Post-Rut'],
    rating: 4.7,
    reviewCount: 31,
  },
  {
    id: 6,
    name: 'THE PEAK Premium Doe-In-Heat 2oz',
    slug: 'the-peak-premium-doe-in-heat-2oz',
    price: 16.99,
    description:
      'Peak-of-the-peak collection in a glass bottle that preserves every molecule of scent. THE PEAK is harvested from a single doe at the absolute zenith of her estrus cycle -- a narrower collection window than 200 PROOF for hunters who want the most refined, potent estrus scent we have ever produced. When you only get one sit at the buck of a lifetime, this is what you carry in.',
    category: 'estrus-scents',
    size: '2 oz',
    image: '/images/products/the-peak.jpg',
    inStock: true,
    badges: ['Pro Pick'],
    seasonalTags: ['Peak Rut'],
    rating: 4.8,
    reviewCount: 56,
  },
  {
    id: 21,
    name: 'Guide Grade Scents Doe-In-Heat 2oz',
    slug: 'guide-grade-scents-doe-in-heat-2oz',
    price: 19.99,
    description:
      'The scent our guides trust when their reputation is on the line. Guide Grade is hand-selected from our finest single-doe collections and reserved for outfitters and serious hunters who cannot afford a slow day in the stand. When a paying client is in the tree and you need a buck on his feet, this is the bottle you reach for.',
    category: 'estrus-scents',
    size: '2 oz',
    image: '/images/products/guide-grade.jpg',
    inStock: true,
    badges: ['Pro Pick', 'Web Only'],
    seasonalTags: ['Peak Rut'],
    rating: 4.9,
    reviewCount: 89,
  },

  // ── Buck Scents ────────────────────────────────────────────────
  {
    id: 7,
    name: "RUCK'N BUCK Dominant Buck Urine 2oz",
    slug: 'ruckn-buck-dominant-buck-urine-2oz',
    price: 13.99,
    description:
      'Collected from mature, dominant breeding bucks. Use in scrapes and scent trails to challenge territorial bucks. Creates the illusion of a rival buck invading the area, triggering aggressive responses from resident bucks.',
    category: 'buck-scents',
    size: '2 oz',
    image: '/images/products/ruckn-buck.jpg',
    inStock: true,
    badges: ['Best Seller'],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.8,
    reviewCount: 145,
  },
  {
    id: 11,
    name: 'SUPREME BUCK URINE 1.25oz',
    slug: 'supreme-buck-urine-1-25oz',
    price: 7.99,
    description:
      'All-purpose buck urine collected from healthy whitetail bucks. Effective for refreshing scrapes, laying scent trails, and calming deer in the area. A versatile scent for early season through late season use.',
    category: 'buck-scents',
    size: '1.25 oz',
    image: '/images/products/supreme-buck.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.5,
    reviewCount: 92,
  },

  // ── Blend / Combo Products ────────────────────────────────────
  {
    id: 8,
    name: 'FIVE 2oz',
    slug: 'five-2oz',
    price: 13.99,
    description:
      'A proprietary five-scent blend combining buck urine, doe urine, estrus, tarsal gland, and forehead gland secretions. Creates a complete mock-scrape scent profile in one bottle. Highly effective during the rut.',
    category: 'blend-combos',
    size: '2 oz',
    image: '/images/products/five.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.6,
    reviewCount: 37,
  },
  {
    id: 9,
    name: 'ALURE 1.25oz',
    slug: 'alure-1-25oz',
    price: 8.99,
    description:
      'A curiosity-based attractant blend that appeals to a deer\'s natural instinct to investigate new scents. Works on both bucks and does. Effective throughout the entire season as a standalone lure or paired with other scents.',
    category: 'blend-combos',
    size: '1.25 oz',
    image: '/images/products/alure.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.4,
    reviewCount: 28,
  },
  {
    id: 10,
    name: 'BUC PLUS 1.25oz',
    slug: 'buc-plus-1-25oz',
    price: 8.99,
    description:
      'An enhanced buck urine blend boosted with tarsal gland and other natural secretions. Simulates a dominant buck in the area. Use in scrapes, on scent trails, and near stand sites to draw bucks into range.',
    category: 'blend-combos',
    size: '1.25 oz',
    image: '/images/products/buc-plus.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.5,
    reviewCount: 64,
  },
  {
    id: 16,
    name: 'BAG-A-BUCK Kit',
    slug: 'bag-a-buck-kit',
    price: 16.99,
    description:
      'One bag. Everything you need. Do not guess which bottle to grab on November 7th -- BAG-A-BUCK gives you estrus scent, buck urine, cover scent, and scent wicks in a single carry kit built for rut-week simplicity. Grab it, walk to the stand, and hunt with a complete scent system from day one.',
    category: 'blend-combos',
    size: 'Kit',
    image: '/images/products/bag-a-buck.jpg',
    inStock: true,
    badges: ['Value Pack', 'Best Seller'],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.7,
    reviewCount: 112,
  },

  // ── Gland Lures (Cover / Curiosity) ──────────────────────────
  {
    id: 12,
    name: 'GLAND-U-LURE 1.25oz',
    slug: 'gland-u-lure-1-25oz',
    price: 6.99,
    description:
      'Natural glandular-based lure extracted from whitetail deer glands. Triggers curiosity and territorial responses in bucks. Apply to scrapes, licking branches, and scent wicks near your stand for close-range encounters.',
    category: 'cover-scents',
    size: '1.25 oz',
    image: '/images/products/gland-u-lure.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.6,
    reviewCount: 78,
  },
  {
    id: 13,
    name: 'GLAND-U-LURE SPRAY 2oz',
    slug: 'gland-u-lure-spray-2oz',
    price: 8.99,
    description:
      'Spray version of the classic GLAND-U-LURE for faster, wider application. Fine mist applicator lets you cover scrapes, trails, and vegetation quickly. Same proven glandular formula in a convenient spray format.',
    category: 'cover-scents',
    size: '2 oz',
    image: '/images/products/gland-u-lure-spray.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.6,
    reviewCount: 34,
  },
  {
    id: 14,
    name: 'GLAND-U-LURE TR 2oz',
    slug: 'gland-u-lure-tr-2oz',
    price: 9.99,
    description:
      'Trapper-grade formulation of GLAND-U-LURE with enhanced concentration for use in trapping sets. Effective on multiple species including whitetail, coyote, and fox. A favorite among professional trappers.',
    category: 'trapping',
    size: '2 oz',
    image: '/images/products/gland-u-lure-tr.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.6,
    reviewCount: 22,
  },
  {
    id: 15,
    name: 'GLAND-U-LURE PRO SIZE 4oz',
    slug: 'gland-u-lure-pro-size-4oz',
    price: 11.99,
    description:
      'Professional-size bottle of GLAND-U-LURE for outfitters, guides, and hunters managing multiple stand locations. Same powerful glandular formula, double the volume for extended season use.',
    category: 'cover-scents',
    size: '4 oz',
    image: '/images/products/gland-u-lure-pro.jpg',
    inStock: true,
    badges: ['Value Pack'],
    seasonalTags: ['All Season'],
    rating: 4.6,
    reviewCount: 51,
  },

  // ── Buck Beads ─────────────────────────────────────────────────
  {
    id: 17,
    name: 'MATE-TRIKS BUCK BEADS 5.75oz',
    slug: 'mate-triks-buck-beads-5-75oz',
    price: 10.99,
    description:
      'Scent-infused biodegradable beads loaded with MATE-TRIKS Doe-In-Heat formula. Slow-release technology provides long-lasting scent dispersal over days. Simply pour near scrapes, trails, or stand sites.',
    category: 'buck-beads',
    size: '5.75 oz',
    image: '/images/products/buck-beads-mate-triks.jpg',
    inStock: true,
    badges: ['Best Seller'],
    seasonalTags: ['Pre-Rut', 'Peak Rut'],
    rating: 4.7,
    reviewCount: 86,
  },
  {
    id: 18,
    name: 'SWEET CORN BUCK BEADS 5.75oz',
    slug: 'sweet-corn-buck-beads-5-75oz',
    price: 9.99,
    description:
      'Food-scented biodegradable beads with a sweet corn aroma that attracts deer throughout the season. Moisture-activated slow-release formula provides consistent scent output. Works as an attractant and curiosity lure.',
    category: 'buck-beads',
    size: '5.75 oz',
    image: '/images/products/buck-beads-sweet-corn.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.5,
    reviewCount: 45,
  },
  {
    id: 19,
    name: 'GLAND-U-LURE BUCK BEADS 5.75oz',
    slug: 'gland-u-lure-buck-beads-5-75oz',
    price: 9.99,
    description:
      'Biodegradable beads infused with GLAND-U-LURE glandular scent. Slow-release formula keeps scrapes and trails active for days. Pour directly into scrapes or scatter along deer trails for sustained attraction.',
    category: 'buck-beads',
    size: '5.75 oz',
    image: '/images/products/buck-beads-gland-u-lure.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.4,
    reviewCount: 38,
  },
  {
    id: 20,
    name: 'SUGAR BEET BUCK BEADS 5.75oz',
    slug: 'sugar-beet-buck-beads-5-75oz',
    price: 9.99,
    description:
      'Food-scented biodegradable beads with a natural sugar beet aroma. Attracts deer with a familiar agricultural food scent. Moisture-activated slow-release technology for long-lasting effectiveness in the field.',
    category: 'buck-beads',
    size: '5.75 oz',
    image: '/images/products/buck-beads-sugar-beet.jpg',
    inStock: true,
    badges: [],
    seasonalTags: ['All Season'],
    rating: 4.3,
    reviewCount: 29,
  },
];

// ── Helper Functions ──────────────────────────────────────────────

/** Returns all products in a given category */
export function getProductsByCategory(category: CategorySlug | string): Product[] {
  return products.filter((p) => p.category === category);
}

/** Returns products flagged as featured (have at least one badge) */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badges.length > 0);
}

/** Finds a single product by its URL slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Returns products matching a specific seasonal tag */
export function getProductsBySeason(tag: Product['seasonalTags'][number]): Product[] {
  return products.filter((p) => p.seasonalTags.includes(tag));
}

/** Returns all unique category slugs that have products */
export function getActiveCategories(): CategorySlug[] {
  return [...new Set(products.map((p) => p.category))];
}
