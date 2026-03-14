import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getScriptBySlug,
  getAllScriptSlugs,
  CATEGORIES,
  DIFFICULTY_COLORS,
} from "../../../lib/scripts";
import { getUser } from "../../../lib/auth";
import { createClient } from "../../../lib/supabase/server";
import { CopyButton } from "./CopyButton";
import BookmarkButton from "../../../components/BookmarkButton";

// ── Static Params (SSG) ───────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllScriptSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ── Per-page Metadata ─────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const script = await getScriptBySlug(params.slug);
  if (!script) return { title: "Script not found | Forge" };

  const category = CATEGORIES[script.category as keyof typeof CATEGORIES];

  return {
    title: `${script.title} — Termux Shell Script`,
    description: `${script.description} One-line curl install for Termux on Android. Category: ${category?.label}. Difficulty: ${script.difficulty}.`,
    keywords: [
      ...script.tags,
      "Termux script",
      "Android developer",
      `Termux ${script.category}`,
      "shell script Android",
      "curl bash Termux",
      "mobile development",
    ],
    alternates: {
      canonical: `https://forge.brgt.site/vault/${script.slug}`,
    },
    openGraph: {
      title: `${script.title} | Forge Script Vault`,
      description: script.description,
      url: `https://forge.brgt.site/vault/${script.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${script.title} | Forge`,
      description: script.description,
    },
  };
}

// ── JSON-LD ───────────────────────────────────────────
function ScriptJsonLd({
  script,
}: {
  script: Awaited<ReturnType<typeof getScriptBySlug>>;
}) {
  if (!script) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: script.title,
    description: script.description,
    url: `https://forge.brgt.site/vault/${script.slug}`,
    programmingLanguage: {
      "@type": "ComputerLanguage",
      name: "Shell",
    },
    codeRepository: script.github_raw_url,
    runtimePlatform: "Termux (Android)",
    datePublished: script.created_at,
    author: {
      "@type": "Person",
      name: "Bright",
      url: "https://forge.brgt.site",
    },
    keywords: script.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({
  script,
}: {
  script: NonNullable<Awaited<ReturnType<typeof getScriptBySlug>>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://forge.brgt.site" },
      { "@type": "ListItem", position: 2, name: "Script Vault", item: "https://forge.brgt.site/vault" },
      { "@type": "ListItem", position: 3, name: script.title, item: `https://forge.brgt.site/vault/${script.slug}` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Page ──────────────────────────────────────────────
export default async function ScriptPage({
  params,
}: {
  params: { slug: string };
}) {
  const script = await getScriptBySlug(params.slug);
  if (!script) notFound();

  // Check auth + bookmark status
  const user = await getUser();
  let isBookmarked = false;

  if (user) {
    const supabase = createClient();
    const { data } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user.id)
      .eq("script_id", script.id)
      .single();
    isBookmarked = !!data;
  }

  const category = CATEGORIES[script.category as keyof typeof CATEGORIES];
  const diffColor = DIFFICULTY_COLORS[script.difficulty];

  return (
    <>
      <ScriptJsonLd script={script} />
      <BreadcrumbJsonLd script={script} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/vault" className="hover:text-primary transition-colors">Vault</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-text-base">{script.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <section aria-labelledby="script-title" className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm" aria-hidden="true">{category?.icon}</span>
            <span className="text-xs font-mono text-text-muted">{category?.label}</span>
            <span className="text-border">·</span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${diffColor}`}>
              {script.difficulty}
            </span>
          </div>

          {/* Title + Bookmark row */}
          <div className="flex items-start justify-between gap-4">
            <h1
              id="script-title"
              className="font-display font-bold text-3xl sm:text-4xl leading-tight"
            >
              {script.title}
            </h1>
            <div className="shrink-0 mt-1">
              <BookmarkButton
                scriptId={script.id}
                initialBookmarked={isBookmarked}
                isLoggedIn={!!user}
              />
            </div>
          </div>

          <p className="text-text-muted mt-4 text-base leading-relaxed max-w-2xl">
            {script.description}
          </p>

          {/* Tags */}
          {script.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5" aria-label="Tags">
              {script.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-1 bg-surface border border-border rounded text-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Curl install */}
        <section aria-labelledby="install-heading" className="mb-10">
          <h2
            id="install-heading"
            className="font-display font-semibold text-lg mb-3 flex items-center gap-2"
          >
            <span className="text-primary font-mono text-sm">01</span>
            One-line install
          </h2>
          <div className="terminal-block overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="text-xs text-text-muted font-mono">Termux</span>
              <CopyButton text={script.curl_command} label="curl command" />
            </div>
            <div className="p-4">
              <code className="text-sm font-mono text-text-base break-all leading-relaxed bg-transparent p-0">
                <span className="text-primary mr-2">$</span>
                {script.curl_command}
              </code>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2 font-mono">
            Paste directly into Termux and hit Enter.
          </p>
        </section>

        {/* What this script does */}
        <section aria-labelledby="about-heading" className="mb-10">
          <h2
            id="about-heading"
            className="font-display font-semibold text-lg mb-3 flex items-center gap-2"
          >
            <span className="text-primary font-mono text-sm">02</span>
            What this script does
          </h2>
          <div className="surface-card p-5 space-y-3 text-sm text-text-muted leading-relaxed">
            <p>{script.description}</p>
            {script.chipset_compat?.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <span className="text-xs font-mono text-text-faint">Compatible chipsets:</span>
                <div className="flex flex-wrap gap-2">
                  {script.chipset_compat.map((chip) => (
                    <span key={chip} className="text-xs font-mono text-text-muted border border-border px-2 py-0.5 rounded">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Raw script */}
        <section aria-labelledby="raw-heading" className="mb-10">
          <h2
            id="raw-heading"
            className="font-display font-semibold text-lg mb-3 flex items-center gap-2"
          >
            <span className="text-primary font-mono text-sm">03</span>
            View raw script
          </h2>
          <div className="surface-card p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-text-base font-mono">{script.slug}.sh</p>
              <p className="text-xs text-text-muted mt-1">
                Hosted on GitHub — inspect before running
              </p>
            </div>
            <a
              href={script.github_raw_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-mono border border-border text-text-muted rounded-lg hover:border-primary/30 hover:text-primary transition-all whitespace-nowrap"
              aria-label={`View raw ${script.title} script on GitHub`}
            >
              View on GitHub →
            </a>
          </div>
        </section>

        {/* Back */}
        <div className="pt-4 border-t border-border">
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary font-mono transition-colors"
          >
            ← Back to Script Vault
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4 mt-8" role="contentinfo">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">
            forge.brgt.site — built on android ✦
          </p>
        </div>
      </footer>
    </>
  );
  }
        
