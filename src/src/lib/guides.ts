export type GuideSource = 'state-agency' | 'association' | 'self-registered' | 'directory' | 'seed';

export interface HuntingGuide {
  id: number;
  name: string;
  businessName: string;
  state: string;
  stateCode: string;
  city: string;
  species: Species[];
  methods: HuntingMethod[];
  experience: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  priceRange: PriceRange;
  buckStopPartner: boolean;
  rating?: number;
  reviewCount?: number;
  verified: boolean;
  source?: GuideSource;
}

export type Species = 'Whitetail' | 'Mule Deer' | 'Elk' | 'Bear' | 'Turkey' | 'Waterfowl' | 'Predator' | 'Hog' | 'Moose' | 'Antelope';
export type HuntingMethod = 'Bow' | 'Rifle' | 'Muzzleloader' | 'Crossbow' | 'Shotgun';
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export function getGuidesByState(guides: HuntingGuide[], stateCode: string): HuntingGuide[] {
  return guides.filter(g => g.stateCode === stateCode);
}

export function getGuidesBySpecies(guides: HuntingGuide[], species: Species): HuntingGuide[] {
  return guides.filter(g => g.species.includes(species));
}

export function getGuidesByMethod(guides: HuntingGuide[], method: HuntingMethod): HuntingGuide[] {
  return guides.filter(g => g.methods.includes(method));
}

export function searchGuides(guides: HuntingGuide[], query: string): HuntingGuide[] {
  const q = query.toLowerCase();
  return guides.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.businessName.toLowerCase().includes(q) ||
    g.city.toLowerCase().includes(q) ||
    g.state.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q)
  );
}

export function getUniqueStates(guides: HuntingGuide[]): { code: string; name: string; count: number }[] {
  const stateMap = new Map<string, { name: string; count: number }>();
  guides.forEach(g => {
    const existing = stateMap.get(g.stateCode);
    if (existing) existing.count++;
    else stateMap.set(g.stateCode, { name: g.state, count: 1 });
  });
  return Array.from(stateMap.entries())
    .map(([code, { name, count }]) => ({ code, name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const ALL_SPECIES: Species[] = ['Whitetail', 'Mule Deer', 'Elk', 'Bear', 'Turkey', 'Waterfowl', 'Predator', 'Hog', 'Moose', 'Antelope'];
export const ALL_METHODS: HuntingMethod[] = ['Bow', 'Rifle', 'Muzzleloader', 'Crossbow', 'Shotgun'];
