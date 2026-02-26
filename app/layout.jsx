import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://esportsheadphones.com"),
  title: {
    default: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    template: "%s | EsportsHeadphones",
  },
  description:
    "The #1 database of professional esports headphones. Compare headphones used by 1800+ pro players across CS2, Valorant, League of Legends, and 9+ major games. Specs, rankings, and pro settings.",
  keywords: [
    "esports headphones",
    "pro gaming headset",
    "CS2 headset",
    "Valorant headphones",
    "pro player settings",
    "gaming headphone ranking",
    "best gaming headset",
    "wireless gaming headset",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EsportsHeadphones",
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description:
      "The #1 database of professional esports headphones. Compare headphones used by 1800+ pro players across 9 major games.",
    url: "https://esportsheadphones.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description:
      "The #1 database of professional esports headphones. Compare headphones used by 1800+ pro players across 9 major games.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://esportsheadphones.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0e1a" />
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#0a0e1a] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "EsportsHeadphones",
                url: "https://esportsheadphones.com",
                description: "The #1 database of professional esports headphones.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://esportsheadphones.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "EsportsHeadphones",
                url: "https://esportsheadphones.com",
                description: "The definitive database for professional esports headphones and pro player audio settings.",
              },
            ]),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
