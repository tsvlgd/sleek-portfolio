'use client';

import { heroConfig, socialLinks } from '@/config/Hero';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { AnimateInView } from '../common/AnimateInView';

/**
 * The portrait turns toward the cursor.
 *
 * ramx.in solves this with a 3x3 sprite sheet and swaps `background-position`
 * so the character's head genuinely faces the pointer. A photograph has no such
 * frames, so this approximates the read with three parts instead of one flat
 * tilt:
 *
 *  - the rotation pivots near the head rather than the centre of the frame, so
 *    it looks like the neck turning and not the whole card tipping
 *  - the image slides a few pixels toward the pointer, which is what sells the
 *    illusion, since a pure rotation reads as a tilt of a flat object
 *  - the magnitude eases off with distance, so a cursor at the far edge of a
 *    wide screen does not slam it into an extreme angle
 *
 * Driven from ONE rAF. Writing a style per pointermove event would schedule work
 * faster than the display can paint.
 */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No hover on touch, so there is nothing to track.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const apply = (x: number, y: number) => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Direction, saturating about two and a half portrait widths out.
      const clamp = (n: number) => Math.max(-1, Math.min(1, n));
      // Saturates one portrait width out, so a cursor anywhere near the face
      // reaches full deflection and the turn is actually visible. Past that the
      // direction stops changing and only the weight term below fades it back.
      const dx = clamp((x - cx) / rect.width);
      const dy = clamp((y - cy) / rect.height);

      // Magnitude, scaled by how close the cursor is. Without this the portrait
      // pins at its extreme angle for most of a wide screen and the effect reads
      // as broken rather than responsive. Close is full strength; far is a third
      // of it, which still points the head at the cursor.
      const reach = rect.width * 9;
      const near = Math.hypot(x - cx, y - cy) / reach;
      const weight = 0.35 + 0.65 * (1 - clamp(near));

      const ex = dx * weight;
      const ey = dy * weight;

      node.style.setProperty('--rx', `${-ey * 9}deg`);
      node.style.setProperty('--ry', `${ex * 13}deg`);
      // The lean. Rotation alone reads as tipping a flat photograph.
      node.style.setProperty('--lx', `${ex * 5}px`);
      node.style.setProperty('--ly', `${ey * 3}px`);
    };

    const reset = () => {
      frame.current = 0;
      node.style.setProperty('--rx', '0deg');
      node.style.setProperty('--ry', '0deg');
      node.style.setProperty('--lx', '0px');
      node.style.setProperty('--ly', '0px');
    };

    const onMove = (event: PointerEvent) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() =>
        apply(event.clientX, event.clientY),
      );
    };

    const onLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      reset();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="portrait group/avatar relative size-20 shrink-0 select-none sm:size-24"
      style={
        {
          '--rx': '0deg',
          '--ry': '0deg',
          '--lx': '0px',
          '--ly': '0px',
        } as React.CSSProperties
      }
    >
      <div className="portrait-inner relative size-22">
        <Image
          src={heroConfig.avatar}
          alt={heroConfig.name}
          fill
          priority
          sizes="96px"
          className="object-contain object-top"
        />
        {/*
          Dark mode only. On paper the cutout reads cleanly against the
          background, but the source photo is dark and on a near black page it
          dissolves, so the ring is what keeps the silhouette legible there.
          Nothing is drawn in light mode, where it would only add a box.
        */}
        <span aria-hidden="true" className="portrait-ring" />
      </div>
    </div>
  );
}

/** Email with a copy affordance, the way ramx.in presents it in the hero. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(heroConfig.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.location.href = `mailto:${heroConfig.email}`;
        }
      }}
      className="group/mail text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      aria-label={`Copy email address ${heroConfig.email}`}
    >
      <span className="font-mono">{heroConfig.email}</span>
      {/* Always visible rather than hover only: touch has no hover, so a
          hover-revealed affordance would be invisible to half the visitors. */}
      {copied ? (
        <Check className="text-foreground size-3.5" />
      ) : (
        <Copy className="size-3.5 opacity-50 transition-opacity group-hover/mail:opacity-100" />
      )}
    </button>
  );
}

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-7 pb-8 sm:pt-11">
      <AnimateInView>
        <div className="flex items-center gap-5">
          <Portrait />

          <div className="min-w-0">
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              {heroConfig.name}
            </h1>
            <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
              <span>{heroConfig.title}</span>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <CopyEmail />
            </div>
          </div>
        </div>
      </AnimateInView>

      <AnimateInView style={{ '--i': 1 } as React.CSSProperties}>
        <p className="text-foreground mt-8 max-w-xl text-lg leading-relaxed font-medium tracking-tight sm:text-xl sm:leading-[1.6]">
          {heroConfig.statement}
        </p>
      </AnimateInView>

      <AnimateInView style={{ '--i': 2 } as React.CSSProperties}>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href="/projects"
            className="group bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            See the work
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="ml-1 flex items-center gap-1.5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.name}
                className="glass-button text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 [&>svg]:size-3.5"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </AnimateInView>
    </section>
  );
}
