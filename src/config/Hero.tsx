import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
// Technology Components
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
  Python: Python,
  FastAPI: FastAPI,
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  PostgreSQL: PostgreSQL,
  NodeJs: NodeJs,
  Docker: Docker,
};

export const heroConfig = {
  // Personal Information
  name: 'Mehfooj Alam',
  title: 'engineer, builder, learner.',
  avatar: '/assets/me1.jpeg',

  // Skills Configuration
  skills: [
    {
      name: 'Python',
      href: 'https://python.org/',
      component: 'Python',
    },
    {
      name: 'FastAPI',
      href: 'https://fastapi.tiangolo.com/',
      component: 'FastAPI',
    },
    {
      name: 'TypeScript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
      component: 'PostgreSQL',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I build AI applications, intelligence platforms, and backend systems using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. Focused on <b>shipping real products</b>, learning by doing, and building by default.',
  },

  // Buttons Configuration
  buttons: [],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'X',
    href: 'https://twitter.com/Mehfooj194108',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mehfooj-a-b6aa0b243',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/tsvlgd',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:ml.mehfooj@gmail.com',
    icon: <Mail />,
  },
];
