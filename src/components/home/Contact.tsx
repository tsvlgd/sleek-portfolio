import { heroConfig } from '@/config/Hero';
import { ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';

import { Section, SectionLabel } from '../common/Section';

export function Contact() {
  return (
    <Section id="contact">
      <SectionLabel index="06" label="Contact" jp="連絡" />
      <h2 className="mt-4 max-w-lg text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
        Open to backend and AI engineering work.
      </h2>
      <p className="text-muted-foreground mt-3 max-w-md text-[15px] leading-7">
        If you are building something with a real backend, an LLM in the loop,
        or both, I would like to hear about it.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="group bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
        >
          Start a conversation
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <a
          href={`mailto:${heroConfig.email}`}
          className="glass-button group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
        >
          <Mail className="size-3.5" />
          {heroConfig.email}
        </a>
      </div>
    </Section>
  );
}
