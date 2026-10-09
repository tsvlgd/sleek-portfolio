export interface NavItem {
  label: string;
  href: string;
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
   */
  navItems: [
    { label: 'Work', href: '/work-experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],
};

export type NavbarConfig = typeof navbarConfig;
