import { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/**
 * Components available inside case-study MDX.
 *
 * Anything a case study uses as JSX must be mapped here — otherwise the MDX
 * compiler renders an unknown element and it silently loses its styling.
 */
export const ProjectComponents: MDXComponents = {
  a: ({ href = '', children, ...props }) => {
    const external = href.startsWith('http');
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
};
