import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import MongoDB from '@/components/technologies/MongoDB';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href?: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  description: string[];
  startDate: string;
  endDate: string;
  website?: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
}

/**
 * Sourced from the resume PDF (Oct 2026).
 *
 * Bullets describe outcomes, not machinery. The concrete numbers are what make
 * the work legible to someone who cannot read the code.
 */
export const experiences: Experience[] = [
  {
    company: 'FlyRank AI',
    position: 'Backend Engineer',
    location: 'Remote',
    startDate: 'Jul 2026',
    endDate: 'Present',
    description: [
      'Ship the platform API daily, on FastAPI with PostgreSQL and Redis, with migrations that run themselves and a health check that covers both datastores.',
      'Containerised the whole stack and wrote the test suite that proves it works: 13 passing integration tests on an isolated database.',
      'Currently adding authentication, protected routes and rate limiting.',
    ],
    technologies: [
      { name: 'Python', icon: <Python /> },
      { name: 'FastAPI', icon: <FastAPI /> },
      { name: 'PostgreSQL', icon: <PostgreSQL /> },
      {
        name: 'Redis',
        href: 'https://redis.io',
        icon: <span className="text-[10px] font-semibold">R</span>,
      },
      { name: 'Docker', icon: <Docker /> },
    ],
    isCurrent: true,
  },
  {
    company: 'AiGeeks',
    position: 'Software Engineer Intern',
    location: 'Remote',
    startDate: 'May 2026',
    endDate: 'Jul 2026',
    description: [
      'Built ingestion services for an intelligence platform, fast enough and deduplicated so repeat queries stay cheap.',
      'Designed the five layer reconnaissance pipeline behind it, from passive discovery through to threat intelligence, with validated output at every stage.',
      'Prototyped the agentic layer that reasons over the results, and set up the deployment pipeline that ships it.',
    ],
    technologies: [
      { name: 'TypeScript', icon: <TypeScript /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'Python', icon: <Python /> },
      { name: 'PostgreSQL', icon: <PostgreSQL /> },
      { name: 'MongoDB', icon: <MongoDB /> },
      { name: 'Docker', icon: <Docker /> },
    ],
    isCurrent: false,
  },
  {
    company: 'KultureHire',
    position: 'Data Analyst Intern',
    location: 'Remote',
    startDate: 'Mar 2025',
    endDate: 'Jul 2025',
    description: [
      'Automated the data cleaning and reporting that the team ran by hand.',
      'Turned large candidate datasets into performance metrics the product side could act on.',
    ],
    technologies: [
      { name: 'Python', icon: <Python /> },
      { name: 'PostgreSQL', icon: <PostgreSQL /> },
    ],
    isCurrent: false,
  },
];

/** Education, from the resume. */
export const education = [
  {
    school: 'St. Andrews Institute of Technology & Management',
    location: 'Gurgaon / MDU Rohtak',
    degree: 'B.Tech, Computer Science (Data Science)',
    period: '2023 to 2027',
  },
];
