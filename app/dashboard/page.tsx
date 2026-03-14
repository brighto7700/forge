import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { requireUser, getUserBookmarks } from "../../lib/auth";
import { createClient } from "../../lib/supabase/server";
import { CATEGORIES, DIFFICULTY_COLORS } from "../../lib/scripts";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Dashboard — Forge",
  description: "Your saved configs, bookmarked scripts, and guide progress.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireUser();
  const bookmarkIds = await getUserBookmarks(user.id);

  // Fetch bookmarked scripts
  const supabase = createClient();
  let bookmarkedScripts: any[] = [];

  if (bookmarkIds.length > 0) {
    const { data } = await supabase
      .from("scripts")
      .select("*")
      .in("id", bookmarkIds);
    bookmarkedScripts = data ?? [];
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile header */}
      <section aria-labelledby="dashboard-heading" className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
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
        </div>
      </section>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-4 mb-12"
      >
        {[
          { label: "Bookmarks", value: bookmarkIds.length },
          { label: "Configs saved", value: 0 },
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

      {/* Bookmarked scripts */}
      <section aria-labelledby="bookmarks-heading" className="mb-12">
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
                <article key={script.id} className="surface-card p-5 hover:border-primary/20 transition-all">
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

      {/* Saved configs */}
      <section aria-labelledby="configs-heading">
        <h2
          id="configs-heading"
          className="font-display font-semibold text-lg mb-5 flex items-center gap-2"
        >
          <span aria-hidden="true">⚙️</span> Saved Configs
        </h2>
        <div className="surface-card p-8 text-center border-dashed">
          <p className="text-text-muted text-sm">
            Save your custom Termux configurations here once the Configurator launches.
          </p>
          <Link
            href="/configurator"
            className="inline-block mt-3 text-xs font-mono text-primary hover:underline"
          >
            Preview the Configurator →
          </Link>
        </div>
      </section>
    </main>
  );
}
