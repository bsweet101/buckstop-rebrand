import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import { companyInfo } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Find a Dealer | Where to Buy Buck Stop Deer Scents',
  description:
    'Find Buck Stop deer scents at a retailer near you or shop our full 150+ product catalog online. Call to order.',
};

export default function FindADealerPage() {
  return (
    <>
      <HeroSection
        title="Get Buck Stop at a Store Near You"
        subtitle="Buck Stop products are available at retailers and sporting goods stores nationwide."
        variant="page"
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 bg-white">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-forest transition-colors">Home</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-forest font-medium" aria-current="page">Find a Dealer</li>
          </ol>
        </nav>
      </div>

      {/* Dealer Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="dealer-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="dealer-heading" className="text-3xl sm:text-4xl font-serif font-bold text-forest mb-6">
            Over 150 Products at Your Local Dealer
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed mb-4 max-w-2xl mx-auto">
            Buck Stop Lure Company products are available through an extensive network
            of sporting goods retailers, farm supply stores, and specialty hunting shops
            across the United States.
          </p>
          <p className="text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            From our flagship deer scents to our complete line of lures and attractants,
            you can find what you need at a store near you.
          </p>
        </div>
      </section>

      {/* Shop Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream" aria-labelledby="shop-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="shop-heading" className="text-2xl font-serif font-bold text-forest mb-8 text-center">
            How to Get Buck Stop Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-forest mb-3">Shop at a Local Retailer</h3>
              <p className="text-charcoal/70 leading-relaxed mb-4">
                Buck Stop products are available at sporting goods retailers, farm supply
                stores, and specialty hunting shops across America. With over 150 products in
                our catalog, your local dealer may not stock everything. Ask your retailer
                to special-order any Buck Stop product, or contact us and we will help you
                find a dealer in your area.
              </p>
              <p className="text-charcoal/70 leading-relaxed">
                <span className="font-medium text-charcoal">Customer Service:</span>{' '}
                <a href={`tel:${companyInfo.phoneService}`} className="text-forest hover:underline">
                  {companyInfo.phoneService}
                </a>
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-forest mb-3">Order Direct Online</h3>
              <p className="text-charcoal/70 leading-relaxed mb-4">
                Shop our complete catalog online and have products shipped directly to your door.
                Our online store carries every product we make, including seasonal items and
                limited-run formulas that may not be available at local retailers. Free shipping
                is available on qualifying orders.
              </p>
              <p className="text-charcoal/70 leading-relaxed">
                <span className="font-medium text-charcoal">Order by Phone:</span>{' '}
                <a href={`tel:${companyInfo.phoneOrders}`} className="text-forest hover:underline">
                  {companyInfo.phoneOrders}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Online CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Can&apos;t Find What You Need?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Shop our complete product line online and get it shipped directly to your door.
          </p>
          <Link
            href="/products"
            className="inline-block bg-amber text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
          >
            Shop Our Web Store
          </Link>
        </div>
      </section>

      {/* Wholesale Inquiries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="wholesale-heading">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream rounded-xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 id="wholesale-heading" className="text-2xl font-serif font-bold text-forest mb-4">
                  Become a Buck Stop Dealer
                </h2>
                <p className="text-charcoal/70 leading-relaxed mb-4">
                  We are always looking for quality retail partners to carry Buck Stop
                  products. With over 150 SKUs spanning estrus scents, buck lures, cover scents,
                  Buck Beads, and the Scent Stop elimination line, we offer a comprehensive
                  deer scent program that drives foot traffic and repeat purchases.
                </p>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  Contact us to learn about wholesale pricing, minimum orders, dealer
                  support materials, and seasonal promotional programs. We work with
                  sporting goods stores, farm supply retailers, outdoor outfitters, and
                  online resellers across the United States.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-forest text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors"
                >
                  Contact Us About Wholesale
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-charcoal mb-4">Wholesale Contact</h3>
                <div className="space-y-3 text-charcoal/70">
                  <p>
                    <span className="font-medium text-charcoal">Orders:</span>{' '}
                    <a href={`tel:${companyInfo.phoneOrders}`} className="text-forest hover:underline">
                      {companyInfo.phoneOrders}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-charcoal">Service:</span>{' '}
                    <a href={`tel:${companyInfo.phoneService}`} className="text-forest hover:underline">
                      {companyInfo.phoneService}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-charcoal">Email:</span>{' '}
                    <a href={`mailto:${companyInfo.email}`} className="text-forest hover:underline">
                      {companyInfo.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
