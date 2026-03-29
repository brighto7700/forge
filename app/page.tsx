import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forge — Code on Android. Build Real Things.",
  description:
    "Shell scripts, Termux setup guides, and a one-tap environment configurator — everything a mobile developer needs to build real software from their phone.",
  alternates: {
    canonical: "https://forge.brgt.site",
  },
};

const features = [
  {
    icon: "⚡",
    title: "Script Vault",
    description:
      "A searchable library of battle-tested shell scripts built for Termux. Copy, curl, and run — from Node.js setups to Git automation.",
    href: "/vault",
    tag: "Browse scripts",
    soon: false,
  },
  {
    icon: "⚙️",
    title: "One-Tap Configurator",
    description:
      "Pick your runtime, tools, and shell. Get a custom setup.sh you can curl directly into Termux. Your environment, your way.",
    href: "/configurator",
    tag: "Test it now",
    soon: false,
  },
  {
    icon: "📖",
    title: "Interactive Guides",
    description:
      "Step-by-step walkthroughs for setting up real development environments on Android. From Termux basics to full-stack deploys.",
    href: "/guides",
    tag: "Read guides",
    soon: false,
  },
];

const stats = [
  { value: "20+", label: "Shell scripts" },
  { value: "3", label: "Language tracks" },
  { value: "0", label: "Laptops needed" },
];

