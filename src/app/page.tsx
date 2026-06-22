import BlogSection from '@/components/landing/BlogSection';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import React from 'react';

export default function page() {
  return (
    <main className="min-h-screen pt-8 pb-16 sm:pt-12 sm:pb-24">
      <Hero />
      <Experience />
      <BlogSection />
    </main>
  );
}
