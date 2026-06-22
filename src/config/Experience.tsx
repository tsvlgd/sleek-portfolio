import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import MongoDB from '@/components/technologies/MongoDB';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'AiGeeks',
    position: 'Software Engineer Intern',
    location: 'Remote',
    image: '/company/aigeeks.png',
    description: [
      'Building a production-grade OSINT platform focused on entity intelligence, investigation workflows, and cross-source data aggregation.',
      'Developing backend services, APIs, and data pipelines using Python, FastAPI, MERN, PostgreSQL, and Docker.',
      'Designing scalable intelligence workflows, structured outputs, and reliable data processing systems for real-world investigations.',
      'Collaborating on infrastructure, automation, and deployment architecture for high-availability backend services.',
    ],
    startDate: 'May 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Python',
        href: 'https://python.org/',
        icon: <Python />,
      },
      {
        name: 'FastAPI',
        href: 'https://fastapi.tiangolo.com/',
        icon: <FastAPI />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'Docker',
        href: 'https://www.docker.com/',
        icon: <Docker />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
      {
        name: 'MongoDB',
        href: 'https://mongodb.com/',
        icon: <MongoDB />,
      },
    ],
    website: 'https://aigeeks.ae',
    linkedin: 'https://www.linkedin.com/company/aigeeksae/',
  },
  /*
  {
    isCurrent: true,
    company: 'FlyRankAI',
    position: 'Backend & AI Eng.',
    location: 'Remote',
    image: '/company/flyrank.png',
    description: [
      'Building retrieval-backed AI applications, structured-output workflows, and evaluation pipelines focused on reliability and correctness.',
      'Designing API contracts, validation layers, and backend workflows for production-oriented AI systems.',
      'Developing RAG, tool-calling, and agent-based workflows with an emphasis on grounding, failure handling, and auditability.',
      'Creating evaluation datasets, quality rubrics, and verification processes to assess AI system performance and limitations.',
    ],
    startDate: 'Jul 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Python',
        href: 'https://python.org/',
        icon: <Python />,
      },
      {
        name: 'FastAPI',
        href: 'https://fastapi.tiangolo.com/',
        icon: <FastAPI />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
    ],
    website: 'https://www.flyrank.com',
  },
  */
  {
    isCurrent: false,
    company: 'KultureHire',
    position: 'Data Analyst',
    location: 'Remote',
    image: '/company/kulturehire.jpeg',
    description: [
      'Analyzed large-scale HR and recruitment datasets to uncover trends related to hiring, retention, and candidate performance.',
      'Built structured analyses and dashboards to translate raw data into actionable insights for stakeholders.',
      'Supported data-driven decision-making by identifying patterns and presenting findings in a clear, business-oriented manner.',
    ],
    startDate: 'March 2025',
    endDate: 'June 2025',
    technologies: [
      {
        name: 'Python',
        href: 'https://python.org/',
        icon: <Python />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
    ],
    website: 'https://kulturehire.com',
    linkedin: 'https://www.linkedin.com/company/kulturehire',
  },
];
