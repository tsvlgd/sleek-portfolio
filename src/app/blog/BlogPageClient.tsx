'use client';

import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { BlogPostPreview } from '@/types/blog';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogPageClientProps {
  initialPosts: BlogPostPreview[];
}

const getBlogPostsByTagClient = (
  posts: BlogPostPreview[],
  tag: string,
): BlogPostPreview[] => {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
    ),
  );
};

export function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const searchParams = useSearchParams();

  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Get tag from URL params on mount
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      const filtered = getBlogPostsByTagClient(initialPosts, tagParam);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(initialPosts);
    }
  }, [searchParams, initialPosts]);

  return (
    <Container className="py-16">
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          <BlogList posts={filteredPosts} />
        </div>
      </div>
    </Container>
  );
}
