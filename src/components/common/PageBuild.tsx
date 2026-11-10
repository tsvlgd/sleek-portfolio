'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * First visit intro: named cursors draw the home page, then dissolve into the
 * real thing. Engine is `public/swarm-engine.js`
 * (TejasLamba2006/swarm-page-builder, MIT, see swarm-engine.LICENSE.txt).
 *
 * Deliberately narrow:
 *  - Home page only. The resume, case studies and the PDF viewer never get a
 *    15 second intro in front of them.
 *  - Never on the resume host, which serves `/` as the resume.
 *  - Once per browser session (the engine records this in sessionStorage; the
 *    inline script in layout.tsx reads the same key to raise the cover).
 *  - Skipped under `prefers-reduced-motion`, as DESIGN.md requires.
 *
 * Failure mode: if the engine fails to load, the cover is removed and the
 * page is simply shown.
 */
const STORAGE_KEY = 'portfolio-built-paths-v1';

type Engine = { start(): void; abort(): void };
type W = Window & { __swarmRebuild?: Engine };

let loading: Promise<Engine | null> | null = null;

function loadEngine(): Promise<Engine | null> {
  const w = window as W;
  if (w.__swarmRebuild) return Promise.resolve(w.__swarmRebuild);
  loading ??= new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = '/swarm-engine.js';
    s.onload = () => resolve(w.__swarmRebuild ?? null);
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
  return loading;
}

function alreadyBuilt(path: string) {
  try {
    const v = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(v) && v.includes(path);
  } catch {
    return false;
  }
}

export function PageBuild() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const eligible =
      pathname === '/' &&
      !location.hostname.startsWith('resume.') &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !alreadyBuilt(pathname);

    if (!eligible) {
      root.removeAttribute('data-swarm-init');
      root.removeAttribute('data-swarm-building');
      return;
    }

    let dead = false;
    // Lets the page paint under the cover; the engine waits on fonts itself.
    const t = setTimeout(async () => {
      const engine = await loadEngine();
      if (dead || !engine) return root.removeAttribute('data-swarm-init');
      engine.start();
    }, 60);

    return () => {
      dead = true;
      clearTimeout(t);
      (window as W).__swarmRebuild?.abort();
    };
  }, [pathname]);

  return null;
}
