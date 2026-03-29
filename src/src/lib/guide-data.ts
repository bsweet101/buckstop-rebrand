// Buck Stop Lure Company - Hunting Guide Directory Data
// Merged from all 50 US states
// Seed data will be progressively replaced with real scraped data from
// state wildlife agencies, outfitter associations, and verified registrations.

import type { HuntingGuide } from './guides';
import type { SeedGuide } from './guide-data-am';
import { guidesAM } from './guide-data-am';
import { guidesNW } from './guide-data-nw';
import type { ScrapedGuide } from './guide-data-scraped';
import { scrapedGuides } from './guide-data-scraped';

// Apply default verified/source fields to all seed data entries
function withSeedDefaults(rawGuides: SeedGuide[]): HuntingGuide[] {
  return rawGuides.map((g) => ({
    ...g,
    verified: false,
    source: 'seed' as const,
  }));
}

// Apply directory source to scraped real-world listings
function withScrapedDefaults(rawGuides: ScrapedGuide[]): HuntingGuide[] {
  return rawGuides.map((g) => ({
    ...g,
    verified: false,
    source: 'directory' as const,
  }));
}

export const guides: HuntingGuide[] = [
  ...withSeedDefaults(guidesAM),
  ...withSeedDefaults(guidesNW),
  ...withScrapedDefaults(scrapedGuides),
];
