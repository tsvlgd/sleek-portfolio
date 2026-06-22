import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export default function Skill({
  name,
  href,
  children,
  size = 'md',
}: SkillProps) {
  return (
    <Link
      href={href ?? ''}
      target="_blank"
      aria-label={name}
      className={cn(
        'group/skill relative flex items-center justify-center border border-dashed transition-all duration-300',
        // Dark mode and structural styles: clean charcoal #161616
        'border-black/20 bg-black/5 dark:border-white/20 dark:bg-[#161616]',
        // Hover effects
        'hover:-translate-y-[2px] hover:bg-black/10 dark:hover:border-white/30 dark:hover:bg-[#1c1c1c] dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.03)]',
        // Sizing
        size === 'sm'
          ? 'h-[38px] rounded-[12px]'
          : 'h-10 rounded-[14px] sm:h-[42px] sm:rounded-[16px]',
        // Very subtle glassmorphism overlay via after pseudo-element (only on hover)
        'after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-br after:from-white/5 after:to-transparent after:opacity-0 after:transition-opacity hover:after:opacity-100',
      )}
    >
      {/* Icon Wrapper (always a perfect square matching the height) */}
      <div
        className={cn(
          'relative z-10 flex shrink-0 items-center justify-center',
          size === 'sm'
            ? 'h-[38px] w-[38px]'
            : 'h-10 w-10 sm:h-[42px] sm:w-[42px]',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center [&_svg]:h-full [&_svg]:w-full',
            size === 'sm' ? 'size-[18px]' : 'size-5 sm:size-[22px]',
          )}
        >
          {children}
        </div>
      </div>

      {/* Expanding Text via Grid */}
      <div className="grid grid-cols-[0fr] transition-all duration-300 ease-out group-hover/skill:grid-cols-[1fr]">
        <div className="overflow-hidden">
          <span
            className={cn(
              'relative z-10 block font-medium whitespace-nowrap text-black/80 opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100 dark:text-white/80',
              size === 'sm' ? 'pr-3 text-[12px]' : 'pr-3 text-[13px] sm:pr-4',
            )}
          >
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}
