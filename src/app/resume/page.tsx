import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { experiences } from '@/config/Experience';
import { heroConfig } from '@/config/Hero';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/resume'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumePage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {heroConfig.name}
          </h1>
          <p className="text-muted-foreground text-lg">{heroConfig.title}</p>
          <div className="flex gap-4 text-sm text-neutral-500">
            <a
              href="mailto:ml.mehfooj@gmail.com"
              className="transition-colors hover:text-black dark:hover:text-white"
            >
              ml.mehfooj@gmail.com
            </a>
            <span>•</span>
            <a
              href="https://github.com/tsvlgd"
              target="_blank"
              className="transition-colors hover:text-black dark:hover:text-white"
            >
              github.com/tsvlgd
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/mehfooj-a-b6aa0b243"
              target="_blank"
              className="transition-colors hover:text-black dark:hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <Separator />

        {/* Experience Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <p className="text-secondary">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="text-sm whitespace-nowrap text-neutral-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="ml-4 list-outside list-disc space-y-1 text-neutral-600 dark:text-neutral-400">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Education Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Education</h2>
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  B.Tech in Computer Science Engineering (Data Science)
                </h3>
                <p className="text-secondary">Maharshi Dayanand University</p>
              </div>
              <span className="text-sm text-neutral-500">2023 - 2027</span>
            </div>
          </div>
        </section>

        <Separator />

        {/* Tech Stack Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Tech Stack & Skills</h2>
          <div className="flex flex-wrap gap-2">
            {heroConfig.skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
              >
                {skill.name}
              </div>
            ))}
            <div className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800">
              Docker
            </div>
            <div className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800">
              AWS
            </div>
            <div className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800">
              MongoDB
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
