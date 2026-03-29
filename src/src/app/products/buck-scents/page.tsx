import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import type { FAQ } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Buck Urine & Territorial Scents | Buck Stop',
  description:
    'Dominant buck urine and territorial scents from Buck Stop Lure Co. RUCK\'N BUCK and SUPREME BUCK URINE for mock scrapes, scent trails, and challenging territorial bucks throughout the season.',
  keywords: [
    'buck urine',
    'dominant buck scent',
    'territorial scent',
    'mock scrape',
    'buck lure',
    'RUCK N BUCK',
    'deer scent',
    'whitetail buck',
    'Buck Stop',
    'scrape scent',
  ],
  openGraph: {
    title: 'Buck Urine & Territorial Scents | Buck Stop',
    description:
      'Dominant buck urine collected from mature breeding bucks. Create mock scrapes, lay territorial scent trails, and trigger aggressive buck responses.',
    url: 'https://www.buckstopscents.com/products/buck-scents',
    type: 'website',
  },
};

const faqs: FAQ[] = [
  {
    question: 'How do I use buck urine to make a mock scrape?',
    answer:
      'Select a location along a travel corridor or field edge where you have observed buck sign. Clear a 3-foot circle of debris down to bare dirt beneath an overhanging licking branch (5 feet high). Pour or spray buck urine -- such as RUCK\'N BUCK or SUPREME BUCK URINE -- directly into the scraped dirt. Add a few drops to the licking branch above. Refresh the scrape every 2-3 days with fresh urine. Bucks instinctively check and re-work scrapes as a dominance communication system, and a mock scrape laced with mature buck urine signals a rival in the area that resident bucks cannot ignore.',
  },
  {
    question: 'When is the best time to use buck urine for hunting?',
    answer:
      'Buck urine is versatile and effective across the entire season. In the early season, use it as a calming scent -- deer are accustomed to smelling other deer, so buck urine near your stand reduces suspicion. During the pre-rut, dominant buck urine in scrapes triggers territorial aggression as bucks establish dominance hierarchies. At peak rut, buck urine combined with estrus scent creates a realistic breeding scenario that draws bucks into range. Even during the post-rut and late season, buck urine refreshes scrapes and appeals to deer seeking social contact.',
  },
  {
    question: 'What is the difference between RUCK\'N BUCK and SUPREME BUCK URINE?',
    answer:
      'RUCK\'N BUCK is collected specifically from mature, dominant breeding bucks during the rut period. It carries the aggressive pheromone profile of a buck actively competing for does, making it ideal for challenging territorial bucks during the pre-rut and rut. SUPREME BUCK URINE is an all-purpose buck urine collected from healthy whitetail bucks and is effective throughout the entire season. It works well for calming deer, refreshing scrapes, and laying general scent trails from early season through late season.',
  },
  {
    question: 'Can I use buck urine with other scents?',
    answer:
      'Absolutely. Buck urine is often most effective when layered with other scents to create a complete scenario. Combine RUCK\'N BUCK with MATE-TRIKS estrus scent in a scrape to simulate a buck tending a hot doe -- this is extremely provocative to other bucks during the rut. Add GLAND-U-LURE to a mock scrape along with buck urine for a realistic multi-scent signature. Our FIVE blend does exactly this, combining buck urine, doe urine, estrus, tarsal gland, and forehead gland in one bottle. The BAG-A-BUCK Kit provides a complete scent system ready to go.',
  },
];

export default function BuckScentsPage() {
  const buckScents = getProductsByCategory('buck-scents');
  const coverScents = getProductsByCategory('cover-scents');
  const allProducts = [...buckScents, ...coverScents];

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Buck Scents', url: '/products/buck-scents' },
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
            <li className="font-medium text-[#1a3c2a]">Buck Scents</li>
          </ol>
        </div>
      </nav>

      {/* Hero / Intro */}
      <section className="bg-gradient-to-b from-[#f5f0e8] to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <h1 className="font-serif text-3xl font-bold text-[#2d2d2d] sm:text-4xl lg:text-5xl">
            Buck Urine &amp; Territorial Scents
          </h1>
          <p className="mt-4 text-lg text-[#2d2d2d]/70">
            Challenge the dominant buck in any territory.
          </p>
          <div className="mt-8 max-w-3xl space-y-4 text-[#2d2d2d]/80 leading-relaxed">
            <p>
              Every whitetail buck operates within a social hierarchy built on scent communication. Scrapes, rubs, and licking branches are not random -- they are a postal system that broadcasts dominance, breeding status, and territorial boundaries to every deer in the area. When you introduce the urine of a mature, dominant buck into that system, you disrupt the hierarchy and force resident bucks to respond. That response is what puts a buck on his feet and moving during daylight hours, and it is exactly what Buck Stop buck urine scents are designed to trigger.
            </p>
            <p>
              Buck Stop has been collecting and bottling buck urine from mature whitetails on our Stanton, Michigan deer farm since the 1950s. Our handlers know the animals individually, understand their behavioral cycles, and collect urine at the times when pheromone content is highest. RUCK'N BUCK Dominant Buck Urine is taken from our most aggressive breeding-age bucks during the pre-rut and rut, when their urine carries the tarsal-stained, testosterone-heavy scent profile that screams "rival" to any buck that encounters it. Pour it in a scrape, and the local dominant buck will circle back to investigate -- often within hours.
            </p>
            <p>
              For year-round versatility, SUPREME BUCK URINE provides a reliable all-purpose buck scent that works from opening day through the last sit of the season. In September and early October, buck urine near your stand simply says "other deer are here" -- a calming signal that reduces wariness. As bucks begin making scrapes in the pre-rut, SUPREME BUCK URINE keeps those scrapes active and draws visitors. Pair it with our glandular lures like GLAND-U-LURE for an even more realistic scrape scenario that includes the forehead and tarsal gland signatures bucks leave on licking branches.
            </p>
            <p>
              Mock scrapes are one of the most effective scouting and hunting tactics available to whitetail hunters, and buck urine is the foundation of every good mock scrape setup. Choose a spot under an overhanging branch along a known travel route, clear the ground, apply urine, and scent the branch. Refresh every few days. Within a week, you will know which bucks are using the area -- and you will have trained them to stop in range. Buck Stop buck urine gives you the authentic scent signature to make that setup work, because every drop comes from a real whitetail buck, collected without chemicals or synthetic fillers.
            </p>
            <p>
              Below you will find our complete lineup of buck urine and glandular lure products. Whether you are building a scrape network on a 40-acre lease or laying a drag trail into a funnel on public land, these scents give you the territorial edge that makes bucks commit.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 font-serif text-2xl font-bold text-[#2d2d2d]">
          Buck Urine &amp; Glandular Lures ({allProducts.length})
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
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
