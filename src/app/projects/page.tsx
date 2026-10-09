import { ProjectRow } from '@/components/home/ProjectRow';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  ...getMetadata('/projects'),
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 sm:pt-9 sm:pb-20">
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        Projects
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl text-[15px] leading-7">
        {projects.length} projects, newest thinking first. The featured set is
        what I would open in a conversation; the rest is reference work and
        from-first-principles builds.
      </p>

      <h2 className="micro-label mt-14">Featured</h2>
      <ul className="mt-4">
        {featured.map((project) => (
          <li key={project.slug}>
            <ProjectRow project={project} />
          </li>
        ))}
      </ul>

      <h2 className="micro-label mt-14">Also</h2>
      <ul className="mt-4">
        {rest.map((project) => (
          <li key={project.slug}>
            <ProjectRow project={project} />
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground border-border mt-14 border-t pt-6 text-sm">
        Looking for something specific?{' '}
        <Link href="/contact" className="text-accent hover:underline">
          Ask me directly
        </Link>
        .
      </p>
    </div>
  );
}
