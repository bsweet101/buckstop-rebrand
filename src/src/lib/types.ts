// Buck Stop Lure Company - TypeScript Type Definitions

/** Seasonal usage tags for deer hunting products */
export type SeasonalTag =
  | 'Pre-Rut'
  | 'Peak Rut'
  | 'Post-Rut'
  | 'Early Season'
  | 'Late Season'
  | 'All Season';

/** Marketing badges displayed on product cards */
export type ProductBadge =
  | 'Best Seller'
  | 'Web Only'
  | 'New'
  | 'Pro Pick'
  | 'Value Pack'
  | 'Limited';

/** Product category slugs matching the site taxonomy */
export type CategorySlug =
  | 'estrus-scents'
  | 'buck-scents'
  | 'blend-combos'
  | 'buck-beads'
  | 'cover-scents'
  | 'training'
  | 'odor-elimination'
  | 'trapping';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: CategorySlug;
  size: string;
  image: string;
  inStock: boolean;
  badges: ProductBadge[];
  seasonalTags: SeasonalTag[];
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: number;
  author: string;
  date: string;
  title: string;
  quote: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneOrders: string;
  phoneService: string;
  email: string;
  social: {
    facebook: string;
    twitter: string;
    youtube: string;
  };
}

export interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface HeroSlide {
  headline: string;
  subtext: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface CategorySummary {
  name: string;
  slug: string;
  productCount: number;
  color: string;
}
