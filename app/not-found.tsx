import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center" aria-label="Main navigation">
          <Link href="/" className="font-mono text-primary font-bold text-base" aria-label="Forge home">
            forge_
          </Link>
        </nav>
      </header>

      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-primary text-xs tracking-widest uppercase mb-4">404</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
          Page not <span className="text-gradient">found.</span>
        </h1>
        <p className="text-text-muted text-sm mt-4 max-w-sm leading-relaxed">
          This page doesn&apos;t exist or was moved. Check the URL or head back home.
        </p>

        <div className="terminal-block mt-10 w-full max-w-xs text-left" aria-hidden="true">
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid #2A2A2A" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
          </div>
          <div style={{ padding: 16, fontFamily: "monospace", fontSize: 12, lineHeight: 2 }}>
            <div style={{ color: "#666" }}>$ cd <span style={{ color: "#E8E8E8" }}>/page-you-wanted</span></div>
            <div style={{ color: "#FF5F57" }}>bash: cd: No such file or directory</div>
            <div style={{ color: "#666", marginTop: 4 }}>$ <span style={{ color: "#E8E8E8" }}>▊</span></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Link href="/" className="px-6 py-3 bg-primary font-display font-semibold text-sm rounded-lg hover:bg-primary-dim transition-all" style={{ color: "#0D0D0D" }}>
            ← Back home
          </Link>
          <Link href="/vault" className="px-6 py-3 surface-card text-text-base font-display font-semibold text-sm rounded-lg hover:border-primary/30 transition-all">
            Browse Vault
          </Link>
          <Link href="/guides" className="px-6 py-3 surface-card text-text-base font-display font-semibold text-sm rounded-lg hover:border-primary/30 transition-all">
            Read Guides
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
