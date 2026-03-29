'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import AuthorBio from '@/components/AuthorBio';
import {
  allStateRutData,
  rutRegions,
  getRutTimingColor,
  getRutTimingLabel,
  type StateRutData,
  type RutRegion,
} from '@/lib/rut-data';
import { STATE_PATHS } from './us-map-paths';

interface RutCalendarClientProps {
  faqs: { question: string; answer: string }[];
}

/* ─── Color Legend Items ──────────────────────────────────── */
const legendItems = [
  { color: '#228B22', label: 'October' },
  { color: '#6DB33F', label: 'Early Nov' },
  { color: '#F0C820', label: 'Nov 6-10' },
  { color: '#E88C20', label: 'Nov 11-15' },
  { color: '#D05020', label: 'Nov 16-20' },
  { color: '#A02010', label: 'Late Nov' },
  { color: '#701818', label: 'December' },
  { color: '#401010', label: 'January+' },
];

/* ─── Timeline Phase Colors ──────────────────────────────── */
const phaseColors: Record<string, string> = {
  'Pre-Rut': '#8ba63a',
  Seeking: '#b8a030',
  Chasing: '#c8932a',
  Breeding: '#c06520',
  'Post-Rut': '#8b3a2a',
};

export default function RutCalendarClient({ faqs }: RutCalendarClientProps) {
  const [activeRegion, setActiveRegion] = useState<RutRegion | 'All'>('All');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredStates =
    activeRegion === 'All'
      ? allStateRutData
      : allStateRutData.filter((s) => s.region === activeRegion);

  const scrollToState = useCallback((stateCode: string) => {
    const el = document.getElementById(`state-card-${stateCode}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-[#c8932a]');
      setTimeout(() => el.classList.remove('ring-2', 'ring-[#c8932a]'), 2000);
    }
  }, []);

  const handleStateHover = useCallback(
    (e: React.MouseEvent, stateCode: string | null) => {
      setHoveredState(stateCode);
      if (stateCode) {
        const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
        if (rect) {
          setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top - 12,
          });
        }
      }
    },
    []
  );

  const hoveredData = hoveredState
    ? allStateRutData.find((s) => s.stateCode === hoveredState)
    : null;

  return (
    <>
      {/* Hero */}
      <HeroSection
        variant="page"
        title="2026 Whitetail Rut Calendar"
        subtitle="State-by-state rut predictions backed by 70+ years of field data"
      />

      {/* Author */}
      <AuthorBio
        name="Brian Johansen"
        title="Head of Product & Field Testing, Buck Stop Lure Co."
        initials="BJ"
      />

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-charcoal/90">
          <p>
            The whitetail rut is the single most important event on a deer hunter&apos;s calendar.
            It&apos;s the brief window each fall when mature bucks abandon caution, cover ground they
            normally avoid, and respond aggressively to scent. Knowing exactly when the rut peaks in
            your state -- and what phase it&apos;s in on any given day -- is the difference between
            sitting over an empty trail and watching a 160-class buck work a scrape line at 20 yards.
          </p>
          <p>
            At Buck Stop, we&apos;ve been collecting rut timing data since 1953. Our 2026 Whitetail
            Rut Calendar draws on over seven decades of breeding records, harvest data, and field
            reports from our network of guides and outfitters across all 50 states. We track five
            distinct phases -- pre-rut, seeking, chasing, breeding, and post-rut -- because each
            phase demands a different scent strategy. A bottle of estrus during the seeking phase pulls
            bucks from a quarter-mile out. That same bottle during lockdown breeding may go unnoticed
            by a buck pinned down with a doe. Timing is everything, and the calendar below puts that
            timing at your fingertips.
          </p>
          <p>
            Click any state on the map below to see its complete rut timeline, phase breakdown, and
            our recommended Buck Stop scent strategy for peak effectiveness.
          </p>
        </div>
      </section>

      {/* ─── Interactive US Map ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center font-serif text-2xl font-bold text-[#1a3c2a] sm:text-3xl">
          Click Your State
        </h2>

        <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-[#1a3c2a]/10 bg-white p-2 shadow-lg sm:p-4">
          {/* Tooltip */}
          {hoveredData && (
            <div
              className="pointer-events-none absolute z-20 rounded-lg bg-[#1a3c2a] px-3 py-2 text-sm text-white shadow-xl"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y}px`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <span className="font-semibold">{hoveredData.stateName}</span>
              <br />
              Peak: {hoveredData.peakRutStart} - {hoveredData.peakRutEnd}
            </div>
          )}

          <svg
            viewBox="0 0 960 600"
            className="w-full"
            style={{ backgroundColor: '#2d4a3a' }}
            aria-label="Interactive US map showing rut timing by state"
            role="img"
          >
            {STATE_PATHS.map(({ code, d }) => {
              const stateData = allStateRutData.find((s) => s.stateCode === code);
              const fillColor = stateData
                ? getRutTimingColor(stateData.peakRutStart)
                : '#ccc';
              const isHovered = hoveredState === code;

              return (
                <path
                  key={code}
                  id={`map-${code}`}
                  d={d}
                  fill={isHovered ? '#c8932a' : fillColor}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 3 : 2.5}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-colors duration-150"
                  style={{
                    filter: isHovered ? 'brightness(1.3) drop-shadow(0 0 8px rgba(200,147,42,0.6))' : 'none',
                  }}
                  onMouseEnter={(e) => handleStateHover(e, code)}
                  onMouseLeave={(e) => handleStateHover(e, null)}
                  onClick={() => {
                    setActiveRegion('All');
                    scrollToState(code);
                  }}
                  aria-label={
                    stateData
                      ? `${stateData.stateName}: Peak rut ${stateData.peakRutStart} to ${stateData.peakRutEnd}`
                      : code
                  }
                />
              );
            })}
          </svg>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm sm:gap-6">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-4 w-4 rounded-sm"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-charcoal/70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Region Filter Pills ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-2 sm:px-6 lg:px-8" ref={cardsRef}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveRegion('All')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeRegion === 'All'
                ? 'bg-[#1a3c2a] text-white'
                : 'bg-[#1a3c2a]/10 text-[#1a3c2a] hover:bg-[#1a3c2a]/20'
            }`}
          >
            All States
          </button>
          {rutRegions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeRegion === region
                  ? 'bg-[#1a3c2a] text-white'
                  : 'bg-[#1a3c2a]/10 text-[#1a3c2a] hover:bg-[#1a3c2a]/20'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      {/* ─── State Detail Cards ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredStates.map((state) => (
            <StateCard key={state.stateCode} state={state} />
          ))}
        </div>
        {filteredStates.length === 0 && (
          <p className="py-12 text-center text-charcoal/50">
            No states found for the selected region.
          </p>
        )}
      </section>

      {/* ─── Plan Your Hunt CTA ───────────────────────────────── */}
      <section className="bg-[#1a3c2a] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[#f5f0e8] sm:text-4xl">
            Plan Your Hunt
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#f5f0e8]/80">
            Know when the rut peaks. Now get the scent to match.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/scent-finder"
              className="inline-block rounded-md bg-[#c8932a] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#b07e22] hover:shadow-xl"
            >
              Take the Scent Finder Quiz
            </Link>
            <Link
              href="/best-deer-scents"
              className="inline-block rounded-md border-2 border-[#f5f0e8]/60 px-8 py-3 text-base font-semibold text-[#f5f0e8] transition-all hover:bg-[#f5f0e8]/10"
            >
              Best Deer Scents 2026
            </Link>
            <Link
              href="/products"
              className="inline-block rounded-md border-2 border-[#f5f0e8]/60 px-8 py-3 text-base font-semibold text-[#f5f0e8] transition-all hover:bg-[#f5f0e8]/10"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-serif text-2xl font-bold text-[#1a3c2a] sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-[#1a3c2a]/10 bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-[#1a3c2a] transition-colors hover:bg-[#f5f0e8]/50"
                aria-expanded={openFaq === i}
              >
                <span>{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`h-5 w-5 flex-shrink-0 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="border-t border-[#1a3c2a]/10 px-5 py-4 text-sm leading-relaxed text-charcoal/80">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── Species Icon Map ────────────────────────────────────── */
