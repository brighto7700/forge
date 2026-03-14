import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { requireUser, getUserBookmarks } from "../../lib/auth";
import { createClient } from "../../lib/supabase/server";
import { CATEGORIES, DIFFICULTY_COLORS } from "../../lib/scripts";

export const metadata: Metadata = {
  title: "Dashboard — Forge",
  description: "Your saved configs, bookmarked scripts, and guide progress.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SavedConfig = {
  id: string;
  config_id: string;
  options: {
    runtime: string;
    version: string;
    shell: string;
    git: boolean;
    ssh: boolean;
    extras: string[];
  };
  created_at: string;
};

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = createClient();

  // Fetch bookmarks
  const bookmarkIds = await getUserBookmarks(user.id);
  let bookmarkedScripts: any[] = [];
  if (bookmarkIds.length > 0) {
    const { data } = await supabase
      .from("scripts")
      .select("*")
      .in("id", bookmarkIds);
    bookmarkedScripts = data ?? [];
  }

  // Fetch saved configs
  const { data: savedConfigs } = await supabase
    .from("configs")
    .select("id, config_id, options, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const configs: SavedConfig[] = savedConfigs ?? [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile */}
      <section aria-labelledby="dashboard-heading" className="mb-12">
        <div className="flex items-start gap-4">
          {user.avatar_url && (
            <Image
              src={user.avatar_url}
              alt={user.name}
              width={56}
              height={56}
              className="rounded-full border border-border"
            />
          )}
          <div>
            <h1
              id="dashboard-heading"
              className="font-display font-bold text-xl text-text-base"
            >
              {user.name || user.github_username}
            </h1>
            <p className="text-text-muted text-sm font-mono mt-0.5">
              @{user.github_username}
            </p>
            <form action="/auth/signout" method="POST" className="mt-1">
              <button
                type="submit"
                className="text-xs font-mono text-text-muted hover:text-primary transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: "Bookmarks", value: bookmarkIds.length },
          { label: "Configs saved", value: configs.length },
          { label: "Guides done", value: 0 },
        ].map((stat) => (
          <div key={stat.label} className="surface-card p-4 text-center">
            <p className="font-mono font-bold text-2xl text-primary">
              {stat.value}
            </p>
            <p className="text-text-muted text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Saved Configs */}
      <section aria-labelledby="configs-heading" className="mb-12">
        <h2
          id="configs-heading"
          className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
        >
          <span aria-hidden="true">⚙️</span> Saved Configs
        </h2>

        {configs.length === 0 ? (
          <div className="surface-card p-8 text-center border-dashed">
            <p className="text-text-muted text-sm">No saved configs yet.</p>
            <Link
              href="/configurator"
              className="inline-block mt-3 text-xs font-mono text-primary hover:underline"
            >
              Generate your first config →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {configs.map((config) => (
              <article
                key={config.id}
                className="surface-card p-5 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-primary">
                    {config.options?.runtime ?? "unknown"}
                    {" · "}
                    {config.options?.version ?? ""}
                  </span>
                  <span className="text-xs font-mono text-text-faint">
                    {new Date(config.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="text-xs font-mono px-2 py-0.5 bg-surface border border-border rounded text-text-muted">
                    {config.options?.shell ?? "bash"}
                  </span>
                  {config.options?.git && (
                    <span className="text-xs font-mono px-2 py-0.5 bg-surface border border-border rounded text-text-muted">
                      git
                    </span>
                  )}
                  {config.options?.ssh && (
                    <span className="text-xs font-mono px-2 py-0.5 bg-surface border border-border rounded text-text-muted">
                      ssh
                    </span>
                  )}
                  {config.options?.extras?.map((e: string) => (
                    <span
                      key={e}
                      className="text-xs font-mono px-2 py-0.5 bg-surface border border-border rounded text-text-muted"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <div className="terminal-block px-3 py-2 text-xs font-mono text-text-muted truncate">
                  <span className="text-primary mr-2">$</span>
                  curl -fsSL forge.brgt.site/api/config/{config.config_id} | bash
                </div>

                <a
                  href={`https://forge.brgt.site/api/config/${config.config_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-primary mt-3 hover:gap-2 transition-all"
                >
                  View script →
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bookmarked Scripts */}
      <section aria-labelledby="bookmarks-heading">
        <h2
          id="bookmarks-heading"
          className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
        >
          <span aria-hidden="true">🔖</span> Bookmarked Scripts
        </h2>

        {bookmarkedScripts.length === 0 ? (
          <div className="surface-card p-8 text-center border-dashed">
            <p className="text-text-muted text-sm">No bookmarks yet.</p>
            <Link
              href="/vault"
              className="inline-block mt-3 text-xs font-mono text-primary hover:underline"
            >
              Browse the Script Vault →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookmarkedScripts.map((script: any) => {
              const category = CATEGORIES[script.category as keyof typeof CATEGORIES];
              const diffColor = DIFFICULTY_COLORS[script.difficulty as keyof typeof DIFFICULTY_COLORS];
              return (
                <article
                  key={script.id}
                  className="surface-card p-5 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-text-muted">
                      {category?.icon} {category?.label}
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${diffColor}`}>
                      {script.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-text-base">
                    {script.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-1 line-clamp-2">
                    {script.description}
                  </p>
                  <Link
                    href={`/vault/${script.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-primary mt-3 hover:gap-2 transition-all"
                  >
                    View script →
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
                    }
                  
