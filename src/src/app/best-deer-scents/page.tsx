import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import AuthorBio from '@/components/AuthorBio';
import { products } from '@/lib/products';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Best Deer Scents for 2026 | Expert Guide | Buck Stop',
  description:
    'Field-tested guide to the best deer scents for 2026. Find the right estrus, buck urine & gland lure for your hunt. Shop now.',
};

const topPicks = [
  {
    category: 'Best Overall',
    name: '200 PROOF Ultimate Doe-In-Heat',
    price: '$13.99',
    bestFor: 'Serious rut hunters',
    slug: '200-proof-ultimate-doe-in-heat-2oz',
  },
  {
    category: 'Best for Beginners',
    name: 'MATE-TRIKS Original',
    price: '$7.99',
    bestFor: 'First-time scent users',
    slug: 'mate-triks-original-doe-in-heat-1-25oz',
  },
  {
    category: 'Best Premium',
    name: 'Guide Grade Scents',
    price: '$19.99',
    bestFor: 'Trophy hunters, guides',
    slug: 'guide-grade-scents-doe-in-heat-2oz',
  },
  {
    category: 'Best for Mock Scrapes',
    name: "RUCK'N BUCK",
    price: '$13.99',
    bestFor: 'Pre-rut territory setup',
    slug: 'ruckn-buck-dominant-buck-urine-2oz',
  },
  {
    category: 'Best Value',
    name: 'GLAND-U-LURE',
    price: '$6.99',
    bestFor: 'Year-round versatility',
    slug: 'gland-u-lure-1-25oz',
  },
  {
    category: 'Best Innovation',
    name: 'MATE-TRIKS Buck Beads',
    price: '$10.99',
    bestFor: 'Set-and-forget scent',
    slug: 'mate-triks-buck-beads-5-75oz',
  },
];

const reviewFaqs = [
  {
    question: 'Does deer scent really work?',
    answer:
      'Yes. Whitetail deer rely on their sense of smell more than any other sense, with over 297 million olfactory receptors. Properly collected and preserved deer scents trigger instinctive responses -- territorial aggression from buck urine, breeding behavior from estrus scents, and curiosity from glandular lures. The key is using the right scent at the right time of season and applying it correctly. Decades of field testing by hunters across North America confirm that scent is one of the most effective tools for drawing deer into range.',
  },
  {
    question: 'When should I start using doe estrus scent?',
    answer:
      'Begin using doe estrus scent during the pre-rut, typically mid-October in northern states. Bucks are actively seeking the first does to come into heat during this period, and even a trace of estrus odor will draw investigation. Peak effectiveness runs from late October through mid-November during the rut. You can continue using estrus scent into December for the second estrus cycle when unbred does and doe fawns come into heat approximately 28 days after the primary cycle.',
  },
  {
    question: 'What is the difference between estrus and regular doe urine?',
    answer:
      'Regular doe urine is collected from does that are not in their estrus (breeding) cycle. It serves as a calming, social scent that signals the presence of deer in an area and works well year-round. Estrus urine, also called doe-in-heat scent, is collected specifically when a doe is at the peak of her breeding cycle. It contains pheromones that trigger the breeding response in bucks -- increased movement, scrape checking, and aggressive pursuit. Estrus scent is most effective during the rut, while regular doe urine works in any season.',
  },
  {
    question: 'How long does deer scent last in the field?',
    answer:
      'Liquid deer scents typically remain effective for 4 to 8 hours depending on temperature, humidity, and wind conditions. Hot, dry, windy days cause scent to dissipate faster, while cool, humid, calm conditions extend effectiveness. Buck Stop Buck Beads use slow-release biodegradable technology that provides scent output for multiple days, making them ideal for mock scrapes and low-maintenance setups. For liquid scents, plan to refresh your application every 3 to 4 hours during an all-day sit.',
  },
  {
    question: 'Should I use synthetic or natural deer scent?',
    answer:
      'Natural deer scent collected from live whitetail deer is the gold standard. It contains the full spectrum of pheromones, hormones, and glandular compounds that deer recognize instinctively. Synthetic scents attempt to replicate these compounds chemically and can work in some situations, but they lack the complexity of natural scent. Buck Stop uses 100% natural scents collected from live deer under controlled conditions, ensuring authenticity and potency that synthetic alternatives cannot match. For the most realistic and effective scent experience, natural is always the better choice.',
  },
];

