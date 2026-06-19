import Docker from '@/components/technologies/Docker';
import FastAPI from '@/components/technologies/FastAPI';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'LogIQ – Hybrid Log Classification',
    description:
      'Hybrid log classification system combining regex-based parsing with LLM-powered analysis for intelligent log categorization and anomaly detection.',
    image: '/project/logiq.png',
    link: 'https://github.com/tsvlgd/LogIQ',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
    ],
    github: 'https://github.com/tsvlgd/LogIQ',
    live: 'https://github.com/tsvlgd/LogIQ',
    details: false,
    isWorking: true,
  },
  {
    title: 'Full Stack ML – Customer Churn',
    description:
      'End-to-end machine learning pipeline for telecom customer churn prediction with model training, evaluation, and a production-ready API.',
    image: '/project/fullstack-ml.webp',
    link: 'https://github.com/tsvlgd/Telco-Customer-Churn-ML',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
    ],
    github: 'https://github.com/tsvlgd/Telco-Customer-Churn-ML',
    live: 'https://github.com/tsvlgd/Telco-Customer-Churn-ML',
    details: false,
    isWorking: true,
  },
  {
    title: 'GPT From Scratch',
    description:
      'A transformer-based GPT model built from scratch using PyTorch, implementing attention mechanisms, positional encoding, and text generation.',
    image: '/project/gpt.webp',
    link: 'https://github.com/tsvlgd/gpt-from-scratch',
    technologies: [{ name: 'Python', icon: <Python key="python" /> }],
    github: 'https://github.com/tsvlgd/gpt-from-scratch',
    live: 'https://github.com/tsvlgd/gpt-from-scratch',
    details: false,
    isWorking: true,
  },
  {
    title: 'CNN Image Classification',
    description:
      'Convolutional neural network pipeline for image classification with data augmentation, training, and evaluation.',
    image: '/project/cnn.png',
    link: 'https://github.com/tsvlgd/MLE',
    technologies: [{ name: 'Python', icon: <Python key="python" /> }],
    github: 'https://github.com/tsvlgd/MLE',
    live: 'https://github.com/tsvlgd/MLE',
    details: false,
    isWorking: true,
  },
  {
    title: 'Customer Segmentation',
    description:
      'Unsupervised machine learning system for customer segmentation using clustering algorithms to identify distinct customer groups.',
    image: '/project/unsupervised.png',
    link: 'https://github.com/tsvlgd/unsupervised-customer-segmentation',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
    ],
    github: 'https://github.com/tsvlgd/unsupervised-customer-segmentation',
    live: 'https://github.com/tsvlgd/unsupervised-customer-segmentation',
    details: false,
    isWorking: true,
  },
  {
    title: 'KultureHire Analytics',
    description:
      'Data analytics project analyzing HR and recruitment datasets, building dashboards, and delivering actionable insights for hiring decisions.',
    image: '/project/kulturehire-analytics.png',
    link: 'https://kulturehire.com/portfolio/mehfooj-alam',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
    ],
    live: 'https://kulturehire.com/portfolio/mehfooj-alam',
    details: false,
    isWorking: true,
  },
];
