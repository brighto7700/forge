import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getGuideBySlug,
  getAllGuideSlugs,
  TRACKS,
  DIFFICULTY_COLORS,
} from "../../lib/guides";

// ── Static Params (SSG) ───────────────────────────────
export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

// ── Per-page Metadata ─────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide not found | Forge" };

  const track = TRACKS[guide.track];

  return {
    title: `${guide.title} — Termux Guide for Android`,
    description: guide.description,
    keywords: [
      ...guide.tags,
      "Termux guide",
      "Android development tutorial",
      `${track?.label} Android`,
      "code on phone",
      "mobile developer guide",
    ],
    alternates: {
      canonical: `https://forge.brgt.site/guides/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.title} | Forge Guides`,
      description: guide.description,
      url: `https://forge.brgt.site/guides/${guide.slug}`,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      tags: guide.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | Forge`,
      description: guide.description,
    },
  };
}

// ── JSON-LD ───────────────────────────────────────────
function GuideJsonLd({
  guide,
}: {
  guide: NonNullable<ReturnType<typeof getGuideBySlug>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    url: `https://forge.brgt.site/guides/${guide.slug}`,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    author: {
      "@type": "Person",
      name: "Bright",
      url: "https://forge.brgt.site",
    },
    keywords: guide.tags.join(", "),
    educationalLevel: guide.difficulty,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://forge.brgt.site",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://forge.brgt.site/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `https://forge.brgt.site/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}

// ── MDX Components ────────────────────────────────────
const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-display font-semibold text-xl text-text-base mt-10 mb-4 flex items-center gap-2 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-display font-semibold text-base text-text-base mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-text-muted text-sm leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-2 mb-4 ml-4">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-2 mb-4 ml-4 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-text-muted text-sm leading-relaxed flex gap-2">
      <span className="text-primary mt-1.5 shrink-0">›</span>
      <span>{children}</span>
    </li>
  ),
  code: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    if (className) {
      return (
        <code className={`${className} text-sm font-mono text-text-base`}>
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/10">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <div className="terminal-block overflow-hidden mb-6">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"
          aria-hidden="true"
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"
          aria-hidden="true"
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#28C840]"
          aria-hidden="true"
        />
        <span className="ml-1 text-xs text-text-muted font-mono">bash</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed border-none bg-transparent">
        {children}
      </pre>
    </div>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-primary/40 pl-4 py-1 my-4 bg-primary/5 rounded-r-lg">
      <div className="text-sm text-text-muted italic">{children}</div>
    </blockquote>
  ),
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
  }) => (
    <a
      href={href}
      className="text-primary hover:underline font-mono text-sm"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-border my-8" />,
};

// ── Page ──────────────────────────────────────────────
export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const track = TRACKS[guide.track];
  const diffColor = DIFFICULTY_COLORS[guide.difficulty];

  return (
    <>
      <GuideJsonLd guide={guide} />

      {/* Nav */}
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <nav
          className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-mono text-primary font-bold text-base"
            aria-label="Forge home"
          >
            forge_
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/guides"
            className="text-text-muted text-sm hover:text-text-base transition-colors"
          >
            guides
          </Link>
          <span className="text-border">/</span>
          <span className="text-text-base text-sm truncate max-w-[160px] sm:max-w-none">
            {guide.slug}
          </span>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/guides"
                className="hover:text-primary transition-colors"
              >
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-base truncate">{guide.title}</li>
          </ol>
        </nav>

        {/* Guide header */}
        <header className="mb-10" aria-labelledby="guide-title">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span aria-hidden="true">{track?.icon}</span>
            <span className="text-xs font-mono text-text-muted">
              {track?.label}
            </span>
            <span className="text-border">·</span>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded border ${diffColor}`}
            >
              {guide.difficulty}
            </span>
            <span className="text-border">·</span>
            <span className="text-xs font-mono text-text-faint">
              {guide.readingTime}
            </span>
          </div>

          <h1
            id="guide-title"
            className="font-display font-bold text-3xl sm:text-4xl leading-tight"
          >
            {guide.title}
          </h1>
          <p className="text-text-muted mt-4 text-base leading-relaxed max-w-2xl">
            {guide.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5" aria-label="Tags">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-1 bg-surface border border-border rounded text-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta bar */}
          <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border text-xs font-mono text-text-faint">
            <span>
              Published{" "}
              {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {guide.updatedAt && (
              <span>
                Updated{" "}
                {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </header>

        {/* MDX Content */}
        <article className="prose-forge max-w-none" aria-label="Guide content">
          <MDXRemote source={guide.content} components={mdxComponents} />
        </article>

        {/* Back nav */}
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary font-mono transition-colors"
          >
            ← All guides
          </Link>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 text-sm text-primary font-mono hover:gap-3 transition-all"
          >
            Browse Script Vault →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-border py-8 px-4 mt-8"
        role="contentinfo"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">
            forge.brgt.site — built on android ✦
          </p>
        </div>
      </footer>
    </>
  );
}
