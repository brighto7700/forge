import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  github_username: string;
};

// ── Get current session user ──────────────────────────
export async function getUser(): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? "",
    avatar_url: user.user_metadata?.avatar_url ?? "",
    github_username: user.user_metadata?.user_name ?? "",
  };
}

// ── Require auth — redirects to login if not signed in ─
export async function requireUser(): Promise<UserProfile> {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  return user;
}

// ── Sign out ──────────────────────────────────────────
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ── Get user bookmarks ────────────────────────────────
export async function getUserBookmarks(userId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("script_id")
    .eq("user_id", userId);

  if (error) return [];
  return data.map((b: { script_id: string }) => b.script_id);
}

// ── Toggle bookmark ───────────────────────────────────
export async function toggleBookmark(userId: string, scriptId: string) {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("script_id", scriptId)
    .single();

  if (existing) {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("script_id", scriptId);
    return false; // removed
  } else {
    await supabase
      .from("bookmarks")
      .insert({ user_id: userId, script_id: scriptId });
    return true; // added
  }
    }