const seasonTable = [
  { season: 'Early Season (Sept-Oct)', type: 'Food lures, curiosity scents', product: 'GLAND-U-LURE, Sweet Corn Buck Beads' },
  { season: 'Pre-Rut (Mid Oct-Early Nov)', type: 'Estrus, territorial buck urine', product: "MATE-TRIKS Original, RUCK'N BUCK" },
  { season: 'Peak Rut (November)', type: 'Concentrated estrus, aggressive buck', product: '200 PROOF, Guide Grade Scents' },
  { season: 'Post-Rut (Dec-Jan)', type: 'Light estrus, food lures', product: 'MATE-TRIKS Buck Beads, GLAND-U-LURE' },
];

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Best Deer Scents 2026', url: '/best-deer-scents' },
];

function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export default function BestDeerScentsPage() {
  const faqSchema = generateFAQSchema(reviewFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Best Deer Scents for 2026',
    description:
      'Expert buying guide to the best deer scents for 2026, field-tested by Buck Stop Lure Co.',
    author: {
      '@type': 'Person',
      name: 'Brian Johansen',
      jobTitle: 'Owner & Master Scent Formulator',
      affiliation: {
        '@type': 'Organization',
        name: 'Buck Stop Lure Co.',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Buck Stop Lure Co.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.buckstopscents.com/images/logo.png',
      },
    },
    datePublished: '2026-01-15',
    dateModified: '2026-03-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.buckstopscents.com/best-deer-scents',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <HeroSection
        title="The Best Deer Scents for 2026"
        subtitle="Field-tested picks from America's original deer scent company. Every product reviewed by our team across multiple Michigan whitetail seasons."
        variant="page"
      />

      {/* Author Byline */}
      <div className="bg-warm-white border-b border-cream-dark">
        <div className="max-w-4xl mx-auto flex items-center gap-4 py-5 px-4 sm:px-6 lg:px-8">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: '#1a3c2a' }}
            aria-hidden="true"
          >
            BJ
          </div>
          <div>
            <p className="text-sm font-semibold text-forest">Reviewed by Brian Johansen</p>
            <p className="text-xs text-charcoal/60">
              Owner &amp; Master Scent Formulator, Buck Stop Lure Co. | 30+ years whitetail hunting experience
            </p>
            <p className="text-xs text-charcoal/50 mt-0.5">Last Updated: March 2026</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 bg-warm-white">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-forest transition-colors">Home</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-forest font-medium" aria-current="page">Best Deer Scents 2026</li>
          </ol>
        </nav>
      </div>

      {/* Quick Summary Box */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-cream border-2 border-cream-dark rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-serif font-bold text-forest mb-6">Our Top Picks at a Glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-forest/20">
                    <th className="text-left py-3 pr-4 font-semibold text-forest">Category</th>
                    <th className="text-left py-3 pr-4 font-semibold text-forest">Our Pick</th>
                    <th className="text-left py-3 pr-4 font-semibold text-forest">Price</th>
                    <th className="text-left py-3 font-semibold text-forest">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {topPicks.map((pick) => (
                    <tr key={pick.slug} className="border-b border-cream-dark">
                      <td className="py-3 pr-4 font-medium text-charcoal">{pick.category}</td>
                      <td className="py-3 pr-4">
                        <Link
                          href={`/products/${pick.slug}`}
                          className="text-forest font-semibold hover:text-amber transition-colors underline"
                        >
                          {pick.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-charcoal">{pick.price}</td>
                      <td className="py-3 text-charcoal-light">{pick.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How We Tested */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-forest mb-6">How We Tested</h2>
          <p className="text-lg text-charcoal leading-relaxed">
            Every product in this guide has been field-tested by Buck Stop&apos;s team across multiple
            seasons in Michigan&apos;s whitetail country. We evaluate based on: deer response at distance,
            scent longevity in the field, ease of application, value per ounce, and consistency across
            batches. Our testing sites span private and public land in central and northern Michigan,
            covering hardwood ridges, agricultural edges, swamp funnels, and pine plantations. Each
            product was deployed in real hunting scenarios -- not lab conditions -- because that is the
            only test that matters.
          </p>
          <p className="text-lg text-charcoal-light leading-relaxed mt-4">
            We also incorporate feedback from our dealer network and Guide Grade program outfitters who
            collectively field-test these products across thousands of client hunts per year in states
            from Michigan to Texas. When we say a product works, it is backed by more real-world data
            than any other deer scent brand can claim.
          </p>
        </div>
      </section>

      {/* Individual Product Reviews */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* 1. Best Overall: 200 PROOF */}
          <article>
            <h2 className="text-3xl font-serif font-bold text-forest mb-2">
              Best Overall: 200 PROOF Ultimate Doe-In-Heat
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold bg-forest text-white px-3 py-1 rounded-full">$13.99</span>
              <span className="text-xs font-semibold bg-cream text-charcoal px-3 py-1 rounded-full border border-cream-dark">2 oz</span>
              <span className="text-xs font-semibold bg-amber/20 text-amber px-3 py-1 rounded-full">Peak Rut</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-forest text-sm mb-2">Pros</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Single-doe collection at peak estrus for maximum potency</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Proven ability to pull bucks off does during lock-down</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Exceptional scent throw in cold, humid conditions</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Trusted by outfitters and trophy hunters nationwide</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-amber text-sm mb-2">Cons</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Effectiveness is limited to the rut window</li>
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Premium price point compared to standard estrus scents</li>
                </ul>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Why We Picked It</h3>
              <p className="text-charcoal-light leading-relaxed">
                200 PROOF is the scent you reach for when the rut is peaking and every sit counts. What separates
                it from standard doe-in-heat products is the collection process: each bottle comes from a single
                doe at the absolute peak of her estrus cycle, delivering a concentrated pheromone signature that
                mature bucks recognize immediately. In our field tests across multiple Michigan seasons, 200 PROOF
                consistently drew response from bucks at distances beyond 100 yards, including pulling locked-down
                bucks away from does they were tending. We have seen bucks abandon active scrape lines to investigate
                a 200 PROOF scent wick hung in a shooting lane. During the November rut, when mature bucks are at
                their most responsive to breeding pheromones, 200 PROOF outperformed every other estrus scent in
                our lineup for raw drawing power. Apply it on drag rags from 200 yards out, hang scent wicks at
                shooting lanes, and refresh every 2-3 hours for an all-day setup that keeps working through the
                critical midday movement period.
              </p>
            </div>
            <Link
              href="/products/200-proof-ultimate-doe-in-heat-2oz"
              className="inline-block bg-forest text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-light transition-colors"
            >
              View Product Details
            </Link>
          </article>

          {/* 2. Best for Beginners: MATE-TRIKS Original */}
          <article>
            <h2 className="text-3xl font-serif font-bold text-forest mb-2">
              Best for Beginners: MATE-TRIKS Original Doe-In-Heat
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold bg-forest text-white px-3 py-1 rounded-full">$7.99</span>
              <span className="text-xs font-semibold bg-cream text-charcoal px-3 py-1 rounded-full border border-cream-dark">1.25 oz</span>
              <span className="text-xs font-semibold bg-amber/20 text-amber px-3 py-1 rounded-full">Pre-Rut / Peak Rut</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-forest text-sm mb-2">Pros</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> The original doe-in-heat formula since 1972 -- time-proven</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Affordable entry price for new scent users</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Squeeze bottle makes dosing simple and controlled</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-amber text-sm mb-2">Cons</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Smaller bottle requires conservation on extended hunts</li>
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Not as concentrated as single-doe premium collections</li>
                </ul>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Why We Picked It</h3>
              <p className="text-charcoal-light leading-relaxed">
                MATE-TRIKS is the scent that started the entire deer scent industry in 1972, and it remains
                the best entry point for hunters who are new to scent-based hunting. The formula is proven
                across seven decades and more deer camps than any other bottle on the market. What makes it
                ideal for beginners is the combination of effectiveness and simplicity: the squeeze bottle
                gives you precise control over how much scent you apply, the 1.25-ounce size is easy to carry
                without weighing down your pack, and the price point lets you experiment without a major
                investment. In the field, MATE-TRIKS draws consistent response from bucks during the pre-rut
                and rut, particularly when applied to drag rags on the walk to your stand. For a first-time
                scent user, the routine is straightforward: soak a drag rag, pull it behind you for the last
                100 yards, hang it in a tree near your stand, and wait. That simplicity is what makes
                MATE-TRIKS the best starting point for building your scent strategy.
              </p>
            </div>
            <Link
              href="/products/mate-triks-original-doe-in-heat-1-25oz"
              className="inline-block bg-forest text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-light transition-colors"
            >
              View Product Details
            </Link>
          </article>

          {/* 3. Best Premium: Guide Grade Scents */}
          <article>
            <h2 className="text-3xl font-serif font-bold text-forest mb-2">
              Best Premium: Guide Grade Scents Doe-In-Heat
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold bg-forest text-white px-3 py-1 rounded-full">$19.99</span>
              <span className="text-xs font-semibold bg-cream text-charcoal px-3 py-1 rounded-full border border-cream-dark">2 oz</span>
              <span className="text-xs font-semibold bg-amber/20 text-amber px-3 py-1 rounded-full">Peak Rut</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-forest text-sm mb-2">Pros</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Hand-selected from the finest single-doe collections</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> The scent outfitters trust with paying clients</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Maximum potency for high-stakes hunts</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Exceptional batch-to-batch consistency</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-amber text-sm mb-2">Cons</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Highest price point in the lineup</li>
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Web-only availability limits impulse purchases</li>
                </ul>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Why We Picked It</h3>
              <p className="text-charcoal-light leading-relaxed">
                Guide Grade exists for one reason: when a paying client is sitting in your tree stand and your
                reputation depends on putting a buck on its feet, you cannot afford a slow day. This is the
                scent our outfitter partners request by name, and it is hand-selected from our finest single-doe
                collections each season. What distinguishes Guide Grade from 200 PROOF is an additional level of
                quality grading during the selection process -- every batch is evaluated for pheromone intensity
                and scent complexity before it earns the Guide Grade label. In field tests with our outfitter
                network across Michigan, Wisconsin, Iowa, and Texas, Guide Grade consistently produced the
                highest response rates among mature bucks (3.5 years and older). If you are hunting a specific
                target buck, managing a lease, or guiding clients, this is the scent that justifies its price
                with results. The 2-ounce glass bottle preserves every molecule of scent integrity from our
                facility to your stand.
              </p>
            </div>
            <Link
              href="/products/guide-grade-scents-doe-in-heat-2oz"
              className="inline-block bg-forest text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-light transition-colors"
            >
              View Product Details
            </Link>
          </article>

          {/* 4. Best for Mock Scrapes: RUCK'N BUCK */}
          <article>
            <h2 className="text-3xl font-serif font-bold text-forest mb-2">
              Best for Mock Scrapes: RUCK&apos;N BUCK Dominant Buck Urine
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold bg-forest text-white px-3 py-1 rounded-full">$13.99</span>
              <span className="text-xs font-semibold bg-cream text-charcoal px-3 py-1 rounded-full border border-cream-dark">2 oz</span>
              <span className="text-xs font-semibold bg-amber/20 text-amber px-3 py-1 rounded-full">Pre-Rut / Peak Rut</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-forest text-sm mb-2">Pros</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Collected from mature, dominant breeding bucks</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Triggers territorial aggression in resident bucks</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Ideal for both mock scrapes and scent trails</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-amber text-sm mb-2">Cons</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Can spook subordinate bucks in low-density areas</li>
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Less effective in early season before territorial behavior peaks</li>
                </ul>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Why We Picked It</h3>
              <p className="text-charcoal-light leading-relaxed">
                Mock scrapes are one of the most effective pre-rut tactics in whitetail hunting, and RUCK&apos;N BUCK
                is the scent that makes them work. Collected from mature, dominant breeding bucks, this urine
                carries the hormonal signature of a rival that resident bucks cannot ignore. When you pour
                RUCK&apos;N BUCK into a cleared scrape beneath an overhanging licking branch, you are creating a
                territorial challenge that demands a response. In our field tests, mock scrapes treated with
                RUCK&apos;N BUCK were visited by bucks within 48 hours of setup, with trail cameras documenting
                aggressive scraping, pawing, and the flehmen response that indicates a buck is analyzing the
                scent profile. The key is starting your scrapeline 2-3 weeks before the pre-rut so bucks adopt
                your mock scrapes as their own communication hubs. Combine RUCK&apos;N BUCK in the scrape with a
                MATE-TRIKS drag rag on the approach trail and you tell a complete story: rival buck tending
                a hot doe in your hunting area. That is a scenario no mature whitetail can walk away from.
              </p>
            </div>
            <Link
              href="/products/ruckn-buck-dominant-buck-urine-2oz"
              className="inline-block bg-forest text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-light transition-colors"
            >
              View Product Details
            </Link>
          </article>

          {/* 5. Best Value: GLAND-U-LURE */}
          <article>
            <h2 className="text-3xl font-serif font-bold text-forest mb-2">
              Best Value: GLAND-U-LURE
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold bg-forest text-white px-3 py-1 rounded-full">$6.99</span>
              <span className="text-xs font-semibold bg-cream text-charcoal px-3 py-1 rounded-full border border-cream-dark">1.25 oz</span>
              <span className="text-xs font-semibold bg-amber/20 text-amber px-3 py-1 rounded-full">All Season</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-forest text-sm mb-2">Pros</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Lowest price point at $6.99 -- unbeatable value</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Effective all season long, not limited to the rut</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Works on both bucks and does for general attraction</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Natural glandular formula triggers curiosity response</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-amber text-sm mb-2">Cons</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Not as aggressive as estrus-specific scents during rut</li>
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Smaller bottle requires careful application</li>
                </ul>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Why We Picked It</h3>
              <p className="text-charcoal-light leading-relaxed">
                At $6.99, GLAND-U-LURE delivers more value per dollar than any other deer scent on the market.
                This natural glandular-based lure is extracted from whitetail deer glands and triggers a
                curiosity response that works on both bucks and does throughout the entire season -- from
                September openers through late January. Unlike estrus scents that are limited to the rut
                window, GLAND-U-LURE gives you a tool that works every time you walk into the woods. Apply
                it to scrapes, licking branches, and scent wicks near your stand for close-range encounters.
                In our field tests, GLAND-U-LURE was particularly effective during the early season and
                post-rut periods when deer are not responding to breeding scents but remain naturally curious
                about glandular deposits from other deer. For budget-conscious hunters or those building a
                scent kit for the first time, GLAND-U-LURE is the versatile foundation that everything else
                builds on. Buy two bottles -- one for your primary stand and one for your trail camera
                locations -- and you have year-round coverage for under $15.
              </p>
            </div>
            <Link
              href="/products/gland-u-lure-1-25oz"
              className="inline-block bg-forest text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-light transition-colors"
            >
              View Product Details
            </Link>
          </article>

          {/* 6. Best Innovation: MATE-TRIKS Buck Beads */}
          <article>
            <h2 className="text-3xl font-serif font-bold text-forest mb-2">
              Best Innovation: MATE-TRIKS Buck Beads
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold bg-forest text-white px-3 py-1 rounded-full">$10.99</span>
              <span className="text-xs font-semibold bg-cream text-charcoal px-3 py-1 rounded-full border border-cream-dark">5.75 oz</span>
              <span className="text-xs font-semibold bg-amber/20 text-amber px-3 py-1 rounded-full">Pre-Rut / Peak Rut</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-forest text-sm mb-2">Pros</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Slow-release technology provides scent output for days</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Pour-and-forget application -- no wicks or rags needed</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Biodegradable beads leave no trace in the field</li>
                  <li className="flex items-start gap-2"><span className="text-forest font-bold mt-0.5">+</span> Excellent value at 5.75 oz for $10.99</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-amber text-sm mb-2">Cons</h3>
                <ul className="space-y-1 text-sm text-charcoal-light">
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Cannot be applied to wicks or drag rags like liquid scent</li>
                  <li className="flex items-start gap-2"><span className="text-amber font-bold mt-0.5">-</span> Best suited for stationary setups, not mobile hunting</li>
                </ul>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-2">Why We Picked It</h3>
              <p className="text-charcoal-light leading-relaxed">
                Buck Beads represent the biggest innovation in deer scent delivery in the last decade.
                Traditional liquid scents evaporate within hours, requiring hunters to refresh their setup
                multiple times during an all-day sit or return to mock scrapes every few days. Buck Beads
                solve that problem with biodegradable, scent-infused beads that release MATE-TRIKS Doe-In-Heat
                formula slowly over multiple days. In our field tests, mock scrapes treated with Buck Beads
                showed fresh buck activity on trail cameras for 4-5 days after a single application, compared
                to 6-8 hours for liquid scent alone. The application could not be simpler: pour a handful of
                beads directly into a scrape or along a trail, and walk away. Moisture from dew, rain, and
                ground contact activates the slow-release mechanism, so the beads actually become more effective
                in wet conditions that would wash away liquid scent. For hunters who manage multiple stand
                locations and cannot refresh every scrape before each hunt, Buck Beads are a game-changer.
                They are also ideal for keeping trail camera locations active between checks, building a
                pattern of deer movement data without constant human intrusion.
              </p>
            </div>
            <Link
              href="/products/mate-triks-buck-beads-5-75oz"
              className="inline-block bg-forest text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-light transition-colors"
            >
              View Product Details
            </Link>
          </article>
        </div>
      </section>

      {/* How to Choose the Right Deer Scent */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            How to Choose the Right Deer Scent
          </h2>

          {/* By Season */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-forest mb-4">By Season</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-warm-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="text-left py-3 px-4">Season</th>
                    <th className="text-left py-3 px-4">Recommended Scent Type</th>
                    <th className="text-left py-3 px-4">Product</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonTable.map((row, i) => (
                    <tr key={row.season} className={i % 2 === 0 ? 'bg-warm-white' : 'bg-cream'}>
                      <td className="py-3 px-4 font-medium text-charcoal">{row.season}</td>
                      <td className="py-3 px-4 text-charcoal-light">{row.type}</td>
                      <td className="py-3 px-4 text-charcoal-light">{row.product}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* By Hunting Method */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-forest mb-4">By Hunting Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-charcoal mb-2">Tree Stand</h4>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Place attractant scents (200 PROOF, MATE-TRIKS) on wicks 15-20 yards out at ground level.
                  Use cover scent at stand height. Never apply estrus scent to your stand or at sitting height.
                </p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-charcoal mb-2">Ground Blind</h4>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Apply cover scent around the blind perimeter. Use Buck Beads at scrape locations within
                  bow range. Ground blinds trap scent inside, so scent elimination is critical.
                </p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-charcoal mb-2">Mock Scrapes</h4>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  RUCK&apos;N BUCK in the scrape, Buck Beads for sustained output, curiosity scent on the
                  licking branch. Build 3-5 scrapes along a travel corridor leading to your stand.
                </p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-charcoal mb-2">Scent Trails</h4>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Soak a drag rag with MATE-TRIKS or 200 PROOF. Start from a travel corridor and drag
                  to your stand. Create converging trails from different directions for maximum effectiveness.
                </p>
              </div>
            </div>
          </div>

          {/* By Experience Level */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-forest mb-4">By Experience Level</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-forest mb-2">Beginner</h4>
                <p className="text-sm text-charcoal-light leading-relaxed mb-2">
                  Start with MATE-TRIKS Original and a drag rag. Simple, proven, affordable. Add GLAND-U-LURE
                  for early season and you have year-round coverage.
                </p>
                <p className="text-xs font-semibold text-forest">Budget: ~$15</p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-amber mb-2">Intermediate</h4>
                <p className="text-sm text-charcoal-light leading-relaxed mb-2">
                  Add 200 PROOF for peak rut, RUCK&apos;N BUCK for mock scrapes, and Buck Beads for
                  low-maintenance setups. You now have a scent for every phase and scenario.
                </p>
                <p className="text-xs font-semibold text-forest">Budget: ~$45</p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border border-cream-dark">
                <h4 className="font-serif font-bold text-charcoal mb-2">Pro / Outfitter</h4>
                <p className="text-sm text-charcoal-light leading-relaxed mb-2">
                  Guide Grade Scents for critical sits, the full Buck Beads lineup for multiple stand
                  locations, and the complete Scent Stop elimination system. No shortcuts.
                </p>
                <p className="text-xs font-semibold text-forest">Budget: ~$80+</p>
              </div>
            </div>
          </div>

          {/* By Budget */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-forest mb-4">By Budget</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-warm-white rounded-lg p-5 border-l-4 border-forest">
                <h4 className="font-semibold text-charcoal mb-1">Under $10</h4>
                <p className="text-sm text-charcoal-light">MATE-TRIKS Original ($7.99) or GLAND-U-LURE ($6.99). Either one gets you in the game.</p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border-l-4 border-amber">
                <h4 className="font-semibold text-charcoal mb-1">$10 - $20</h4>
                <p className="text-sm text-charcoal-light">200 PROOF ($13.99), RUCK&apos;N BUCK ($13.99), or Buck Beads ($10.99). Targeted scents for specific strategies.</p>
              </div>
              <div className="bg-warm-white rounded-lg p-5 border-l-4 border-charcoal">
                <h4 className="font-semibold text-charcoal mb-1">$20+</h4>
                <p className="text-sm text-charcoal-light">Guide Grade Scents ($19.99) or BAG-A-BUCK Kit ($16.99). Premium performance or complete systems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {reviewFaqs.map((faq, index) => (
              <div key={index} className="border border-cream-dark rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-white hover:bg-cream transition-colors list-none">
                    <span className="font-semibold text-charcoal pr-4">{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-forest flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 py-4 text-charcoal-light leading-relaxed bg-cream">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Build Your Scent Strategy?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Browse the full lineup of Buck Stop deer scents -- from beginner-friendly essentials to
            guide-grade premium collections. Every bottle is field-tested and backed by 70+ years of results.
          </p>
          <Link
            href="/products"
            className="inline-block bg-amber text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
          >
            Shop All Deer Scents
          </Link>
        </div>
      </section>
    </>
  );
}
