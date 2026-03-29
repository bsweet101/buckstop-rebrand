import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import type { FAQ } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Buck Beads Moisture-Activated Scent | Buck Stop',
  description:
    'Buck Beads by Buck Stop -- the original moisture-activated, slow-release deer scent beads. Biodegradable beads infused with MATE-TRIKS, GLAND-U-LURE, sweet corn, and sugar beet scents that last for days.',
  keywords: [
    'Buck Beads',
    'moisture activated scent',
    'slow release deer scent',
    'biodegradable scent beads',
    'deer attractant beads',
    'Buck Stop',
    'MATE-TRIKS beads',
    'scent dispenser',
    'long lasting deer scent',
    'scrape scent',
  ],
  openGraph: {
    title: 'Buck Beads Moisture-Activated Scent | Buck Stop',
    description:
      'Biodegradable, moisture-activated scent beads that release deer-attracting scent for days. Invented by Buck Stop Lure Company.',
    url: 'https://www.buckstopscents.com/products/buck-beads',
    type: 'website',
  },
};

const faqs: FAQ[] = [
  {
    question: 'How do Buck Beads work?',
    answer:
      'Buck Beads are biodegradable polymer beads that have been infused with concentrated deer scent during manufacturing. When exposed to moisture -- rain, dew, fog, or ground dampness -- the beads slowly release scent molecules into the surrounding air. As the beads absorb and release moisture through natural humidity cycles, they continuously disperse scent for days or even weeks without reapplication. When the beads finally break down, they leave no harmful residue in the environment. Simply pour them into scrapes, along trails, or near your stand and let weather do the work.',
  },
  {
    question: 'How long do Buck Beads last in the field?',
    answer:
      'Buck Beads typically provide active scent dispersal for 5-10 days depending on weather conditions. Humid, rainy conditions accelerate scent release for stronger short-term output, while dry conditions slow the release for longer duration. Many hunters pour beads into scrapes a week before they plan to hunt a stand, allowing the beads to train deer into a pattern of visiting that location. For extended setups, add a fresh handful of beads every 7-10 days to maintain peak scent output throughout the season.',
  },
  {
    question: 'Who invented Buck Beads?',
    answer:
      'Buck Stop Lure Company invented and patented the moisture-activated scent bead technology. As pioneers of the deer scent industry since 1953, Buck Stop has always focused on innovation that solves real problems for hunters. Buck Beads were developed to address the biggest limitation of liquid scents: evaporation. Liquid scent applied to a scrape or wick may last only a few hours before losing effectiveness. Buck Beads solve this by providing a slow-release delivery system that keeps scent active for days, even when the hunter is not present to refresh the setup.',
  },
  {
    question: 'Which Buck Beads scent should I choose?',
    answer:
      'Choose based on your hunting scenario and the time of season. MATE-TRIKS Buck Beads are infused with doe-in-heat estrus scent and are most effective during the pre-rut and peak rut when bucks are actively seeking receptive does. GLAND-U-LURE Buck Beads work all season as a curiosity and territorial attractant, ideal for keeping scrapes active. Sweet Corn and Sugar Beet Buck Beads use food-based scents that attract deer throughout the entire season, especially effective in early season and late season when deer are focused on food sources. Many hunters use food-scent beads early in the season and switch to MATE-TRIKS beads as the rut approaches.',
  },
];

export default function BuckBeadsPage() {
  const products = getProductsByCategory('buck-beads');

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Buck Beads', url: '/products/buck-beads' },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-[#2d2d2d]/10 bg-[#f5f0e8]">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-[#2d2d2d]/60">
            <li>
              <Link href="/" className="transition-colors hover:text-[#1a3c2a]">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="transition-colors hover:text-[#1a3c2a]">Products</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#1a3c2a]">Buck Beads</li>
          </ol>
        </div>
      </nav>

      {/* Hero / Intro */}
      <section className="bg-gradient-to-b from-[#f5f0e8] to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <h1 className="font-serif text-3xl font-bold text-[#2d2d2d] sm:text-4xl lg:text-5xl">
            Buck Beads Moisture-Activated Scent
          </h1>
          <p className="mt-4 text-lg text-[#2d2d2d]/70">
            Pour. Walk away. Let weather do the work.
          </p>
          <div className="mt-8 max-w-3xl space-y-4 text-[#2d2d2d]/80 leading-relaxed">
            <p>
              Every serious deer hunter has faced the same frustration: you spend an hour setting up the perfect scrape, apply liquid scent, climb into your stand, and by the next morning the scent has evaporated. The setup that should have worked for a week is dead after a single night. Buck Stop Lure Company solved this problem by inventing Buck Beads -- biodegradable, moisture-activated scent beads that release attractant for days without reapplication. It is the kind of practical innovation that only comes from a company that has been making deer scents since 1953 and understands what hunters actually need in the field.
            </p>
            <p>
              The technology behind Buck Beads is elegantly simple. Each bead is a biodegradable polymer sphere that has been infused with concentrated deer scent during the manufacturing process -- not sprayed on the surface, but saturated throughout the entire bead. When moisture contacts the bead -- whether from rain, morning dew, fog, or simple ground dampness -- the polymer releases scent molecules into the surrounding air. As weather cycles between wet and dry, the beads pulse scent continuously, creating a natural dispersal pattern that mimics how real deer scent would linger in the environment. This moisture-driven release mechanism means Buck Beads actually work better in the damp, cool conditions that characterize peak deer season.
            </p>
            <p>
              Unlike liquid scents that require you to return to your setup and risk contaminating the area with human odor, Buck Beads let you set it and forget it. Pour a handful into a scrape, scatter them along a trail intersection, or create a scent station near your stand a week before you plan to hunt. The beads will train deer to visit that spot repeatedly, building a pattern you can exploit when the time is right. When the beads eventually break down, they decompose completely, leaving no plastic, no residue, and no trace -- just clean ground and a history of deer visits.
            </p>
            <p>
              Our Buck Beads lineup includes four formulas to cover every season and situation. MATE-TRIKS Buck Beads deliver slow-release doe-in-heat estrus scent for pre-rut and rut hunts. GLAND-U-LURE Buck Beads provide all-season glandular attraction for scrapes and curiosity setups. Sweet Corn and Sugar Beet Buck Beads use food-based aromas that pull deer from opening day through the last week of the season. Many experienced hunters rotate between food-scent beads in the early season and estrus beads during the rut, keeping their setups fresh and seasonally appropriate. Each 5.75-ounce pouch contains enough beads for multiple applications across several stand locations.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 font-serif text-2xl font-bold text-[#2d2d2d]">
          All Buck Beads ({products.length})
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#2d2d2d]/10 bg-[#f5f0e8]">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-8 font-serif text-2xl font-bold text-[#2d2d2d]">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg font-semibold text-[#1a3c2a]">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-[#2d2d2d]/80">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
