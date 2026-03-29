'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

// ── Types ────────────────────────────────────────────────────────────

type GameAnimal = 'whitetail' | 'elk' | 'bear' | 'turkey' | 'hog';
type HuntState = string;
type WeaponType = 'bow' | 'rifle' | 'shotgun' | 'muzzleloader';
type SetupType = 'tree-stand' | 'ground-blind' | 'spot-stalk' | 'still-hunt';
type ExperienceLevel = 'never' | 'other-game' | 'some-deer';

interface JourneyAnswers {
  animal: GameAnimal | null;
  state: HuntState | null;
  weapon: WeaponType | null;
  setup: SetupType | null;
  experience: ExperienceLevel | null;
}

interface OptionCard {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

// ── State Wildlife Agency Links ─────────────────────────────────────

const stateAgencies: Record<string, { name: string; url: string; season: string; notes: string }> = {
  AL: { name: 'Alabama DCNR', url: 'https://www.outdooralabama.com', season: 'Oct-Feb (varies by zone)', notes: 'No blaze orange required for deer. Baiting is legal in most counties.' },
  AK: { name: 'Alaska Fish & Game', url: 'https://www.adfg.alaska.gov', season: 'Aug-Dec (varies by unit)', notes: 'Registration or draw permits required for most hunts.' },
  AZ: { name: 'Arizona Game & Fish', url: 'https://www.azgfd.com', season: 'Oct-Dec (draw tags)', notes: 'Draw-only tags for most big game. Apply by June.' },
  AR: { name: 'Arkansas Game & Fish', url: 'https://www.agfc.com', season: 'Sep-Feb', notes: 'Blaze orange required during gun season. Baiting legal with restrictions.' },
  CA: { name: 'California DFW', url: 'https://wildlife.ca.gov', season: 'Aug-Nov (zone dependent)', notes: 'Lead-free ammunition required statewide. Tag drawing for many zones.' },
  CO: { name: 'Colorado Parks & Wildlife', url: 'https://cpw.state.co.us', season: 'Sep-Nov', notes: 'Over-the-counter tags available for some units. Preference point system.' },
  CT: { name: 'Connecticut DEEP', url: 'https://portal.ct.gov/deep', season: 'Sep-Dec', notes: 'Must complete hunter education. Blaze orange required during firearms season.' },
  DE: { name: 'Delaware DNREC', url: 'https://dnrec.delaware.gov', season: 'Sep-Jan', notes: 'Blaze orange required. Shotguns/muzzleloaders only for firearms deer season.' },
  FL: { name: 'Florida FWC', url: 'https://myfwc.com', season: 'Sep-Feb (zone dependent)', notes: 'No blaze orange requirement. Long seasons with multiple zones.' },
  GA: { name: 'Georgia DNR', url: 'https://georgiawildlife.com', season: 'Sep-Jan', notes: 'Liberal bag limits. Baiting prohibited on WMAs.' },
  HI: { name: 'Hawaii DLNR', url: 'https://dlnr.hawaii.gov', season: 'Year-round for some species', notes: 'Unique hunting opportunities for axis deer and wild boar.' },
  ID: { name: 'Idaho Fish & Game', url: 'https://idfg.idaho.gov', season: 'Aug-Dec', notes: 'General tags available over the counter. Controlled hunts by draw.' },
  IL: { name: 'Illinois DNR', url: 'https://dnr.illinois.gov', season: 'Oct-Jan', notes: 'No rifle hunting for deer. Shotgun, muzzleloader, and archery only.' },
  IN: { name: 'Indiana DNR', url: 'https://www.in.gov/dnr', season: 'Sep-Jan', notes: 'Rifles now legal in most counties. Blaze orange required during firearms season.' },
  IA: { name: 'Iowa DNR', url: 'https://www.iowadnr.gov', season: 'Sep-Jan', notes: 'Known for trophy whitetails. Nonresident tags by preference draw.' },
  KS: { name: 'Kansas Wildlife & Parks', url: 'https://ksoutdoors.com', season: 'Sep-Jan', notes: 'No blaze orange required for archery. General firearms tags available.' },
  KY: { name: 'Kentucky Fish & Wildlife', url: 'https://fw.ky.gov', season: 'Sep-Jan', notes: 'Blaze orange required during modern gun season. Baiting prohibited.' },
  LA: { name: 'Louisiana Wildlife & Fisheries', url: 'https://www.wlf.louisiana.gov', season: 'Sep-Feb', notes: 'Long season across multiple zones. Blaze orange required during gun season.' },
  ME: { name: 'Maine IFW', url: 'https://www.maine.gov/ifw', season: 'Sep-Dec', notes: 'Blaze orange required during firearms season. Baiting legal with registration.' },
  MD: { name: 'Maryland DNR', url: 'https://dnr.maryland.gov', season: 'Sep-Jan', notes: 'Firearms restricted to shotgun/muzzleloader in many counties.' },
  MA: { name: 'Massachusetts DFW', url: 'https://www.mass.gov/orgs/division-of-fisheries-and-wildlife', season: 'Oct-Dec', notes: 'Shotgun-only for deer in many zones. Sunday hunting now legal.' },
  MI: { name: 'Michigan DNR', url: 'https://www.michigan.gov/dnr', season: 'Sep-Jan', notes: 'Home state of Buck Stop. Blaze orange required during firearms season.' },
  MN: { name: 'Minnesota DNR', url: 'https://www.dnr.state.mn.us', season: 'Sep-Dec', notes: 'Blaze orange required. Strong whitetail population across most of the state.' },
  MS: { name: 'Mississippi DWFP', url: 'https://www.mdwfp.com', season: 'Oct-Feb', notes: 'Long season. Baiting legal on private land. No blaze orange required for archery.' },
  MO: { name: 'Missouri Conservation', url: 'https://mdc.mo.gov', season: 'Sep-Jan', notes: 'Excellent public land hunting. Blaze orange required during firearms season.' },
  MT: { name: 'Montana FWP', url: 'https://fwp.mt.gov', season: 'Sep-Nov', notes: 'General over-the-counter tags available. Draw for limited-entry areas.' },
  NE: { name: 'Nebraska Game & Parks', url: 'https://outdoornebraska.gov', season: 'Sep-Jan', notes: 'Blaze orange required during firearms. Mule and whitetail deer available.' },
  NV: { name: 'Nevada Wildlife', url: 'https://www.ndow.org', season: 'Aug-Dec (draw only)', notes: 'Draw-only for deer tags. Mule deer are primary species.' },
  NH: { name: 'New Hampshire Fish & Game', url: 'https://www.wildlife.nh.gov', season: 'Sep-Dec', notes: 'Blaze orange required during firearms season. Baiting prohibited.' },
  NJ: { name: 'New Jersey Fish & Wildlife', url: 'https://www.nj.gov/dep/fgw', season: 'Sep-Feb', notes: 'Shotgun only for firearms deer. Blaze orange required.' },
  NM: { name: 'New Mexico Game & Fish', url: 'https://www.wildlife.state.nm.us', season: 'Sep-Jan', notes: 'Draw-based for most hunts. Over-the-counter archery in some units.' },
  NY: { name: 'New York DEC', url: 'https://dec.ny.gov', season: 'Sep-Dec', notes: 'Blaze orange recommended but not required. Crossbows legal statewide.' },
  NC: { name: 'North Carolina WRC', url: 'https://www.ncwildlife.org', season: 'Sep-Jan', notes: 'Blaze orange required during gun season. Baiting prohibited.' },
  ND: { name: 'North Dakota Game & Fish', url: 'https://gf.nd.gov', season: 'Sep-Jan', notes: 'Nonresident lottery for gun tags. Archery tags more accessible.' },
  OH: { name: 'Ohio DNR', url: 'https://ohiodnr.gov', season: 'Sep-Feb', notes: 'No rifle hunting for deer. Shotgun, muzzleloader, straight-wall cartridges allowed.' },
  OK: { name: 'Oklahoma Wildlife', url: 'https://www.wildlifedepartment.com', season: 'Sep-Jan', notes: 'Liberal bag limits. Blaze orange required during gun season.' },
  OR: { name: 'Oregon DFW', url: 'https://www.dfw.state.or.us', season: 'Aug-Nov', notes: 'Controlled hunts by draw. General archery tags available.' },
  PA: { name: 'Pennsylvania Game Commission', url: 'https://www.pgc.pa.gov', season: 'Sep-Jan', notes: 'Fluorescent orange required. Sunday hunting now allowed on select days.' },
  RI: { name: 'Rhode Island DEM', url: 'https://dem.ri.gov', season: 'Sep-Jan', notes: 'Small state with limited public land. Blaze orange required.' },
  SC: { name: 'South Carolina DNR', url: 'https://www.dnr.sc.gov', season: 'Aug-Jan', notes: 'Long season. Blaze orange required on WMAs during gun season.' },
  SD: { name: 'South Dakota GFP', url: 'https://gfp.sd.gov', season: 'Sep-Jan', notes: 'Resident preference for firearm tags. Blaze orange required.' },
  TN: { name: 'Tennessee Wildlife Resources', url: 'https://www.tn.gov/twra', season: 'Sep-Jan', notes: 'Blaze orange required during gun season. CWD management zones exist.' },
  TX: { name: 'Texas Parks & Wildlife', url: 'https://tpwd.texas.gov', season: 'Sep-Feb', notes: 'Long season. No blaze orange requirement. Baiting legal on private land.' },
  UT: { name: 'Utah DWR', url: 'https://wildlife.utah.gov', season: 'Aug-Nov', notes: 'Draw-based permits for most hunts. General archery in some units.' },
  VT: { name: 'Vermont Fish & Wildlife', url: 'https://vtfishandwildlife.com', season: 'Oct-Dec', notes: 'Blaze orange required during rifle season. Baiting prohibited.' },
  VA: { name: 'Virginia DWR', url: 'https://dwr.virginia.gov', season: 'Sep-Jan', notes: 'Blaze orange required during firearms season. Baiting restricted by county.' },
  WA: { name: 'Washington DFW', url: 'https://wdfw.wa.gov', season: 'Sep-Dec', notes: 'Draw for many hunts. Hunter orange required during modern firearm season.' },
  WV: { name: 'West Virginia DNR', url: 'https://wvdnr.gov', season: 'Sep-Dec', notes: 'Blaze orange required during gun season. Two buck limit in most counties.' },
  WI: { name: 'Wisconsin DNR', url: 'https://dnr.wisconsin.gov', season: 'Sep-Jan', notes: 'Blaze orange/pink required. CWD testing available in many areas.' },
  WY: { name: 'Wyoming Game & Fish', url: 'https://wgfd.wyo.gov', season: 'Sep-Nov', notes: 'Draw-based for most areas. Preference point system for nonresidents.' },
};

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

// ── Icons ───────────────────────────────────────────────────────────

function WhitetailIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M24 38V24m0 0c-3-6-8-8-12-8m12 8c3-6 8-8 12-8M18 10l-4-6M30 10l4-6M24 24c0-4 0-10 0-14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="40" r="4" />
    </svg>
  );
}

function ElkIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M24 40V26m0 0c-4-6-10-8-14-8m14 8c4-6 10-8 14-8M16 12l-6-8M32 12l6-8M14 8l-4-4M34 8l4-4M24 26c0-4 0-12 0-16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="42" r="4" />
    </svg>
  );
}

function BearIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <circle cx="24" cy="28" r="12" />
      <circle cx="16" cy="16" r="4" />
      <circle cx="32" cy="16" r="4" />
      <circle cx="20" cy="26" r="1.5" fill="currentColor" />
      <circle cx="28" cy="26" r="1.5" fill="currentColor" />
      <ellipse cx="24" cy="30" rx="3" ry="2" />
    </svg>
  );
}

function TurkeyIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <ellipse cx="24" cy="30" rx="10" ry="12" />
      <circle cx="24" cy="14" r="5" />
      <path d="M24 19v3M20 12c-4-2-6-6-4-10M28 12c4-2 6-6 4-10" strokeLinecap="round" />
      <path d="M22 16h4" strokeLinecap="round" />
    </svg>
  );
}

function HogIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <ellipse cx="24" cy="28" rx="14" ry="10" />
      <ellipse cx="24" cy="30" rx="5" ry="3" />
      <circle cx="18" cy="24" r="1.5" fill="currentColor" />
      <circle cx="30" cy="24" r="1.5" fill="currentColor" />
      <path d="M14 20l-2-4M34 20l2-4" strokeLinecap="round" />
    </svg>
  );
}

function BowIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M12 8c0 16 6 24 12 32C18 32 12 24 12 8z" />
      <path d="M12 8c0 16-2 24 12 32" />
      <path d="M30 12l6 28M30 12l2 4" strokeLinecap="round" />
    </svg>
  );
}

function RifleIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M6 24h36M10 24v-4h4v4M38 24l4-2M38 24l4 2M22 24v8l4 2v-10M14 20h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShotgunIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M6 24h36M10 24v-3h6v3M42 22v4M22 24v6l6 3v-9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="24" r="3" />
    </svg>
  );
}

function MuzzleloaderIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M6 24h32M10 24v-4h4v4M38 20v8M22 24v8l4 2v-10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 24c2-2 4-2 6 0" strokeLinecap="round" />
    </svg>
  );
}

function TreeStandIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M24 4v40M16 20h16M12 36h24M20 12h8" strokeLinecap="round" />
    </svg>
  );
}

function BlindIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <rect x="10" y="16" width="28" height="24" rx="2" />
      <path d="M10 16L24 6l14 10" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="24" width="12" height="8" rx="1" />
    </svg>
  );
}

function StalkIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M12 40l8-16 8 8 8-24" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="8" r="3" />
    </svg>
  );
}

function StillHuntIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M16 40v-14l-4-6v-8l4 2 8-8 8 8 4-2v8l-4 6v14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="10" r="4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M24 6l5.5 11.5L42 19l-9 8.5L35 40 24 34l-11 6 2-12.5-9-8.5 12.5-1.5z" strokeLinejoin="round" />
    </svg>
  );
}

// ── Step Option Data ────────────────────────────────────────────────

const animalOptions: OptionCard[] = [
  {
    value: 'whitetail',
    label: 'Whitetail Deer',
    description: 'The most popular big game animal in America. Found in all lower 48 states with a wide variety of seasons and methods.',
    icon: <WhitetailIcon />,
  },
  {
    value: 'elk',
    label: 'Elk',
    description: 'Western big game that requires physical fitness, longer range shooting, and public land navigation. Truly a bucket-list hunt.',
    icon: <ElkIcon />,
  },
  {
    value: 'bear',
    label: 'Bear',
    description: 'Black bear hunting over bait or with hounds is available in many states. Requires food-based attractants and extra safety awareness.',
    icon: <BearIcon />,
  },
  {
    value: 'turkey',
    label: 'Turkey',
    description: 'Spring and fall seasons in most states. Close-range calling game with shotguns. Great introductory species for new hunters.',
    icon: <TurkeyIcon />,
  },
  {
    value: 'hog',
    label: 'Wild Hog',
    description: 'Available year-round in many southern states with few restrictions. Hogs are considered invasive and welcome to hunt on most private land.',
    icon: <HogIcon />,
  },
];

const weaponOptions: OptionCard[] = [
  {
    value: 'bow',
    label: 'Bow / Crossbow',
    description: 'Effective range 20-40 yards. Archery season opens earliest and often offers longer seasons with less pressure. Requires dedicated practice.',
    icon: <BowIcon />,
  },
  {
    value: 'rifle',
    label: 'Rifle',
    description: 'Effective range 100-300+ yards. The most versatile option for most hunts. Season dates vary by state and are often the most popular.',
    icon: <RifleIcon />,
  },
  {
    value: 'shotgun',
    label: 'Shotgun',
    description: 'Effective range 50-100 yards with slugs, or 40 yards with shot for turkey. Required in some states that prohibit rifles for deer.',
    icon: <ShotgunIcon />,
  },
  {
    value: 'muzzleloader',
    label: 'Muzzleloader',
    description: 'Effective range 100-150 yards. Special primitive weapon seasons often fall between archery and rifle, offering less hunting pressure.',
    icon: <MuzzleloaderIcon />,
  },
];

const setupOptions: OptionCard[] = [
  {
    value: 'tree-stand',
    label: 'Tree Stand',
    description: 'Elevated position 15-20 feet up. Your scent disperses above ground level. Requires a safety harness (non-negotiable). Best for ambush hunting.',
    icon: <TreeStandIcon />,
    },
  {
    value: 'ground-blind',
    label: 'Ground Blind',
    description: 'Concealed at ground level. Closer encounters with game. Great for comfort in bad weather. Scent control is critical since you are at nose level.',
    icon: <BlindIcon />,
  },
  {
    value: 'spot-stalk',
    label: 'Spot and Stalk',
    description: 'Glass from a distance, then close the gap on foot. Physically demanding. Best for open terrain out west. Wind and scent management are paramount.',
    icon: <StalkIcon />,
  },
  {
    value: 'still-hunt',
    label: 'Still Hunting',
    description: 'Slow, deliberate walking through terrain, reading sign as you go. Move 10 steps, stop for 2 minutes. Requires patience and wind awareness.',
    icon: <StillHuntIcon />,
  },
];

const experienceOptions: OptionCard[] = [
  {
    value: 'never',
    label: 'Never Hunted Before',
    description: 'Completely new to hunting. We will cover everything from the basics to advanced tips so you feel confident on opening day.',
    icon: <StarIcon />,
  },
  {
    value: 'other-game',
    label: 'Hunted Other Game',
    description: 'You have experience with small game, waterfowl, or upland birds, but this is your first big game hunt. You know firearm safety and field basics.',
    icon: <StarIcon />,
  },
  {
    value: 'some-deer',
    label: 'Hunted Deer a Few Times',
    description: 'You have been out a handful of times. You understand the basics but want a structured plan to improve your success rate this season.',
    icon: <StarIcon />,
  },
];

// ── Step Education Text ─────────────────────────────────────────────

const stepEducation: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'What do you want to hunt?',
    subtitle: 'Different game requires different strategies, gear, and scents. Your target species shapes every other decision in your hunt plan.',
  },
  2: {
    title: 'Where are you hunting?',
    subtitle: 'Every state has different season dates, license requirements, and weapon rules. Knowing your state is essential for legal and safe hunting.',
  },
  3: {
    title: 'How are you hunting?',
    subtitle: 'Your weapon choice affects your season dates, effective range, and gear list. Many states offer separate seasons for each weapon type.',
  },
  4: {
    title: 'What is your setup?',
    subtitle: 'Your hunting setup determines your scent strategy, gear list, and how you approach the game. Each method has distinct advantages.',
  },
  5: {
    title: 'Your experience level',
    subtitle: 'This helps us adjust the depth of our recommendations. Complete beginners get extra safety and preparation guidance.',
  },
};

// ── Result Generation ───────────────────────────────────────────────

interface GearItem {
  name: string;
  note: string;
}

interface GearCategory {
  title: string;
  items: GearItem[];
}

interface ScentStrategy {
  attractant: string;
  attractantLink: string;
  coverScent: string;
  elimination: string;
  applicationTip: string;
}

