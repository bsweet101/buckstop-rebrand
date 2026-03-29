import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import AuthorBio from '@/components/AuthorBio';
import { heritageMilestones } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Buck Stop Lure Co. | Deer Scent Pioneers Since 1953',
  description:
    'Founded in 1953 in Michigan, Buck Stop pioneered the deer scent industry. Meet the family behind America\'s original deer scent.',
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Born in a Michigan Workshop. Proven in Every Deer Camp in America."
        subtitle="Over 70 years of passion, innovation, and commitment to the hunt."
        variant="page"
      />

      <AuthorBio
        name="Brian Johansen"
        title="Owner & Master Scent Formulator"
        initials="BJ"
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-forest transition-colors">Home</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-forest font-medium" aria-current="page">About Us</li>
          </ol>
        </nav>
      </div>

      {/* Founding Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="founding-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="founding-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-6">
            The First Bottle
          </h2>
          <div className="text-charcoal/80 space-y-4">
            <p className="text-lg leading-relaxed">
              In 1953, avid whitetail hunter Don Garbow founded Buck Stop Lure Company
              in Stanton, Michigan. Driven by a deep understanding of deer behavior and
              a hunter&apos;s intuition, Garbow became one of the first to commercially
              produce deer scent products in the United States. At a time when most hunters
              relied on homemade concoctions, Garbow recognized that scientifically collected
              and properly preserved deer scents could transform the way America hunted whitetail.
            </p>
            <p className="text-lg leading-relaxed">
              What started in a small workshop grew into a pioneering force in the
              hunting industry. Don&apos;s commitment to using real, natural ingredients
              and his relentless testing in the field set Buck Stop apart from imitators
              from the very beginning. In 1972, Buck Stop introduced the first commercially
              available doe-in-heat estrus scent, a product category that would go on to
              become the single most important tool in a rut hunter&apos;s arsenal. Buck Stop
              was also the first deer scent company to offer a money-back guarantee, standing
              behind every bottle with the confidence that only seven decades of field testing
              can provide.
            </p>
            <p className="text-lg leading-relaxed">
              By 1985, Buck Stop became the first deer scent company in America to surpass
              $1 million in annual sales, proving that hunters across the country recognized
              the difference between authentic, carefully collected scents and cheap imitations.
              His philosophy was simple: if it doesn&apos;t work in the woods, it
              doesn&apos;t leave the shop. That standard has guided every product we&apos;ve
              made for over seven decades and now extends across a lineup of more than 150 products
              covering every hunting scenario from early-season scouting to post-rut challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream" aria-labelledby="timeline-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="timeline-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-12 text-center">
            Our Heritage Timeline
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-forest/20 transform sm:-translate-x-1/2" aria-hidden="true" />

            <div className="space-y-12">
              {heritageMilestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col sm:flex-row ${
                    index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-amber rounded-full border-4 border-cream transform -translate-x-1/2 z-10" aria-hidden="true" />

                  {/* Content */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${
                    index % 2 === 0 ? 'sm:pl-8' : 'sm:pr-8 sm:text-right'
                  }`}>
                    <span className="inline-block bg-forest text-white text-sm font-bold px-3 py-1 rounded-full mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-charcoal mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Firsts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white" aria-labelledby="firsts-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="firsts-heading" className="text-3xl sm:text-4xl font-serif font-bold mb-12 text-center">
            Industry Firsts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'First Commercial Deer Scent (1953)',
                description: 'Pioneered the commercial deer scent market in the United States when founder Don Garbow began producing scientifically collected deer lures in Stanton, Michigan.',
              },
              {
                title: 'First Doe-In-Heat Estrus Scent (1972)',
                description: 'Introduced the original commercially available doe-in-heat estrus scent, creating the product category that remains the most important tool in rut hunting today.',
              },
              {
                title: 'First Money-Back Guarantee',
                description: 'Buck Stop was the first deer scent company to offer a satisfaction guarantee, standing behind every product with the confidence built from decades of field testing.',
              },
              {
                title: 'First to $1 Million in Sales (1985)',
                description: 'Became the first deer scent company to surpass $1 million in annual sales, proving nationwide demand for authentic, quality-tested deer lures.',
              },
              {
                title: 'Complete Scent Systems',
                description: 'First to offer full scent systems covering attraction, curiosity, food, territorial instincts, and the Scent Stop odor elimination line — everything a hunter needs in one brand.',
              },
              {
                title: '150+ Products, Michigan Made',
                description: 'Built the most comprehensive deer scent product line in the industry, all manufactured in Michigan using natural ingredients and field-proven formulas.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl flex flex-col">
                <h3 className="text-xl font-serif font-bold text-amber mb-3">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Transition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="family-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="family-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-6">
            New Owners. Same Promise.
          </h2>
          <div className="text-charcoal/80 space-y-4">
            <p className="text-lg leading-relaxed">
              In 2009, Bonnie and Brian Johansen took the reins of Buck Stop Lure Company,
              carrying forward the legacy that Don Garbow built over more than half a century.
              As passionate hunters themselves, they understood the responsibility of
              preserving what made Buck Stop special. The transition kept Buck Stop family
              owned and Michigan based, ensuring continuity of the quality standards and
              hands-on approach that built the brand.
            </p>
            <p className="text-lg leading-relaxed">
              Under their leadership, the company has modernized its operations while
              staying true to its roots. Every product is still manufactured in Stanton,
              Michigan using natural ingredients, and every formula is still field-tested before
              it reaches the shelf. The Johansens launched the Scent Stop odor elimination
              line in 2012, giving hunters a complete scent management system from body wash
              and laundry soap to field spray &mdash; all designed to work together with
              Buck Stop&apos;s attraction scents.
            </p>
            <p className="text-lg leading-relaxed">
              The Johansens have expanded the product line to over 150 products, strengthened
              dealer relationships across the country, and brought Buck Stop into the digital
              age with a full online store &mdash; all while maintaining the family values and
              quality standards that have defined the brand since day one. Today, Buck Stop
              products are available at sporting goods retailers nationwide and shipped
              directly to hunters&apos; doors.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark" aria-labelledby="values-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="values-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Authenticity', description: 'Real ingredients, real results. We never cut corners.' },
              { title: 'Heritage', description: 'Honoring 70+ years of hunting tradition and innovation.' },
              { title: 'Quality', description: 'Every batch is tested. Every product is field-proven.' },
              { title: 'Community', description: 'Built by hunters, for hunters. We are part of your camp.' },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-serif font-bold text-forest mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buck Stop */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="why-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-12 text-center">
            Why Buck Stop
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '70+ Years of Proven Results',
                description:
                  'Since 1953, Buck Stop has been the name hunters trust. No other deer scent company has a longer track record of field-proven effectiveness.',
              },
              {
                title: 'Real Scents from Live Deer',
                description:
                  'Our estrus and buck urine scents are collected from live whitetail deer under controlled conditions. No synthetic substitutes, no shortcuts.',
              },
              {
                title: '150+ Products for Every Scenario',
                description:
                  'From early-season food lures to peak-rut estrus scents to post-rut territorial challenges, Buck Stop covers every phase and every strategy.',
              },
              {
                title: 'Michigan Made, Family Owned',
                description:
                  'Every product is manufactured in Stanton, Michigan by a team that hunts the same woods you do. We are not a corporate brand; we are your fellow hunters.',
              },
              {
                title: 'Industry Pioneer',
                description:
                  'First commercial deer scent. First doe-in-heat estrus scent (1972). First money-back guarantee. First deer scent company to $1 million in sales. We set the standard.',
              },
              {
                title: 'Complete Scent Systems',
                description:
                  'Buck Stop is the only company offering a full scent management system: attraction, cover scents, and the Scent Stop elimination line all working together.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-cream rounded-xl p-6">
                <h3 className="text-lg font-serif font-bold text-forest mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Start Building Your Scent Strategy
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Discover why hunters have trusted Buck Stop for over 70 years.
          </p>
          <Link
            href="/products"
            className="inline-block bg-amber text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
          >
            Shop Our Products
          </Link>
        </div>
      </section>
    </>
  );
}
