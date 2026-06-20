import { BlogPostPreview } from '@/types/blog';
import { Clock } from 'lucide-react';

import { TrackedLink } from '../common/TrackedLink';
import Calender from '../svgs/Calender';

export function BlogCard({ post }: { post: BlogPostPreview }) {
  const { slug, frontmatter } = post;
  const { title, description, date, tags, readingTime } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="border-border/40 flex flex-col gap-1.5 border-b pb-6 last:border-0 last:pb-0">
      <TrackedLink href={`/blog/${slug}`} className="group block">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
      </TrackedLink>

      <p className="text-muted-foreground text-[13px] leading-relaxed">
        {description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-muted/50 text-muted-foreground rounded-md px-2 py-0.5 text-[10px] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-muted-foreground mt-3 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calender className="size-3.5 opacity-70" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          {readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 opacity-70" />
              <span>{readingTime} min read</span>
            </div>
          )}
        </div>
        <TrackedLink
          href={`/blog/${slug}`}
          className="hover:text-foreground flex items-center gap-1 transition-colors"
        >
          Read more <span className="ml-0.5 text-xs">→</span>
        </TrackedLink>
      </div>
    </div>
  );
}
