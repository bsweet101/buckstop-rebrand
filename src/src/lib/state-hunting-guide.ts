// Buck Stop Lure Company - Comprehensive State Hunting Guide Data
// All 50 US states with huntable species, seasons, license info, regulations, and agency contacts
//
// DISCLAIMER: This information is provided for general reference only. Season dates,
// regulations, and license fees change annually. Always verify current regulations
// with your state wildlife agency before hunting. Data reflects approximate 2025-2026
// season structures and may not capture all zone-specific variations.

export interface StateHuntingGuide {
  stateCode: string;
  stateName: string;
  region: string;
  species: HuntableSpecies[];
  seasons: SeasonEntry[];
  licenseInfo: LicenseInfo;
  regulations: StateRegulations;
  agencyName: string;
  agencyUrl: string;
}

export interface HuntableSpecies {
  name: string;
  category: 'big-game' | 'upland' | 'waterfowl' | 'small-game' | 'predator' | 'other';
}

export interface SeasonEntry {
  type: 'archery' | 'firearm' | 'muzzleloader' | 'crossbow' | 'general';
  species: string;
  dateRange: string;
  notes?: string;
}

export interface LicenseInfo {
  residentBase: string;
  nonResidentBase: string;
  deerTagResident: string;
  deerTagNonResident: string;
  youthPrograms: string;
  hunterEdRequired: boolean;
}

export interface StateRegulations {
  antlerRestrictions: string;
  bagLimit: string;
  blazeOrange: string;
  baiting: string;
  sundayHunting: string;
  crossbowDuringArchery: boolean;
}

export const DISCLAIMER = `Season dates, regulations, license fees, and bag limits change annually. ` +
  `This guide provides approximate information for general reference only. ` +
  `Always verify current regulations with your state wildlife agency before hunting. ` +
  `Zone-specific rules may apply that are not reflected here.`;
