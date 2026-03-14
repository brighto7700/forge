"use client";

import { useState } from "react";
import type { GeneratedConfig } from "../lib/configurator";

export default function ConfigOutput({ config }: { config: GeneratedConfig }) {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [showScript, setShowScript] = useState(false);

  async function copyText(text: string, type: "curl" | "script") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    if (type === "curl") {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    } else {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  }

  return (
    <div className="space-y-4">
      {/* Curl command */}
      <div>
        <p className="text-xs font-mono text-text-muted mb-2">
          <span className="text-primary">01</span> — Paste in Termux
        </p>
        <div className="terminal-block overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-xs font-mono text-text-muted">Termux</span>
            <button
              onClick={() => copyText(config.curlCommand, "curl")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 6,
                border: copiedCurl ? "1px solid rgba(0,255,148,0.4)" : "1px solid #2A2A2A",
                background: copiedCurl ? "rgba(0,255,148,0.08)" : "#0a0a0a",
                color: copiedCurl ? "#00FF94" : "#666",
                fontSize: 12,
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              {copiedCurl ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-text-base break-all">
              <span className="text-primary mr-2">$</span>
              {config.curlCommand}
            </code>
          </div>
        </div>
      </div>

      {/* Script preview toggle */}
      <div>
        <button
          onClick={() => setShowScript(!showScript)}
          className="text-xs font-mono text-text-muted hover:text-primary transition-colors flex items-center gap-2"
        >
          <span className="text-primary">02</span>
          {showScript ? "Hide" : "Preview"} generated script
          <span>{showScript ? "▲" : "▼"}</span>
        </button>

        {showScript && (
          <div className="terminal-block overflow-hidden mt-2">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="text-xs font-mono text-text-muted">setup.sh</span>
              <button
                onClick={() => copyText(config.scriptPreview, "script")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: copiedScript ? "1px solid rgba(0,255,148,0.4)" : "1px solid #2A2A2A",
                  background: copiedScript ? "rgba(0,255,148,0.08)" : "#0a0a0a",
                  color: copiedScript ? "#00FF94" : "#666",
                  fontSize: 12,
                  fontFamily: "monospace",
                  cursor: "pointer",
                }}
              >
                {copiedScript ? "✓ Copied!" : "Copy script"}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-text-muted leading-relaxed max-h-64 overflow-y-auto">
              {config.scriptPreview}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
