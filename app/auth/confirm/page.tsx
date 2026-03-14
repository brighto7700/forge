"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    async function exchangeCode() {
      const code = searchParams.get("code");

      if (!code) {
        setStatus("error");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Exchange error:", error);
        setStatus("error");
        setTimeout(() => router.push("/auth/login?error=auth_failed"), 2000);
        return;
      }

      router.push("/dashboard");
    }

    exchangeCode();
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {status === "loading" ? (
        <div>
          <div
            style={{
              width: 32,
              height: 32,
              border: "2px solid #2A2A2A",
              borderTop: "2px solid #00FF94",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p className="font-mono text-sm text-text-muted">
            Signing you in...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <p className="font-mono text-sm text-red-400">
          Auth failed. Redirecting...
        </p>
      )}
    </main>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="font-mono text-sm text-text-muted">Loading...</p>
        </main>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
