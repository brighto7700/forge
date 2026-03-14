"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGitHubLogin() {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `https://forge.brgt.site/auth/callback`,
        scopes: "read:user user:email",
      },
    });

    if (error) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <nav
          className="max-w-6xl mx-auto px-4 h-14 flex items-center"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-mono text-primary font-bold text-base"
            aria-label="Forge home"
          >
            forge_
          </Link>
        </nav>
      </header>

      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-text-base">
              Sign in to <span className="text-gradient">Forge</span>
            </h1>
            <p className="text-text-muted text-sm mt-2">
              Save your configs, bookmark scripts, track progress.
            </p>
          </div>

          {/* Card */}
          <div className="surface-card p-6 space-y-4">
            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(255,95,87,0.08)",
                  border: "1px solid rgba(255,95,87,0.2)",
                  color: "#FF5F57",
                  fontSize: 13,
                  fontFamily: "monospace",
                }}
              >
                {error}
              </div>
            )}

            {/* GitHub OAuth button */}
            <button
              onClick={handleGitHubLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-display font-semibold text-sm transition-all"
              style={{
                background: loading ? "#1a1a1a" : "#161616",
                border: "1px solid #2A2A2A",
                color: loading ? "#666" : "#E8E8E8",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              aria-label="Sign in with GitHub"
            >
              {loading ? (
                <span className="font-mono text-xs text-text-muted">
                  Connecting...
                </span>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Continue with GitHub
                </>
              )}
            </button>

            <p className="text-xs text-text-muted text-center leading-relaxed">
              By signing in you agree to Forge&apos;s terms. We only request
              read access to your GitHub profile.
            </p>
          </div>

          <p className="text-center text-xs text-text-muted mt-6 font-mono">
            <Link href="/" className="hover:text-primary transition-colors">
              ← Back to Forge
            </Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">
            forge.brgt.site — built on android ✦
          </p>
        </div>
      </footer>
    </>
  );
          }
                  
