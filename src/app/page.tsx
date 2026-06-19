import Container from '@/components/common/Container';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
    </Container>
  );
}
