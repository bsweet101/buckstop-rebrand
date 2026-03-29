import type { Metadata } from 'next';
import { generateArticleSchema, generateFAQSchema } from '@/lib/schema';
import RutCalendarClient from './RutCalendarClient';

export const metadata: Metadata = {
  title: '2026 Whitetail Rut Calendar | State-by-State Predictions | Buck Stop',
  description:
    'State-by-state whitetail rut predictions for 2026. Interactive map with peak rut dates, chasing phases & scent strategies for all 50 states.',
  openGraph: {
    title: '2026 Whitetail Rut Calendar | State-by-State Predictions',
    description:
      'Interactive rut calendar with peak dates for all 50 states. Plan your 2026 deer hunt with 70+ years of Buck Stop field data.',
    type: 'article',
    images: ['/images/logo.png'],
  },
};

const rutFaqs = [
  {
    question: 'When is the whitetail rut in 2026?',
    answer:
      'The whitetail rut in 2026 follows the same photoperiod-driven schedule as every year. For most northern and midwestern states, peak breeding occurs between November 5 and November 20. Southern states experience later rut timing, with some areas of Alabama, Mississippi, and South Texas not seeing peak breeding until January or February. The rut is triggered primarily by decreasing daylight hours, so the dates remain remarkably consistent year to year regardless of weather or moon phase.',
  },
  {
    question: 'Does the rut happen at the same time every year?',
    answer:
      'Yes, the core rut dates are remarkably consistent from year to year. Research from multiple state wildlife agencies confirms that peak breeding dates in a given area vary by only a few days annually. While weather fronts, moon phases, and hunting pressure can affect daytime deer movement and visibility, they do not significantly shift the actual breeding window. Does come into estrus based on photoperiod (day length), which is the same every year. This is why historical rut data from Buck Stop spanning 70+ years remains reliable for predicting peak activity.',
  },
  {
    question: 'What triggers the rut?',
    answer:
      'The whitetail rut is triggered primarily by photoperiod -- the ratio of daylight to darkness. As days shorten in autumn, decreasing light stimulates the pineal gland in deer, triggering hormonal changes that bring does into estrus and increase testosterone in bucks. Secondary factors like temperature drops, barometric pressure changes, and moon phase can influence the intensity of daytime movement but do not change the core breeding timeline. Latitude is the biggest variable: northern deer rut earlier because day length decreases faster at higher latitudes.',
  },
  {
    question: 'What is the best scent during peak rut?',
    answer:
      'During peak rut, doe-in-heat (estrus) scents are the most effective at attracting mature bucks. Buck Stop 200 PROOF Ultimate Doe-In-Heat is our strongest estrus formula, collected from live whitetail does at the peak of their breeding cycle. For trophy-class bucks, Guide Grade Scents offer the highest concentration available. Apply estrus scent on scent wicks hung at nose height, on mock scrapes, and as drag rags along approach trails. Combine with RUCK\'N BUCK dominant buck urine on nearby scrapes to create a realistic breeding scenario that appeals to both territorial and breeding instincts.',
  },
  {
    question: 'How long does the rut last?',
    answer:
      'The entire rut cycle spans roughly 6 to 8 weeks in most areas, but the intense chasing and breeding phases typically last 2 to 3 weeks. The pre-rut (seeking phase) begins 2 to 3 weeks before peak breeding as bucks increase movement and check scrapes. The chasing phase lasts about 10 days as bucks actively pursue does. Peak breeding (lockdown) lasts 7 to 14 days when bucks pair with estrous does. The post-rut follows as activity decreases. A second rut occurs approximately 28 days later when unbred does and doe fawns cycle, offering another window of opportunity.',
  },
];

const articleSchema = generateArticleSchema(
  '2026 Whitetail Rut Calendar - State-by-State Predictions',
  'Interactive state-by-state whitetail rut predictions for 2026 with peak dates, phase timelines, and scent strategies for all 50 states.',
  '2026-03-15',
  '2026-03-29',
  'Brian Johansen',
  'https://www.buckstopscents.com/rut-calendar'
);

const faqSchema = generateFAQSchema(rutFaqs);

export default function RutCalendarPage() {
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
      <RutCalendarClient faqs={rutFaqs} />
    </>
  );
}
