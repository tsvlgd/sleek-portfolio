import { SectionLabel } from '@/components/common/Section';
import { education, experiences } from '@/config/Experience';
import { generateMetadata as getMetadata } from '@/config/Meta';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/work-experience'),
};

export default function WorkExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 sm:pt-9 sm:pb-20">
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        Work
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl text-[15px] leading-7">
        Backend and AI engineering across production platforms, intelligence
        systems, and data pipelines. Bullets are the actual work, not a summary
        of it.
      </p>

      <div className="mt-14 space-y-12">
        {experiences.map((experience, index) => (
          <section key={experience.company}>
            <SectionLabel
              index={String(index + 1).padStart(2, '0')}
              label={experience.company}
            />
            <div className="mt-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-foreground text-lg font-semibold">
                  {experience.position}
                </h2>
                <p className="text-muted-foreground/70 font-mono text-xs tabular-nums">
                  {experience.startDate} to {experience.endDate}
                </p>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                {experience.location}
                {experience.isCurrent ? (
                  <span className="text-accent ml-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                    current
                  </span>
                ) : null}
              </p>

              <ul className="mt-4 space-y-2">
                {experience.description.map((line) => (
                  <li
                    key={line}
                    className="text-muted-foreground before:bg-border relative pl-4 text-[15px] leading-7 before:absolute before:top-[0.6875rem] before:left-0 before:h-1 before:w-1 before:rounded-full"
                  >
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="border-border/70 text-muted-foreground rounded-full border px-2.5 py-0.5 font-mono text-[11px]"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16">
        <SectionLabel label="Education" />
        {education.map((item) => (
          <div key={item.school} className="mt-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-foreground text-base font-semibold">
                {item.degree}
              </h2>
              <p className="text-muted-foreground/70 font-mono text-xs tabular-nums">
                {item.period}
              </p>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {item.school} · {item.location}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
