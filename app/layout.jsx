import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://esportsheadphones.com"),
  title: {
    default: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    template: "%s | EsportsHeadphones",
  },
  description:
    "The #1 database of professional esports headphones. Compare headphones used by 2100+ pro players across CS2, Valorant, League of Legends, and 10+ major games. Specs, rankings, switch data, and pro settings.",
  keywords: [
    "esports headphones",
    "pro gaming headphone",
    "CS2 headphone",
    "Valorant headphone",
    "pro player settings",
    "gaming headphone ranking",
    "esports headphones",
    "headphone ranking",
    "best gaming headphone",
    "headphone switch comparison",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EsportsHeadphones",
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description:
      "The #1 database of professional esports headphones. Compare headphones used by 2100+ pro players across 13 major games.",
    url: "https://esportsheadphones.com",
    images: [
      {
        url: "https://esportsheadphones.com/og?title=The+Definitive+Guide+to+Pro+Esports+Headphones&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Headphones+%C2%B7+13+Games",
        width: 1200,
        height: 630,
        alt: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description:
      "The #1 database of professional esports headphones. Compare headphones used by 2100+ pro players across 13 major games.",
    images: ["https://esportsheadphones.com/og?title=The+Definitive+Guide+to+Pro+Esports+Headphones&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Headphones+%C2%B7+13+Games"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://esportsheadphones.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f5f0e8" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="EsportsHeadphones Blog" href="/feed.xml" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "EsportsHeadphones",
                url: "https://esportsheadphones.com",
                description:
                  "The #1 database of professional esports headphones. Compare headphones used by 2100+ pro players across 13 major games.",
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
                logo: "https://esportsheadphones.com/icon.png",
                sameAs: [],
                description: "The definitive database for professional esports headphones, pro player settings, and gaming peripheral data.",
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What headphone do most pro esports players use?",
                    acceptedAnswer: { "@type": "Answer", text: "The Wooting 60HE is the most popular headphone among professional esports players in 2025-2026, used across CS2, Valorant, Fortnite, and other titles. The Razer Huntsman V3 Pro is the second most popular choice." },
                  },
                  {
                    "@type": "Question",
                    name: "What headphone settings do pro players use?",
                    acceptedAnswer: { "@type": "Answer", text: "Professional esports players use a wide variety of headphones, with brands like Wooting, Razer, and Logitech dominating the scene. The choice depends on hand size, grip style, and personal preference." },
                  },
                  {
                    "@type": "Question",
                    name: "What headphone does s1mple use?",
                    acceptedAnswer: { "@type": "Answer", text: "s1mple, widely regarded as the greatest CS player of all time, has used various headphones throughout his career. Check his full profile on EsportsHeadphones for his current headphone, settings, and complete gear setup." },
                  },
                  {
                    "@type": "Question",
                    name: "Is a lighter headphone better for gaming?",
                    acceptedAnswer: { "@type": "Answer", text: "Lighter headphones with active noise cancellation and low impedance points are preferred by most professional FPS players for faster input response. However, headphone weight is less critical than switch type, impedance distance, and frequency response. The best headphone depends on your game and playstyle." },
                  },
                  {
                    "@type": "Question",
                    name: "What frequency response do pros use for headphones?",
                    acceptedAnswer: { "@type": "Answer", text: "In 2025, 4KHz (4000Hz) polling is the most common among pros, with 8KHz (8000Hz) gaining adoption. Higher frequency responses reduce input delay and provide smoother cursor movement, which matters at the highest levels of competitive play." },
                  },
                ],
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
