import { experiences } from '@/config/Experience';
import Link from 'next/link';
import React from 'react';

import Container from '../common/Container';
import { ExperienceCard } from '../experience/ExperienceCard';

export default function Experience() {
  const visibleExperiences = experiences.slice(0, 3);

  return (
    <Container className="mt-10 flex flex-col items-center">
      <div className="w-full">
        <h2 className="text-foreground mb-6 text-[20px] leading-7 font-bold tracking-tight">
          Experience
        </h2>
        <div className="flex flex-col gap-6">
          {visibleExperiences.map((experience) => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
        </div>
      </div>

      <Link
        href="/work-experience"
        className="text-foreground/80 hover:text-foreground mt-6 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-[14px] font-medium backdrop-blur-sm transition-all hover:bg-white/[0.08] dark:border-white/10 dark:bg-white/[0.045]"
      >
        Show all work experiences
      </Link>
    </Container>
  );
}
