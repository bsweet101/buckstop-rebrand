'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

// ── Types ────────────────────────────────────────────────────────────

type GameAnimal = 'whitetail' | 'bear-hog' | 'predator';
type Season = 'early' | 'pre-rut' | 'peak-rut' | 'post-rut' | 'unsure';
type HuntMethod = 'tree-stand' | 'ground-blind' | 'spot-stalk' | 'mock-scrape';
type Experience = 'first-time' | 'some' | 'pro';
type Budget = 'under-10' | '10-20' | '20-plus';

interface QuizAnswers {
  animal: GameAnimal | null;
  season: Season | null;
  method: HuntMethod | null;
  experience: Experience | null;
  budget: Budget | null;
}

interface OptionCard {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

// ── Icons (inline SVGs) ─────────────────────────────────────────────

function DeerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M24 38V24m0 0c-3-6-8-8-12-8m12 8c3-6 8-8 12-8M18 10l-4-6M30 10l4-6M24 24c0-4 0-10 0-14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="40" r="4" />
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

function PredatorIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <path d="M8 32c4-2 8-8 16-8s12 6 16 8M12 24l-4-8M36 24l4-8M20 28v4M28 28v4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="24" r="2" fill="currentColor" />
      <circle cx="30" cy="24" r="2" fill="currentColor" />
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

function ScrapeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <ellipse cx="24" cy="34" rx="14" ry="6" />
      <path d="M18 28c-2-6 0-12 6-16s10 2 8 8" strokeLinecap="round" />
      <path d="M20 18l-4-6M28 14l2-8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <rect x="8" y="12" width="32" height="28" rx="3" />
      <path d="M8 22h32M16 8v8M32 8v8" strokeLinecap="round" />
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

function DollarIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} className="h-10 w-10">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 12v24M18 20c0-3 2.7-4 6-4s6 1 6 4-2.7 4-6 4-6 1-6 4 2.7 4 6 4 6-1 6-4" strokeLinecap="round" />
    </svg>
  );
}

// ── Recommendation Engine ────────────────────────────────────────────

function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

interface Recommendation {
  primary: Product;
  why: string;
  complementary: Product[];
  proTip: string;
}

