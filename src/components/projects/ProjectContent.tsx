import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import { ProjectComponents } from './ProjectComponents';

/**
 * Case-study body.
 *
 * `next-mdx-remote/rsc` renders on the server — the article HTML is in the
 * initial response, which keeps the LCP element the actual content rather than
 * an empty shell waiting on a client fetch.
 */
export function ProjectContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-p:text-[15px] prose-p:leading-7 prose-li:text-[15px] prose-li:leading-7 prose-code:text-[13px] prose-pre:rounded-lg mt-10 max-w-none">
      <MDXRemote
        source={content}
        components={ProjectComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
