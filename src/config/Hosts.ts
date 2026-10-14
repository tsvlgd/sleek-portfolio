/**
 * The two hosts one build is served from.
 *
 * `mehfooj.dev` is the site. `resume.mehfooj.dev` serves the resume and nothing
 * else: the middleware rewrites every page route there to `/resume`, which is
 * what makes a bare `resume.mehfooj.dev` address in an email render as a resume.
 *
 * The consequence, and the reason this file exists, is that a site path is not
 * a safe link on the resume host. `/` and `/projects` are not shorter routes to
 * the same page, they are links that go nowhere: the rewrite turns both back into
 * the resume. Anything pointing at the site has to leave the host.
 */
export const SITE_ORIGIN = 'https://mehfooj.dev';

export const RESUME_HOST = 'resume.mehfooj.dev';

/**
 * Resolve an href for the host the visitor is actually on.
 *
 * Relative paths are prefixed with the main origin when that is not the host
 * being served. Absolute URLs pass through untouched, so external links and the
 * resume's own origin keep working exactly as written.
 */
export function resolveHref(href: string, onResumeHost: boolean): string {
  if (!onResumeHost || !href.startsWith('/')) return href;
  return `${SITE_ORIGIN}${href}`;
}
