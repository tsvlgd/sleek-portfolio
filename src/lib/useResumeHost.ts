'use client';

import { RESUME_HOST } from '@/config/Hosts';
import { useEffect, useState } from 'react';

/**
 * True when the page is being served from the resume host.
 *
 * Read after mount rather than during render. The chrome is a client component
 * but still server rendered, and branching on the hostname mid render would
 * produce a different tree on the server than the client sees, which React
 * reports as a hydration mismatch and then throws away the server markup. Waiting
 * one effect is imperceptible here: only the `href` of a link depends on it, no
 * text, no layout.
 *
 * Deliberately not `headers()` in the root layout. That would make every route
 * dynamic to answer a question that only changes the destination of a handful
 * of links.
 */
export function useResumeHost(): boolean {
  const [onResumeHost, setOnResumeHost] = useState(false);

  useEffect(() => {
    setOnResumeHost(window.location.hostname.toLowerCase() === RESUME_HOST);
  }, []);

  return onResumeHost;
}
