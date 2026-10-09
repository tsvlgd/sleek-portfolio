export interface ProjectCaseStudyFrontmatter {
  title: string;
  description: string;
  /** Optional: case studies are typographic by default, no screenshot required. */
  image?: string;
  tagline?: string;
  period?: string;
  role?: string;
  stack?: string[];
  status?: 'live' | 'active' | 'building' | 'wip';
  github?: string;
  live?: string;
  featured?: boolean;
  challenges?: string[];
  learnings?: string[];
  isPublished: boolean;
}

export interface ProjectCaseStudy {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export interface ProjectCaseStudyPreview {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
}
