import type { Metadata } from 'next';
import ScentGuideClient from './ScentGuideClient';

export const metadata: Metadata = {
  title: 'Deer Scent Guide & FAQ | Buck Stop Lure Co.',
  description:
    'Learn when and how to use deer scents. Estrus timing, mock scrapes, scent trails & elimination tips from Buck Stop experts.',
};

export default function ScentGuidePage() {
  return <ScentGuideClient />;
}
