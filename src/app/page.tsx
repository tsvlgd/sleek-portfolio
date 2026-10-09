import { Section, SectionLabel } from '@/components/common/Section';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { GithubSection } from '@/components/home/GithubSection';
import { Hero } from '@/components/home/Hero';
import { Projects } from '@/components/home/Projects';
import { Stack } from '@/components/home/Stack';
import { Work } from '@/components/home/Work';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Projects />
      <Section id="stack">
        <SectionLabel index="04" label="Stack" jp="技術" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
          What I work with
        </h2>
        <div className="mt-7">
          <Stack />
        </div>
      </Section>
      <GithubSection />
      <Contact />
    </>
  );
}
