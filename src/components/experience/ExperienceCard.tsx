'use client';

import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import Skill from '../common/Skill';

interface ExperienceCardProps {
  experience: Experience;
  defaultExpanded?: boolean;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExperienceCard({
  experience,
  defaultExpanded = false,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const HeaderWrapper = defaultExpanded ? 'div' : 'button';
  const headerProps = defaultExpanded
    ? {}
    : { onClick: () => setIsExpanded(!isExpanded) };

  return (
    <div className="group">
      {/* Header Row */}
      <HeaderWrapper
        className={cn(
          'flex w-full flex-row flex-nowrap items-start justify-between gap-3 text-left',
          !defaultExpanded && 'cursor-pointer',
        )}
        {...headerProps}
      >
        {/* Left: Company + Role */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                'text-lg font-bold blur-none',
                experience.isBlur ? 'blur-[5px]' : 'blur-none',
              )}
            >
              {experience.company}
            </h3>

            {experience.isCurrent && (
              <div className="flex items-center gap-1 rounded-md border border-green-300 bg-green-500/10 px-2 py-1 text-xs dark:border-green-600">
                <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                Working
              </div>
            )}
          </div>
          <p className="text-secondary text-sm text-gray-500 dark:text-[#9CA3AF]">
            {experience.position}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex min-w-[88px] shrink-0 flex-col text-right text-sm text-gray-400 tabular-nums md:min-w-[140px] dark:text-[#71717A]">
            <p>
              {experience.startDate} –{' '}
              {experience.isCurrent ? 'Present' : experience.endDate}
            </p>
            <p>{experience.location}</p>
          </div>
          {!defaultExpanded && (
            <ChevronDown
              className={cn(
                'mt-1 size-5 shrink-0 text-gray-400 transition-transform duration-300 dark:text-[#6B7280]',
                isExpanded ? 'rotate-180' : '',
              )}
            />
          )}
        </div>
      </HeaderWrapper>

      {/* Expandable Details */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-border mt-5 space-y-6 border-t pt-5">
            {/* Technologies */}
            <div>
              <h4 className="mb-2 text-sm leading-6 font-bold tracking-tight text-gray-800 dark:text-[#E5E7EB]">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-[14px]">
                {experience.technologies.map(
                  (technology, techIndex: number) => (
                    <Skill
                      key={techIndex}
                      name={technology.name}
                      href={technology.href}
                      size="sm"
                    >
                      {technology.icon}
                    </Skill>
                  ),
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-[#E5E7EB]">
                What I&apos;ve done
              </h4>
              <div className="text-secondary flex flex-col gap-2 text-sm text-gray-600 dark:text-[#9CA3AF]">
                {experience.description.map(
                  (desc: string, descIndex: number) => (
                    <p
                      key={descIndex}
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: `• ${parseDescription(desc)}`,
                      }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