function getRecommendations(answers: QuizAnswers): Recommendation {
  const { animal, season, method, experience, budget } = answers;

  // Budget ceiling
  const maxPrice =
    budget === 'under-10' ? 10 : budget === '10-20' ? 20 : Infinity;

  // ── Bear / Hog path ───────────────────────────────────────────
  if (animal === 'bear-hog') {
    const sweetCorn = findProductBySlug('sweet-corn-buck-beads-5-75oz')!;
    const sugarBeet = findProductBySlug('sugar-beet-buck-beads-5-75oz')!;
    return {
      primary: sweetCorn,
      why: 'Sweet Corn Buck Beads are a food-based attractant that works on bear and hog year-round. The slow-release beads keep scent active for days, so you can bait a location and come back later.',
      complementary: [sugarBeet],
      proTip:
        'For bear and hog, food scents outperform urine-based lures. Place beads along known travel corridors where animals move between bedding and feeding areas.',
    };
  }

  // ── Predator / Trapping path ──────────────────────────────────
  if (animal === 'predator') {
    const glandTR = findProductBySlug('gland-u-lure-tr-2oz')!;
    const gland = findProductBySlug('gland-u-lure-1-25oz')!;
    return {
      primary: glandTR,
      why: 'GLAND-U-LURE TR is specifically formulated at trapper-grade concentration for predator and multi-species trapping sets. The enhanced glandular formula triggers investigation from coyotes, fox, and other predators.',
      complementary: [gland],
      proTip:
        'When setting predator traps, apply lure downwind of the set so approaching animals walk into your trap zone. Reapply every 3-4 days for best results.',
    };
  }

  // ── Whitetail paths ───────────────────────────────────────────

  let primary: Product;
  let why: string;
  const complementary: Product[] = [];
  let proTip: string;

  // Mock Scrape override
  if (method === 'mock-scrape') {
    const ruckn = findProductBySlug('ruckn-buck-dominant-buck-urine-2oz')!;
    const five = findProductBySlug('five-2oz')!;
    primary = ruckn;
    why =
      "RUCK'N BUCK dominant buck urine is the foundation of a convincing mock scrape. Real dominant buck urine signals to local bucks that a rival has moved in, making them return to investigate and freshen the scrape.";
    complementary.push(five);
    proTip =
      'Build your mock scrape under a licking branch 4-5 feet off the ground. Refresh with RUCK\'N BUCK every 3-4 days. Add FIVE for a complete scent profile that mimics a real scrape.';
  }
  // Season-based recommendations
  else if (season === 'early' || season === 'post-rut') {
    // Early and late season: curiosity / territorial scents
    const gland = findProductBySlug('gland-u-lure-1-25oz')!;
    const supreme = findProductBySlug('supreme-buck-urine-1-25oz')!;
    if (budget === 'under-10') {
      primary = gland;
      why =
        'GLAND-U-LURE is a versatile, all-season glandular lure that triggers curiosity without spooking deer. At $6.99, it is the most affordable way to start using scents effectively.';
    } else {
      primary = supreme;
      why =
        'SUPREME BUCK URINE works all season long. During the early season and post-rut, bucks are not responding to estrus scents yet, so a natural buck urine creates a calming, territorial presence near your stand.';
    }
    complementary.push(gland.slug === primary.slug ? supreme : gland);
    proTip =
      season === 'early'
        ? 'Early season bucks are pattern-driven and cautious. Use scents sparingly near food sources and trails. Less is more -- a few drops on a scent wick beats saturating the area.'
        : 'Post-rut bucks are exhausted and wary. Focus on food-source funnels. A subtle curiosity scent works better than aggressive estrus lures right now.';
  } else if (season === 'pre-rut') {
    if (experience === 'first-time') {
      primary = findProductBySlug('mate-triks-original-doe-in-heat-1-25oz')!;
      why =
        'MATE-TRIKS Original is the scent that started the industry in 1972. It is the most trusted estrus formula for pre-rut hunting -- simple to use, proven effective, and at $7.99 it is the best entry point for a first-time scent user.';
    } else if (experience === 'some') {
      if (maxPrice <= 10) {
        primary = findProductBySlug('alure-1-25oz')!;
        why =
          'ALURE is a curiosity-based blend that appeals to both bucks and does. During the pre-rut, bucks are investigating everything new in their territory, making ALURE highly effective.';
      } else {
        primary = findProductBySlug('five-2oz')!;
        why =
          'FIVE combines buck urine, doe urine, estrus, tarsal gland, and forehead gland in one bottle. During the pre-rut, this complex scent profile mimics a real scrape and triggers both curiosity and territorial aggression.';
      }
    } else {
      // pro
      primary = findProductBySlug('five-2oz')!;
      why =
        'As an experienced hunter, FIVE gives you the most complete scent tool for pre-rut. The five-scent blend creates a realistic scrape signature that pulls mature bucks off their beds to investigate.';
    }
    proTip =
      'Pre-rut bucks are making scrapes and checking them obsessively. Place scent in natural scrape lines and along field edges where bucks travel between bedding and food. Refresh scent every 2-3 days.';
  } else if (season === 'peak-rut') {
    if (experience === 'first-time') {
      if (maxPrice <= 10) {
        primary = findProductBySlug('mate-triks-original-doe-in-heat-1-25oz')!;
        why =
          'MATE-TRIKS Original is the simplest, most proven estrus scent for peak rut. A few drops on a drag rag walking to your stand can pull a cruising buck right to you.';
      } else {
        primary = findProductBySlug('buc-plus-1-25oz')!;
        why =
          'BUC PLUS combines buck urine with tarsal gland for a one-bottle solution during peak rut. It attracts bucks through both curiosity and territorial challenge.';
      }
    } else if (experience === 'some') {
      primary = findProductBySlug('200-proof-ultimate-doe-in-heat-2oz')!;
      why =
        '200 PROOF is single-doe collected at peak estrus -- the most concentrated estrus scent we make in a standard bottle. When a mature buck is locked down with a doe, this is what pulls him away.';
    } else {
      // pro
      if (maxPrice <= 20) {
        primary = findProductBySlug('200-proof-ultimate-doe-in-heat-2oz')!;
        why =
          '200 PROOF delivers single-doe peak estrus concentration. For a pro hunter who knows how to place scent strategically, this is the highest-impact option under $20.';
      } else {
        primary = findProductBySlug('the-peak-premium-doe-in-heat-2oz')!;
        why =
          'THE PEAK is our most refined estrus collection -- harvested at the absolute zenith of a single doe\'s cycle. For a pro hunter on a once-a-season sit, this is the bottle you carry in.';
      }
    }
    proTip =
      'During peak rut, bucks are on their feet all day chasing does. Use a scent drag walking to your stand, then hang scent wicks at shooting distance. Refresh at midday -- peak rut bucks often move in waves.';
  } else {
    // unsure / all-season
    if (experience === 'first-time') {
      primary = findProductBySlug('mate-triks-original-doe-in-heat-1-25oz')!;
      why =
        'When you are not sure of the season timing, MATE-TRIKS Original is the safest bet. It is effective from pre-rut through post-rut and is the most beginner-friendly scent we make.';
    } else {
      primary = findProductBySlug('alure-1-25oz')!;
      why =
        'ALURE works across the entire season as a curiosity lure. Since you are not sure of the timing, a versatile all-season scent gives you coverage no matter when deer are cycling.';
    }
    proTip =
      'If you are unsure of the rut phase in your area, check local hunting forums or your state wildlife agency for rut prediction maps. Timing scent use to the rut phase is the single biggest factor in success.';
  }

  // ── Add complementary products ─────────────────────────────────

  // Cover scent for tree stand / ground blind
  if (method === 'tree-stand' || method === 'ground-blind') {
    const glandSpray = findProductBySlug('gland-u-lure-spray-2oz');
    if (glandSpray && glandSpray.slug !== primary.slug && !complementary.find((c) => c.slug === glandSpray.slug)) {
      complementary.push(glandSpray);
    }
  }

  // Buck Beads for long-lasting (pre-rut / peak-rut)
  if (season === 'pre-rut' || season === 'peak-rut') {
    const mateBeads = findProductBySlug('mate-triks-buck-beads-5-75oz');
    if (mateBeads && mateBeads.slug !== primary.slug && !complementary.find((c) => c.slug === mateBeads.slug)) {
      complementary.push(mateBeads);
    }
  }

  // Bag-A-Buck kit for first-timers
  if (experience === 'first-time' && maxPrice >= 15) {
    const bag = findProductBySlug('bag-a-buck-kit');
    if (bag && bag.slug !== primary.slug && !complementary.find((c) => c.slug === bag.slug)) {
      complementary.push(bag);
    }
  }

  // Spot-and-stalk: drag rag friendly products
  if (method === 'spot-stalk') {
    const gland = findProductBySlug('gland-u-lure-1-25oz');
    if (gland && gland.slug !== primary.slug && !complementary.find((c) => c.slug === gland.slug)) {
      complementary.push(gland);
    }
  }

  // Budget filter on complementary
  const filteredComplementary = complementary
    .filter((p) => p.price <= maxPrice || maxPrice === Infinity)
    .slice(0, 3);

  // If the primary exceeds budget, downgrade
  if (primary.price > maxPrice) {
    const gland = findProductBySlug('gland-u-lure-1-25oz')!;
    const mate = findProductBySlug('mate-triks-original-doe-in-heat-1-25oz')!;
    primary = maxPrice < 7 ? gland : mate;
    why =
      primary.slug === 'gland-u-lure-1-25oz'
        ? 'At $6.99, GLAND-U-LURE is our most affordable option and works all season long. It is a great starting point to learn how scent placement affects deer movement.'
        : 'MATE-TRIKS Original at $7.99 is the most proven estrus scent in deer hunting history. It fits your budget while delivering real results.';
  }

  return {
    primary,
    why,
    complementary: filteredComplementary,
    proTip: proTip!,
  };
}

