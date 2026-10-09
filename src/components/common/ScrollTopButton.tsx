'use client';

import { ArrowUp } from 'lucide-react';

import { useScroll } from './SmoothScroll';

const RADIUS = 13;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Fixed scroll to top with a progress ring, pinned bottom right.
 *
 * The ring is driven by the shared scroll context, which coalesces updates into
 * a single rAF, so following the pointer costs one style write per frame at
 * most and never a layout read.
 *
 * Hidden until there is somewhere to scroll back to, and the label is not
 * rendered twice for screen readers: the button itself is the control.
 */
export function ScrollTopButton() {
  const { progress, scrollToTop } = useScroll();
  const visible = progress > 0.02;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="glass-button group text-foreground fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 sm:right-8 sm:bottom-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) scale(1)'
          : 'translateY(8px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg
        viewBox="0 0 32 32"
        className="absolute size-11 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="16"
          cy="16"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        <circle
          cx="16"
          cy="16"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative size-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
