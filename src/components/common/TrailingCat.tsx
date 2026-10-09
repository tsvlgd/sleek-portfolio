'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * The cursor trailing cat, mounted once from the layout.
 *
 * The upstream oneko script hard codes `z-index: 2147483647`, which puts the
 * sprite above everything on the page. A MutationObserver corrects that as soon
 * as the element appears, and again if the script re-applies its inline styles.
 *
 * `pointer-events` is deliberately left alone. Setting it to `none` makes the
 * sprite unclickable, which also makes it undraggable: the script binds its
 * drag handler to mousedown on this element, so it needs to receive pointer
 * events. The sprite is small and the header controls it can sit over are kept
 * clear by the corrected z-index, which drops it below the header.
 *
 * No ring, no fill, no padding. The sprite is decoration and is left exactly as
 * the script draws it.
 */
export function TrailingCat() {
  useEffect(() => {
    const constrain = (node: HTMLElement) => {
      node.style.zIndex = '40';
    };

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement && node.id === 'oneko') {
            constrain(node);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // In case it mounted before this effect ran.
    const existing = document.getElementById('oneko');
    if (existing) constrain(existing);

    return () => observer.disconnect();
  }, []);

  return (
    <Script
      src="/oneko/oneko.js"
      data-cat="/oneko/oneko.gif"
      strategy="afterInteractive"
    />
  );
}
