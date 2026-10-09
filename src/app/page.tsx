import { Section, SectionLabel } from '@/components/common/Section';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { GithubSection } from '@/components/home/GithubSection';
import { Hero } from '@/components/home/Hero';
import { Projects } from '@/components/home/Projects';
import { Stack } from '@/components/home/Stack';
import { Work } from '@/components/home/Work';

/**
 * Hourly, matching the contribution grid's own cache. The grid is server
 * rendered from GitHub's API, and without this the whole page would be static at
 * build time, freezing the graph until the next deploy.
 */
export const revalidate = 3600;

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
