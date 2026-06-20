export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  logo: {
    src: '/assets/me1.jpeg',
    alt: 'Mehfooj Alam',
    width: 100,
    height: 100,
  },
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Work',
      href: '/work-experience',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Resume',
      href: '/resume',
    },
  ] as NavItem[],
};
