import type { Metadata } from 'next';
import FirstHuntClient from './FirstHuntClient';

export const metadata: Metadata = {
  title: 'First-Time Hunter Guide | Plan Your First Deer Hunt',
  description:
    'Plan your first hunt with our interactive guide. Get a personalized gear checklist, scent strategy, and preparation timeline.',
  openGraph: {
    title: 'First-Time Hunter Guide | Plan Your First Deer Hunt | Buck Stop',
    description:
      'Plan your first hunt with our interactive guide. Get a personalized gear checklist, scent strategy, and preparation timeline.',
    type: 'article',
    images: ['/images/logo.png'],
  },
};

// Article + FAQ structured data
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'First-Time Hunter Guide - Plan Your First Hunt',
  description:
    'An interactive walkthrough that helps new hunters plan their first hunt with personalized gear lists, scent strategies, and preparation timelines.',
  author: {
    '@type': 'Organization',
    name: 'Buck Stop Lure Co.',
    url: 'https://www.buckstopscents.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Buck Stop Lure Co.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.buckstopscents.com/images/logo.png',
    },
  },
  datePublished: '2026-03-29',
  dateModified: '2026-03-29',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What do I need for my first deer hunt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your first deer hunt requires a weapon and ammunition, appropriate clothing for the season and climate, a hunting license, blaze orange (in most states), optics like binoculars, scent control products, and safety gear including a harness if using a tree stand.',
      },
    },
    {
      '@type': 'Question',
      name: 'What scents should a beginner hunter use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beginner hunters should start with a scent elimination system to reduce human odor, then add a simple attractant like Buck Stop Mate-Triks Original doe-in-heat scent during the rut, or a curiosity-based lure like Gland-U-Lure for early season.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I prepare for my first hunt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start preparing at least 3 months out by completing hunter education and purchasing your license. One month before, begin scouting your hunting area. The week before, do a final gear check and wash your hunting clothes in scent-free detergent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a hunting guide for my first hunt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While not required, a hunting guide or experienced mentor significantly improves your first hunt. They teach you field skills, help with safety, and increase your chances of success. Many states offer mentored hunting programs for beginners.',
      },
    },
  ],
};

export default function FirstHuntPage() {
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
      <FirstHuntClient />
    </>
  );
}
