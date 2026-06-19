'use client';

import { navbarConfig } from '@/config/Navbar';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        {/* Left: Nav Links */}
        <nav className="flex items-center gap-6">
          {navbarConfig.navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <TrackedLink
                key={item.label}
                href={item.href}
                className={`hover:text-foreground text-sm transition-colors ${
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
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

        {/* Right: Search + Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            className="border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm transition-colors"
            aria-label="Search"
            onClick={() => {
              window.dispatchEvent(new Event('open-search'));
            }}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Ctrl</span>
            <kbd className="border-border bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center rounded border px-1 font-mono text-[10px] font-medium">
              K
            </kbd>
          </button>

          <ThemeToggleButton variant="circle" />
        </div>
      </div>
    </header>
  );
}