interface TimelineStep {
  when: string;
  tasks: string[];
}

interface HuntPlan {
  gearCategories: GearCategory[];
  scentStrategy: ScentStrategy;
  stateInfo: { name: string; url: string; season: string; notes: string } | null;
  timeline: TimelineStep[];
  readingLinks: { label: string; href: string }[];
}

function generateHuntPlan(answers: JourneyAnswers): HuntPlan {
  const { animal, state, weapon, setup, experience } = answers;
  const stateInfo = state ? stateAgencies[state] || null : null;
  const stateName = state ? US_STATES.find((s) => s.code === state)?.name || state : 'your state';

  // ── Gear Categories ─────────────────────────────────────────────

  const gearCategories: GearCategory[] = [];

  // Weapon & Ammo
  const weaponGear: GearItem[] = [];
  if (weapon === 'bow') {
    weaponGear.push(
      { name: 'Compound bow or crossbow', note: 'Minimum 40 lb draw weight for deer; check state minimums' },
      { name: 'Broadheads (fixed or mechanical)', note: 'Practice with the same broadheads you will hunt with' },
      { name: 'Arrow rest and sight', note: 'Whisker biscuit rests are most forgiving for beginners' },
      { name: 'Release aid', note: 'Wrist-strap releases are simplest to learn' },
      { name: 'Target for practice', note: 'Practice at 20, 30, and 40 yards minimum' },
    );
  } else if (weapon === 'rifle') {
    weaponGear.push(
      { name: 'Rifle in appropriate caliber', note: '.308, .30-06, or 6.5 Creedmoor are popular deer calibers' },
      { name: 'Quality scope (3-9x40 minimum)', note: 'Do not skimp on glass -- a clear sight picture saves hunts' },
      { name: 'Ammunition (at least 40 rounds)', note: '20 for practice, 20 for hunting. Match your practice ammo to your hunting ammo' },
      { name: 'Rifle sling', note: 'Hands-free carry during long walks to your stand' },
      { name: 'Bore cleaner and patches', note: 'Clean barrel before season; a fouled barrel shifts point of impact' },
    );
  } else if (weapon === 'shotgun') {
    weaponGear.push(
      { name: animal === 'turkey' ? 'Shotgun (12 or 20 gauge)' : 'Shotgun with rifled barrel or slug barrel', note: animal === 'turkey' ? 'Full choke with turkey loads' : 'Rifled barrels are most accurate with sabot slugs' },
      { name: animal === 'turkey' ? 'Turkey loads (#4-#6 shot)' : 'Slugs or sabot slugs (20+ rounds)', note: animal === 'turkey' ? 'Tungsten super shot gives the best patterns' : 'Sight in at 50 and 75 yards' },
      { name: 'Shotgun sling', note: 'Essential for hands-free carry' },
    );
  } else if (weapon === 'muzzleloader') {
    weaponGear.push(
      { name: 'Inline muzzleloader (.50 cal)', note: 'Modern inlines are the most reliable and accurate' },
      { name: 'Powder charges or pellets', note: 'Pre-measured pellets are simplest for beginners' },
      { name: 'Bullets (saboted or full-bore)', note: 'Sight in with the exact load you will hunt with' },
      { name: 'Primers (209 shotshell or musket caps)', note: 'Carry extras in a waterproof container' },
      { name: 'Cleaning kit (field and full)', note: 'Muzzleloaders must be cleaned after every session' },
      { name: 'Speed loaders', note: 'Pre-loaded for a fast second shot if needed' },
    );
  }
  gearCategories.push({ title: 'Weapon & Ammunition', items: weaponGear });

  // Clothing
  const clothingItems: GearItem[] = [
    { name: 'Base layer (moisture-wicking)', note: 'Merino wool is best -- it manages moisture and does not hold odor' },
    { name: 'Mid layer (insulation)', note: 'Fleece or down depending on temperature. Layer up; you can always remove layers' },
    { name: 'Outer layer (wind/water resistant)', note: 'Quiet fabric is critical -- avoid noisy nylon shells' },
    { name: 'Hunting boots (insulated for cold)', note: 'Break in boots weeks before the hunt. Rubber boots help contain scent' },
    { name: 'Gloves (thin for shooting, warm for waiting)', note: 'Bring both -- switch to thin gloves when game approaches' },
    { name: 'Face mask or face paint', note: 'Your face is the brightest, most visible part of your body to game' },
    { name: 'Hat or beanie', note: 'You lose significant body heat through your head in cold weather' },
  ];
  if (animal !== 'turkey') {
    clothingItems.push({ name: 'Blaze orange vest and hat', note: 'Required in most states during firearms season -- check your state regulations' });
  }
  gearCategories.push({ title: 'Clothing System', items: clothingItems });

  // Stand/Blind Gear
  const setupGear: GearItem[] = [];
  if (setup === 'tree-stand') {
    setupGear.push(
      { name: 'Tree stand (hang-on, ladder, or climber)', note: 'Climber stands are most versatile for new hunters on public land' },
      { name: 'Full-body safety harness (required)', note: 'Never climb without a harness. This is non-negotiable. Falls are the #1 cause of hunting injuries' },
      { name: 'Lineman belt for climbing', note: 'Keeps you connected to the tree while ascending and descending' },
      { name: 'Lifeline system', note: 'Connects your harness from ground to stand -- you are never unclipped' },
      { name: 'Haul line for gear', note: 'Never climb with your weapon -- haul it up on a rope once you are seated and clipped in' },
      { name: 'Screw-in steps or climbing sticks', note: 'Practice setup at home before going to the woods in the dark' },
    );
  } else if (setup === 'ground-blind') {
    setupGear.push(
      { name: 'Pop-up ground blind', note: 'Set it up 2+ weeks early so deer get used to it. Brush it in with natural cover' },
      { name: 'Blind chair or stool', note: 'Comfort matters for sitting all day. A swivel chair lets you adjust quietly' },
      { name: 'Shoot-through mesh or window covers', note: 'Mesh hides movement. Remove it only for bow shots if needed' },
      { name: 'Black interior clothing', note: 'Wear dark clothes inside a blind so your silhouette disappears against the interior' },
      { name: 'Stakes or weights', note: 'Secure your blind against wind -- a blown-over blind will spook every deer in the area' },
    );
  } else if (setup === 'spot-stalk') {
    setupGear.push(
      { name: 'Quality daypack (30-40L)', note: 'Carries your gear, water, and food for a full day of mobile hunting' },
      { name: 'Trekking poles', note: 'Useful for steep terrain and doubles as a shooting rest' },
      { name: 'Knee pads', note: 'You will be crawling during the final stalk' },
      { name: 'Wind checker (powder or thread)', note: 'Check wind constantly during your stalk. Wind shifts kill stalks' },
    );
  } else if (setup === 'still-hunt') {
    setupGear.push(
      { name: 'Small daypack', note: 'Light load for slow-moving hunts through timber' },
      { name: 'Shooting sticks or bipod', note: 'Provides a stable rest for standing or kneeling shots' },
      { name: 'Wind checker', note: 'Still hunting depends entirely on staying downwind' },
      { name: 'Soft-soled boots', note: 'Feel the ground to avoid snapping sticks. Moccasin-style soles are quietest' },
    );
  }
  if (setupGear.length > 0) {
    gearCategories.push({ title: 'Stand / Blind / Setup Gear', items: setupGear });
  }

  // Scent Control
  gearCategories.push({
    title: 'Scent Control Kit',
    items: [
      { name: 'Scent-free laundry detergent', note: 'Wash ALL hunting clothes -- including base layers, hats, and gloves' },
      { name: 'Scent-free body wash and shampoo', note: 'Use the morning of your hunt. Avoid deodorant and cologne entirely' },
      { name: 'Scent elimination spray', note: 'Spray down boots, pack, and outer layers before entering the woods' },
      { name: 'Scent-free storage bag or tote', note: 'Store clean hunting clothes separate from daily wear' },
      { name: 'Rubber boots for the walk in', note: 'Rubber does not absorb or release human scent like leather or synthetic boots' },
    ],
  });

  // Attractant Scents (Buck Stop products)
  const scentItems: GearItem[] = [];
  if (animal === 'whitetail') {
    scentItems.push(
      { name: 'Buck Stop Mate-Triks Original Doe-in-Heat', note: 'The #1 estrus scent since 1972. Essential for pre-rut and rut hunting' },
      { name: 'Buck Stop FIVE (5-scent blend)', note: 'Buck urine, doe urine, estrus, tarsal, and forehead gland in one bottle. Great for mock scrapes' },
      { name: 'Buck Stop Gland-U-Lure', note: 'All-season curiosity lure. Works from early season through late season' },
    );
  } else if (animal === 'elk') {
    scentItems.push(
      { name: 'Cow elk estrus scent', note: 'Use during the September rut to pull in satellite bulls' },
      { name: 'Bull elk urine', note: 'Territorial scent that triggers challenge responses from herd bulls' },
    );
  } else if (animal === 'bear') {
    scentItems.push(
      { name: 'Buck Stop Sweet Corn Buck Beads', note: 'Food-based attractant that works on bears. Slow-release beads stay active for days' },
      { name: 'Buck Stop Sugar Beet Buck Beads', note: 'Alternative food attractant for bear bait stations' },
      { name: 'Anise oil', note: 'Classic bear attractant. Apply to trees and stumps near your bait' },
    );
  } else if (animal === 'turkey') {
    scentItems.push(
      { name: 'No scent attractants needed for turkey', note: 'Turkeys rely on sight and sound, not smell. Focus on calls and decoys' },
    );
  } else if (animal === 'hog') {
    scentItems.push(
      { name: 'Buck Stop Sweet Corn Buck Beads', note: 'Hogs are attracted to sweet corn scent. Place near feeders and wallows' },
      { name: 'Soured corn mixture', note: 'Fermented corn in water is a classic hog attractant' },
    );
  }
  gearCategories.push({ title: 'Attractant Scents', items: scentItems });

  // Calls
  const callItems: GearItem[] = [];
  if (animal === 'whitetail') {
    callItems.push(
      { name: 'Grunt tube', note: 'The most versatile deer call. Short grunts attract bucks at all phases of the season' },
      { name: 'Doe bleat can', note: 'Simple tip-over can that makes a doe bleat. Effective during the rut' },
      { name: 'Rattling antlers or bag', note: 'Simulate a buck fight to pull in dominant bucks during pre-rut and rut' },
    );
  } else if (animal === 'elk') {
    callItems.push(
      { name: 'Diaphragm elk call (bugle)', note: 'Takes practice but is the most versatile elk call. Start practicing months ahead' },
      { name: 'External reed cow call', note: 'Easier to learn. Cow calls are used more than bugles in most situations' },
    );
  } else if (animal === 'turkey') {
    callItems.push(
      { name: 'Box call', note: 'Easiest call to learn. Produces loud, realistic yelps and clucks' },
      { name: 'Slate/pot call', note: 'More versatile than a box call. Great for soft calling at close range' },
      { name: 'Diaphragm mouth call', note: 'Hands-free calling when the bird is close. Takes practice to master' },
      { name: 'Decoys (hen and jake)', note: 'Visual attraction brings toms into range. Position jake decoy facing the hen' },
    );
  } else if (animal === 'bear' || animal === 'hog') {
    callItems.push(
      { name: 'Predator distress call (optional)', note: 'Can draw in curious bears. Not a primary hunting method for beginners' },
    );
  }
  if (callItems.length > 0) {
    gearCategories.push({ title: 'Calls & Decoys', items: callItems });
  }

  // Optics
  gearCategories.push({
    title: 'Optics',
    items: [
      { name: 'Binoculars (8x42 or 10x42)', note: 'Use them constantly. Glass before you move. Good optics are worth every penny' },
      { name: 'Rangefinder', note: 'Know your exact distance before the shot. Critical for bow hunting, valuable for all weapons' },
      ...(animal === 'elk' ? [{ name: 'Spotting scope (20-60x)', note: 'Essential for glassing elk at long distances in open country' }] : []),
    ],
  });

  // Safety
  const safetyItems: GearItem[] = [
    { name: 'First aid kit', note: 'Include bandages, tourniquet, antiseptic, pain relievers, and any personal medications' },
    { name: 'Emergency whistle', note: 'Three blasts is the universal distress signal' },
    { name: 'Headlamp with red/green mode', note: 'You will walk in and out in the dark. Red light preserves night vision' },
    { name: 'Cell phone (fully charged) + backup battery', note: 'Emergency communication and GPS. Download offline maps of your hunting area' },
    { name: 'Fire starter kit', note: 'Waterproof matches or ferro rod. Essential if you get lost or injured' },
    { name: 'Water and snacks', note: 'Dehydration causes poor decisions. Bring more water than you think you need' },
  ];
  if (setup === 'tree-stand') {
    safetyItems.unshift({ name: 'Full-body safety harness', note: 'Already in your setup gear list, but bears repeating: NEVER hunt from a tree without one' });
  }
  gearCategories.push({ title: 'Safety Gear', items: safetyItems });

  // Recovery
  gearCategories.push({
    title: 'Game Recovery',
    items: [
      { name: 'Sharp hunting knife', note: 'A fixed-blade knife with a 3-4 inch blade is ideal for field dressing' },
      { name: 'Latex or nitrile gloves (multiple pairs)', note: 'Keeps your hands clean and reduces bacteria exposure' },
      { name: 'Game bags', note: 'Protect meat from dirt and insects during transport. Cheesecloth works in a pinch' },
      { name: 'Drag rope or game cart', note: 'Getting an animal out of the woods is the hardest part. Plan your exit route before you hunt' },
      { name: 'Cooler with ice', note: 'Get meat cooled down quickly, especially in warm weather. Have this ready at your vehicle' },
      { name: 'Zip-lock bags for heart and liver', note: 'If you eat organs, bag them separately. Even if you do not, save the heart -- it is excellent eating' },
    ],
  });

  // ── Scent Strategy ────────────────────────────────────────────────

  let scentStrategy: ScentStrategy;
  if (animal === 'whitetail') {
    let tip = '';
    if (setup === 'tree-stand') {
      tip = 'Hang scent wicks at 20 yards from your stand in multiple directions. Your elevated position lets scent drift naturally to approaching deer. Refresh wicks every 2-3 hours.';
    } else if (setup === 'ground-blind') {
      tip = 'Place scent wicks outside your blind at shooting distance. Inside, focus entirely on scent elimination since you are at the same level as a deer nose. Spray down every surface.';
    } else if (setup === 'spot-stalk') {
      tip = 'Use a scent drag behind you as you approach bedding areas. When you set up for a shot, place a scent wick at your maximum comfortable range to stop a walking deer.';
    } else {
      tip = 'Carry a scent drag and deploy it during the last 100 yards of your approach. Place a wick at any natural funnel or pinch point to stop deer for a shot.';
    }
    scentStrategy = {
      attractant: 'Buck Stop Mate-Triks Original Doe-in-Heat (pre-rut/rut) or Gland-U-Lure (early/late season)',
      attractantLink: '/products',
      coverScent: 'Buck Stop Gland-U-Lure Spray -- a natural glandular cover that blends with the woods',
      elimination: 'Scent-free detergent, body wash, and elimination spray. Wash everything. Store in scent-free bags.',
      applicationTip: tip,
    };
  } else if (animal === 'bear' || animal === 'hog') {
    scentStrategy = {
      attractant: 'Buck Stop Sweet Corn Buck Beads -- food-based slow-release attractant',
      attractantLink: '/products',
      coverScent: 'Natural earth or pine cover scent. Bears and hogs have exceptional noses.',
      elimination: 'Full scent elimination system. Play the wind above all else with these species.',
      applicationTip: 'Place Buck Beads at your bait station 2-3 weeks before your hunt to pattern animals. Refresh weekly. Set trail cameras to identify peak visit times.',
    };
  } else if (animal === 'turkey') {
    scentStrategy = {
      attractant: 'No scent attractants -- turkeys rely on sight and hearing, not smell',
      attractantLink: '/products',
      coverScent: 'Not needed for turkey. Focus your budget on calls and decoys instead.',
      elimination: 'Not critical for turkey hunting. However, scent-free habits help if you also deer hunt the same area.',
      applicationTip: 'Skip the scent and invest in practice with your calls. A good caller with poor gear outperforms a poor caller with great gear every time.',
    };
  } else {
    scentStrategy = {
      attractant: animal === 'elk' ? 'Cow elk estrus scent during September rut' : 'Species-specific attractant for your target game',
      attractantLink: '/products',
      coverScent: 'Earth or sage cover scent appropriate for your terrain',
      elimination: 'Full scent elimination protocol. Big game animals have exceptional senses of smell.',
      applicationTip: 'Wind direction is the single most important factor. Always approach from downwind and check wind constantly throughout your hunt.',
    };
  }

  // ── Timeline ──────────────────────────────────────────────────────

  const timeline: TimelineStep[] = [
    {
      when: '3 Months Before',
      tasks: [
        experience === 'never' ? `Complete hunter education course (required in ${stateName})` : 'Verify your hunter education certification is current',
        `Purchase your hunting license and tags for ${stateName}`,
        weapon === 'bow' ? 'Begin daily bow practice at 20-40 yards' : `Sight in your ${weapon === 'rifle' ? 'rifle' : weapon === 'shotgun' ? 'shotgun' : 'muzzleloader'} and practice at the range`,
        'Research public land or secure private land permission',
        experience === 'never' ? 'Find a mentor or experienced hunting partner' : 'Connect with hunting partners for the season',
      ],
    },
    {
      when: '1 Month Before',
      tasks: [
        'Scout your hunting area -- look for tracks, rubs, scrapes, and droppings',
        setup === 'tree-stand' ? 'Hang your tree stand and practice climbing with your harness' : setup === 'ground-blind' ? 'Set up your ground blind and brush it in. Let deer get used to it' : 'Identify glassing points and stalk routes',
        'Set up trail cameras on trails, food sources, and water',
        'Verify all gear is functional -- test every piece of equipment',
        weapon === 'bow' ? 'Practice shooting from your stand or blind position' : 'Do a final range session confirming zero',
      ],
    },
    {
      when: '1 Week Before',
      tasks: [
        'Wash all hunting clothes in scent-free detergent',
        'Store clean clothes in scent-free bags or totes',
        'Check trail camera photos and adjust stand placement if needed',
        'Check weather forecast and plan for conditions',
        'Pack your gear and create a checklist -- do not leave anything to memory',
        'Verify your license and tags are in your pack',
      ],
    },
    {
      when: 'Day Before',
      tasks: [
        'Pack all gear using your checklist',
        'Prepare food and water for the morning',
        'Set multiple alarms -- plan to be in the woods 45+ minutes before first light',
        'Charge your phone, headlamp, and any electronics',
        'Lay out your clothes in order of dressing so you can gear up in the dark',
        animal === 'whitetail' ? 'Prepare your scent wicks and scent drag' : 'Confirm your attractant and call setup',
      ],
    },
    {
      when: 'Morning Of',
      tasks: [
        'Shower with scent-free soap and shampoo',
        'Dress in base layers at home, outer layers at the truck to avoid sweating',
        'Spray down all gear with scent elimination spray',
        'Walk in quietly using a headlamp on low/red mode',
        setup === 'tree-stand' ? 'Clip into your harness BEFORE climbing. Deploy scent wicks once settled' : setup === 'ground-blind' ? 'Enter your blind and open shooting windows. Place scent wicks outside' : 'Check wind direction immediately and plan your approach',
        'Be still, be patient, and enjoy the experience',
      ],
    },
  ];

  // ── Reading Links ────────────────────────────────────────────────

  const readingLinks: { label: string; href: string }[] = [
    { label: 'Hunting Tips & Strategies', href: '/hunting-tips' },
    { label: 'Complete Scent Guide', href: '/scent-guide' },
    { label: 'Find Your Perfect Scent (Quiz)', href: '/scent-finder' },
  ];
  if (animal === 'whitetail') {
    readingLinks.push({ label: 'Rut Calendar & Timing', href: '/rut-calendar' });
  }
  readingLinks.push({ label: 'Best Deer Scents 2026', href: '/best-deer-scents' });

  return { gearCategories, scentStrategy, stateInfo, timeline, readingLinks };
}

