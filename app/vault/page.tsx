import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllScripts,
  CATEGORIES,
  DIFFICULTY_COLORS,
  type Script,
  type Category,
} from "@/lib/scripts";

// ── SEO ───────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Script Vault — Shell Scripts for Termux & Android Development",
  description:
    "A searchable library of shell scripts built for Termux. One-line curl installs for Node.js, Python, Go, Git workflows, and more — optimized for Android.",
  keywords: [
    "Termux shell scripts",
    "Termux setup scripts",
    "Android developer scripts",
    "curl bash Termux",
    "Termux automation scripts",
    "mobile development scripts",
  ],
  alternates: {
    canonical: "https://forge.brgt.site/vault",
  },
  openGraph: {
    title: "Script Vault — Shell Scripts for Termux & Android",
    description:
      "Browse and copy battle-tested shell scripts for your Termux environment.",
    url: "https://forge.brgt.site/vault",
  },
};

// ── JSON-LD ───────────────────────────────────────────
function VaultJsonLd({ scripts }: { scripts: Script[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forge Script Vault",
    description:
      "Shell scripts and automation tools for Android developers using Termux",
    url: "https://forge.brgt.site/vault",
    numberOfItems: scripts.length,
    hasPart: scripts.slice(0, 10).map((s) => ({
      "@type": "SoftwareSourceCode",
      name: s.title,
      description: s.description,
      url: `https://forge.brgt.site/vault/${s.slug}`,
      programmingLanguage: "Shell",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Script Card ───────────────────────────────────────
function ScriptCard({ script }: { script: Script }) {
  const category = CATEGORIES[script.category as Category];
  const diffColor = DIFFICULTY_COLORS[script.difficulty];

  return (
    <article className="surface-card p-5 hover:border-primary/20 hover:shadow-glow-sm transition-all group flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">
            {category?.icon ?? "📄"}
          </span>
          <span className="text-xs text-text-muted font-mono">
            {category?.label ?? script.category}
          </span>
        </div>
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded border ${diffColor}`}
          aria-label={`Difficulty: ${script.difficulty}`}
        >
          {script.difficulty}
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h2 className="font-display font-semibold text-base text-text-base group-hover:text-primary transition-colors">
          <Link href={`/vault/${script.slug}`} className="hover:underline">
            {script.title}
          </Link>
        </h2>
        <p className="text-text-muted text-sm mt-1 leading-relaxed line-clamp-2">
          {script.description}
        </p>
      </div>

      {/* Curl command preview */}
      <div className="terminal-block px-3 py-2 text-xs font-mono text-text-muted truncate">
        <span className="text-primary mr-2">$</span>
        {script.curl_command}
      </div>

      {/* Tags */}
      {script.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1" aria-label="Tags">
          {script.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 bg-surface border border-border rounded text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-border mt-auto">
        <div className="flex flex-wrap gap-1">
          {script.chipset_compat?.slice(0, 2).map((chip) => (
            <span key={chip} className="text-xs text-text-faint font-mono">
              {chip}
            </span>
          ))}
        </div>
        <Link
          href={`/vault/${script.slug}`}
          className="text-xs text-primary font-mono hover:gap-2 transition-all flex items-center gap-1"
          aria-label={`View ${script.title}`}
        >
          View →
        </Link>
      </div>
    </article>
  );
}

// ── Empty State ───────────────────────────────────────
function EmptyState() {
  return (
    <div className="col-span-full text-center py-20">
      <p className="text-4xl mb-4" aria-hidden="true">
        📭
      </p>
      <p className="font-display font-semibold text-text-base">
        No scripts yet
      </p>
      <p className="text-text-muted text-sm mt-2">
        The vault is being stocked — check back soon.
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────
export default async function VaultPage() {
  const scripts = await getAllScripts();

  // Group by category for display
  const grouped = scripts.reduce<Record<string, Script[]>>((acc, script) => {
    if (!acc[script.category]) acc[script.category] = [];
    acc[script.category].push(script);
    return acc;
  }, {});

  return (
    <>
      <VaultJsonLd scripts={scripts} />

      {/* Nav */}
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <nav
          className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-mono text-primary font-bold text-base mr-2"
            aria-label="Forge home"
          >
            forge_
          </Link>
          <span className="text-border">|</span>
          <span className="text-text-base text-sm font-display font-medium">
            Script Vault
          </span>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page header */}
        <section aria-labelledby="vault-heading" className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              Script Vault
            </span>
            <span className="font-mono text-xs text-text-muted border border-border px-2 py-0.5 rounded">
              {scripts.length} scripts
            </span>
          </div>
          <h1
            id="vault-heading"
            className="font-display font-bold text-3xl sm:text-4xl"
          >
            Shell scripts for{" "}
            <span className="text-gradient">mobile devs.</span>
          </h1>
          <p className="text-text-muted mt-3 max-w-lg text-sm leading-relaxed">
            Copy a single <code>curl</code> command and run it in Termux.
            Every script is tested, documented, and optimized for Android
            chipsets.
          </p>
        </section>

        {/* Category filter */}
        <nav
          className="flex flex-wrap gap-2 mb-10"
          aria-label="Filter by category"
        >
          <Link
            href="/vault"
            className="px-3 py-1.5 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded-md"
          >
            All ({scripts.length})
          </Link>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = grouped[key]?.length ?? 0;
            if (count === 0) return null;
            return (
              <Link
                key={key}
                href={`/vault?category=${key}`}
                className="px-3 py-1.5 text-xs font-mono surface-card text-text-muted hover:text-text-base hover:border-primary/20 transition-all rounded-md"
              >
                {cat.icon} {cat.label} ({count})
              </Link>
            );
          })}
        </nav>

        {/* Scripts grid */}
        {scripts.length === 0 ? (
          <div className="grid">
            <EmptyState />
          </div>
        ) : (
          Object.entries(grouped).map(([category, categoryScripts]) => {
            const cat = CATEGORIES[category as Category];
            return (
              <section
                key={category}
                className="mb-12"
                aria-labelledby={`category-${category}`}
              >
                <h2
                  id={`category-${category}`}
                  className="font-display font-semibold text-lg mb-4 flex items-center gap-2"
                >
                  <span aria-hidden="true">{cat?.icon}</span>
                  {cat?.label ?? category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryScripts.map((script) => (
                    <ScriptCard key={script.id} script={script} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-8" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">
            forge.brgt.site — built on android ✦
          </p>
        </div>
      </footer>
    </>
  );
}
