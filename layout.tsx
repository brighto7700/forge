import type { Metadata } from "next";
import "./globals.css";

const siteConfig = {
  name: "Forge",
  description:
    "The developer hub built for mobile coders. Shell scripts, Termux guides, and one-tap environment setup — all from your Android phone.",
  url: "https://forge.brgt.site",
  ogImage: "https://forge.brgt.site/og.png",
  twitterHandle: "@brighto7700",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Forge — Code on Android. Build Real Things.",
    template: "%s | Forge",
  },
  description: siteConfig.description,
  keywords: [
    "code on Android",
    "Termux setup guide",
    "mobile developer tools",
    "programming on phone",
    "Termux Node.js setup",
    "Termux Python setup",
    "Termux Go setup",
    "Android development environment",
    "shell scripts for Termux",
    "mobile coding setup",
    "code without laptop",
    "smartphone developer",
  ],
  authors: [{ name: "Bright", url: siteConfig.url }],
  creator: "Bright",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Forge — Code on Android. Build Real Things.",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Forge — The mobile developer hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge — Code on Android. Build Real Things.",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "Bright Emmanuel",
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/vault?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-text-base font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
