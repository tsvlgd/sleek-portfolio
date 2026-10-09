import { projects } from '@/config/Projects';
import {
  ProjectCaseStudy,
  ProjectCaseStudyFrontmatter,
  ProjectCaseStudyPreview,
} from '@/types/project';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const projectsDirectory = path.join(process.cwd(), 'src/data/projects');

/**
 * Read from disk with `fs` — server-only. Importing this from a `'use client'`
 * component breaks the build.
 */
export function getProjectCaseStudySlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getProjectCaseStudyBySlug(
  slug: string,
): ProjectCaseStudy | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
    const frontmatter = data as ProjectCaseStudyFrontmatter;

    if (!frontmatter.title || !frontmatter.description) return null;

    return { slug, frontmatter, content };
  } catch (error) {
    console.error(`Error reading project case study ${slug}:`, error);
    return null;
  }
}

export function getAllProjectCaseStudies(): ProjectCaseStudyPreview[] {
  return getProjectCaseStudySlugs()
    .map((slug) => getProjectCaseStudyBySlug(slug))
    .filter((cs): cs is ProjectCaseStudy => cs !== null)
    .sort((a, b) => {
      // Featured first, then alphabetical — deterministic across builds.
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}

export function getPublishedProjectCaseStudies(): ProjectCaseStudyPreview[] {
  return getAllProjectCaseStudies().filter((cs) => cs.frontmatter.isPublished);
}

/** Every project in the catalogue, enriched with its case-study body if one exists. */
export function getProjects() {
  return projects.map((project) => ({
    ...project,
    caseStudy: project.details ? getProjectCaseStudyBySlug(project.slug) : null,
  }));
}

/**
 * Prev/next on a case study follows the order of the `projects` array in
 * `src/config/Projects.tsx` — so reordering the config silently changes
 * case-study navigation. Keep the two intentional.
 */
export function getProjectNavigation(currentSlug: string): {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
} {
  const detailed = projects.filter((p) => p.details);
  const index = detailed.findIndex((p) => p.slug === currentSlug);

  if (index === -1) return { previous: null, next: null };

  const build = (p?: (typeof projects)[number]) =>
    p ? { title: p.title, slug: p.slug } : null;

  return {
    previous: build(detailed[index - 1]),
    next: build(detailed[index + 1]),
  };
}

/** Related by shared stack, excluding the current project. */
export function getRelatedProjects(currentSlug: string, max = 2) {
  const current = projects.find((p) => p.slug === currentSlug);
  if (!current) return [];

  return projects
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      project: p,
      overlap: p.stack.filter((tech) => current.stack.includes(tech)).length,
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, max)
    .map((entry) => entry.project);
}
