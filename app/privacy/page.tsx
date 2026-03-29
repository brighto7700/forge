import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Forge",
  description: "Privacy Policy for Forge Mobile Developer Hub.",
  alternates: { canonical: "https://forge.brgt.site/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs font-mono text-text-muted hover:text-primary transition-colors">
          ← Back to Forge
        </Link>
      </div>
      <h1 className="font-display font-bold text-3xl mb-2">Privacy Policy</h1>
      <p className="text-text-muted text-xs font-mono mb-10">Effective Date: March 29, 2026</p>

      <div className="space-y-8 text-sm text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display font-semibold text-base text-text-base mb-2">Data Collection and Usage</h2>
          <p>Forge does <strong className="text-text-base">not</strong> collect, store, transmit, or share any personal data, analytics, telemetry, or source code. All environment configurations, scripts, and guides execute entirely locally on your Android device within your Termux environment.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-text-base mb-2">Third-Party Services</h2>
          <p>While Forge itself does not collect data, utilizing the scripts provided may involve downloading standard developer packages (Node.js, Python, Git) from their official package managers. These interactions are governed by the privacy policies of those respective maintainers.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-text-base mb-2">Open Source Transparency</h2>
          <p>Forge is 100% open-source. You can audit all shell scripts and codebase configurations directly in the <a href="https://github.com/brighto7700/forge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono">Forge GitHub Repository</a> before executing them on your device.</p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-base text-text-base mb-2">Contact</h2>
          <p>Questions or concerns? Open an issue in the <a href="https://github.com/brighto7700/forge/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono">Forge GitHub Repository</a>.</p>
        </section>
      </div>
    </main>
  );
}
