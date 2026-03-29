import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Buck Stop Lure Co.',
  description:
    'Questions about Buck Stop deer scents? Call (800) 477-2368 or email us. Customer service & wholesale inquiries.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
