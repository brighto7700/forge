import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides, TRACKS, DIFFICULTY_COLORS, type GuideMeta } from "@/lib/guides";

// ── SEO ───────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Guides — How to Code on Android with Termux",
  description:
    "Step-by-step guides for setting up development environments on Android. Learn Termux, install Node.js, Python, Go, and deploy real apps — all from your phone.",
  keywords: [
    "how to code on Android",
    "Termux tutorial",
    "Android development guide",
    "code on phone tutorial",
    "Termux beginner guide",
    "mobile developer walkthrough",
    "programming Android no laptop",
    "Termux Node.js tutorial",
    "Termux Python tutorial",
  ],
  alternates: {
    canonical: "https://forge.brgt.site/guides",
  },
  openGraph: {
    title: "Guides — How to Code on Android with Termux",
    description:
      "Step-by-step walkthroughs for every part of the mobile dev workflow.",
    url: "https://forge.brgt.site/guides",
  },
};

// ── JSON-LD ───────────────────────────────────────────
function GuidesJsonLd({ guides }: { guides: GuideMeta[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forge Guides",
    description:
      "Interactive development guides for mobile developers using Termux on Android",
    url: "https://forge.brgt.site/guides",
    numberOfItems: guides.length,
    hasPart: guides.map((g) => ({
      "@type": "HowTo",
      name: g.title,
      description: g.description,
      url: `https://forge.brgt.site/guides/${g.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Guide Card ────────────────────────────────────────
function GuideCard({ guide }: { guide: GuideMeta }) {
  const track = TRACKS[guide.track];
  const diffColor = DIFFICULTY_COLORS[guide.difficulty];

  return (
    <article className="surface-card p-5 hover:border-primary/20 hover:shadow-glow-sm transition-all group flex flex-col gap-3">
      {/* Track + reading time */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">{track?.icon}</span>
          <span className="text-xs font-mono text-text-muted">{track?.label}</span>
        </div>
        <span className="text-xs font-mono text-text-faint">{guide.readingTime}</span>
      </div>

      {/* Title + description */}
      <div>
        <h2 className="font-display font-semibold text-base text-text-base group-hover:text-primary transition-colors leading-snug">
          <Link href={`/guides/${guide.slug}`} className="hover:underline">
            {guide.title}
          </Link>
        </h2>
        <p className="text-text-muted text-sm mt-1.5 leading-relaxed line-clamp-2">
          {guide.description}
        </p>
      </div>

      {/* Tags */}
      {guide.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1" aria-label="Tags">
          {guide.tags.slice(0, 3).map((tag) => (
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
      <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${diffColor}`}>
          {guide.difficulty}
        </span>
        <Link
          href={`/guides/${guide.slug}`}
          className="text-xs font-mono text-primary flex items-center gap-1 hover:gap-2 transition-all"
          aria-label={`Read ${guide.title}`}
        >
          Read guide →
        </Link>
      </div>
    </article>
  );
}

// ── Empty track ───────────────────────────────────────
function ComingSoonCard({ track }: { track: string }) {
  const t = TRACKS[track as keyof typeof TRACKS];
  return (
    <div className="surface-card p-5 border-dashed opacity-50 flex items-center gap-3">
      <span className="text-xl" aria-hidden="true">{t?.icon}</span>
      <div>
        <p className="text-sm font-display text-text-muted">More {t?.label} guides coming soon</p>
        <p className="text-xs text-text-faint mt-0.5">{t?.description}</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────
export default function GuidesPage() {
  const guides = getAllGuides();

  const grouped = guides.reduce<Record<string, GuideMeta[]>>((acc, guide) => {
    if (!acc[guide.track]) acc[guide.track] = [];
    acc[guide.track].push(guide);
    return acc;
  }, {});

  return (
    <>
      <GuidesJsonLd guides={guides} />

      {/* Nav */}
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <nav
          className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4"
          aria-label="Main navigation"
        >
          <Link href="/" className="font-mono text-primary font-bold text-base mr-2" aria-label="Forge home">
            forge_
          </Link>
          <span className="text-border">|</span>
          <span className="text-text-base text-sm font-display font-medium">Guides</span>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* Page header */}
        <section aria-labelledby="guides-heading" className="mb-12">
          <div className="mb-3">
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              Interactive Guides
            </span>
          </div>
          <h1
            id="guides-heading"
            className="font-display font-bold text-3xl sm:text-4xl"
          >
            Learn to code on Android.{" "}
            <span className="text-gradient">Step by step.</span>
          </h1>
          <p className="text-text-muted mt-3 max-w-lg text-sm leading-relaxed">
            Every guide is written by a mobile developer who actually uses these
            workflows daily. No laptop assumed, no shortcuts skipped.
          </p>

          {/* Track overview */}
          <div className="flex flex-wrap gap-3 mt-6">
            {Object.entries(TRACKS).map(([key, track]) => (
              <a
                key={key}
                href={`#${key}`}
                className="flex items-center gap-2 px-3 py-1.5 surface-card text-xs font-mono text-text-muted hover:text-text-base hover:border-primary/20 transition-all rounded-lg"
              >
                <span aria-hidden="true">{track.icon}</span>
                {track.label}
              </a>
            ))}
          </div>
        </section>

        {/* Guides by track */}
        {Object.entries(TRACKS).map(([trackKey, track]) => {
          const trackGuides = grouped[trackKey] ?? [];
          return (
            <section
              key={trackKey}
              id={trackKey}
              aria-labelledby={`track-${trackKey}`}
              className="mb-14 scroll-mt-20"
            >
              <header className="flex items-start justify-between mb-5">
                <div>
                  <h2
                    id={`track-${trackKey}`}
                    className="font-display font-semibold text-xl flex items-center gap-2"
                  >
                    <span aria-hidden="true">{track.icon}</span>
                    {track.label}
                  </h2>
                  <p className="text-text-muted text-sm mt-1">{track.description}</p>
                </div>
                <span className="font-mono text-xs text-text-faint border border-border px-2 py-1 rounded mt-1">
                  {trackGuides.length} guide{trackGuides.length !== 1 ? "s" : ""}
                </span>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trackGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
                {trackGuides.length === 0 && (
                  <ComingSoonCard track={trackKey} />
                )}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-4" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">
            forge.brgt.site — built on android ✦
          </p>
        </div>
      </footer>
    </>
  );
}
