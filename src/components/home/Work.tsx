import { experiences } from '@/config/Experience';
import Link from 'next/link';
import { CSSProperties } from 'react';

import { AnimateInView } from '../common/AnimateInView';
import { Section, SectionLabel } from '../common/Section';

/**
 * Experience on the home page is an index, not a CV.
 *
 * Company, role, and where and when, with the detail living on the work page.
 * Bullets and tech chips stay there, because repeating them here makes the home
 * page a wall of text that nobody scrolls to the end of.
 */
export function Work() {
  return (
    <Section id="work">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <SectionLabel index="02" label="Experience" jp="経歴" />
          <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
            Where I have worked
          </h2>
        </div>
      </div>

      <ul className="mt-6">
        {experiences.map((experience, index) => (
          <AnimateInView
            as="li"
            key={experience.company}
            className="stagger spotlight group border-border/70 relative border-t py-5"
            style={{ '--i': index } as CSSProperties}
          >
            {/* relative so the text paints after the spotlight overlay, which is what keeps
                the light behind the content rather than over it. */}
            <div className="relative flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{experience.company}</h3>
                  {experience.isCurrent ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                      <span
                        aria-hidden="true"
                        className="breathe size-1.5 rounded-full bg-emerald-500"
                      />
                      Working
                    </span>
                  ) : null}
                </div>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {experience.position}
                </p>
              </div>

              <p className="text-muted-foreground shrink-0 text-sm sm:text-right">
                <span className="block tabular-nums">
                  {experience.startDate} to {experience.endDate}
                </span>
                <span className="text-muted-foreground/70 block">
                  {experience.location}
                </span>
              </p>
            </div>
          </AnimateInView>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          href="/work-experience"
          className="glass-button hover:text-foreground inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors"
        >
          Show all work experiences
        </Link>
      </div>
    </Section>
  );
}
