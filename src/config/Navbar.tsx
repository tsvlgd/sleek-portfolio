export interface NavItem {
  label: string;
  href: string;
  /**
   * Absolute URL. Renders as a plain anchor and leaves the app, so it is not a
   * client transition and `usePathname` cannot mark it active. Needed for the
   * resume, which lives on its own host.
   */
  external?: boolean;
}

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
   * Resume points at its own host rather than at /resume. That subdomain serves
   * the resume and nothing else, and it is the address worth handing to a
   * recruiter, who will read resume.mehfooj.dev as the canonical one rather than
   * as a route inside a site they then have to navigate.
   */
  navItems: [
    { label: 'Work', href: '/work-experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: 'https://resume.mehfooj.dev', external: true },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],
};

export type NavbarConfig = typeof navbarConfig;
