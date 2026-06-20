'use client';

import { useUmami } from '@/hooks/use-umami';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Moon from '../svgs/Moon';
import Sun from '../svgs/Sun';

export const ThemeToggleButton = ({
  className = '',
}: {
  className?: string;
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const { trackEvent } = useUmami();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    const from = isDark ? 'dark' : 'light';
    const to = isDark ? 'light' : 'dark';

    trackEvent({
      name: 'theme_toggle',
      data: { from, to, location: 'navbar' },
    });

    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          'text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors',
          className,
        )}
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
        <div className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        'text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors',
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
};
