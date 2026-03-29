import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeasonBanner from '@/components/SeasonBanner';
import { CartProvider } from '@/lib/cart-context';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Buck Stop Lure Co.',
    default: 'Buck Stop Lure Co. | Deer Scents Since 1953',
  },
  description:
    "America's original deer scent since 1953. Shop estrus scents, buck lures & cover scents. Michigan-made, 100% guaranteed. Shop now.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Buck Stop Lure Co.',
    title: 'Buck Stop Lure Co. | Deer Scents Since 1953',
    description:
      "America's original deer scent since 1953. Shop estrus scents, buck lures & cover scents. Michigan-made, 100% guaranteed. Shop now.",
    images: ['/images/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/logo.png'],
  },
  metadataBase: new URL('https://www.buckstopscents.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <CartProvider>
          <SeasonBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