// ── Step Configurations ─────────────────────────────────────────────

const animalOptions: OptionCard[] = [
  {
    value: 'whitetail',
    label: 'Whitetail Deer',
    description: 'The most popular game animal in North America -- we have scents for every phase of the season.',
    icon: <DeerIcon />,
  },
  {
    value: 'bear-hog',
    label: 'Bear / Hog',
    description: 'Food-based attractants that draw bears and hogs to your setup.',
    icon: <BearIcon />,
  },
  {
    value: 'predator',
    label: 'Predator / Trapping',
    description: 'Concentrated glandular lures for coyote, fox, and multi-species trapping.',
    icon: <PredatorIcon />,
  },
];

const seasonOptions: OptionCard[] = [
  {
    value: 'early',
    label: 'Early Season (Aug-Sep)',
    description: 'Bucks are in bachelor groups, establishing territory. Velvet is shedding and food sources drive movement.',
    icon: <CalendarIcon />,
  },
  {
    value: 'pre-rut',
    label: 'Pre-Rut (Oct)',
    description: 'Bucks are making scrapes, rubbing trees, and seeking does. Testosterone is rising and territorial behavior peaks.',
    icon: <CalendarIcon />,
  },
  {
    value: 'peak-rut',
    label: 'Peak Rut (Nov)',
    description: 'Bucks are chasing does aggressively. This is when mature bucks are most vulnerable to estrus scents.',
    icon: <CalendarIcon />,
  },
  {
    value: 'post-rut',
    label: 'Post-Rut / Late Season (Dec-Jan)',
    description: 'Bucks are recovering from the rut. Some does may cycle again, creating a brief second rut window.',
    icon: <CalendarIcon />,
  },
  {
    value: 'unsure',
    label: "I'm Not Sure",
    description: 'No problem -- we will recommend versatile all-season options that work regardless of timing.',
    icon: <CalendarIcon />,
  },
];

