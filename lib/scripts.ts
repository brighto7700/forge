import { createClient } from "./supabase/server";

export type Script = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  chipset_compat: string[];
  github_raw_url: string;
  curl_command: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  created_at: string;
};

export type Category =
  | "environment-setup"
  | "git-workflows"
  | "automation"
  | "api-tools"
  | "utilities";

export const CATEGORIES: Record<Category, { label: string; icon: string }> = {
  "environment-setup": { label: "Environment Setup", icon: "⚙️" },
  "git-workflows": { label: "Git Workflows", icon: "🔀" },
  automation: { label: "Automation", icon: "🤖" },
  "api-tools": { label: "API Tools", icon: "🔌" },
  utilities: { label: "Utilities", icon: "🛠️" },
};

export const DIFFICULTY_COLORS = {
  beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

// ── Fetch all scripts ─────────────────────────────────
export async function getAllScripts(): Promise<Script[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching scripts:", error);
    return [];
  }

  return data as Script[];
}

// ── Fetch scripts by category ─────────────────────────
export async function getScriptsByCategory(
  category: Category
): Promise<Script[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching scripts by category:", error);
    return [];
  }

  return data as Script[];
}

// ── Fetch single script by slug ───────────────────────
export async function getScriptBySlug(slug: string): Promise<Script | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching script:", error);
    return null;
  }

  return data as Script;
}

// ── Search scripts ────────────────────────────────────
export async function searchScripts(query: string): Promise<Script[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .or(
      `title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching scripts:", error);
    return [];
  }

  return data as Script[];
}
import { createStaticClient } from "./supabase/static";

// Used only in generateStaticParams — no cookies needed
export async function getAllScriptSlugs(): Promise<string[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("slug");

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return data.map((s: { slug: string }) => s.slug);
            }
