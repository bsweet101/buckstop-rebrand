'use client';

import { useState, useMemo, useCallback } from 'react';
import HeroSection from '@/components/HeroSection';
import { guides } from '@/lib/guide-data';
import {
  searchGuides,
  getUniqueStates,
  ALL_SPECIES,
  ALL_METHODS,
  type HuntingGuide,
  type Species,
  type HuntingMethod,
} from '@/lib/guides';

type SortOption = 'relevance' | 'rating' | 'state';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? '#c8932a' : '#d1d5db'}
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

function GuideCard({ guide }: { guide: HuntingGuide }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <article className="flex flex-col rounded-xl border border-cream-dark bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-forest leading-tight">
            {guide.businessName}
          </h3>
          {guide.buckStopPartner && (
            <span className="shrink-0 rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-amber-dark">
              Verified Partner
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-charcoal/70">{guide.name}</p>
        <p className="mt-0.5 text-sm text-charcoal/60">
          {guide.city}, {guide.state}
        </p>
      </div>

      {/* Rating */}
      {guide.rating && (
        <div className="mb-3 flex items-center gap-2">
          <StarRating rating={guide.rating} />
          {guide.reviewCount && (
            <span className="text-xs text-charcoal/50">
              ({guide.reviewCount})
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-charcoal/70">
        {guide.description}
      </p>

      {/* Species tags */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        {guide.species.map((s) => (
          <span
            key={s}
            className="rounded-full bg-forest/10 px-2 py-0.5 text-[11px] font-medium text-forest"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Method tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {guide.methods.map((m) => (
          <span
            key={m}
            className="rounded-full bg-charcoal/8 px-2 py-0.5 text-[11px] font-medium text-charcoal/70"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Experience & Price */}
      <div className="mb-4 flex items-center gap-3 text-sm">
        <span className="rounded-md bg-cream px-2 py-0.5 text-xs font-medium text-charcoal">
          {guide.experience}
        </span>
        <span className="font-semibold text-forest" title="Price range">
          {guide.priceRange}
        </span>
      </div>

      {/* Contact */}
      <div className="mt-auto">
        {!showContact ? (
          <button
            type="button"
            onClick={() => setShowContact(true)}
            className="w-full rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-light focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
          >
            Contact Guide
          </button>
        ) : (
          <div className="space-y-1.5 rounded-lg bg-cream p-3 text-sm">
            {guide.phone && (
              <p>
                <span className="font-medium text-charcoal">Phone:</span>{' '}
                <a href={`tel:${guide.phone}`} className="text-forest hover:underline">
                  {guide.phone}
                </a>
              </p>
            )}
            {guide.email && (
              <p>
                <span className="font-medium text-charcoal">Email:</span>{' '}
                <a href={`mailto:${guide.email}`} className="text-forest hover:underline">
                  {guide.email}
                </a>
              </p>
            )}
            {guide.website && (
              <p>
                <span className="font-medium text-charcoal">Web:</span>{' '}
                <a
                  href={guide.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest hover:underline"
                >
                  Visit Website
                </a>
              </p>
            )}
            {!guide.phone && !guide.email && !guide.website && (
              <p className="text-charcoal/60">No contact information available.</p>
            )}
          </div>
        )}
      </div>

      {/* Report Inaccuracy */}
      <div className="mt-2 text-right">
        <a
          href={`mailto:info@buckstopscents.com?subject=Inaccuracy Report: ${encodeURIComponent(guide.businessName)}`}
          className="text-[11px] text-charcoal/40 transition-colors hover:text-charcoal/70"
        >
          Report Inaccuracy
        </a>
      </div>
    </article>
  );
}

function GuideRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    state: '',
    city: '',
    phone: '',
    email: '',
    website: '',
    species: [] as string[],
    methods: [] as string[],
    experience: '',
    description: '',
    usesBuckStop: false,
  });

  const handleSpeciesToggle = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      species: prev.species.includes(s)
        ? prev.species.filter((x) => x !== s)
        : [...prev.species, s],
    }));
  };

  const handleMethodToggle = (m: string) => {
    setFormData((prev) => ({
      ...prev,
      methods: prev.methods.includes(m)
        ? prev.methods.filter((x) => x !== m)
        : [...prev.methods, m],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-forest/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8 text-forest"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-bold text-forest">Thank You!</h3>
        <p className="mt-2 text-charcoal/70">
          Your guide listing request has been submitted. We will review your information and
          add your listing to the directory within 3-5 business days.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-name" className="mb-1 block text-sm font-medium text-charcoal">
            Your Name *
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="reg-business" className="mb-1 block text-sm font-medium text-charcoal">
            Business Name *
          </label>
          <input
            id="reg-business"
            type="text"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className={inputClass}
            placeholder="Big Buck Outfitters"
          />
        </div>
        <div>
          <label htmlFor="reg-state" className="mb-1 block text-sm font-medium text-charcoal">
            State *
          </label>
          <input
            id="reg-state"
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className={inputClass}
            placeholder="Michigan"
          />
        </div>
        <div>
          <label htmlFor="reg-city" className="mb-1 block text-sm font-medium text-charcoal">
            City *
          </label>
          <input
            id="reg-city"
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={inputClass}
            placeholder="Traverse City"
          />
        </div>
        <div>
          <label htmlFor="reg-phone" className="mb-1 block text-sm font-medium text-charcoal">
            Phone
          </label>
          <input
            id="reg-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-charcoal">
            Email *
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            placeholder="guide@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-website" className="mb-1 block text-sm font-medium text-charcoal">
          Website
        </label>
        <input
          id="reg-website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className={inputClass}
          placeholder="https://www.yoursite.com"
        />
      </div>

      {/* Species */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-charcoal">Species You Guide For</legend>
        <div className="flex flex-wrap gap-2">
          {ALL_SPECIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeciesToggle(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                formData.species.includes(s)
                  ? 'bg-forest text-white'
                  : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Methods */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-charcoal">Hunting Methods</legend>
        <div className="flex flex-wrap gap-2">
          {ALL_METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => handleMethodToggle(m)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                formData.methods.includes(m)
                  ? 'bg-forest text-white'
                  : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="reg-experience" className="mb-1 block text-sm font-medium text-charcoal">
          Years of Experience *
        </label>
        <input
          id="reg-experience"
          type="text"
          required
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className={inputClass}
          placeholder="15+ years"
        />
      </div>

      <div>
        <label htmlFor="reg-description" className="mb-1 block text-sm font-medium text-charcoal">
          Description *
        </label>
        <textarea
          id="reg-description"
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={inputClass}
          placeholder="Tell hunters about your guide service..."
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.usesBuckStop}
          onChange={(e) => setFormData({ ...formData, usesBuckStop: e.target.checked })}
          className="h-4 w-4 rounded border-cream-dark text-forest focus:ring-forest"
        />
        <span className="text-sm text-charcoal">I use Buck Stop products</span>
      </label>

      <button
        type="submit"
        className="w-full rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-dark focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 sm:w-auto"
      >
        Submit Listing Request
      </button>
    </form>
  );
}

export default function FindAGuideClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<HuntingMethod[]>([]);
  const [partnerOnly, setPartnerOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const states = useMemo(() => getUniqueStates(guides), []);

  const toggleSpecies = useCallback((species: Species) => {
    setSelectedSpecies((prev) =>
      prev.includes(species) ? prev.filter((s) => s !== species) : [...prev, species]
    );
  }, []);

  const toggleMethod = useCallback((method: HuntingMethod) => {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedState('');
    setSelectedSpecies([]);
    setSelectedMethods([]);
    setPartnerOnly(false);
    setSortBy('relevance');
  }, []);

  const hasActiveFilters =
    searchQuery || selectedState || selectedSpecies.length > 0 || selectedMethods.length > 0 || partnerOnly;

  const filteredGuides = useMemo(() => {
    let result: HuntingGuide[] = guides;

    if (searchQuery) {
      result = searchGuides(result, searchQuery);
    }

    if (selectedState) {
      result = result.filter((g) => g.stateCode === selectedState);
    }

    if (selectedSpecies.length > 0) {
      result = result.filter((g) =>
        selectedSpecies.some((s) => g.species.includes(s))
      );
    }

    if (selectedMethods.length > 0) {
      result = result.filter((g) =>
        selectedMethods.some((m) => g.methods.includes(m))
      );
    }

    if (partnerOnly) {
      result = result.filter((g) => g.buckStopPartner);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'state':
        result = [...result].sort((a, b) => a.state.localeCompare(b.state));
        break;
      default:
        // relevance: Buck Stop partners first, then by rating
        result = [...result].sort((a, b) => {
          if (a.buckStopPartner !== b.buckStopPartner) return a.buckStopPartner ? -1 : 1;
          return (b.rating ?? 0) - (a.rating ?? 0);
        });
    }

    return result;
  }, [searchQuery, selectedState, selectedSpecies, selectedMethods, partnerOnly, sortBy]);

  return (
    <>
      <HeroSection
        title="Find a Hunting Guide"
        subtitle="Search verified hunting guides and outfitters across all 50 states"
        variant="page"
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl bg-white px-4 pt-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/" className="transition-colors hover:text-forest">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-forest" aria-current="page">
              Find a Guide
            </li>
          </ol>
        </nav>
      </div>

      {/* Info Banner */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-forest/20 bg-cream p-4 sm:p-5">
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mt-0.5 h-5 w-5 shrink-0 text-forest"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-sm leading-relaxed text-forest">
              We&apos;re building the most comprehensive hunting guide directory in America. Data
              sourced from state wildlife agencies, outfitter associations, and verified guide
              registrations. Guide listings are for informational purposes &mdash; please verify
              directly with each outfitter.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 z-30 border-b border-cream-dark bg-white/95 backdrop-blur-sm lg:top-20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Search input */}
          <div className="mb-3">
            <label htmlFor="guide-search" className="sr-only">
              Search guides
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/40"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                />
              </svg>
              <input
                id="guide-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, business, city, or state..."
                className="w-full rounded-lg border border-cream-dark bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* State dropdown */}
            <div>
              <label htmlFor="state-filter" className="sr-only">
                Filter by state
              </label>
              <select
                id="state-filter"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="rounded-lg border border-cream-dark bg-white px-3 py-2 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="">All States</option>
                {states.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Species pills */}
            <div className="flex flex-wrap gap-1.5">
              {ALL_SPECIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSpecies(s)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedSpecies.includes(s)
                      ? 'bg-forest text-white'
                      : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Method pills */}
            <div className="flex flex-wrap gap-1.5">
              {ALL_METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMethod(m)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedMethods.includes(m)
                      ? 'bg-charcoal text-white'
                      : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Partner toggle */}
            <button
              type="button"
              onClick={() => setPartnerOnly(!partnerOnly)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                partnerOnly
                  ? 'bg-amber text-white'
                  : 'bg-amber/10 text-amber-dark hover:bg-amber/20'
              }`}
            >
              Buck Stop Partner
            </button>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-charcoal/50 underline transition-colors hover:text-charcoal"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8" aria-label="Guide listings">
        <div className="mx-auto max-w-7xl">
          {/* Results count & sort */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-charcoal/60">
              <span className="font-semibold text-charcoal">{filteredGuides.length}</span>{' '}
              {filteredGuides.length === 1 ? 'guide' : 'guides'} found
            </p>
            <div>
              <label htmlFor="sort-select" className="sr-only">
                Sort results
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-cream-dark bg-white px-3 py-1.5 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="state">State A-Z</option>
              </select>
            </div>
          </div>

          {/* Guide grid */}
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mx-auto mb-4 h-12 w-12 text-charcoal/30"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                />
              </svg>
              <h3 className="font-serif text-lg font-bold text-charcoal">No guides found</h3>
              <p className="mt-2 text-charcoal/60">
                No guides found matching your criteria. Try adjusting your filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-medium text-forest underline transition-colors hover:text-forest-light"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Data Sources */}
      <section className="border-t border-cream-dark bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-lg font-bold text-forest">Data Sources</h2>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
            <li>
              Guide data sourced from state wildlife agencies, professional outfitter
              associations, and self-registered listings.
            </li>
            <li className="flex items-center justify-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#c8932a"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
              Listings marked with a star have been verified by Buck Stop.
            </li>
            <li>
              If you find inaccurate information, please{' '}
              <a
                href="mailto:info@buckstopscents.com?subject=Guide Directory Correction"
                className="font-medium text-forest underline transition-colors hover:text-forest-light"
              >
                contact us
              </a>{' '}
              to update it.
            </li>
          </ul>
        </div>
      </section>

      {/* Are You a Guide? CTA */}
      <section
        className="bg-cream py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="register-heading"
      >
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8 text-center">
              <h2
                id="register-heading"
                className="font-serif text-2xl font-bold text-forest sm:text-3xl"
              >
                List Your Guide Service for Free
              </h2>
              <p className="mt-3 text-charcoal/70">
                Join 200+ hunting guides on Buck Stop&apos;s nationwide directory. Reach
                thousands of hunters searching for their next guided hunt.
              </p>
            </div>
            <GuideRegistrationForm />
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA button */}
      <a
        href="#register-heading"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-amber px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-amber-dark focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 md:hidden"
        aria-label="List Your Guide Service"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        List Your Guide Service
      </a>
    </>
  );
}
