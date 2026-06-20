'use client';

import { navbarConfig } from '@/config/Navbar';
import { cn } from '@/lib/utils';
import { Menu, Search, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-white/[0.04] backdrop-blur-xl dark:border-white/[0.06]">
      <div className="container mx-auto flex h-12 max-w-2xl items-center justify-between px-4">
        {/* Left: Mobile menu button + Nav Links */}
        <div className="flex items-center gap-1">
          {/* Mobile menu toggle */}
          <button
            className="hover:bg-muted text-muted-foreground hover:text-foreground -ml-2 flex size-8 items-center justify-center rounded-md transition-colors sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 sm:flex">
            {navbarConfig.navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== '/');
              return (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'hover:text-foreground px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground',
                  )}
                  track={{
                    name: 'button_click',
                    data: { buttonId: item.label, section: 'navbar' },
                  }}
                >
                  {item.label}
                </TrackedLink>
              );
            })}
          </nav>
        </div>

        {/* Right: Search + Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            className="border-border/40 text-muted-foreground inline-flex h-8 items-center gap-2 rounded-full border bg-white/[0.03] px-3 text-[13px] transition-colors hover:bg-white/[0.05] dark:bg-white/[0.03]"
            aria-label="Search"
            onClick={() => {
              window.dispatchEvent(new Event('open-search'));
            }}
          >
            <Search className="size-3.5" />
            <span className="hidden items-center gap-1 sm:flex">
              <kbd className="bg-muted/50 border-border/50 flex h-5 items-center justify-center rounded-[4px] border px-1.5 font-sans text-[11px] leading-none font-medium">
                Ctrl
              </kbd>
              <kbd className="bg-muted/50 border-border/50 flex h-5 items-center justify-center rounded-[4px] border px-1.5 font-sans text-[11px] leading-none font-medium">
                K
              </kbd>
            </span>
          </button>

          <ThemeToggleButton />
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="border-border/30 animate-in slide-in-from-top-1 border-t duration-200 sm:hidden">
          <nav className="container mx-auto flex max-w-2xl flex-col gap-0.5 px-4 py-2">
            {navbarConfig.navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== '/');
              return (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'hover:bg-muted rounded-md px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'text-foreground bg-muted/50 font-medium'
                      : 'text-muted-foreground',
                  )}
                  track={{
                    name: 'button_click',
                    data: { buttonId: item.label, section: 'navbar_mobile' },
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </TrackedLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
