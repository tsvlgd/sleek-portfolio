'use client';

import { useEffect } from 'react';

/**
 * One pointer listener for the whole page.
 *
 * Writes the cursor position into a CSS custom property on the hovered card, so
 * the spotlight is pure CSS and no card holds its own listener. Skipped
 * entirely for coarse pointers, where there is no hover to respond to.
 */
export function SpotlightProvider() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    let frame = 0;
    let last: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!last) return;
      last.el.style.setProperty('--spot-x', `${last.x}px`);
      last.el.style.setProperty('--spot-y', `${last.y}px`);
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const card = target?.closest('.spotlight') as HTMLElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      last = {
        el: card,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return null;
}
