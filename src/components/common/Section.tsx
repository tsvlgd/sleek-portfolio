import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/**
 * The signature element of the design system: a mono micro-label carrying a
 * section numeral, a hairline, and an optional Japanese word.
 *
 * This is the ONE place the design introduces a new typographic register, which
 * is exactly why it lands — everywhere else stays in the reading voice.
 *
 * Japanese glyphs use the system stack, so no webfont is downloaded to render
 * two characters.
 */
export function SectionLabel({
  index,
  label,
  jp,
  className,
}: {
  index?: string;
  label: string;
  jp?: string;
  className?: string;
}) {
  return (
    <p className={cn('micro-label flex items-center gap-2', className)}>
      {index ? (
        <>
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="text-border">
            —
          </span>
        </>
      ) : null}
      <span>{label}</span>
      {jp ? (
        <span className="micro-label-jp text-muted-foreground/60">{jp}</span>
      ) : null}
    </p>
  );
}

/**
 * Section wrapper: owns the vertical rhythm (generous 間) so no individual
 * section has to remember it.
 *
 * Every section shares ONE content axis. An earlier version let some sections
 * break out to a wider container; the result was two left edges on the page
 * and labels that no longer lined up with each other. One axis reads as
 * deliberate, and 56rem also fits the GitHub grid without a scrollbar.
 */
export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'mx-auto w-full max-w-3xl scroll-mt-20 px-4 pt-10 pb-12 sm:pt-14 sm:pb-16',
        className,
      )}
    >
      {children}
    </section>
  );
}
