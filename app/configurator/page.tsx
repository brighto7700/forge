import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "One-Tap Configurator — Coming Soon",
  description:
    "Pick your runtime, tools, and shell. Get a custom setup.sh you can curl directly into Termux. Coming soon to Forge.",
  alternates: {
    canonical: "https://forge.brgt.site/configurator",
  },
};

export default function ConfiguratorPage() {
  return (
    <>
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <nav
          className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4"
          aria-label="Main navigation"
        >
          <Link href="/" className="font-mono text-primary font-bold text-base mr-2" aria-label="Forge home">
            forge_
          </Link>
          <span className="text-border">|</span>
          <span className="text-text-base text-sm font-display font-medium">Configurator</span>
        </nav>
      </header>

      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            border: "1px solid rgba(0,255,148,0.2)",
            background: "rgba(0,255,148,0.05)",
            color: "#00FF94", fontSize: 12, fontFamily: "monospace", marginBottom: 24,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF94", display: "inline-block" }} />
          Phase 2 — In progress
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight max-w-lg">
          One-Tap <span className="text-gradient">Configurator</span>
        </h1>

        <p className="text-text-muted text-sm mt-4 max-w-md leading-relaxed">
          Pick your runtime, tools, and shell preference. Get a fully custom{" "}
          <code>setup.sh</code> you can curl straight into Termux. No manual config. No guesswork.
        </p>

        <div className="terminal-block mt-10 w-full max-w-sm text-left" aria-hidden="true">
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid #2A2A2A" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
            <span style={{ marginLeft: 8, fontSize: 11, color: "#666", fontFamily: "monospace" }}>configurator preview</span>
          </div>
          <div style={{ padding: 16, fontFamily: "monospace", fontSize: 12, color: "#666", lineHeight: 2 }}>
            <div><span style={{ color: "#00FF94" }}>?</span> Runtime: <span style={{ color: "#E8E8E8" }}>Node.js</span></div>
            <div><span style={{ color: "#00FF94" }}>?</span> Version: <span style={{ color: "#E8E8E8" }}>LTS</span></div>
            <div><span style={{ color: "#00FF94" }}>?</span> Shell: <span style={{ color: "#E8E8E8" }}>bash</span></div>
            <div><span style={{ color: "#00FF94" }}>?</span> Git: <span style={{ color: "#E8E8E8" }}>yes</span></div>
            <div style={{ marginTop: 8, color: "#00FF94" }}>✓ Generating setup.sh...</div>
            <div style={{ color: "#666", marginTop: 4 }}>curl -fsSL forge.brgt.site/c/abc123 | bash</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Link href="/vault" className="px-6 py-3 bg-primary font-display font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all text-center" style={{ color: "#0D0D0D" }}>
            Browse Script Vault →
          </Link>
          <Link href="/guides" className="px-6 py-3 surface-card text-text-base font-display font-semibold text-sm rounded-lg hover:border-primary/30 transition-all text-center">
            Read the guides
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">forge.brgt.site — built on android ✦</p>
        </div>
      </footer>
    </>
  );
}
