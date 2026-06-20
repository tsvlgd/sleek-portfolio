import Container from '@/components/common/Container';
import BlogSection from '@/components/landing/BlogSection';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-8 sm:py-12">
      <Hero />
      <Experience />
      <BlogSection />
    </Container>
  );
}
