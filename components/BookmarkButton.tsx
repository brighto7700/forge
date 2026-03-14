"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

type Props = {
  scriptId: string;
  initialBookmarked: boolean;
  isLoggedIn: boolean;
};

export default function BookmarkButton({ scriptId, initialBookmarked, isLoggedIn }: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleBookmark() {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (bookmarked) {
      // Remove bookmark
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("script_id", scriptId);

      setBookmarked(false);
    } else {
      // Add bookmark
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("bookmarks")
        .insert({ user_id: user.id, script_id: scriptId });

      setBookmarked(true);
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this script"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: 8,
        border: bookmarked
          ? "1px solid rgba(0,255,148,0.4)"
          : "1px solid #2A2A2A",
        background: bookmarked
          ? "rgba(0,255,148,0.08)"
          : "#161616",
        color: bookmarked ? "#00FF94" : "#666",
        fontSize: 13,
        fontFamily: "monospace",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {/* Bookmark icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h7A1.5 1.5 0 0 1 12 2.5v10l-5-3-5 3v-10z" />
      </svg>
      {loading ? "..." : bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
      }
        
