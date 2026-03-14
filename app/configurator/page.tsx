"use client";

import { useState } from "react";
import type { ConfigOptions, Runtime, Shell, ExtraTool } from "../../lib/configurator";
import { generateConfig, DEFAULT_OPTIONS } from "../../lib/configurator";
import { createClient } from "../../lib/supabase/client";
import ConfigOutput from "../../components/ConfigOutput";
import type { GeneratedConfig } from "../../lib/configurator";

const RUNTIMES: { value: Runtime; label: string; icon: string }[] = [
  { value: "node", label: "Node.js", icon: "⬢" },
  { value: "python", label: "Python", icon: "🐍" },
  { value: "go", label: "Go", icon: "🐹" },
  { value: "java", label: "Java", icon: "☕" },
];

const SHELLS: { value: Shell; label: string; desc: string }[] = [
  { value: "bash", label: "bash", desc: "Default, most compatible" },
  { value: "zsh", label: "zsh", desc: "Powerful, oh-my-zsh ready" },
  { value: "fish", label: "fish", desc: "Friendly, auto-suggestions" },
];

const EXTRAS: { value: ExtraTool; label: string }[] = [
  { value: "curl", label: "curl" },
  { value: "wget", label: "wget" },
  { value: "nano", label: "nano" },
  { value: "vim", label: "vim" },
  { value: "htop", label: "htop" },
  { value: "jq", label: "jq" },
];

function OptionBtn({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: selected ? "1px solid rgba(0,255,148,0.4)" : "1px solid #2A2A2A",
        background: selected ? "rgba(0,255,148,0.08)" : "#161616",
        color: selected ? "#00FF94" : "#666",
        fontSize: 13,
        fontFamily: "monospace",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-mono text-primary text-xs">{step}</span>
      <h2 className="font-display font-semibold text-sm text-text-base">{label}</h2>
    </div>
  );
}

export default function ConfiguratorPage() {
  const [options, setOptions] = useState<ConfigOptions>(DEFAULT_OPTIONS);
  const [generated, setGenerated] = useState<GeneratedConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleExtra(tool: ExtraTool) {
    setOptions((prev) => ({
      ...prev,
      extras: prev.extras.includes(tool)
        ? prev.extras.filter((e) => e !== tool)
        : [...prev.extras, tool],
    }));
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const config = generateConfig(options);

      // Save script to Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from("configs")
        .upsert({
          config_id: config.configId,
          script: config.scriptPreview,
          options: options,
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error("Save error:", dbError);
        setError("Could not save config. You can still copy the script below.");
      }

      setGenerated(config);

      setTimeout(() => {
        document.getElementById("output")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 12px",
            borderRadius: 999,
            border: "1px solid rgba(0,255,148,0.2)",
            background: "rgba(0,255,148,0.05)",
            color: "#00FF94",
            fontSize: 11,
            fontFamily: "monospace",
            marginBottom: 16,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF94", display: "inline-block" }} />
          One-Tap Configurator
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
          Build your{" "}
          <span className="text-gradient">Termux setup.</span>
        </h1>
        <p className="text-text-muted text-sm mt-3 leading-relaxed">
          Pick your stack. Get a real <code>curl | bash</code> command you can run straight in Termux.
        </p>
      </div>

      <div className="space-y-8">
        {/* Runtime */}
        <section>
          <SectionLabel step="01" label="Runtime" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {RUNTIMES.map((r) => (
              <OptionBtn
                key={r.value}
                selected={options.runtime === r.value}
                onClick={() => setOptions((p) => ({ ...p, runtime: r.value }))}
              >
                {r.icon} {r.label}
              </OptionBtn>
            ))}
          </div>
        </section>

        {/* Version */}
        <section>
          <SectionLabel step="02" label="Version" />
          <div style={{ display: "flex", gap: 8 }}>
            {(["lts", "latest"] as const).map((v) => (
              <OptionBtn
                key={v}
                selected={options.version === v}
                onClick={() => setOptions((p) => ({ ...p, version: v }))}
              >
                {v === "lts" ? "LTS (recommended)" : "Latest"}
              </OptionBtn>
            ))}
          </div>
        </section>

        {/* Shell */}
        <section>
          <SectionLabel step="03" label="Shell" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SHELLS.map((s) => (
              <OptionBtn
                key={s.value}
                selected={options.shell === s.value}
                onClick={() => setOptions((p) => ({ ...p, shell: s.value }))}
              >
                {s.label}
                <span style={{ color: "#444", fontSize: 11, marginLeft: 6 }}>
                  {s.desc}
                </span>
              </OptionBtn>
            ))}
          </div>
        </section>

        {/* Git + SSH */}
        <section>
          <SectionLabel step="04" label="Dev tools" />
          <div style={{ display: "flex", gap: 8 }}>
            <OptionBtn
              selected={options.git}
              onClick={() => setOptions((p) => ({ ...p, git: !p.git }))}
            >
              Git {options.git ? "✓" : ""}
            </OptionBtn>
            <OptionBtn
              selected={options.ssh}
              onClick={() => setOptions((p) => ({ ...p, ssh: !p.ssh }))}
            >
              SSH Keys {options.ssh ? "✓" : ""}
            </OptionBtn>
          </div>
        </section>

        {/* Extras */}
        <section>
          <SectionLabel step="05" label="Extra packages" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {EXTRAS.map((e) => (
              <OptionBtn
                key={e.value}
                selected={options.extras.includes(e.value)}
                onClick={() => toggleExtra(e.value)}
              >
                {e.label}
              </OptionBtn>
            ))}
          </div>
        </section>

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

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 font-display font-bold text-base rounded-lg transition-all"
          style={{
            background: loading ? "#00CC77" : "#00FF94",
            color: "#0D0D0D",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "Generating..." : "Generate setup.sh →"}
        </button>

        {/* Output */}
        {generated && (
          <section id="output" className="pt-4">
            <SectionLabel step="06" label="Your custom setup" />
            <div className="surface-card p-5">
              <ConfigOutput config={generated} />
            </div>
            <p className="text-xs text-text-muted font-mono mt-3 text-center">
              This URL is permanent — share it or bookmark it.
            </p>
          </section>
        )}
      </div>
    </main>
  );
    }
    
