import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export type GuideFrontmatter = {
  title: string;
  description: string;
  track: "getting-started" | "language-tracks" | "deployment" | "workflow";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  published: boolean;
  publishedAt: string;
  updatedAt?: string;
};

export type Guide = GuideFrontmatter & {
  slug: string;
  readingTime: string;
  content: string;
};

export type GuideMeta = Omit<Guide, "content">;

export const TRACKS: Record<
  GuideFrontmatter["track"],
  { label: string; icon: string; description: string }
> = {
  "getting-started": {
    label: "Getting Started",
    icon: "🚀",
    description: "Termux basics, storage, SSH keys",
  },
  "language-tracks": {
    label: "Language Tracks",
    icon: "⚡",
    description: "Go, Node.js, Python from zero",
  },
  deployment: {
    label: "Deployment",
    icon: "🌐",
    description: "Pxxl, Vercel, Railway from Android",
  },
  workflow: {
    label: "Workflow",
    icon: "🔀",
    description: "GitHub mobile, VS Code web, AI-assisted coding",
  },
};

export const DIFFICULTY_COLORS = {
  beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

// ── Get all guide slugs ───────────────────────────────
export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// ── Get all guides metadata (no content) ─────────────
export function getAllGuides(): GuideMeta[] {
  const slugs = getAllGuideSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as GuideFrontmatter;
      if (!fm.published) return null;
      return {
        ...fm,
        slug,
        readingTime: readingTime(content).text,
      };
    })
    .filter(Boolean) as GuideMeta[];
}

// ── Get single guide with content ────────────────────
export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as GuideFrontmatter;

  return {
    ...fm,
    slug,
    content,
    readingTime: readingTime(content).text,
  };
}

// ── Get guides by track ───────────────────────────────
export function getGuidesByTrack(
  track: GuideFrontmatter["track"]
): GuideMeta[] {
  return getAllGuides().filter((g) => g.track === track);
}
