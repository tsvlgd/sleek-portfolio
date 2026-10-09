'use client';

import { NavItem, navbarConfig } from '@/config/Navbar';
import { cn } from '@/lib/utils';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CommandPalette } from './CommandPalette';
import { ThemeToggleButton } from './ThemeSwitch';

/**
 * The active label slides up and out while an identical copy slides up and in,
 * both inside an overflow mask.
 *
 * One shared duration for the whole word instead of a per character stagger.
 * The stagger is why a nav click felt like it took a second: at 380 ms plus
 * 26 ms per character, "Projects" was still rolling 590 ms AFTER the route had
 * already painted. Nothing was slow except the acknowledgement of the click,
 * so the roll is now 180 ms, which puts it inside the route transition where it
 * reads as instant feedback rather than as a performance.
 */
function RollingLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="relative inline-block overflow-hidden" aria-hidden="true">
      <span
        className={cn(
          'block transition-[transform,opacity] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          active ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'absolute inset-0 block translate-y-full opacity-0 transition-[transform,opacity] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          active && 'translate-y-0 opacity-100',
        )}
      >
        {label}
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (item: NavItem) =>
    item.external
      ? false
      : item.href === '/'
        ? pathname === '/'
        : pathname.startsWith(item.href);

  /**
   * One nav entry.
   *
   * External items render as a plain anchor, because `next/link` on an absolute
   * URL does a full page load to a different origin anyway while still running
   * the client router's intercept logic against a URL it does not own. They can
   * never be active: `usePathname` only ever returns a path, and the resume
   * lives on another host.
   */
  const NavLink = ({ item, active }: { item: NavItem; active: boolean }) => {
    const className =
      'group text-muted-foreground hover:text-foreground shrink-0 text-sm transition-colors';

    if (item.external) {
      return (
        <a
          href={item.href}
          className={className}
          rel="noopener noreferrer"
          target="_blank"
        >
          <RollingLabel label={item.label} active={false} />
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        className={className}
        aria-current={active ? 'page' : undefined}
      >
        <RollingLabel label={item.label} active={active} />
      </Link>
    );
  };

  return (
    <>
      <header
        data-site-chrome=""
        className="glass sticky top-0 z-50 w-full rounded-none border-x-0 border-t-0"
      >
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-center gap-5">
            {/*
              Visible at every width, including mobile. It was hidden below sm
              on the assumption that the hamburger covered it, but the hamburger
              only appears once opened, so on a phone there was no way back to
              the home page from any other route without opening a menu first.
              At 390px this still fits beside the theme toggle and hamburger.
            */}
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground flex shrink-0 items-center gap-1 text-sm font-semibold tracking-tight transition-colors"
              aria-label="Mehfooj Alam, home"
            >
              <span aria-hidden="true" className="font-normal opacity-60">
                ~/
              </span>
              mehfooj
            </Link>

            {/* One row, never wraps. Short labels, tight gap, shrink to zero
                rather than stacking the list vertically. */}
            <nav className="hidden min-w-0 shrink items-center gap-4 sm:flex lg:gap-6">
              {navbarConfig.navItems.map((item) => (
                <NavLink key={item.href} item={item} active={isActive(item)} />
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {/*
              The shortcut lives in the trigger rather than in a tooltip. It is
              the only affordance telling a keyboard user the palette exists,
              and it doubles as the button's hit area.
            */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted hidden h-8 items-center gap-2 rounded-lg border pr-1.5 pl-2.5 transition-colors sm:inline-flex"
              aria-label="Open command palette"
            >
              <Search className="size-3.5" />
              <kbd className="font-sans text-[10px] leading-none">Ctrl</kbd>
              <kbd className="bg-muted text-muted-foreground border-border/70 rounded border px-1 font-sans text-[10px] leading-[18px]">
                K
              </kbd>
            </button>
            <ThemeToggleButton />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex size-8 items-center justify-center rounded-full transition-colors sm:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-border mx-auto max-w-3xl border-t px-4 pb-3 sm:hidden">
            <nav className="grid grid-cols-2 gap-1 pt-3">
              {/*
                Home leads the mobile menu too. The mark in the bar is the
                primary control, but the menu is where someone looks for a full
                list of destinations, and leaving the root out of it made the
                omission inconsistent rather than deliberate.
              */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'hover:bg-muted rounded-lg px-3 py-2.5 text-sm transition-colors',
                  pathname === '/'
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground',
                )}
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
              {navbarConfig.navItems.map((item) => {
                const className = cn(
                  'hover:bg-muted rounded-lg px-3 py-2.5 text-sm transition-colors',
                  isActive(item)
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground',
                );

                return item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className={className}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={className}
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={() => {
                setMobileOpen(false);
                setPaletteOpen(true);
              }}
              className="text-muted-foreground hover:bg-muted mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
            >
              <Search className="size-3.5" />
              Search
            </button>
          </div>
        ) : null}
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
