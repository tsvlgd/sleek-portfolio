import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import { Button } from '../ui/button';

export default function Experience() {
  return (
    <Container className="mt-16">
      <section className="space-y-2">
        <h2 className="text-xl font-bold">Experience</h2>
        <div className="flex flex-col">
          {experiences.slice(0, 3).map((experience: Experience) => (
            <div
              key={experience.company}
              className="border-border flex items-start justify-between border-b py-4 last:border-0"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold">{experience.company}</h3>
                  {experience.isCurrent && (
                    <div className="flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5 text-xs text-green-500">
                      <div className="size-1.5 animate-pulse rounded-full bg-green-500"></div>
                      Working
                    </div>
                  )}
                </div>
                <p className="text-secondary text-sm">{experience.position}</p>
              </div>
              <div className="text-secondary ml-4 shrink-0 text-right text-sm">
                <p>
                  {experience.startDate} –{' '}
                  {experience.isCurrent ? 'Present' : experience.endDate}
                </p>
                <p>{experience.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            track={{
              name: 'button_click',
              data: { buttonId: 'show_all_experiences', section: 'experience' },
            }}
          >
            <Link href="/work-experience">Show all work experiences</Link>
          </Button>
        </div>
      </section>
    </Container>
  );
}