const methodOptions: OptionCard[] = [
  {
    value: 'tree-stand',
    label: 'Tree Stand',
    description: 'Elevated position means your scent drifts above ground level. Place attractants below to draw deer under your stand.',
    icon: <TreeStandIcon />,
  },
  {
    value: 'ground-blind',
    label: 'Ground Blind',
    description: 'Close quarters hunting where scent control is critical. A cover scent helps mask your presence at eye level.',
    icon: <BlindIcon />,
  },
  {
    value: 'spot-stalk',
    label: 'Spot and Stalk',
    description: 'Mobile hunting where scent trails shine. Drag a scent rag behind you to create a trail leading to your position.',
    icon: <StalkIcon />,
  },
  {
    value: 'mock-scrape',
    label: 'Mock Scrapes',
    description: 'Setting up fake scrapes with real scent to draw bucks into checking them regularly. One of the most effective pre-rut tactics.',
    icon: <ScrapeIcon />,
  },
];

const experienceOptions: OptionCard[] = [
  {
    value: 'first-time',
    label: 'First Time',
    description: 'New to deer scents -- you want something simple, proven, and easy to use right out of the bottle.',
    icon: <StarIcon />,
  },
  {
    value: 'some',
    label: 'Some Experience',
    description: 'You have used scents before and want to upgrade your approach with more targeted products.',
    icon: <StarIcon />,
  },
  {
    value: 'pro',
    label: 'Pro Hunter',
    description: 'You know what you are doing -- show me the most potent, premium options available.',
    icon: <StarIcon />,
  },
];

