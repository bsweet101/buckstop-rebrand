import type { Metadata } from 'next';
import FindAGuideClient from './FindAGuideClient';

export const metadata: Metadata = {
  title: 'Find a Hunting Guide | Verified Guides in All 50 States',
  description:
    'Search verified hunting guides and outfitters across all 50 states. Data sourced from state wildlife agencies, outfitter associations, and guide registrations. Find bow, rifle, and muzzleloader guides for deer, elk, bear, and more.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I list my guide service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can list your guide service for free by filling out the registration form at the bottom of the Find a Guide page. Your listing will be reviewed and added within 3-5 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is guide data verified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Guide data is sourced from state wildlife agencies, professional outfitter associations, and self-registered listings. Listings marked with a verified badge have been confirmed by the Buck Stop team through direct outreach and credential verification.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is listing free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, listing your guide service in the Buck Stop directory is completely free. We believe in supporting the hunting community by connecting hunters with quality guides nationwide.',
      },
    },
  ],
};

export default function FindAGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FindAGuideClient />
    </>
  );
}
