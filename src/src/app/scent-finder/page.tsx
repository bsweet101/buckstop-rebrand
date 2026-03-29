import type { Metadata } from 'next';
import ScentFinderClient from './ScentFinderClient';

export const metadata: Metadata = {
  title: 'Find Your Perfect Scent | Buck Stop Lure Co.',
  description:
    'Take our guided quiz to discover the ideal deer scent for your hunting style, season, and experience level.',
};

export default function ScentFinderPage() {
  return <ScentFinderClient />;
}
