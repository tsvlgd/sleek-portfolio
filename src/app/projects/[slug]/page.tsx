import { ProjectContent } from '@/components/projects/ProjectContent';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import { getProjectCaseStudyBySlug } from '@/lib/project';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Only projects that actually have a case study get a route. */
export function generateStaticParams() {
  return projects
    .filter((project) => project.details)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getProjectCaseStudyBySlug(slug);
  if (!caseStudy) return getMetadata('/projects');

  return {
    ...getMetadata('/projects'),
    title: `${caseStudy.frontmatter.title} · Case study`,
    description: caseStudy.frontmatter.description,
    openGraph: {
      ...getMetadata('/projects').openGraph,
      title: `${caseStudy.frontmatter.title} · Case study`,
      description: caseStudy.frontmatter.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getProjectCaseStudyBySlug(slug);
  const project = projects.find((p) => p.slug === slug);

  if (!caseStudy || !project) notFound();

  const index = projects
    .filter((p) => p.details)
    .findIndex((p) => p.slug === slug);
  const detailed = projects.filter((p) => p.details);
  const previous = detailed[index - 1];
  const next = detailed[index + 1];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 sm:pt-9 sm:pb-20">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-accent font-mono text-xs transition-colors"
      >
        ← all projects
      </Link>

      <header className="mt-8">
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {caseStudy.frontmatter.title ?? project.title}
        </h1>
        {(caseStudy.frontmatter.tagline ?? project.tagline) ? (
          <p className="text-muted-foreground mt-2 text-[15px]">
            {caseStudy.frontmatter.tagline ?? project.tagline}
          </p>
        ) : null}

        <dl className="border-border mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y py-5 font-mono text-xs sm:grid-cols-4">
          <div>
            <dt className="text-muted-foreground/60 tracking-[0.14em] uppercase">
              Period
            </dt>
            <dd className="text-foreground mt-1">{project.period}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground/60 tracking-[0.14em] uppercase">
              Role
            </dt>
            <dd className="text-foreground mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground/60 tracking-[0.14em] uppercase">
              Status
            </dt>
            <dd className="text-foreground mt-1">{project.status}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground/60 tracking-[0.14em] uppercase">
              Links
            </dt>
            <dd className="mt-1 flex gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  GitHub
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  Live
                </a>
              ) : null}
            </dd>
          </div>
        </dl>
      </header>

      <ProjectContent content={caseStudy.content} />

      <nav className="border-border mt-16 grid gap-4 border-t pt-6 sm:grid-cols-2">
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="group">
            <span className="micro-label">← previous</span>
            <span className="text-foreground group-hover:text-accent mt-1 block text-sm font-medium transition-colors">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group sm:text-right">
            <span className="micro-label">next →</span>
            <span className="text-foreground group-hover:text-accent mt-1 block text-sm font-medium transition-colors">
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
