import { heroEmail } from '@/config/Hero';

/**
 * Resume placeholder.
 *
 * The resume moves to its own domain (`resume.mehfooj.dev`) with a CI pipeline
 * that rebuilds it from the LaTeX source in the ResumeVersions repo on every
 * push. Keeping a second copy here guarantees the two drift apart, so this page
 * intentionally holds no resume content at all — just the hand-off.
 */
export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 sm:pt-9 sm:pb-20">
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        Resume
      </h1>

      <div className="bg-card lift-edge mt-8 overflow-hidden rounded-lg border">
        <div className="border-border/70 flex items-center justify-between border-b px-4 py-2.5">
          <span className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
            ~/resume
          </span>
          <span className="caret text-accent">▊</span>
        </div>
        <div className="space-y-3 px-4 py-5 font-mono text-[13px] leading-relaxed">
          <p className="text-muted-foreground">
            <span className="text-accent">status</span> migrating to a dedicated
            subdomain
          </p>
          <p className="text-muted-foreground">
            <span className="text-accent">source</span>{' '}
            <span className="text-foreground">ResumeVersions</span> (LaTeX)
          </p>
          <p className="text-muted-foreground">
            <span className="text-accent">pipeline</span> push → build →{' '}
            <span className="text-foreground">resume.mehfooj.dev</span>
          </p>
          <p className="text-muted-foreground/60 pt-1">
            <span className="text-foreground/40">note</span> this page stays
            empty on purpose — one source of truth, no drift
          </p>
        </div>
      </div>

      <p className="text-muted-foreground mt-8 text-[15px] leading-7">
        Until that pipeline lands, the fastest way to reach me is{' '}
        <a href={`mailto:${heroEmail}`} className="text-accent hover:underline">
          email
        </a>{' '}
        — I reply to most of it. A concise summary of my work also lives on the{' '}
        <a href="/work-experience" className="text-accent hover:underline">
          work page
        </a>
        .
      </p>
    </div>
  );
}
