import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import type { FAQ } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Deer Scent Kits & Bundles | Buck Stop',
  description:
    'Complete deer scent kits and bundles from Buck Stop Lure Co. BAG-A-BUCK Kit, FIVE blend, BUC PLUS, and ALURE -- everything you need for a full scent strategy in one purchase.',
  keywords: [
    'deer scent kit',
    'hunting scent bundle',
    'deer lure combo',
    'BAG-A-BUCK',
    'FIVE blend',
    'scent kit',
    'Buck Stop',
    'deer hunting kit',
    'mock scrape kit',
    'rut kit',
  ],
  openGraph: {
    title: 'Deer Scent Kits & Bundles | Buck Stop',
    description:
      'Build a complete scent strategy with Buck Stop kits and blends. From the BAG-A-BUCK all-in-one kit to the FIVE five-scent mock-scrape blend.',
    url: 'https://www.buckstopscents.com/products/combos-kits',
    type: 'website',
  },
};

const faqs: FAQ[] = [
  {
    question: 'What is included in the BAG-A-BUCK Kit?',
    answer:
      'The BAG-A-BUCK Kit is a complete scent system designed for rut-week simplicity. It includes estrus scent, buck urine, cover scent, and scent wicks -- everything a hunter needs for a full day in the stand. The kit is packaged in a convenient carry bag so you can grab it on your way out the door without deciding which individual bottles to bring. It is built for the hunter who wants a proven, ready-to-go scent strategy without the guesswork of assembling individual products.',
  },
  {
    question: 'Why should I buy a scent kit instead of individual bottles?',
    answer:
      'A scent kit gives you a coordinated strategy designed to work together, and it saves you money compared to buying each component separately. More importantly, it eliminates decision fatigue. Many hunters -- especially those new to scent-based hunting -- struggle to know which products to combine and how to use them together. Kits like BAG-A-BUCK and blends like FIVE are formulated by experienced scent makers who have already figured out the ideal combinations. You get a complete system that covers attraction, territorial challenge, and cover scent in one purchase.',
  },
  {
    question: 'What makes the FIVE blend unique?',
    answer:
      'FIVE is a proprietary blend that combines five distinct scent components in a single bottle: buck urine, doe urine, estrus, tarsal gland secretion, and forehead gland secretion. This creates a complete mock-scrape scent profile -- the same complex signature that a real buck leaves when he works a scrape. Instead of applying five separate products, one application of FIVE tells every deer in the area that a buck has visited this scrape, a doe was present, and breeding activity is underway. It is one of the most realistic scrape scents available and is highly effective during the pre-rut and peak rut.',
  },
  {
    question: 'How do I build a complete scent strategy for the season?',
    answer:
      'A solid seasonal scent strategy uses different products at different times. In the early season (September through mid-October), use food-scent Buck Beads and ALURE curiosity attractant to bring deer into range without spooking them. During the pre-rut (late October), transition to buck urine in scrapes, GLAND-U-LURE on licking branches, and begin introducing light estrus scent. At peak rut (November), go all-in with MATE-TRIKS or 200 PROOF estrus, RUCK\'N BUCK in scrapes, and the FIVE blend for mock-scrape setups. Post-rut (late November through December), scale back to SUPREME BUCK URINE and food-scent beads. Buck Stop kits and combos make this progression easy by bundling complementary products.',
  },
];

export default function CombosKitsPage() {
  const products = getProductsByCategory('blend-combos');

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Combos & Kits', url: '/products/combos-kits' },
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
            <li className="font-medium text-[#1a3c2a]">Combos &amp; Kits</li>
          </ol>
        </div>
      </nav>

      {/* Hero / Intro */}
      <section className="bg-gradient-to-b from-[#f5f0e8] to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <h1 className="font-serif text-3xl font-bold text-[#2d2d2d] sm:text-4xl lg:text-5xl">
            Deer Scent Kits &amp; Bundles
          </h1>
          <p className="mt-4 text-lg text-[#2d2d2d]/70">
            One purchase. Complete strategy. No guesswork.
          </p>
          <div className="mt-8 max-w-3xl space-y-4 text-[#2d2d2d]/80 leading-relaxed">
            <p>
              Walk into any sporting goods store during September and you will face a wall of deer scent bottles -- estrus, buck urine, doe urine, tarsal gland, forehead gland, cover scents, food attractants -- and the question every hunter asks is the same: "Which ones do I actually need?" The answer depends on the season phase, your hunting style, and the terrain you are working, but the honest truth is that most hunters buy too many bottles of the wrong thing or not enough of the right thing. Buck Stop scent kits and blends solve this problem by giving you a complete, coordinated scent strategy in a single purchase.
            </p>
            <p>
              The BAG-A-BUCK Kit is the simplest way to walk into the woods prepared for rut week. It includes estrus scent to attract bucks, buck urine to create territorial tension, cover scent to mask your approach, and scent wicks to deploy everything effectively. No overthinking, no missing pieces -- just grab the bag and hunt. It is the kit that first-time scent users buy to learn the system and that experienced hunters buy because they are tired of fumbling through a dozen bottles in the dark at 5 AM.
            </p>
            <p>
              For hunters who want a single-bottle solution for mock scrapes, FIVE is unlike anything else on the market. It blends five distinct biological components -- buck urine, doe urine, estrus, tarsal gland secretion, and forehead gland secretion -- into a single formula that replicates the complete chemical signature of an active breeding scrape. One application tells every deer within scent range that a mature buck has worked this scrape, a doe has visited, and breeding activity is happening right here. During the pre-rut and rut, FIVE in a mock scrape is one of the most effective setups you can run.
            </p>
            <p>
              ALURE takes a different approach as a curiosity-based attractant that works on bucks and does throughout the entire season. Rather than targeting the breeding instinct, ALURE appeals to a whitetail's natural drive to investigate unfamiliar scents. It is effective as a standalone lure on days when the rut has not kicked in yet, and it pairs well with estrus scents or buck urine for a multi-layered setup. BUC PLUS enhances buck urine with tarsal gland and other natural secretions to create a more aggressive territorial signal -- ideal for scrapes and scent trails during the pre-rut when bucks are establishing dominance.
            </p>
            <p>
              Building a scent strategy does not need to be complicated, and it does not need to cost a fortune. Buck Stop kits and blends give you professionally formulated combinations that cover attraction, territorial challenge, and breeding simulation in products that work together. Whether you are hunting opening week or the last day of the season, there is a kit or blend here that fits the situation. And because every ingredient comes from our own whitetail deer farm in Stanton, Michigan, you know what is in the bottle -- real deer scent, zero synthetics, total confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 font-serif text-2xl font-bold text-[#2d2d2d]">
          All Kits &amp; Blends ({products.length})
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