// ── Shared UI Components ────────────────────────────────────────────

function ProgressBar({ step, total, showResults }: { step: number; total: number; showResults: boolean }) {
  const progress = showResults ? 100 : (step / total) * 100;
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between text-xs text-[#2d2d2d]/60">
        <span>{showResults ? 'Complete' : `Step ${step} of ${total}`}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-[#1a3c2a]/10">
        <div
          className="h-2 rounded-full bg-[#c8932a] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 mt-4 flex items-center gap-1 text-sm font-medium text-[#1a3c2a]/70 transition-colors hover:text-[#1a3c2a]"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
          clipRule="evenodd"
        />
      </svg>
      Back
    </button>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#1a3c2a]">
      {children}
    </h2>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-[#c8932a] bg-white p-5 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-[#c8932a]">{title}</h3>
      <div className="text-sm text-[#2d2d2d]/80 leading-relaxed">{children}</div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────

export default function FirstHuntClient() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<JourneyAnswers>({
    animal: null,
    state: null,
    weapon: null,
    setup: null,
    experience: null,
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 5;

  const handleSelectOption = useCallback(
    (key: keyof JourneyAnswers, value: string) => {
      const updated = { ...answers, [key]: value };
      setAnswers(updated);

      if (step < totalSteps) {
        setStep((s) => s + 1);
      } else {
        setShowResults(true);
      }
    },
    [answers, step],
  );

  const handleStateSelect = useCallback(
    (stateCode: string) => {
      if (!stateCode) return;
      handleSelectOption('state', stateCode);
    },
    [handleSelectOption],
  );

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }, [step, showResults]);

  const handleRestart = useCallback(() => {
    setStep(1);
    setAnswers({ animal: null, state: null, weapon: null, setup: null, experience: null });
    setShowResults(false);
  }, []);

  const plan = useMemo(() => {
    if (!showResults) return null;
    return generateHuntPlan(answers);
  }, [showResults, answers]);

  // ── Render Results ────────────────────────────────────────────────

  if (showResults && plan) {
    const stateName = answers.state ? US_STATES.find((s) => s.code === answers.state)?.name || answers.state : '';
    const animalLabel = animalOptions.find((a) => a.value === answers.animal)?.label || '';
    const weaponLabel = weaponOptions.find((w) => w.value === answers.weapon)?.label || '';
    const setupLabel = setupOptions.find((s) => s.value === answers.setup)?.label || '';

    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <ProgressBar step={totalSteps} total={totalSteps} showResults />

          {/* Header */}
          <h1 className="mb-2 text-center font-serif text-3xl font-bold text-[#1a3c2a] sm:text-4xl">
            Your Personalized Hunt Plan
          </h1>
          <p className="mb-4 text-center text-[#2d2d2d]/70">
            {animalLabel} in {stateName} with a {weaponLabel} from a {setupLabel}
          </p>
          <div className="mb-10 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="text-sm font-medium text-[#c8932a] underline underline-offset-2 transition-colors hover:text-[#c8932a]/80"
            >
              Start Over
            </button>
          </div>

          {/* a) Gear Checklist */}
          <section className="mb-10">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#1a3c2a]">
              Your Gear Checklist
            </h2>
            <div className="space-y-6">
              {plan.gearCategories.map((category) => (
                <div key={category.title} className="rounded-lg bg-white p-5 shadow-sm">
                  <h3 className="mb-3 text-base font-semibold text-[#1a3c2a]">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-[#1a3c2a]/20 text-xs text-transparent">
                          &#10003;
                        </span>
                        <div>
                          <span className="text-sm font-medium text-[#2d2d2d]">{item.name}</span>
                          <span className="block text-xs text-[#2d2d2d]/60 leading-relaxed">{item.note}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* b) Scent Strategy */}
          <section className="mb-10">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#1a3c2a]">
              Your Scent Strategy
            </h2>
            <div className="space-y-4">
              <InfoBox title="Primary Attractant">
                <p>{plan.scentStrategy.attractant}</p>
                <Link href={plan.scentStrategy.attractantLink} className="mt-2 inline-block text-sm font-medium text-[#c8932a] underline underline-offset-2 hover:text-[#c8932a]/80">
                  Browse Buck Stop Scents
                </Link>
              </InfoBox>
              <InfoBox title="Cover Scent">
                <p>{plan.scentStrategy.coverScent}</p>
              </InfoBox>
              <InfoBox title="Scent Elimination System">
                <p>{plan.scentStrategy.elimination}</p>
              </InfoBox>
              <div className="rounded-lg border-l-4 border-[#1a3c2a] bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-base font-semibold text-[#1a3c2a]">Application Tips for Your Setup</h3>
                <p className="text-sm text-[#2d2d2d]/80 leading-relaxed">{plan.scentStrategy.applicationTip}</p>
              </div>
            </div>
          </section>

          {/* c) State Regulations */}
          {plan.stateInfo && (
            <section className="mb-10">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#1a3c2a]">
                Key Regulations for {stateName}
              </h2>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="space-y-3 text-sm text-[#2d2d2d]/80">
                  <p><span className="font-semibold text-[#2d2d2d]">Season Dates:</span> {plan.stateInfo.season}</p>
                  <p><span className="font-semibold text-[#2d2d2d]">Key Notes:</span> {plan.stateInfo.notes}</p>
                  <p className="text-xs text-[#2d2d2d]/60">
                    Season dates and regulations change annually. Always verify current rules before hunting.
                  </p>
                  <a
                    href={plan.stateInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#c8932a] underline underline-offset-2 hover:text-[#c8932a]/80"
                  >
                    Check {plan.stateInfo.name} for Current Regulations
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.5-1a.75.75 0 01.75-.75h4a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* d) Preparation Timeline */}
          <section className="mb-10">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#1a3c2a]">
              Your Preparation Timeline
            </h2>
            <div className="space-y-4">
              {plan.timeline.map((phase, i) => (
                <div key={i} className="rounded-lg bg-white p-5 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#1a3c2a]">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#c8932a] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {phase.when}
                  </h3>
                  <ul className="space-y-1.5 pl-9">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#2d2d2d]/80 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c8932a]/60" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* e) Recommended Reading */}
          <section className="mb-10">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#1a3c2a]">
              Recommended Reading
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {plan.readingLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-[#c8932a]/30"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-[#c8932a]">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-[#2d2d2d]">{link.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* f) Ready to Gear Up CTA */}
          <section className="rounded-xl bg-[#1a3c2a] p-8 text-center shadow-lg">
            <h2 className="mb-2 font-serif text-2xl font-bold text-[#f5f0e8]">
              Ready to Gear Up?
            </h2>
            <p className="mb-6 text-sm text-[#f5f0e8]/70">
              You have your plan. Now get the scents and gear to make it happen.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="inline-block rounded-md bg-[#c8932a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c8932a]/90"
              >
                Shop Your Recommended Products
              </Link>
              <Link
                href={`/find-a-guide${answers.state ? `?state=${answers.state}` : ''}`}
                className="inline-block rounded-md border border-[#f5f0e8]/30 px-6 py-3 text-sm font-semibold text-[#f5f0e8] transition-colors hover:bg-[#f5f0e8]/10"
              >
                Find a Guide in {stateName}
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#f5f0e8]/60">
              Need help? Call us: <a href="tel:+18004772368" className="font-medium text-[#c8932a] hover:underline">(800) 477-2368</a>
            </p>
          </section>

          {/* Bottom nav */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-md border border-[#1a3c2a] px-6 py-3 text-sm font-semibold text-[#1a3c2a] transition-colors hover:bg-[#1a3c2a] hover:text-white"
            >
              Start Over with Different Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render Steps ──────────────────────────────────────────────────

  const education = stepEducation[step];

  // Step 2 is the state selector (special UI)
  if (step === 2) {
    const selectedState = answers.state;
    const selectedInfo = selectedState ? stateAgencies[selectedState] : null;
    const selectedStateName = selectedState ? US_STATES.find((s) => s.code === selectedState)?.name : null;

    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <ProgressBar step={step} total={totalSteps} showResults={false} />
          <BackButton onClick={handleBack} />

          <div className="mb-8 text-center">
            <h1 className="mb-3 font-serif text-2xl font-bold text-[#1a3c2a] sm:text-3xl">
              {education.title}
            </h1>
            <p className="mx-auto max-w-xl text-sm text-[#2d2d2d]/70 leading-relaxed">
              {education.subtitle}
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <label htmlFor="state-select" className="mb-2 block text-sm font-medium text-[#2d2d2d]">
              Select your state
            </label>
            <select
              id="state-select"
              value={selectedState || ''}
              onChange={(e) => {
                setAnswers((a) => ({ ...a, state: e.target.value || null }));
              }}
              className="w-full rounded-lg border-2 border-[#1a3c2a]/20 bg-white px-4 py-3 text-[#2d2d2d] transition-colors focus:border-[#c8932a] focus:outline-none focus:ring-2 focus:ring-[#c8932a]/30"
            >
              <option value="">-- Choose a state --</option>
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>

            {selectedState && selectedInfo && (
              <div className="mt-4 rounded-lg border-l-4 border-[#c8932a] bg-white p-4 shadow-sm">
                <h3 className="mb-1 text-sm font-semibold text-[#1a3c2a]">{selectedStateName} Hunting</h3>
                <p className="text-xs text-[#2d2d2d]/70"><span className="font-medium">Seasons:</span> {selectedInfo.season}</p>
                <p className="mt-1 text-xs text-[#2d2d2d]/70">{selectedInfo.notes}</p>
                <a
                  href={selectedInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#c8932a] hover:underline"
                >
                  Check {selectedStateName} Regulations
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.5-1a.75.75 0 01.75-.75h4a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            )}

            {selectedState && (
              <button
                type="button"
                onClick={() => handleStateSelect(selectedState)}
                className="mt-6 w-full rounded-md bg-[#1a3c2a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a3c2a]/90"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Steps 1, 3, 4, 5: card-based selection
  let currentOptions: OptionCard[];
  let currentKey: keyof JourneyAnswers;

  switch (step) {
    case 1:
      currentOptions = animalOptions;
      currentKey = 'animal';
      break;
    case 3:
      currentOptions = weaponOptions;
      currentKey = 'weapon';
      break;
    case 4:
      currentOptions = setupOptions;
      currentKey = 'setup';
      break;
    case 5:
      currentOptions = experienceOptions;
      currentKey = 'experience';
      break;
    default:
      currentOptions = animalOptions;
      currentKey = 'animal';
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <ProgressBar step={step} total={totalSteps} showResults={false} />

        {step > 1 && <BackButton onClick={handleBack} />}

        <div className="mb-8 text-center">
          <h1 className="mb-3 font-serif text-2xl font-bold text-[#1a3c2a] sm:text-3xl">
            {education.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm text-[#2d2d2d]/70 leading-relaxed">
            {education.subtitle}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {currentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelectOption(currentKey, option.value)}
              className="group flex items-start gap-4 rounded-lg border-2 border-[#1a3c2a]/10 bg-white p-5 text-left transition-all duration-200 hover:border-[#c8932a] hover:shadow-md focus:border-[#c8932a] focus:outline-none focus:ring-2 focus:ring-[#c8932a]/30"
            >
              <span className="flex-shrink-0 text-[#1a3c2a]/60 transition-colors group-hover:text-[#c8932a]">
                {option.icon}
              </span>
              <div>
                <span className="block text-base font-semibold text-[#2d2d2d] transition-colors group-hover:text-[#1a3c2a]">
                  {option.label}
                </span>
                <span className="mt-1 block text-sm text-[#2d2d2d]/60 leading-relaxed">
                  {option.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
