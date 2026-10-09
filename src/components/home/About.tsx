import { about } from '@/config/About';

import { Section, SectionLabel } from '../common/Section';

/**
 * One line, no definition of the role and no tech stack. The stack section
 * covers the tools; this only says what he is.
 */
export function About() {
  return (
    <Section id="about">
      <SectionLabel index="01" label="About" jp="紹介" />
      <p className="text-foreground mt-4 max-w-xl text-base leading-relaxed text-balance sm:text-lg sm:leading-relaxed">
        {about.description}
      </p>
    </Section>
  );
}
