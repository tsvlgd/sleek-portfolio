import Github from '@/components/svgs/Github';
import Instagram from '@/components/svgs/Instagram';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import Medium from '@/components/svgs/Medium';
import Pinterest from '@/components/svgs/Pinterest';
import X from '@/components/svgs/X';
import YouTube from '@/components/svgs/YouTube';
import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

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
  name: 'Mehfooj Alam',
  title: 'Engineer · Builder · Learner',
  avatar: '/assets/me1.jpeg',
  avatar2: '/assets/me2.jpeg',

  skills: [
    {
      name: 'FastAPI',
      href: 'https://fastapi.tiangolo.com/',
      component: 'FastAPI',
    },
    {
      name: 'Python',
      href: 'https://python.org/',
      component: 'Python',
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

  description: {
    template:
      'I build AI applications, intelligence platforms, and backend systems using {skills:0} {skills:1} {skills:2} {skills:3} {skills:4}',
  },

  buttons: [],
};

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
    name: 'YouTube',
    href: 'https://youtube.com/@mehfooj',
    icon: <YouTube />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/ml.mehfooj',
    icon: <Instagram />,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/ml.mehfooj',
    icon: <Pinterest />,
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@ml.mehfooj',
    icon: <Medium />,
  },
  {
    name: 'Email',
    href: 'mailto:ml.mehfooj@gmail.com',
    icon: <Mail />,
  },
];