const tracks = [
  "Node.js",
  "Python",
  "Go",
  "Git workflows",
  "Vercel deploys",
  "API tools",
];

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav
        className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono font-bold text-primary text-lg tracking-tight"
          aria-label="Forge home"
        >
          forge<span className="text-text-muted">_</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/vault"
            className="px-3 py-1.5 text-sm text-text-muted hover:text-text-base transition-colors"
          >
            Vault
          </Link>
          <Link
            href="/guides"
            className="px-3 py-1.5 text-sm text-text-muted hover:text-text-base transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/configurator"
            className="px-3 py-1.5 text-sm font-mono bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-all"
          >
            Configurator
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeroTerminal() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: "#666", fontFamily: "monospace" }}>
          termux ~ forge
        </span>
      </div>
      <div style={{ padding: "16px", fontFamily: "monospace", fontSize: 13 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "#00FF94" }}>$</span>
          <span style={{ color: "#666" }}>curl forge.brgt.site/setup/node.sh | bash</span>
        </div>
        <div style={{ paddingLeft: 16, color: "#666", fontSize: 12, lineHeight: "1.8" }}>
          <div><span style={{ color: "#00FF94" }}>✓</span> Updating packages...</div>
          <div><span style={{ color: "#00FF94" }}>✓</span> Installing Node.js v20...</div>
          <div><span style={{ color: "#00FF94" }}>✓</span> Configuring npm...</div>
          <div><span style={{ color: "#00FF94" }}>✓</span> Setting up git...</div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <span style={{ color: "#00FF94" }}>$</span>
          <span style={{ color: "#E8E8E8" }}>
            node --version <span style={{ color: "#00FF94" }}>v20.11.0</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <span style={{ color: "#00FF94" }}>$</span>
          <span style={{ color: "#E8E8E8" }}>▊</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <NavBar />

      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,255,148,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,255,148,0.12), transparent)",
            }}
            aria-hidden="true"
          />

          {/* Badge */}
          <div className="relative z-10 mb-6">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(0,255,148,0.2)",
                background: "rgba(0,255,148,0.05)",
                color: "#00FF94",
                fontSize: 12,
                fontFamily: "monospace",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#00FF94",
                  display: "inline-block",
                }}
              />
              Built by a mobile dev, for mobile devs
            </span>
          </div>

          {/* Heading */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1
              id="hero-heading"
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight"
            >
              Code on Android.
              <br />
              <span className="text-gradient">Build real things.</span>
            </h1>
            <p className="mt-6 text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Forge is the developer hub for mobile coders — shell scripts,
              interactive Termux guides, and a one-tap environment configurator.
              No laptop required.
            </p>
          </div>

          {/* CTAs */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/guides"
              className="px-6 py-3 bg-primary text-bg font-display font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all text-center"
              style={{ color: "#0D0D0D" }}
            >
              Start a guide →
            </Link>
            <Link
              href="/vault"
              className="px-6 py-3 surface-card text-text-base font-display font-semibold text-sm rounded-lg hover:border-primary/30 transition-all text-center"
            >
              Browse the Vault
            </Link>
          </div>

          {/* Terminal */}
          <div className="relative z-10 mt-12 w-full max-w-xl px-4">
            <HeroTerminal />
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-12 flex gap-8 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono font-bold text-2xl text-primary">
                  {stat.value}
                </p>
                <p className="text-text-muted text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section
          className="py-20 px-4 border-t border-border"
          aria-labelledby="features-heading"
        >
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-12">
              <h2
                id="features-heading"
                className="font-display font-bold text-2xl sm:text-3xl"
              >
                Everything you need.{" "}
                <span className="text-gradient">On your phone.</span>
              </h2>
              <p className="text-text-muted mt-3 max-w-md mx-auto text-sm">
                Three tools that cover the full mobile developer workflow — from
                first setup to real deployments.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="surface-card p-6 hover:border-primary/20 transition-all group"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {feature.icon}
                  </span>
                  <h3 className="font-display font-semibold text-lg mt-3 text-text-base">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    {feature.soon ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-text-muted border border-border px-2 py-1 rounded">
                        {feature.tag}
                      </span>
                    ) : (
                      <Link
                        href={feature.href}
                        className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:gap-2 transition-all"
                      >
                        {feature.tag} →
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Language Tracks ── */}
        <section
          className="py-16 px-4 border-y border-border"
          style={{ background: "rgba(22,22,22,0.3)" }}
          aria-labelledby="tracks-heading"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2
              id="tracks-heading"
              className="font-display font-semibold text-xl text-text-base mb-8"
            >
              Guides and scripts for every stack
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {tracks.map((track) => (
                <span
                  key={track}
                  style={{
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    fontSize: 13,
                    border: "1px solid #2A2A2A",
                    borderRadius: 999,
                    color: "#666",
                    display: "inline-block",
                  }}
                >
                  {track}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-24 px-4 text-center"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-2xl mx-auto">
            <p className="font-mono text-primary text-xs tracking-widest uppercase mb-4">
              No laptop. No excuses.
            </p>
            <h2
              id="cta-heading"
              className="font-display font-bold text-3xl sm:text-4xl leading-tight"
            >
              Your phone is a
              <br />
              <span className="text-gradient">development machine.</span>
            </h2>
            <p className="text-text-muted text-sm mt-4 leading-relaxed">
              Start with the Getting Started guide — you&apos;ll have a working
              Termux environment in under 10 minutes.
            </p>
            <Link
              href="/guides/getting-started"
              className="inline-block mt-8 px-8 py-3.5 bg-primary font-display font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all"
              style={{ color: "#0D0D0D" }}
            >
              Get started in 10 minutes →
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-4" role="contentinfo">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-primary font-bold text-sm">
            forge.brgt.site
          </span>
          <nav
            className="flex gap-6 text-xs text-text-muted"
            aria-label="Footer navigation"
          >
            <Link href="/vault" className="hover:text-text-base transition-colors">Vault</Link>
            <Link href="/guides" className="hover:text-text-base transition-colors">Guides</Link>
            <Link href="/configurator" className="hover:text-text-base transition-colors">Configurator</Link>
            <Link href="/privacy" className="hover:text-text-base transition-colors">Privacy</Link>
            <a
              href="https://github.com/brighto7700"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-base transition-colors"
            >
              GitHub
            </a>
          </nav>
          <p className="text-xs text-text-faint font-mono">built on android ✦</p>
        </div>
      </footer>
    </>
  );
        }
          
