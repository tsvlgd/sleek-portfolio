export interface NavItem {
  label: string;
  /**
   * A route on this site. Absolute URLs are accepted and render as a plain
   * anchor, which leaves the app rather than routing inside it.
   */
  href: string;
}

/** The resume route on the site. Also the page the resume host serves. */
const RESUME_ROUTE = '/resume';

/**
 * Single source of truth for site navigation.
 *
 * The header, the footer, the command palette and the home section rail all
 * map over this one array. Previously the navbar and the command palette each
 * hardcoded their own list and they drifted apart — a route that existed in one
 * but not the other was invisible until someone noticed.
 */
export const navbarConfig = {
  logo: {
    src: '/assets/me2.jpeg',
    alt: 'Mehfooj Alam',
  },
  /**
   * No "Home" entry: the `~/ mehfooj` mark on the left already links to the
   * root, so a Home item next to it would be a second control for one target.
   *
   * Resume is a route on this site, not the subdomain. `resume.mehfooj.dev`
   * exists so the bare address renders a resume for a recruiter who types it
   * into a browser, and it still serves the same page, but navigation that
   * points there hands someone a second origin to reason about for no gain. On
   * the resume host this entry is resolved to the site's own copy by
   * `HostLink`, so it never points at the host the visitor is standing on.
   */
  navItems: [
    { label: 'Work', href: '/work-experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: RESUME_ROUTE },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],
};

/**
 * The nav for the host being served.
 *
 * On the resume host the resume is the entire site, so an entry for it would be
 * a control for the page already on screen. Dropping it leaves the list honest
 * about where the visitor is.
 */
export function navItemsForHost(onResumeHost: boolean): NavItem[] {
  if (!onResumeHost) return navbarConfig.navItems;
  return navbarConfig.navItems.filter((item) => item.href !== RESUME_ROUTE);
}

export type NavbarConfig = typeof navbarConfig;
