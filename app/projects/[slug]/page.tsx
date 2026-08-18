import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectBlock } from '@/components/blocks';
import { ArrowLeftIcon } from '@/components/icons';
import { MediaFrame } from '@/components/media';
import { getProject, neighbours, projects } from '@/content';
import { site } from '@/content/site';
import type { Frame } from '@/content/types';
import { pageMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ slug: string }> };

/**
 * One route per case, all prerendered at build time. This replaces ten separate
 * HTML files that a Python post-processor had to keep in sync.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: socialImage(project.hero),
  });
}

/** Social cards need a still, so a video hero contributes its poster frame. */
function socialImage(hero: Frame | undefined): string | undefined {
  if (!hero) return undefined;
  if (hero.kind === 'image') return hero.image.src;
  if (hero.kind === 'video') return hero.video.poster;
  return undefined;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = neighbours(project.slug);

  return (
    <>
      <header
        className={project.heroSplit ? 'project-hero project-hero--split' : 'project-hero'}
      >
        <div className="container">
          <div className="project-hero__body">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">{site.name}</Link>
              <span aria-hidden="true">/</span>
              <span className="current">{project.title}</span>
            </nav>
            <span className="tag">{project.tag}</span>
            <h1>{project.title}</h1>
            <p className="project-summary">{project.summary}</p>
            <p className="meta">{project.meta}</p>
          </div>
          {project.hero ? (
            // The hero is the page's LCP candidate, so it loads eagerly.
            <MediaFrame frame={project.hero} context="hero" eager />
          ) : null}
        </div>
      </header>

      <section className="project-content container">
        {project.blocks.map((block, index) => (
          <ProjectBlock block={block} key={index} />
        ))}

        <div className="project-nav-footer">
          <Link href={`/projects/${previous.slug}`}>
            <ArrowLeftIcon /> {previous.title}
          </Link>
          <Link href={`/projects/${next.slug}`}>{next.title} &rarr;</Link>
        </div>
      </section>
    </>
  );
}
