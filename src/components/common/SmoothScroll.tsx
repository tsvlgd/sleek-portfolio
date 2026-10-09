'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type ScrollContextValue = {
  /** 0 at the top of the document, 1 at the bottom. */
  progress: number;
  scrollToId: (id: string) => void;
  scrollToTop: () => void;
};

const ScrollContext = createContext<ScrollContextValue>({
  progress: 0,
  scrollToId: () => {},
  scrollToTop: () => {},
});

export const useScroll = () => useContext(ScrollContext);

/**
 * Scroll handling: **native, no smooth scroll library.**
 *
 * The previous setup used Lenis. It intercepted the wheel event, called
 * preventDefault, and then failed to apply the scroll, which left the page
 * completely unscrollable with a mouse or trackpad. That is a worse failure
 * than the mild friction it was meant to remove.
 *
 * Native scrolling is also what ramx.in, the reference for this site's feel,
 * ships: no scroll library, no virtual scroll, no rAF loop competing with the
 * page. CSS `scroll-behavior: smooth` handles anchors.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };

    // Passive listener, and the state write is coalesced into one rAF so a
    // scroll never queues more than a single React update per frame.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    // -72 clears the sticky header without a magic offset per call site.
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <ScrollContext.Provider value={{ progress, scrollToId, scrollToTop }}>
      {children}
    </ScrollContext.Provider>
  );
}
