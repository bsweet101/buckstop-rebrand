// Buck Stop Lure Company - State Hunting Guide Index
// Aggregates all regional data and provides lookup utilities
//
// IMPORTANT DISCLAIMER: Season dates, regulations, license fees, and bag limits
// change annually. This guide provides approximate information for general reference
// only. Always verify current regulations with your state wildlife agency before
// hunting. Zone-specific rules may apply that are not reflected here.

import type { StateHuntingGuide } from './state-hunting-guide';
import { DISCLAIMER } from './state-hunting-guide';
import { northeastStates } from './hunting-data-northeast';
import { southeastStates } from './hunting-data-southeast';
import { midwestStates } from './hunting-data-midwest';
import { plainsStates } from './hunting-data-plains';
import { westernStates } from './hunting-data-west';
import { pacificStates } from './hunting-data-pacific';

export { DISCLAIMER } from './state-hunting-guide';
export type {
  StateHuntingGuide,
  HuntableSpecies,
  SeasonEntry,
  LicenseInfo,
  StateRegulations,
} from './state-hunting-guide';

/** All 50 states with complete hunting guide data */
export const allStateHuntingGuides: StateHuntingGuide[] = [
  ...northeastStates,
  ...southeastStates,
  ...midwestStates,
  ...plainsStates,
  ...westernStates,
  ...pacificStates,
];

/** Get hunting guide for a specific state by 2-letter code */
export function getStateGuide(stateCode: string): StateHuntingGuide | undefined {
  return allStateHuntingGuides.find(
    (s) => s.stateCode.toUpperCase() === stateCode.toUpperCase()
  );
}

/** Get all states in a region */
export function getStatesByRegion(region: string): StateHuntingGuide[] {
  return allStateHuntingGuides.filter((s) => s.region === region);
}

/** Get all states where a specific species is huntable */
export function getStatesForSpecies(speciesName: string): StateHuntingGuide[] {
  const lower = speciesName.toLowerCase();
  return allStateHuntingGuides.filter((s) =>
    s.species.some((sp) => sp.name.toLowerCase().includes(lower))
  );
}

/** Get all states where baiting is allowed */
export function getStatesWithBaiting(): StateHuntingGuide[] {
  return allStateHuntingGuides.filter(
    (s) => !s.regulations.baiting.toLowerCase().includes('prohibited')
  );
}

/** Get all states where Sunday hunting is allowed */
export function getStatesWithSundayHunting(): StateHuntingGuide[] {
  return allStateHuntingGuides.filter(
    (s) => s.regulations.sundayHunting.toLowerCase().includes('allowed')
  );
}

/** Get all states where crossbow is legal during archery season */
export function getStatesWithCrossbowArchery(): StateHuntingGuide[] {
  return allStateHuntingGuides.filter(
    (s) => s.regulations.crossbowDuringArchery === true
  );
}

/** Top 20 whitetail states -- curated list for Buck Stop content */
export const TOP_20_WHITETAIL_STATES = [
  'MI', 'WI', 'OH', 'PA', 'IL', 'IA', 'KS', 'IN', 'MO', 'MN',
  'TX', 'KY', 'TN', 'NC', 'GA', 'AL', 'MS', 'NY', 'VA', 'WV',
] as const;

/** Get the top 20 whitetail state guides */
export function getTopWhitetailStates(): StateHuntingGuide[] {
  return TOP_20_WHITETAIL_STATES.map((code) => getStateGuide(code)).filter(
    (s): s is StateHuntingGuide => s !== undefined
  );
}

/** All unique regions */
export const ALL_REGIONS = [
  'Northeast',
  'Southeast',
  'Midwest',
  'Plains',
  'South',
  'Mountain West',
  'Pacific West',
] as const;

/** Quick stat: total number of states covered */
export const TOTAL_STATES = allStateHuntingGuides.length;
