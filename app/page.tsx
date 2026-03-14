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

// ── Data ──────────────────────────────────────────────
const features = [
  {
    icon: "⚡",
    title: "Script Vault",
    description:
      "A searchable library of battle-tested shell scripts built for Termux. Copy, curl, and run — from Node.js setups to Git automation.",
    href: "/vault",
    tag: "Browse scripts",
  },
  {
    icon: "⚙️",
    title: "One-Tap Configurator",
    description:
      "Pick your runtime, tools, and shell. Get a custom setup.sh you can curl directly into Termux. Your environment, your way.",
    href: "/configurator",
    tag: "Coming soon",
    soon: true,
  },
  {
    icon: "📖",
    title: "Interactive Guides",
    description:
      "Step-by-step walkthroughs for setting up real development environments on Android. From Termux basics to full-stack deploys.",
    href: "/guides",
    tag: "Read guides",
  },
];

const stats = [
  { value: "20+", label: "Shell scripts" },
  { value: "3", label: "Language tracks" },
  { value: "0", label: "Laptops needed" },
];

const tracks = [
  { name: "Node.js", color: "#68A063" },
  { name: "Python", color: "#3776AB" },
  { name: "Go", color: "#00ADD8" },
  { name: "Git workflows", color: "#F05032" },
  { name: "Vercel deploys", color: "#FFFFFF" },
  { name: "API tools", color: "#FF6B6B" },
];

// ── Components ────────────────────────────────────────
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
          forge<span className="animate-blink text-text-muted">_</span>
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
    <div className="terminal-block w-full max-w-xl mx-auto overflow-hidden">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs text-text-muted font-mono">
          termux ~ forge
        </span>
      </div>
      {/* Terminal body */}
      <div className="p-4 space-y-2 text-sm font-mono">
        <div className="flex gap-2">
          <span className="text-primary">$</span>
          <span className="text-text-muted">
            curl forge.brgt.site/setup/node.sh | bash
          </span>
        </div>
        <div className="text-text-muted text-xs space-y-1 pl-4">
          <p>
            <span className="text-primary">✓</span> Updating packages...
          </p>
          <p>
            <span className="text-primary">✓</span> Installing Node.js v20...
          </p>
          <p>
            <span className="text-primary">✓</span> Configuring npm...
          </p>
          <p>
            <span className="text-primary">✓</span> Setting up git...
          </p>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-primary">$</span>
          <span className="text-text-base">
            node --version
            <span className="ml-1 text-primary">v20.11.0</span>
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-primary">$</span>
          <span className="text-text-muted animate-blink">▊</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────
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
          {/* Background effects */}
          <div
            className="absolute inset-0 bg-grid-pattern bg-grid opacity-60 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-hero-glow pointer-events-none"
            aria-hidden="true"
          />

          {/* Badge */}
          <div className="relative z-10 mb-6 opacity-0-init animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Built by a mobile dev, for mobile devs
            </span>
          </div>

          {/* Heading */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1
              id="hero-heading"
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight opacity-0-init animate-fade-up"
            >
              Code on Android.
              <br />
              <span className="text-gradient">Build real things.</span>
            </h1>
            <p className="mt-6 text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto opacity-0-init animate-fade-up animate-delay-100">
              Forge is the developer hub for mobile coders — shell scripts,
              interactive Termux guides, and a one-tap environment configurator.
              No laptop required.
            </p>
          </div>

          {/* CTAs */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3 opacity-0-init animate-fade-up animate-delay-200">
            <Link
              href="/guides"
              className="px-6 py-3 bg-primary text-bg font-display font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all hover:shadow-glow text-center"
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

          {/* Terminal preview */}
          <div className="relative z-10 mt-12 w-full max-w-xl opacity-0-init animate-fade-up animate-delay-300">
            <HeroTerminal />
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-12 flex gap-8 sm:gap-16 opacity-0-init animate-fade-up animate-delay-400">
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
                  className="surface-card p-6 hover:border-primary/20 hover:shadow-glow-sm transition-all group relative"
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
          className="py-16 px-4 bg-surface/30 border-y border-border"
          aria-labelledby="tracks-heading"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2
              id="tracks-heading"
              className="font-display font-semibold text-xl text-text-base mb-8"
            >
              Guides and scripts for every stack
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tracks.map((track) => (
                <span
                  key={track.name}
                  className="px-4 py-2 font-mono text-sm border border-border rounded-full text-text-muted hover:border-primary/30 hover:text-text-base transition-all cursor-default"
                >
                  {track.name}
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
              className="inline-block mt-8 px-8 py-3.5 bg-primary text-bg font-display font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all hover:shadow-glow"
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
            <Link href="/vault" className="hover:text-text-base transition-colors">
              Vault
            </Link>
            <Link href="/guides" className="hover:text-text-base transition-colors">
              Guides
            </Link>
            <Link
              href="/configurator"
              className="hover:text-text-base transition-colors"
            >
              Configurator
            </Link>
            <a
              href="https://github.com/brighto7700"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-base transition-colors"
            >
              GitHub
            </a>
          </nav>
          <p className="text-xs text-text-faint font-mono">
            built on android ✦
          </p>
        </div>
      </footer>
    </>
  );
}
