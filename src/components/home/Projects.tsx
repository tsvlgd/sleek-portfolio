import { projects } from '@/config/Projects';
import Link from 'next/link';

import { AnimateInView } from '../common/AnimateInView';
import { Section, SectionLabel } from '../common/Section';
import { ProjectRow } from './ProjectRow';

/**
 * Featured work. A hairline separated row list rather than a card grid: it
 * reads as an index, stays light, and each row carries mono metadata without
 * shouting.
 */
export function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <Section id="projects">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <SectionLabel index="03" label="Selected work" jp="作品" />
          <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
            Things I have built
          </h2>
        </div>
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground shrink-0 font-mono text-xs transition-colors"
        >
          all {projects.length} →
        </Link>
      </div>

      <ul className="mt-7">
        {featured.map((project, index) => (
          <AnimateInView
            as="li"
            key={project.slug}
            style={{ ['--i' as string]: index }}
            rootMargin="0px 0px -10% 0px"
          >
            <ProjectRow project={project} />
          </AnimateInView>
        ))}
      </ul>
    </Section>
  );
}
