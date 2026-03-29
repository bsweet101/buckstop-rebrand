import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import type { FAQ } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Doe-In-Heat & Estrus Scents | Buck Stop Lure Co.',
  description:
    'Shop the original doe-in-heat estrus scents from Buck Stop Lure Co. -- the company that invented estrus-based deer scent in 1972. MATE-TRIKS, 200 PROOF, THE PEAK, and Guide Grade formulas trusted by hunters for over 50 years.',
  keywords: [
    'doe in heat scent',
    'estrus scent',
    'deer estrus',
    'doe urine',
    'MATE-TRIKS',
    '200 PROOF',
    'Buck Stop',
    'whitetail hunting',
    'rut scent',
    'deer lure',
  ],
  openGraph: {
    title: 'Doe-In-Heat & Estrus Scents | Buck Stop Lure Co.',
    description:
      'The original doe-in-heat estrus scents, invented in 1972. From MATE-TRIKS to Guide Grade -- every bottle collected from live whitetail does at peak cycle.',
    url: 'https://www.buckstopscents.com/products/estrus-scents',
    type: 'website',
  },
};

const faqs: FAQ[] = [
  {
    question: 'When should I use estrus scent for deer hunting?',
    answer:
      'Estrus scent is most effective during the pre-rut and peak rut phases, typically from late October through mid-November in most northern states. During pre-rut, bucks begin actively searching for receptive does and will investigate estrus odor aggressively. At peak rut, a doe-in-heat scent can pull a mature buck away from a doe he is already tending. Some hunters also see success during the secondary rut in early December. Apply estrus scent to scrapes, scent wicks, drag rags, and licking branches within shooting range of your stand.',
  },
  {
    question: 'How do I apply doe-in-heat scent effectively?',
    answer:
      'There are several proven application methods. Drag a scent-soaked rag along your route to the stand, creating a trail that leads directly past your shooting lanes. Hang scent wicks at nose height 15-20 yards from your stand, refreshing them every few hours. Pour or spray estrus scent directly into active scrapes. For all-day sits, use Buck Beads infused with MATE-TRIKS for slow-release scent dispersal that lasts for days. Always wear rubber gloves when handling scent to avoid contaminating it with human odor, and store bottles sealed in a cool, dark place between hunts.',
  },
  {
    question: 'What makes Buck Stop estrus scents different from competitors?',
    answer:
      'Buck Stop Lure Company invented the commercial doe-in-heat estrus scent in 1972, and every bottle is still collected from live whitetail does at peak estrus cycle on our own deer farm in Stanton, Michigan. We never use synthetic chemicals or preservatives that can alert educated bucks. Our premium lines -- 200 PROOF, THE PEAK, and Guide Grade -- are single-doe collections taken at the absolute peak of the estrus window for maximum potency. This heritage of quality and authenticity is why more deer camps trust Buck Stop than any other brand.',
  },
  {
    question: 'What is the difference between MATE-TRIKS, 200 PROOF, THE PEAK, and Guide Grade?',
    answer:
      'MATE-TRIKS Original is our proven herd-collection estrus formula -- the scent that started the industry. 200 PROOF is a single-doe collection at peak estrus for higher concentration. THE PEAK narrows the collection window even further to the absolute zenith of estrus for maximum refinement. Guide Grade is hand-selected from our finest single-doe collections and reserved for outfitters and serious trophy hunters. Each step up the line offers a more concentrated, potent scent signature.',
  },
];

export default function EstrusScentsPage() {
  const products = getProductsByCategory('estrus-scents');

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Estrus Scents', url: '/products/estrus-scents' },
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
            <li className="font-medium text-[#1a3c2a]">Estrus Scents</li>
          </ol>
        </div>
      </nav>

      {/* Hero / Intro */}
      <section className="bg-gradient-to-b from-[#f5f0e8] to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <h1 className="font-serif text-3xl font-bold text-[#2d2d2d] sm:text-4xl lg:text-5xl">
            Doe-In-Heat &amp; Estrus Scents
          </h1>
          <p className="mt-4 text-lg text-[#2d2d2d]/70">
            The original. The proven. The trusted.
          </p>
          <div className="mt-8 max-w-3xl space-y-4 text-[#2d2d2d]/80 leading-relaxed">
            <p>
              In 1972, Buck Stop Lure Company changed deer hunting forever by introducing the first commercially available doe-in-heat estrus scent to the market. Before that moment, hunters relied on general deer urine or homemade concoctions with inconsistent results. The idea was simple but revolutionary: collect urine from live whitetail does at the precise peak of their estrus cycle, bottle it with zero additives, and let nature do the work. That first bottle of MATE-TRIKS Doe-In-Heat sparked an entire industry, and more than fifty years later it remains the gold standard against which every competitor is measured.
            </p>
            <p>
              What makes a great estrus scent? Timing and purity. A doe enters true estrus -- the 24-to-36-hour window when she is receptive to breeding -- only once per year. Bucks can detect the chemical signature of peak estrus from hundreds of yards downwind, and a mature whitetail will abandon food plots, bedding areas, and even does he is already tending to investigate that scent. The closer the collection is to peak estrus, the stronger the biological trigger for aggressive buck behavior. That is why Buck Stop maintains its own whitetail deer farm in Stanton, Michigan, where experienced handlers monitor does daily and collect at exactly the right moment.
            </p>
            <p>
              Our estrus lineup covers every budget and hunting scenario. MATE-TRIKS Original is the proven herd-collection formula -- affordable, effective, and trusted by more deer camps than any scent in America. MATE-TRIKS Spray delivers the same formula in a fine-mist applicator for quick coverage of scrapes and licking branches. The Pro-Size bottle doubles your volume for all-day sits and multi-stand rotations. Step up to 200 PROOF for single-doe collection at peak estrus -- the bottle trophy hunters reach for when the stakes are highest. THE PEAK narrows the collection window to the absolute zenith of estrus for the most refined scent we have ever produced. And Guide Grade is hand-selected from our finest collections, reserved for outfitters whose reputation rides on putting clients in front of mature bucks.
            </p>
            <p>
              Every estrus scent in this lineup is 100% natural, collected without synthetic preservatives or chemical enhancers that can alert educated whitetails. Whether you are freshening a scrape line on public land or anchoring a mock-scrape system on a managed property, Buck Stop estrus scents give you the same advantage that put the first doe-in-heat bottle in hunters' hands over half a century ago. No gimmicks, no shortcuts -- just the real scent of a doe ready to breed, bottled at the source.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 font-serif text-2xl font-bold text-[#2d2d2d]">
          All Estrus Scents ({products.length})
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
