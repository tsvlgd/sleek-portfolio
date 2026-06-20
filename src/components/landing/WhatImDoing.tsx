'use client';

import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import GithubTech from '@/components/technologies/Github';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import Container from '../common/Container';

const activities = {
  building: ['AI Applications', 'Intelligence Platforms', 'Backend Systems'],
  learning: ['Distributed Systems', 'LLM Engineering', 'Open Source'],
  tools: [
    { name: 'Python', icon: <Python /> },
    { name: 'FastAPI', icon: <FastAPI /> },
    { name: 'PostgreSQL', icon: <PostgreSQL /> },
    { name: 'Docker', icon: <Docker /> },
    { name: 'GitHub', icon: <GithubTech /> },
    { name: 'React', icon: <ReactIcon /> },
  ],
};

export default function WhatImDoing() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container className="mt-4">
      <section className="glass-card border-border/40 rounded-xl border p-5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between"
          aria-expanded={isExpanded}
          aria-label="Toggle what I'm doing"
        >
          <h2 className="text-base font-bold">What I&apos;m Doing</h2>
          <ChevronDown
            className={cn(
              'text-muted-foreground size-4 transition-transform duration-300',
              isExpanded && 'rotate-180',
            )}
          />
        </button>

        {/* Expandable content */}
        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isExpanded
              ? 'mt-4 grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="grid gap-3 sm:grid-cols-3">
              {/* Building */}
              <div className="glass-card-inner border-border/30 rounded-lg border p-3.5">
                <h3 className="mb-2 text-sm font-semibold">Building</h3>
                <ul className="text-muted-foreground space-y-1.5 text-[13px]">
                  {activities.building.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="bg-foreground/20 size-1 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning */}
              <div className="glass-card-inner border-border/30 rounded-lg border p-3.5">
                <h3 className="mb-2 text-sm font-semibold">Learning</h3>
                <ul className="text-muted-foreground space-y-1.5 text-[13px]">
                  {activities.learning.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="bg-foreground/20 size-1 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div className="glass-card-inner border-border/30 rounded-lg border p-3.5">
                <h3 className="mb-2 text-sm font-semibold">Tools</h3>
                <div className="flex flex-wrap gap-1.5">
                  {activities.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="text-muted-foreground border-border/30 bg-muted/30 flex items-center gap-1.5 rounded-md border px-2 py-1 text-[12px]"
                    >
                      <span className="size-3.5">{tool.icon}</span>
                      {tool.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
