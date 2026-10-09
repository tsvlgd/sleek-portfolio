'use client';

import { cn } from '@/lib/utils';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

type AnimateInViewProps = {
  children: ReactNode;
  className?: string;
  /** Negative bottom margin: reveal once the element is this far INTO view. */
  rootMargin?: string;
  as?: 'div' | 'section' | 'li' | 'article';
  /** Used to drive the stagger index: `style={{ '--i': index }}`. */
  style?: CSSProperties;
};

/**
 * One-shot scroll reveal.
 *
 * Fires a CSS animation, then the observer disconnects. Deliberately not
 * re-triggered on scroll-up: re-running entrance animations while the user
 * scrolls back is the single most common cause of "janky" feeling sites.
 *
 * Costs zero animation-library bytes — a class toggle is the whole mechanism.
 */
export function AnimateInView({
  children,
  className,
  rootMargin = '0px 0px -40px 0px',
  as: Tag = 'div',
  style,
}: AnimateInViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    // No observer support (or reduced motion): show content immediately rather
    // than leaving it permanently at opacity 0.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return (
    <Tag
      // The polymorphic `Tag` union gives TS an intersection of element ref
      // types; a single HTMLElement ref is the only thing we actually need.
      ref={ref as unknown as React.Ref<never>}
      style={style}
      className={cn('animate-in-up-on-view', inView && 'in-view', className)}
    >
      {children}
    </Tag>
  );
}
