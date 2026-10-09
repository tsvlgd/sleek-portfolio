import { Project, ProjectStatus } from '@/config/Projects';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const STATUS: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: 'live', dot: 'bg-emerald-500' },
  active: { label: 'active', dot: 'bg-sky-500' },
  building: { label: 'building', dot: 'breathe bg-foreground/70' },
  wip: { label: 'wip', dot: 'bg-muted-foreground/50' },
};

/**
 * A catalogue row, not a card.
 *
 * Server component: no event handlers, no client JS. The hover affordances are
 * CSS only, and the spotlight follows the pointer through a custom property so
 * the hover listener is attached once at the list level, not once per row.
 */
export function ProjectRow({ project }: { project: Project }) {
  const status = STATUS[project.status];

  return (
    <div className="spotlight group border-border/70 hover:border-border relative border-t transition-colors">
      <div className="relative flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-semibold transition-transform duration-300 group-hover:translate-x-0.5">
              {project.title}
            </h3>
            <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase">
              <span
                aria-hidden="true"
                className={cn('size-1.5 rounded-full', status.dot)}
              />
              {status.label}
            </span>
          </div>

          <p className="text-muted-foreground mt-1.5 text-[15px]">
            {project.tagline}
          </p>

          {project.highlight ? (
            <p className="text-foreground/65 mt-2 font-mono text-xs">
              {project.highlight}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="text-muted-foreground/70 font-mono text-xs tabular-nums">
            {project.period}
          </span>
          <div className="flex items-center gap-3 text-xs">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Code
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Live
              </a>
            ) : null}
            {project.details ? (
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Read the ${project.title} case study`}
                className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 focus-visible:translate-x-0.5 focus-visible:opacity-100"
              >
                <ArrowUpRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/*
        The stack collapses until hover. Six visible chips per row turned the
        catalogue into a wall of grey pills that nobody reads, and the tags are
        the least interesting thing about any of these projects. The grid rows
        trick animates to auto height with no JS measurement, so the chips push
        the row open rather than overlaying it.

        Keyboard focus opens it too, otherwise the tags are unreachable without
        a pointer.
      */}
      <div className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-1.5 pt-3.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border-border/70 text-muted-foreground rounded-full border px-2 py-0.5 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
