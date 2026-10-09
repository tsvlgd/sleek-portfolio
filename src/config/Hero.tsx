export const heroEmail = 'hi@mehfooj.dev';

export const heroConfig = {
  name: 'Mehfooj Alam',
  title: 'AI Engineer',
  // Background keyed out with a connected component fill, so the portrait sits
  // on the page background instead of inside a grey rectangle.
  avatar: '/assets/me2-cutout.png',
  location: 'New Delhi, IN',
  timezone: 'Asia/Kolkata',
  email: heroEmail,

  /**
   * One line, no tech stack laundry list. The stack is the Stack section's job;
   * this is the pitch.
   */
  statement:
    'I build AI products that people actually use, and the systems that keep them reliable.',

  where: 'FlyRank AI / Backend Engineer',

  links: [
    {
      name: 'GitHub',
      href: 'https://github.com/tsvlgd',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.4 4.7 18.4 5 18.4 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/mehfooj-a-b6aa0b243',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.5 4.7 5.8V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://x.com/Mehfooj194108',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.8-6.3L5.4 22H2.6l7-8L2 2h6.3l4.4 5.8zm-1 18h1.6L7.1 3.7H5.3z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: `mailto:${heroEmail}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m1.6 2 7.4 5.3L19.4 7z" />
        </svg>
      ),
    },
  ],
};

export const socialLinks = heroConfig.links;
