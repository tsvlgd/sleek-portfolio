'use client';

/**
 * PDF viewer for the resume.
 *
 * pdf.js is loaded through a dynamic import inside an effect rather than a
 * top level import. It is roughly 300 KB and the resume is one route out of
 * five, so a static import would push it into the shared chunk that every page
 * downloads. Dynamic keeps it out of the home page's critical path entirely.
 *
 * Pages are rasterised to canvas rather than embedded in an `<object>`, because
 * the browser's built in viewer cannot be styled, cannot be zoomed from our own
 * controls, and renders a different toolbar on every platform.
 */
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Minus,
  Plus,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The slice of pdf.js this component actually touches. Declaring it
 * structurally keeps the library off the type surface while still failing at
 * compile time if a signature changes.
 */
type RenderTask = { promise: Promise<void>; cancel?: () => void };

type PdfViewport = {
  width: number;
  height: number;
  canvas?: HTMLCanvasElement;
};

type PdfPage = {
  getViewport: (options: { scale: number }) => PdfViewport;
  render: (options: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfViewport;
  }) => RenderTask;
};

type PdfDoc = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
};

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

export function ResumeViewer({ src, title }: { src: string; title: string }) {
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTask = useRef<{ cancel?: () => void } | null>(null);

  // Load the document once. The worker is a static asset served from /public,
  // so it is cached across pages and never re-fetched.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loaded = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) return;
        setDoc(loaded as unknown as PdfDoc);
      } catch {
        if (!cancelled) setError('The resume could not be loaded.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src]);

  // Rasterise the current page at the current scale.
  useEffect(() => {
    if (!doc || !canvasRef.current) return;

    let cancelled = false;

    (async () => {
      const pdfPage = await doc.getPage(page);
      if (cancelled || !canvasRef.current) return;

      // devicePixelRatio keeps the canvas crisp on a retina screen. Without it
      // the text renders visibly soft at any zoom above 1.
      const dpr = window.devicePixelRatio || 1;
      const viewport = pdfPage.getViewport({ scale: scale * dpr });
      const canvas = canvasRef.current;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;

      const context = canvas.getContext('2d');
      if (!context) return;

      // A render already in flight must be cancelled, or two passes fight over
      // the same canvas and the faster one wins with stale output.
      renderTask.current?.cancel?.();
      const task = pdfPage.render({ canvasContext: context, viewport });
      renderTask.current = task;

      try {
        await task.promise;
      } catch {
        // AbortError is expected on every rapid zoom; it is not a failure.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [doc, page, scale]);

  const zoom = useCallback((delta: number) => {
    setScale((current) =>
      Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, Number((current + delta).toFixed(2))),
      ),
    );
  }, []);

  // Keyboard shortcuts, but only while the viewer holds focus, so they do not
  // fire when the user is scrolling the rest of the page.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      zoom(0.25);
    } else if (event.key === '-') {
      event.preventDefault();
      zoom(-0.25);
    } else if (event.key === 'ArrowRight') {
      setPage((p) => Math.min(doc?.numPages ?? 1, p + 1));
    } else if (event.key === 'ArrowLeft') {
      setPage((p) => Math.max(1, p - 1));
    }
  };

  if (error) {
    return (
      <div className="border-border bg-card text-muted-foreground rounded-lg border p-8 text-center text-sm">
        {error}
      </div>
    );
  }

  return (
    <div
      className="border-border bg-card spotlight relative overflow-hidden rounded-lg border"
      tabIndex={0}
      role="group"
      aria-label={`${title} viewer`}
      onKeyDown={onKeyDown}
    >
      {/* Controls */}
      <div className="border-border relative flex flex-wrap items-center justify-between gap-3 border-b px-3 py-2.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => zoom(-0.25)}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex size-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Minus className="size-4" />
          </button>
          <span className="text-muted-foreground min-w-12 text-center font-mono text-xs tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => zoom(0.25)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex size-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {doc && doc.numPages > 1 ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              aria-label="Previous page"
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex size-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-muted-foreground min-w-14 text-center font-mono text-xs tabular-nums">
              {page} / {doc.numPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(doc.numPages, p + 1))}
              disabled={page >= doc.numPages}
              aria-label="Next page"
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex size-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}

        <a
          href={src}
          download="Mehfooj-Alam-Resume.pdf"
          className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors"
        >
          <Download className="size-3.5" />
          Download PDF
        </a>
      </div>

      {/* Canvas */}
      <div className="bg-muted/30 relative flex justify-center overflow-auto p-4">
        {doc ? (
          <canvas
            ref={canvasRef}
            className="bg-background h-auto max-w-full rounded-sm shadow-sm"
            aria-label={`${title}, page ${page}`}
          />
        ) : (
          <div className="text-muted-foreground flex items-center gap-2 py-20 text-sm">
            <Loader2 className="size-4 animate-spin" />
            Loading resume
          </div>
        )}
      </div>

      <p
        className={cn(
          'text-muted-foreground/70 border-border border-t px-3 py-2 font-mono text-[11px]',
        )}
      >
        Use the controls, or + and - to zoom and the arrow keys to change page.
      </p>
    </div>
  );
}
