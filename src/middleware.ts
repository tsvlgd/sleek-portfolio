import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * The repository is deployed twice from one build: mehfooj.dev and
 * resume.mehfooh.dev. Same code, different job, so the difference is decided
 * here by hostname rather than by an environment flag that has to be set in the
 * right place and remembered.
 *
 * On the resume host every page route resolves to /resume. Done as a rewrite
 * rather than a redirect so the address bar keeps the bare hostname, with no
 * round trip and no flash of the home page on the way past.
 *
 * Static assets and the API are matched out and left alone. Without that
 * exclusion this would rewrite the PDF and the pdf.js worker to an HTML page
 * and the viewer would silently stop rendering.
 */

/**
 * Routes and files the resume host must serve as themselves.
 *
 * Matched as a plain prefix, not as "equals or slash". `/pdf.worker` looked
 * correct but rewrote `/pdf.worker.min.mjs`, which silently replaced the pdf.js
 * worker with an HTML page and left the viewer blank with no error to trace it
 * to.
 */
const PASSTHROUGH = [
  '/api',
  '/_next',
  '/resume',
  '/pdf.worker',
  '/meta',
  '/assets',
  '/oneko',
  '/favicon',
  '/robots',
  '/sitemap',
  '/manifest',
];

export const RESUME_HOST = 'resume.mehfooj.dev';

/**
 * The raw Host header rather than `nextUrl.hostname`.
 *
 * `nextUrl` is rebuilt against the deployment's own URL, so in local dev it
 * reports localhost no matter what Host the request carries. That made the
 * middleware look broken when it was fine, and would have made it impossible to
 * exercise the resume host before deploying. The header is what Vercel sets from
 * the incoming request, so it is the value that actually distinguishes the hosts
 * in production.
 */
function hostnameOf(request: NextRequest): string {
  const host = request.headers.get('host') ?? '';
  // Strip the port, which is present locally and absent in production.
  return host.split(':')[0].toLowerCase();
}

export function middleware(request: NextRequest) {
  if (hostnameOf(request) !== RESUME_HOST) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const passesThrough = PASSTHROUGH.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (passesThrough) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/resume';
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals and obvious static files. The middleware
  // does the fine grained routing, so this stays broad on purpose: a path that
  // escapes the matcher would render the full site on the resume host, which is
  // the one outcome worth being strict about.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
