import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'Deer Scents, Lures & Attractants | Shop Buck Stop Lure Co.',
  description:
    'Shop 150+ deer scents & lures. Doe-in-heat, buck urine, cover scents & Buck Beads. Michigan-made since 1953. Shop now.',
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageClient />
    </Suspense>
  );
}