const speciesIcons: Record<string, string> = {
  Whitetail: '\uD83E\uDD8C',
  'Mule Deer': '\uD83E\uDD8C',
  'Coues Whitetail': '\uD83E\uDD8C',
  Elk: '\uD83E\uDD8C',
  Moose: '\uD83E\uDD8C',
  'Sitka Blacktail': '\uD83E\uDD8C',
  Blacktail: '\uD83E\uDD8C',
  Caribou: '\uD83E\uDD8C',
  Bear: '\uD83D\uDC3B',
  Turkey: '\uD83E\uDD83',
  Hog: '\uD83D\uDC17',
  'Wild Pig': '\uD83D\uDC17',
  Alligator: '\uD83D\uDC0A',
  'Mountain Lion': '\uD83E\uDD81',
  Antelope: '\uD83E\uDD8C',
  Javelina: '\uD83D\uDC17',
  Quail: '\uD83D\uDC26',
  'Small Game': '\uD83D\uDC07',
  'Mountain Goat': '\uD83D\uDC10',
  Oryx: '\uD83E\uDD8C',
  'Axis Deer': '\uD83E\uDD8C',
  'Mouflon Sheep': '\uD83D\uDC11',
  'Wild Goat': '\uD83D\uDC10',
};

/* ─── State Detail Card Component ─────────────────────────── */
function StateCard({ state }: { state: StateRutData }) {
  const [showSeasons, setShowSeasons] = useState(false);

  const phases = [
    { label: 'Pre-Rut', dates: state.preRutStart },
    { label: 'Seeking', dates: state.seekingPhase },
    { label: 'Chasing', dates: state.chasingPhase },
    { label: 'Breeding', dates: state.breedingPhase },
    { label: 'Post-Rut', dates: state.postRut },
  ];

  return (
    <div
      id={`state-card-${state.stateCode}`}
      className="rounded-xl border border-[#1a3c2a]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#1a3c2a]">
            {state.stateName}
          </h3>
          <p className="mt-0.5 text-sm text-charcoal/60">
            Peak: {state.peakRutStart} - {state.peakRutEnd}
          </p>
        </div>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: getRutTimingColor(state.peakRutStart) + '20',
            color: getRutTimingColor(state.peakRutStart),
          }}
        >
          {state.region}
        </span>
      </div>

      {/* Timeline Bar */}
      <div className="mb-4">
        <div className="flex w-full overflow-hidden rounded-lg">
          {phases.map((phase) => (
            <div
              key={phase.label}
              className="flex-1 py-1.5 text-center text-[10px] font-semibold text-white sm:text-xs"
              style={{ backgroundColor: phaseColors[phase.label] }}
              title={`${phase.label}: ${phase.dates}`}
            >
              {phase.label}
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex w-full text-[9px] text-charcoal/50 sm:text-[10px]">
          {phases.map((phase) => (
            <div key={phase.label} className="flex-1 text-center">
              {phase.dates}
            </div>
          ))}
        </div>
      </div>

      {/* Second Rut */}
      {state.secondRut !== 'N/A' && (
        <p className="mb-3 text-xs text-charcoal/70">
          <span className="font-semibold text-[#8b3a2a]">Second Rut:</span> {state.secondRut}
        </p>
      )}

      {/* Notes */}
      <p className="mb-4 text-sm leading-relaxed text-charcoal/80">{state.notes}</p>

      {/* Scent Recommendation */}
      <div className="rounded-lg bg-[#f5f0e8] p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1a3c2a]">
          Recommended Scent Strategy
        </p>
        <p className="mt-1 text-sm text-charcoal/80">{state.scentRecommendation}</p>
      </div>

      {/* Seasons & Regulations Toggle */}
      <button
        onClick={() => setShowSeasons(!showSeasons)}
        className="mt-4 flex w-full items-center justify-between rounded-lg border border-[#1a3c2a]/10 px-4 py-2.5 text-left text-sm font-medium text-[#1a3c2a] transition-colors hover:bg-[#f5f0e8]/50"
        aria-expanded={showSeasons}
      >
        <span>Show Seasons &amp; Regulations</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`h-4 w-4 flex-shrink-0 transition-transform ${showSeasons ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {showSeasons && (
        <div className="mt-3 space-y-4">
          {/* Huntable Species Pills */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1a3c2a]">
              Huntable Species
            </p>
            <div className="flex flex-wrap gap-1.5">
              {state.huntableSpecies.map((species) => (
                <span
                  key={species}
                  className="inline-flex items-center gap-1 rounded-full bg-[#1a3c2a]/10 px-2.5 py-1 text-xs font-medium text-[#1a3c2a]"
                >
                  <span aria-hidden="true">{speciesIcons[species] || '\uD83C\uDF3F'}</span>
                  {species}
                </span>
              ))}
            </div>
          </div>

          {/* Season Dates Table */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1a3c2a]">
              Season Dates
            </p>
            <div className="overflow-hidden rounded-lg border border-[#1a3c2a]/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f0e8]">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#1a3c2a]">Season</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#1a3c2a]">Dates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a3c2a]/5">
                  <tr>
                    <td className="px-3 py-2 text-xs font-medium text-charcoal/80">Archery</td>
                    <td className="px-3 py-2 text-xs text-charcoal/70">{state.seasons.archery}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-xs font-medium text-charcoal/80">Firearm</td>
                    <td className="px-3 py-2 text-xs text-charcoal/70">{state.seasons.firearm}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-xs font-medium text-charcoal/80">Muzzleloader</td>
                    <td className="px-3 py-2 text-xs text-charcoal/70">{state.seasons.muzzleloader}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Regulations */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1a3c2a]">
              Key Regulations
            </p>
            <ul className="space-y-1.5 pl-4">
              {state.keyRegulations.map((reg, i) => (
                <li key={i} className="list-disc text-xs leading-relaxed text-charcoal/70">
                  {reg}
                </li>
              ))}
            </ul>
          </div>

          {/* Official Regulations Link */}
          <div className="flex items-center justify-between rounded-lg bg-[#f5f0e8]/60 px-3 py-2.5">
            <a
              href={state.agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c8932a] underline-offset-2 hover:underline"
            >
              View Official Regulations -- {state.agencyName}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5-6h6m0 0v6m0-6-9 9" />
              </svg>
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] italic leading-relaxed text-charcoal/50">
            Season dates are approximate. Always verify with your state wildlife agency before planning your hunt.
          </p>
        </div>
      )}

      {/* Links */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <Link
          href="/products"
          className="font-medium text-[#c8932a] underline-offset-2 hover:underline"
        >
          Shop Scents
        </Link>
        <Link
          href={`/find-a-guide?state=${state.stateCode}`}
          className="font-medium text-[#c8932a] underline-offset-2 hover:underline"
        >
          Find a Guide in {state.stateName}
        </Link>
      </div>
    </div>
  );
}
