import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import Container from '../common/Container';

const blogs = [
  {
    title: 'Dear Indian Students',
    description:
      'Why most Indian students stay average despite wanting extraordinary results.',
    date: 'June 6, 2026',
    href: '/blog',
  },
  {
    title: 'The FAQ',
    description: 'Covering the most frequently asked question.',
    date: 'May 28, 2026',
    href: '/blog',
  },
  {
    title: 'The Internet Romanticized Exhaustion',
    description:
      'How hustle culture slowly destroys ambition, health, peace, and your identity.',
    date: 'May 28, 2026',
    href: '/blog',
  },
];

export default function BlogSection() {
  return (
    <Container className="mt-14 flex flex-col items-center">
      <div className="w-full">
        <h2 className="mb-6 text-2xl font-bold">Blog</h2>
        <div className="flex flex-col gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.title}
              href={blog.href}
              className="group flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="group-hover:text-primary text-lg leading-tight font-semibold transition-colors">
                  {blog.title}
                </h3>
                <p className="text-secondary line-clamp-2 text-sm">
                  {blog.description}
                </p>
                <time className="text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex">
                  <CalendarIcon className="size-3" />
                  {blog.date}
                </time>
              </div>
              <div className="flex flex-row items-center justify-between gap-4 sm:contents">
                <time className="text-muted-foreground flex items-center gap-1.5 text-xs sm:hidden">
                  <CalendarIcon className="size-3" />
                  {blog.date}
                </time>
                <span className="text-secondary group-hover:text-primary inline-flex shrink-0 items-center gap-1.5 text-sm transition-colors">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/blog"
        className="text-foreground/80 hover:text-foreground mt-8 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-[14px] font-medium backdrop-blur-sm transition-all hover:bg-white/[0.08] dark:border-white/10 dark:bg-white/[0.045]"
      >
        Show all blogs
      </Link>
    </Container>
  );
}