const budgetOptions: OptionCard[] = [
  {
    value: 'under-10',
    label: 'Under $10',
    description: 'Effective scents that will not break the bank. Great for trying scent hunting for the first time.',
    icon: <DollarIcon />,
  },
  {
    value: '10-20',
    label: '$10 - $20',
    description: 'The sweet spot for most hunters -- premium formulas with proven results.',
    icon: <DollarIcon />,
  },
  {
    value: '20-plus',
    label: '$20+ / Show Me the Best',
    description: 'Top-tier, guide-grade scents for hunters who want every possible advantage.',
    icon: <DollarIcon />,
  },
];

// ── Step Education Text ─────────────────────────────────────────────

const stepEducation: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'What are you hunting?',
    subtitle:
      'Different animals respond to different scent strategies. Deer rely on urine and glandular scents for communication, while bears and hogs are drawn primarily to food odors.',
  },
  2: {
    title: 'What phase of the season?',
    subtitle:
      'Deer behavior changes dramatically throughout the fall. The scent that works in October may be completely wrong in September. Matching your scent to the biological phase is the single most important decision you will make.',
  },
  3: {
    title: 'How are you hunting?',
    subtitle:
      'Your hunting method determines how scent disperses and where you need it placed. The right application technique is just as important as the right bottle.',
  },
  4: {
    title: "What's your experience with scents?",
    subtitle:
      'We tailor our recommendations to your comfort level. Beginners get simple, forgiving products. Experienced hunters get the potent, specialized formulas that reward precise placement.',
  },
  5: {
    title: "What's your budget?",
    subtitle:
      'Buck Stop scents range from $6.99 to $19.99. Every bottle contains real, lab-tested deer scent -- the difference in price reflects collection method, concentration, and volume.',
  },
};

// ── Component ────────────────────────────────────────────────────────

