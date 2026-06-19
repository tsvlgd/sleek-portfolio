import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export const mySkills = [
  <Python key="python" />,
  <FastAPI key="fastapi" />,
  <TypeScript key="typescript" />,
  <ReactIcon key="react" />,
  <PostgreSQL key="postgresql" />,
  <NodeJs key="nodejs" />,
  <Docker key="docker" />,
];

export const about = {
  name: 'Mehfooj Alam',
  description: `I'm an AI Engineer and backend systems builder. I build intelligence platforms, OSINT tools, and production AI applications. I ship by building, learn by doing.`,
};
