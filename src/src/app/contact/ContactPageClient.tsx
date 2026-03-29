'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { companyInfo } from '@/lib/content';

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would submit to an API route
    setSubmitted(true);
  }

  return (
    <>
      <HeroSection
        title="Talk to a Hunter"
        subtitle="We'd love to hear from you. Reach out with questions, feedback, or wholesale inquiries."
        variant="page"
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 bg-white">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/" className="hover:text-forest transition-colors">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-forest font-medium" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold text-forest mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <svg
                    className="w-12 h-12 text-green-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Message Sent
                  </h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We will get back to you within 1-2
                    business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Your Name{' '}
                        <span className="text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[#2d2d2d]/20 bg-cream/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Email Address{' '}
                        <span className="text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[#2d2d2d]/20 bg-cream/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Subject{' '}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#2d2d2d]/20 bg-cream/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="products">Product Question</option>
                      <option value="wholesale">Wholesale / Dealer Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Message{' '}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#2d2d2d]/20 bg-cream/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:border-transparent resize-y"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-forest text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-light transition-colors focus:outline-none focus:ring-2 focus:ring-[#c8932a] focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Company Info Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-cream rounded-xl p-8 sticky top-8">
                <h2 className="text-2xl font-serif font-bold text-forest mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                    <address className="not-italic text-charcoal/70 leading-relaxed">
                      {companyInfo.name}
                      <br />
                      {companyInfo.address}
                      <br />
                      {companyInfo.city}, {companyInfo.state} {companyInfo.zip}
                    </address>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                    <p className="flex items-center gap-2 text-charcoal/70">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-[#c8932a]" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                      </svg>
                      <span>
                        Orders:{' '}
                        <a
                          href={`tel:${companyInfo.phoneOrders}`}
                          className="text-forest hover:underline"
                        >
                          {companyInfo.phoneOrders}
                        </a>
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-charcoal/70 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-[#c8932a]" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                      </svg>
                      <span>
                        Service:{' '}
                        <a
                          href={`tel:${companyInfo.phoneService}`}
                          className="text-forest hover:underline"
                        >
                          {companyInfo.phoneService}
                        </a>
                      </span>
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                    <p className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-[#c8932a]" aria-hidden="true">
                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.161V6a2 2 0 00-2-2H3z" />
                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                      </svg>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-forest hover:underline"
                      >
                        {companyInfo.email}
                      </a>
                    </p>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Business Hours</h3>
                    <div className="text-charcoal/70 text-sm space-y-1">
                      <p>Monday - Friday: 8:00 AM - 5:00 PM EST</p>
                      <p>Saturday - Sunday: Closed</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="font-semibold text-charcoal mb-3">Follow Us</h3>
                    <div className="flex gap-4">
                      {companyInfo.social.facebook && (
                        <a
                          href={companyInfo.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-light transition-colors"
                          aria-label="Facebook"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        </a>
                      )}
                      {companyInfo.social.twitter && (
                        <a
                          href={companyInfo.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-light transition-colors"
                          aria-label="Twitter"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                      {companyInfo.social.youtube && (
                        <a
                          href={companyInfo.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-light transition-colors"
                          aria-label="YouTube"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
