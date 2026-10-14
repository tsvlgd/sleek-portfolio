'use client';

import { resolveHref } from '@/config/Hosts';
import { useResumeHost } from '@/lib/useResumeHost';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type HostLinkProps = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

/**
 * A `next/link` that knows where it is pointing.
 *
 * On the resume host every site path is rewritten back to the resume, so a plain
 * link to `/` or `/projects` is a dead control. This resolves the href against
 * the host being served, and renders a plain anchor when the destination is
 * absolute, because a client transition to another origin is not a thing.
 */
export function HostLink({ href, children, ...rest }: HostLinkProps) {
  const onResumeHost = useResumeHost();
  const resolved = resolveHref(href, onResumeHost);

  if (!resolved.startsWith('/')) {
    return (
      <a href={resolved} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={resolved} {...rest}>
      {children}
    </Link>
  );
}
