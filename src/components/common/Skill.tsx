import Link from 'next/link';
import React from 'react';

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

export default function Skill({ name, href, children }: SkillProps) {
  return (
    <Link
      href={href ?? ''}
      target="_blank"
      className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2.5 py-1.5 text-[15px] text-black dark:border-white/30 dark:bg-white/15 dark:text-white"
    >
      <div className="size-[18px] flex-shrink-0">{children}</div>
      <p className="ml-1.5 font-bold">{name}</p>
    </Link>
  );
}
