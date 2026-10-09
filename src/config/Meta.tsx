import type { Metadata } from 'next';

import { about, roleSummary } from './About';
import { heroConfig, heroEmail } from './Hero';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
  name: heroConfig.name,
  title: 'Mehfooj Alam · AI Engineer',
  description: roleSummary,
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/meta/opengraph-image.png',
  author: {
    name: about.name,
    twitter: '@Mehfooj194108',
    github: 'tsvlgd',
    linkedin: 'mehfooj-a-b6aa0b243',
    email: heroEmail,
  },
  keywords: [
    'Mehfooj Alam',
    'AI engineer',
    'backend engineer',
    'Python developer',
    'FastAPI',
    'LLM',
    'agentic AI',
    'RAG',
    'portfolio',
  ],
};

/**
 * Metadata is centralised here and keyed by route. `getPageMetadata` falls back
 * to the home entry for unknown paths, so a new page without an entry silently
 * ships the home page's title and canonical URL · add one.
 */
export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: siteConfig.title,
    description: `${about.description} Async Python services, agent runtimes and full-stack AI products.`,
    ogImage: '/meta/hero.png',
    twitterCard: 'summary_large_image',
  },

  '/projects': {
    title: 'Projects · Mehfooj Alam',
    description:
      'Selected work: vision-LLM assessment extraction, async OSINT pipelines, agent runtimes, RL environments and end-to-end ML systems.',
    ogImage: '/meta/projects.png',
    twitterCard: 'summary_large_image',
  },

  '/work-experience': {
    title: 'Work · Mehfooj Alam',
    description:
      'Backend and AI engineering across production platforms, intelligence systems and data pipelines.',
    ogImage: '/meta/work.png',
    twitterCard: 'summary_large_image',
  },

  '/contact': {
    title: 'Contact · Mehfooj Alam',
    description:
      'Get in touch about backend engineering, AI applications, or agent systems.',
    twitterCard: 'summary',
  },

  '/resume': {
    title: 'Resume · Mehfooj Alam',
    description: `Professional summary, experience and technical skills for ${about.name}.`,
    twitterCard: 'summary',
  },
};

export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] ?? pageMetadata['/'];
}

/**
 * Typed as `Metadata` so the literal unions (`'large'`,
 * `'summary_large_image'`) are checked at compile time. Without the annotation
 * the object widens to `string` and every
 * `export const metadata: Metadata = getMetadata(...)` in an app route fails to
 * typecheck.
 */
export function generateMetadata(pathname: string): Metadata {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard ?? 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}
