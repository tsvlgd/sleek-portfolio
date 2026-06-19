'use client';

import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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

  return (
    <div className="group">
      {/* Header Row */}
      <div
        className="flex cursor-pointer flex-row flex-nowrap items-start justify-between gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Left: Company + Role */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                'text-lg font-bold',
                experience.isBlur ? 'blur-[5px]' : 'blur-none',
              )}
            >
              {experience.company}
            </h3>
            {experience.website && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={experience.website}
                    target="_blank"
                    className="hover:text-foreground size-4 text-neutral-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Website />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Visit Website</TooltipContent>
              </Tooltip>
            )}
            {experience.linkedin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={experience.linkedin}
                    target="_blank"
                    className="hover:text-foreground size-4 text-neutral-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkedIn />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            )}
            {experience.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={experience.github}
                    target="_blank"
                    className="hover:text-foreground size-4 text-neutral-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            )}
            {experience.isCurrent && (
              <div className="flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5 text-xs text-green-500">
                <div className="size-1.5 animate-pulse rounded-full bg-green-500"></div>
                Working
              </div>
            )}
            {/* Expand Arrow */}
            <button
              className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Toggle details"
            >
              <ChevronDown
                className={cn(
                  'text-muted-foreground size-4 transition-transform duration-200',
                  isExpanded && 'rotate-180',
                )}
              />
            </button>
          </div>
          <p className="text-secondary text-sm">{experience.position}</p>
        </div>

        {/* Right: Dates + Location */}
        <div className="text-secondary flex min-w-[88px] shrink-0 flex-col text-right text-sm md:min-w-[140px]">
          <p>
            {experience.startDate} –{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>
          <p>{experience.location}</p>
        </div>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-border animate-in slide-in-from-top-1 mt-4 space-y-4 border-t pt-4 duration-200">
          {/* Technologies */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Technologies & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((technology, techIndex: number) => (
                <Skill
                  key={techIndex}
                  name={technology.name}
                  href={technology.href}
                >
                  {technology.icon}
                </Skill>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">What I&apos;ve done</h4>
            <div className="text-secondary flex flex-col gap-1 text-sm">
              {experience.description.map((desc: string, descIndex: number) => (
                <p
                  key={descIndex}
                  dangerouslySetInnerHTML={{
                    __html: `• ${parseDescription(desc)}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