export default function ScentFinderClient() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    animal: null,
    season: null,
    method: null,
    experience: null,
    budget: null,
  });
  const [showResults, setShowResults] = useState(false);

  // Determine total steps based on animal selection
  const totalSteps = answers.animal === 'whitetail' ? 5 : answers.animal ? 3 : 5;

  const handleSelect = useCallback(
    (key: keyof QuizAnswers, value: string) => {
      const updated = { ...answers, [key]: value };
      setAnswers(updated);

      // Non-whitetail skips season step
      if (key === 'animal' && value !== 'whitetail') {
        // For bear/hog and predator, skip to method (step 3)
        // but we compress steps: animal -> experience -> budget -> results
        // Actually for non-whitetail: animal -> budget -> results
        setStep(2); // Will render budget step for non-whitetail
        return;
      }

      if (key === 'animal' && value === 'whitetail') {
        setStep(2);
        return;
      }

      // Non-whitetail flow: step 2 = budget, then results
      if (answers.animal !== 'whitetail') {
        if (key === 'budget') {
          setShowResults(true);
          return;
        }
        setStep((s) => s + 1);
        return;
      }

      // Whitetail flow
      if (step < 5) {
        setStep((s) => s + 1);
      } else {
        setShowResults(true);
      }
    },
    [answers, step],
  );

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      if (answers.animal !== 'whitetail') {
        setStep(2);
      }
      return;
    }

    if (answers.animal !== 'whitetail' && step === 2) {
      setStep(1);
      setAnswers((a) => ({ ...a, animal: null }));
      return;
    }

    if (step > 1) {
      setStep((s) => s - 1);
    }
  }, [step, showResults, answers.animal]);

  const handleRestart = useCallback(() => {
    setStep(1);
    setAnswers({ animal: null, season: null, method: null, experience: null, budget: null });
    setShowResults(false);
  }, []);

  // Progress calculation
  const currentProgress = showResults
    ? 100
    : answers.animal !== 'whitetail' && answers.animal !== null
      ? step === 1
        ? 50
        : 100
      : (step / totalSteps) * 100;

  // ── Render results ─────────────────────────────────────────────
  if (showResults) {
    const rec = getRecommendations(answers);

    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 w-full rounded-full bg-[#1a3c2a]/10">
              <div
                className="h-2 rounded-full bg-[#c8932a] transition-all duration-500"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <h1 className="mb-2 text-center font-serif text-3xl font-bold text-[#1a3c2a] sm:text-4xl">
            Your Personalized Scent Strategy
          </h1>
          <p className="mb-10 text-center text-[#2d2d2d]/70">
            Based on your answers, here is what we recommend for your hunt.
          </p>

          {/* Primary recommendation */}
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#1a3c2a]">
              Our Top Pick for You
            </h2>
            <div className="grid gap-6 md:grid-cols-[280px_1fr]">
              <div className="mx-auto w-full max-w-[280px]">
                <ProductCard product={rec.primary} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="mb-2 text-xl font-bold text-[#2d2d2d]">
                  Why {rec.primary.name.split(' ').slice(0, 2).join(' ')}?
                </h3>
                <p className="text-[#2d2d2d]/80 leading-relaxed">{rec.why}</p>
              </div>
            </div>
          </section>

          {/* Complementary products */}
          {rec.complementary.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-lg font-semibold text-[#1a3c2a]">
                Complete Your Setup
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rec.complementary.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Pro Tip */}
          <section className="mb-10 rounded-lg border-l-4 border-[#c8932a] bg-white p-6 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-[#c8932a]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              Pro Tip
            </h2>
            <p className="text-[#2d2d2d]/80 leading-relaxed">{rec.proTip}</p>
          </section>

          {/* Navigation links */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-md border border-[#1a3c2a] px-6 py-3 text-sm font-semibold text-[#1a3c2a] transition-colors hover:bg-[#1a3c2a] hover:text-white"
            >
              Retake Quiz
            </button>
            <Link
              href="/scent-guide"
              className="rounded-md border border-[#c8932a] px-6 py-3 text-sm font-semibold text-[#c8932a] transition-colors hover:bg-[#c8932a] hover:text-white"
            >
              Want to Learn More?
            </Link>
            <Link
              href="/products"
              className="rounded-md bg-[#1a3c2a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a3c2a]/90"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Determine current step options ─────────────────────────────

  let currentOptions: OptionCard[];
  let currentKey: keyof QuizAnswers;
  let displayStep: number;
  let displayTotal: number;

  if (answers.animal !== 'whitetail' && answers.animal !== null && step === 2) {
    // Non-whitetail: step 2 is budget
    currentOptions = budgetOptions;
    currentKey = 'budget';
    displayStep = 2;
    displayTotal = 2;
  } else {
    switch (step) {
      case 1:
        currentOptions = animalOptions;
        currentKey = 'animal';
        break;
      case 2:
        currentOptions = seasonOptions;
        currentKey = 'season';
        break;
      case 3:
        currentOptions = methodOptions;
        currentKey = 'method';
        break;
      case 4:
        currentOptions = experienceOptions;
        currentKey = 'experience';
        break;
      case 5:
        currentOptions = budgetOptions;
        currentKey = 'budget';
        break;
      default:
        currentOptions = animalOptions;
        currentKey = 'animal';
    }
    displayStep = step;
    displayTotal = totalSteps;
  }

  const education = answers.animal !== 'whitetail' && answers.animal !== null && step === 2
    ? stepEducation[5]
    : stepEducation[step];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-[#2d2d2d]/60">
            <span>Step {displayStep} of {displayTotal}</span>
            <span>{Math.round(currentProgress)}% complete</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-[#1a3c2a]/10">
            <div
              className="h-2 rounded-full bg-[#c8932a] transition-all duration-500 ease-out"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        {/* Back button */}
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 mt-4 flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-[#1a3c2a] border border-[#1a3c2a]/20 transition-colors hover:bg-[#1a3c2a]/5"
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
        )}

        {/* Step heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 font-serif text-2xl font-bold text-[#1a3c2a] sm:text-3xl">
            {education.title}
          </h1>
          <p className="mx-auto max-w-xl text-sm text-[#2d2d2d]/70 leading-relaxed">
            {education.subtitle}
          </p>
        </div>

        {/* Option cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {currentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(currentKey, option.value)}
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
