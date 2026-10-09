'use client';

import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type PaletteEntry = {
  label: string;
  hint: string;
  perform: () => void;
};

/**
 * Command palette.
 *
 * Lazily mounted: this component only renders the `cmdk` tree once the user has
 * actually asked for it. cmdk + the fuzzy matcher are keyboard-time code and
 * have no business in the initial bundle.
 */
export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // cmdk touches the DOM on mount; wait until after paint to avoid SSR mismatch.
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
    setMounted(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;
      if (typing) return;

      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  const go = (href: string) => () => {
    onOpenChange(false);
    router.push(href);
  };

  const entries: PaletteEntry[] = [
    ...navbarConfig.navItems.map((item) => ({
      label: item.label,
      hint: 'page',
      perform: go(item.href),
    })),
    ...socialLinks.map((link) => ({
      label: link.name,
      hint: 'external',
      perform: () => {
        onOpenChange(false);
        window.open(link.href, '_blank', 'noopener,noreferrer');
      },
    })),
  ];

  if (!mounted) return null;

  return (
    <div
      ref={listRef}
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh]"
    >
      <button
        aria-label="Close command palette"
        onClick={() => onOpenChange(false)}
        className="bg-foreground/20 absolute inset-0 backdrop-blur-[2px]"
      />
      <Command
        label="Command palette"
        className="bg-popover relative w-full max-w-md overflow-hidden rounded-lg border shadow-lg"
        loop
      >
        <Command.Input
          autoFocus
          placeholder="Jump to a page or link…"
          className="text-foreground placeholder:text-muted-foreground border-border w-full border-b bg-transparent px-4 py-3 text-sm outline-none"
        />
        <Command.List className="max-h-72 overflow-y-auto p-1.5">
          <Command.Empty className="text-muted-foreground px-3 py-6 text-center text-sm">
            No matches.
          </Command.Empty>
          <Command.Group
            heading="Navigate"
            className="text-muted-foreground px-2 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
          >
            {entries.map((entry) => (
              <Command.Item
                key={entry.label}
                value={entry.label}
                onSelect={entry.perform}
                className="data-selected:bg-muted data-selected:text-accent flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm"
              >
                <span>{entry.label}</span>
                <span className="text-muted-foreground font-mono text-[10px] tracking-[0.14em] uppercase">
                  {entry.hint}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
