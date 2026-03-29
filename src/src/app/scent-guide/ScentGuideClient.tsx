'use client';

import { useState } from 'react';
import { faqs } from '@/lib/content';
import { generateFAQSchema, generateHowToSchema } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import AuthorBio from '@/components/AuthorBio';

interface FAQ {
  question: string;
  answer: string;
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-cream-dark rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-warm-white hover:bg-cream transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-semibold text-charcoal pr-4">{faq.question}</span>
        <svg
          className={`w-5 h-5 text-forest flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div id={`faq-answer-${index}`} className="px-6 py-4 text-charcoal-light leading-relaxed bg-cream">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

const scentTypes = [
  {
    name: 'Estrus / Passion Scents',
    whenToUse: 'Pre-rut through peak rut (October - November)',
    description: 'Mimic the pheromones of a doe in heat to trigger dominant buck activity. The most powerful attractant during breeding season.',
    products: ['Mate-Triks Doe-In-Heat', '200 PROOF', 'Guide Grade Doe-In-Heat'],
    colorClass: 'border-l-4 border-amber',
  },
  {
    name: 'Buck / Territorial Scents',
    whenToUse: 'Early season through post-rut (September - January)',
    description: 'Challenge a buck&apos;s territorial instincts with dominant buck urine and tarsal gland scents. Effective for mock scrapes and rub lines.',
    products: ['Ruck&apos;n Buck', 'Supreme Buck Urine', 'Rutting Buck Urine'],
    colorClass: 'border-l-4 border-forest',
  },
  {
    name: 'Cover / Masking Scents',
    whenToUse: 'All season (September - January)',
    description: 'Mask human odor with natural earth, pine, and animal-based scents. Essential for getting to and from your stand undetected.',
    products: ['Rack-koon', 'Skunk Cover Scent', 'Earth Cover Scent'],
    colorClass: 'border-l-4 border-charcoal',
  },
  {
    name: 'Food Lures',
    whenToUse: 'Early season and late season (September - October, December - January)',
    description: 'Appeal to a deer&apos;s constant drive to locate new food sources. Especially effective when natural food becomes scarce.',
    products: ['Apple Attractant', 'Acorn Lure', 'Sweet Corn Scent'],
    colorClass: 'border-l-4 border-amber',
  },
  {
    name: 'Curiosity Lures',
    whenToUse: 'All season (September - January)',
    description: 'Trigger a deer&apos;s natural inquisitive behavior with unique scent formulas. Great for pressured deer that ignore traditional attractants.',
    products: ['HYPER Synthetic Scrape', 'Curiosity Blend', 'Trail Camera Lure'],
    colorClass: 'border-l-4 border-forest',
  },
];

const weatherConditions = [
  { condition: 'High Humidity', effect: 'Scent molecules travel farther and linger longer. Ideal conditions.', icon: '💧' },
  { condition: 'Low Humidity', effect: 'Scent dissipates quickly. Apply more frequently and use heavier doses.', icon: '🏜️' },
  { condition: 'Warm Temperatures (60F+)', effect: 'Scent rises rapidly. Place scent sources lower to the ground.', icon: '🌡️' },
  { condition: 'Cold Temperatures (Below 40F)', effect: 'Scent hangs low and travels slowly. Use heated dispensers if possible.', icon: '❄️' },
  { condition: 'Rain', effect: 'Washes scent away quickly. Re-apply after precipitation stops.', icon: '🌧️' },
  { condition: 'Snow', effect: 'Scent carries well over fresh snow. Great time to lay scent trails.', icon: '🌨️' },
  { condition: 'Mist / Fog', effect: 'Excellent scent dispersal. Moisture particles carry scent molecules effectively.', icon: '🌫️' },
  { condition: 'Light Breeze (3-7 mph)', effect: 'Perfect for carrying scent to deer. Position scent upwind of travel routes.', icon: '🍃' },
];

const fieldTips = [
  {
    title: 'Stand Hunting',
    description: 'Use cover scents like Rack-koon at stand height to mask your presence, and place attractant scents 20-30 yards downwind at ground level. Never apply estrus scent directly to your stand or at your sitting height — you don&apos;t want a buck looking up at you. For tree stand setups, hang a scent wick with doe-in-heat at a shooting lane 15-20 yards out. Ground blind hunters should apply cover scent around the blind perimeter and use Buck Beads at scrape locations within bow range.',
  },
  {
    title: 'Scent Trails',
    description: 'Soak a drag rag with estrus or buck urine and pull it behind you on the way to your stand, starting from a known travel corridor. Re-apply scent generously for the last 50 yards to create a strong terminal zone. Hang the drag rag in a tree near your setup when you arrive. For maximum effectiveness, create two converging scent trails from different directions that meet at your stand location. Store the drag rag in a sealed plastic bag between hunts to preserve freshness.',
  },
  {
    title: 'Mock Scrapes',
    description: 'Clear a 3-foot circle of ground beneath an overhanging licking branch, ideally along a field edge or trail intersection. Apply Supreme Buck Urine or Rutting Buck Urine to the bare earth and a curiosity scent like HYPER Synthetic Scrape to the licking branch itself. Refresh every 3-4 days with Buck Beads for slow-release scent that keeps the scrape active between visits. Create 3-4 mock scrapes within 30 yards of your stand to build a scrapeline that funnels movement.',
  },
  {
    title: 'Scent Elimination',
    description: 'Wash with Scent Stop Body Wash from head to toe before every hunt, paying attention to hair, underarms, and hands. Launder all hunting clothes in Scent Stop Laundry Soap and store them in a sealed scent-free container — never in a closet or vehicle. In the field, spray all gear including boots, bow, quiver, and tree stand with Scent Stop Human Scent Eliminator. Reapply the spray after walking to your stand and again after settling in. The goal is a complete system: clean body, clean clothes, clean equipment.',
  },
];

const howToMockScrape = {
  name: 'How to Set Up a Mock Scrape',
  description: 'Learn how to create a realistic mock scrape that attracts mature bucks using Buck Stop deer scents and proper placement techniques.',
  steps: [
    { name: 'Find active scrapes near deer trails', text: 'Scout for existing scrape activity along deer trails, field edges, and trail intersections. Look for pawed-out ground beneath overhanging branches.' },
    { name: 'Clear 18-24 inch circle of bare dirt', text: 'Use your boot or a stick to clear an 18 to 24 inch circle down to bare dirt, mimicking the scrape a buck would paw out naturally.' },
    { name: 'Find overhanging licking branch 4-5 feet high', text: 'Identify an overhanging licking branch 4 to 5 feet above the ground. If none exists, secure a branch at the right height. Bucks deposit scent from their forehead and preorbital glands on this branch.' },
    { name: 'Apply buck urine to ground', text: 'Apply Buck Stop Ruck\'n Buck buck urine directly to the bare dirt in the scraped circle. Use enough to saturate the soil so the scent persists.' },
    { name: 'Apply Gland-U-Lure to licking branch', text: 'Apply Buck Stop Gland-U-Lure to the overhanging licking branch. This glandular scent triggers the territorial and curiosity instincts that keep bucks returning.' },
    { name: 'Set up scrape dripper for daytime scent dispensing', text: 'Install a scrape dripper above the mock scrape. Drippers release scent during warmer daytime hours when air pressure changes, conditioning bucks to visit during legal shooting light.' },
    { name: 'Position stand 20 yards downwind', text: 'Set up your tree stand or ground blind approximately 20 yards downwind of the mock scrape. Always account for prevailing wind direction so your scent blows away from approaching deer.' },
  ],
  totalTime: 'PT30M',
};

const howToScentTrail = {
  name: 'How to Lay a Scent Trail',
  description: 'Step-by-step instructions for laying an effective scent trail with a drag rag to lead bucks directly to your stand location.',
  steps: [
    { name: 'Soak drag rag with Doe-In-Heat scent', text: 'Thoroughly soak a cloth drag rag with Buck Stop Mate-Triks Doe-In-Heat or 200 PROOF estrus scent. Use enough to keep the rag wet throughout your walk.' },
    { name: 'Attach to boot or drag behind you', text: 'Attach the soaked drag rag to your boot with a clip or tie it to a 3-foot string and drag it behind you as you walk.' },
    { name: 'Walk last 150 yards to stand making sweeping loops', text: 'Begin dragging the rag for the last 150 yards of your approach to your stand. Make two sweeping loops through likely travel corridors and pinch points to maximize the scent coverage area.' },
    { name: 'Refresh scent last 50 yards for strongest concentration', text: 'Reapply fresh scent to the drag rag for the final 50 yards of your walk. This creates the strongest scent concentration closest to your stand where you want the deer to commit.' },
    { name: 'Hang drag rag in tree near stand at 3-4 feet', text: 'When you reach your stand, hang the drag rag on a branch 3 to 4 feet off the ground near a shooting lane. This keeps scent dispensing at nose level throughout your sit.' },
    { name: 'Store in sealed bag when not in use', text: 'After your hunt, place the drag rag in a sealed plastic zip-lock bag to preserve the remaining scent for your next outing. Store in a cool location away from direct sunlight.' },
  ],
  totalTime: 'PT15M',
};

const howToScentElimination = {
  name: 'How to Build a Scent Elimination System',
  description: 'A complete step-by-step system for eliminating human odor before and during a deer hunt using Buck Stop Scent Stop products.',
  steps: [
    { name: 'Wash all hunting clothes in Scent Stop laundry soap', text: 'Launder every piece of hunting clothing -- base layers, mid layers, outerwear, hats, and gloves -- in Buck Stop Scent Stop Laundry Soap. Do not use regular detergent which contains UV brighteners and fragrance.' },
    { name: 'Store in sealed plastic tote', text: 'After washing, store all hunting clothes in a sealed plastic tote or scent-free bag. Never hang them in a closet, laundry room, or vehicle where they will absorb household and automotive odors.' },
    { name: 'Shower with Scent Stop body wash morning of hunt', text: 'On the morning of your hunt, shower from head to toe with Scent Stop Body Wash. Pay special attention to your hair, underarms, and hands where human scent concentrates.' },
    { name: 'Use scent-free deodorant only', text: 'Apply only scent-free deodorant after showering. Standard deodorants and antiperspirants contain fragrances that deer can detect from hundreds of yards away.' },
    { name: 'Dress in field near truck not inside', text: 'Transport your hunting clothes in the sealed tote and dress in the field near your vehicle -- not inside your home or truck where you will pick up foreign odors on clean clothing.' },
    { name: 'Spray down all gear with Scent Stop eliminator', text: 'Before heading to your stand, spray all gear including your bow, quiver, tree stand, backpack, and harness with Scent Stop Human Scent Eliminator. Wipe hard surfaces with a sprayed cloth.' },
    { name: 'Apply cover scent to boot soles', text: 'Apply a natural cover scent like Buck Stop Earth Cover Scent or Rack-koon to the soles of your boots to mask ground scent on your walk-in trail.' },
    { name: 'Wear rubber boots on walk-in', text: 'Wear knee-high rubber boots for your walk to the stand. Rubber does not absorb or release human scent the way leather and fabric boots do, minimizing the scent trail you leave behind.' },
  ],
  totalTime: 'PT45M',
};

export default function ScentGuideClient() {
  const faqSchema = generateFAQSchema(faqs);
  const mockScrapeSchema = generateHowToSchema(howToMockScrape.name, howToMockScrape.description, howToMockScrape.steps, howToMockScrape.totalTime);
  const scentTrailSchema = generateHowToSchema(howToScentTrail.name, howToScentTrail.description, howToScentTrail.steps, howToScentTrail.totalTime);
  const scentEliminationSchema = generateHowToSchema(howToScentElimination.name, howToScentElimination.description, howToScentElimination.steps, howToScentElimination.totalTime);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mockScrapeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scentTrailSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scentEliminationSchema) }}
      />

      <HeroSection
        title="The Science of the Scent Game"
        subtitle="The complete guide to choosing and using deer scents, from America's original deer scent company."
        variant="page"
      />

      <AuthorBio
        name="Brian Johansen"
        title="Owner & Master Scent Formulator"
        initials="BJ"
      />

      {/* How Deer Detect Scent */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-6">
            How Deer Detect Scent
          </h2>
          <div className="text-charcoal space-y-4">
            <p className="text-lg leading-relaxed">
              A whitetail deer&apos;s sense of smell is roughly <strong>100 times greater than a human&apos;s</strong>,
              with over 297 million olfactory receptors compared to our 5 million. This extraordinary ability
              allows deer to detect danger from <strong>half a mile away</strong> under the right conditions.
              A deer can determine the sex, approximate age, health, diet, and reproductive status of
              another deer from a single scent deposit at a scrape or along a trail.
            </p>
            <p className="text-lg leading-relaxed text-charcoal-light">
              Deer process scent through a specialized organ called the vomeronasal (or Jacobson&apos;s) organ,
              located in the roof of the mouth. When a buck curls its upper lip in the distinctive
              &ldquo;flehmen response,&rdquo; it is drawing scent molecules across this organ to analyze
              pheromones in urine and glandular secretions. This is the biological mechanism that makes
              estrus scents and territorial buck urines so effective during the rut.
            </p>
            <p className="text-lg leading-relaxed text-charcoal-light">
              Understanding how scent travels through the environment is the foundation of every
              successful scent strategy. Wind direction, humidity, temperature, and terrain all
              influence how far and how fast scent molecules reach a deer&apos;s nose. Scent rises
              in warm thermals during midday and sinks in cool evening air. Ridgelines and creek
              bottoms funnel scent in predictable patterns. Successful hunters use this knowledge
              to position attractants downwind of travel corridors and to place cover scents between
              their entry route and bedding areas.
            </p>
          </div>
        </div>
      </section>

      {/* Weather Conditions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            Weather &amp; Scent Conditions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weatherConditions.map((item) => (
              <div key={item.condition} className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="font-serif font-bold text-charcoal">{item.condition}</h3>
                </div>
                <p className="text-charcoal-light text-sm leading-relaxed">{item.effect}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scent Types Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            Scent Types Guide
          </h2>
          <div className="space-y-6">
            {scentTypes.map((scent) => (
              <div key={scent.name} className={`bg-cream rounded-xl p-6 ${scent.colorClass}`}>
                <h3 className="text-xl font-serif font-bold text-forest mb-1">{scent.name}</h3>
                <p className="text-sm text-amber font-medium mb-3">{scent.whenToUse}</p>
                <p className="text-charcoal-light leading-relaxed mb-4">{scent.description}</p>
                <div>
                  <span className="text-sm font-semibold text-charcoal">Recommended: </span>
                  <span className="text-sm text-charcoal-light">{scent.products.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Application Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream mb-10 text-center">
            Field Application Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fieldTips.map((tip) => (
              <div key={tip.title} className="bg-forest-light rounded-xl p-6">
                <h3 className="text-lg font-serif font-bold text-amber mb-3">{tip.title}</h3>
                <p className="text-cream text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Strategy Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            Seasonal Scent Strategy
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-forest mb-2">Early Season (September - Early October)</h3>
              <p className="text-charcoal-light leading-relaxed">
                Bucks are still in bachelor groups and focused on food sources. Use food-based attractants
                like apple and acorn scents near feeding areas. Non-rutting buck urine works well for
                establishing mock scrapes that inventory the bucks in your area. Cover scents are critical
                during early season when deer are in predictable patterns and highly alert to any disturbance.
                This is the time to set up trail cameras over scented scrapes to take stock of your herd.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-forest mb-2">Pre-Rut (Mid October - Early November)</h3>
              <p className="text-charcoal-light leading-relaxed">
                Bucks are breaking bachelor groups, establishing territories, and making scrapes.
                Shortened daylight triggers hormonal changes in the thyroid and adrenal glands that drive
                increased aggression and territory marking. Begin using estrus scents like Mate-Triks
                Doe-In-Heat even before does are actually cycling &mdash; bucks are actively seeking and will
                investigate any estrus odor. Combine estrus scents with territorial buck urine at scrapes
                to create the illusion of a hot doe being tended by a rival buck. This is the most productive
                four-week window for scent-based hunting.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-forest mb-2">Peak Rut (November)</h3>
              <p className="text-charcoal-light leading-relaxed">
                Bucks are moving all day chasing does. Use your strongest estrus scents &mdash; 200 PROOF
                and Guide Grade Doe-In-Heat &mdash; aggressively with scent trails, drag rags, and scent
                wicks. Bucks are less cautious during peak rut and will follow a scent trail for hundreds
                of yards. Combine scent with rattling and grunt calls for a multi-sensory approach that
                mature bucks find irresistible. Refresh scent dispensers every 2-3 hours as bucks may
                pass through at any time of day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-forest mb-2">Post-Rut and Late Season (December - January)</h3>
              <p className="text-charcoal-light leading-relaxed">
                Most does have been bred, but bucks are still responsive to estrus scents from unbred does
                entering a second cycle. Food-source attractants become effective again as deer focus on
                replenishing energy reserves before winter. Use cover scents religiously &mdash; pressured
                late-season deer are extremely wary. Buck Beads with slow-release scent are ideal for
                low-maintenance setups during cold weather when you want to minimize trips to refresh scent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scent & Call Combinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-4 text-center">
            Scent &amp; Call Combinations by Season
          </h2>
          <p className="text-center text-charcoal-light text-lg mb-10 max-w-3xl mx-auto">
            A call without the right scent is half the equation. Here&apos;s how to pair them for maximum effectiveness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Early Season */}
            <div className="bg-cream rounded-xl p-6 border-l-4 border-forest">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block bg-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Early Season</span>
                <span className="text-sm text-charcoal-light">Sept &ndash; Early Oct</span>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Calls</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Soft doe bleats and social contact grunts. Use a bleat can sparingly &mdash; one or two every 30&ndash;45 minutes. Keep it casual and non-threatening.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Scents</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Food-based attractants (Apple, Acorn, Sweet Corn). Non-rutting buck urine for early mock scrapes. Scent Stop for elimination.
                  </p>
                </div>
                <div className="bg-forest/5 rounded-lg px-4 py-3 mt-2">
                  <p className="text-sm text-forest font-medium">
                    <strong>Pro Tip:</strong> Deer are calm and pattern-predictable. Any aggression now will push them nocturnal. Match the mood &mdash; soft and subtle wins.
                  </p>
                </div>
              </div>
            </div>

            {/* Pre-Rut */}
            <div className="bg-cream rounded-xl p-6 border-l-4 border-amber">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block bg-amber text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Pre-Rut</span>
                <span className="text-sm text-charcoal-light">Mid Oct &ndash; Early Nov</span>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Calls</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Tending grunts (rhythmic, low-pitched series) and light rattling sequences of 30&ndash;60 seconds. Simulate sparring, not all-out fighting.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Scents</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Ruck&apos;n Buck or Rutting Buck Urine at mock scrapes. Mate-Triks Doe-In-Heat on a drag rag for the last 100 yards of your walk-in.
                  </p>
                </div>
                <div className="bg-amber/10 rounded-lg px-4 py-3 mt-2">
                  <p className="text-sm text-amber-dark font-medium">
                    <strong>Pro Tip:</strong> Build mock scrapes two weeks before the pre-rut so bucks adopt them as their own. Refresh with Buck Beads for sustained output.
                  </p>
                </div>
              </div>
            </div>

            {/* Peak Rut */}
            <div className="bg-cream rounded-xl p-6 border-l-4 border-amber">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block bg-amber text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Peak Rut</span>
                <span className="text-sm text-charcoal-light">November</span>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Calls</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Aggressive rattling (1&ndash;3 minutes), snort-wheezes, and loud estrus bleats. Sequence them: rattle, pause, snort-wheeze, pause, estrus bleat.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Scents</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    200 PROOF or Mate-Triks Doe-In-Heat on drag rags from 200+ yards out. Deploy scent wicks at every shooting lane. Refresh every 2&ndash;3 hours.
                  </p>
                </div>
                <div className="bg-amber/10 rounded-lg px-4 py-3 mt-2">
                  <p className="text-sm text-amber-dark font-medium">
                    <strong>Pro Tip:</strong> Try the double-drag &mdash; Doe-In-Heat on one boot, Ruck&apos;n Buck on the other. Two scent trails telling one story: hot doe, rival buck.
                  </p>
                </div>
              </div>
            </div>

            {/* Post-Rut */}
            <div className="bg-cream rounded-xl p-6 border-l-4 border-forest">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block bg-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Post-Rut</span>
                <span className="text-sm text-charcoal-light">Late Nov &ndash; Dec</span>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Calls</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Soft doe bleats only, once every 30&ndash;45 minutes. No rattling, no aggressive vocalizations. Pressured bucks are wary &mdash; less is more.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">Recommended Scents</h4>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    Food-based lures near food sources. Light estrus application for late-cycling does. Buck Beads in scrapes for low-maintenance, slow-release scent.
                  </p>
                </div>
                <div className="bg-forest/5 rounded-lg px-4 py-3 mt-2">
                  <p className="text-sm text-forest font-medium">
                    <strong>Pro Tip:</strong> Late season is about food and the second estrus cycle. Set up between bedding and the best remaining food source. Let the deer come to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Hunt Preparation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            What Else You Need Besides Scent
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Clothing System */}
            <div className="bg-warm-white rounded-xl p-6 border border-cream-dark">
              <h3 className="text-lg font-serif font-bold text-forest mb-4">Clothing System</h3>
              <ul className="space-y-2 text-sm text-charcoal-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Moisture-wicking base layer (never cotton)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Fleece or wool mid-layer for insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Quiet, windproof outer shell in camo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Add or shed mid-layers by temperature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Store all layers in scent-free bags between hunts</span>
                </li>
              </ul>
            </div>

            {/* Calls & Communication */}
            <div className="bg-warm-white rounded-xl p-6 border border-cream-dark">
              <h3 className="text-lg font-serif font-bold text-forest mb-4">Calls &amp; Communication</h3>
              <ul className="space-y-2 text-sm text-charcoal-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Grunt tube for tending grunts and contact calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Bleat can for doe and fawn vocalizations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Rattling antlers or rattle bag for sparring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Start subtle, escalate with the season</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Practice at home before using in the field</span>
                </li>
              </ul>
            </div>

            {/* Stand & Safety */}
            <div className="bg-warm-white rounded-xl p-6 border border-cream-dark">
              <h3 className="text-lg font-serif font-bold text-forest mb-4">Stand &amp; Safety</h3>
              <ul className="space-y-2 text-sm text-charcoal-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Full-body safety harness (non-negotiable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Lineman&apos;s belt for climbing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Haul line for weapon and gear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Stable platform &mdash; check bolts and straps annually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">&bull;</span>
                  <span>Red or green headlamp for entry and exit</span>
                </li>
              </ul>
            </div>

            {/* Recovery Gear */}
            <div className="bg-warm-white rounded-xl p-6 border border-cream-dark">
              <h3 className="text-lg font-serif font-bold text-forest mb-4">Recovery Gear</h3>
              <ul className="space-y-2 text-sm text-charcoal-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Sharp fixed-blade knife for field dressing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Latex or nitrile gloves (multiple pairs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Tracking light with blood-detection mode</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Flagging tape for marking blood trail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold mt-0.5">&bull;</span>
                  <span>Game bags and zip ties for transport</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href="/hunting-tips"
              className="inline-block bg-forest text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors"
            >
              New to Hunting? Read Our Complete Beginner&apos;s Guide
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
