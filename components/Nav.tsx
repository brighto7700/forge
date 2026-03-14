import Link from "next/link";
import { getUser } from "../lib/auth";

export default async function Nav() {
  const user = await getUser();

  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <nav
        className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-primary text-lg tracking-tight"
          aria-label="Forge home"
        >
          forge<span className="text-text-muted">_</span>
        </Link>

        {/* Links */}
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

          {/* Auth button */}
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 ml-1 pl-3 border-l border-border"
              aria-label="Go to dashboard"
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  width={28}
                  height={28}
                  className="rounded-full border border-border"
                />
              ) : (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(0,255,148,0.1)",
                    border: "1px solid rgba(0,255,148,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#00FF94",
                    fontFamily: "monospace",
                  }}
                >
                  {user.name?.charAt(0) ?? "B"}
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="ml-1 px-3 py-1.5 text-sm font-display font-semibold rounded-lg transition-all"
              style={{
                background: "#00FF94",
                color: "#0D0D0D",
              }}
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
