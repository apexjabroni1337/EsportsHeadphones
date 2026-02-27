import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://esportsheadphones.com"),
  title: {
    default: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    template: "%s | EsportsHeadphones",
  },
  description:
    "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across CS2, Valorant, League of Legends, and 10+ major games. Audio specs, rankings, and pro settings.",
  keywords: [
    "esports headphones",
    "pro gaming headset",
    "best esports headphones",
    "professional gaming audio",
    "CS2 headphones",
    "Valorant headset",
    "pro player settings",
    "gaming headphones ranking",
    "esports audio equipment",
    "headphone comparison",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EsportsHeadphones",
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description:
      "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across 13 major games.",
    url: "https://esportsheadphones.com",
    images: [
      {
        url: "https://esportsheadphones.com/og?title=The+Definitive+Guide+to+Pro+Esports+Headphones&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Headsets+%C2%B7+13+Games",
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
      "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across 13 major games.",
    images: ["https://esportsheadphones.com/og?title=The+Definitive+Guide+to+Pro+Esports+Headphones&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Headsets+%C2%B7+13+Games"],
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
        <meta name="theme-color" content="#0b0f1a" />
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
                  "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across 13 major games.",
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
                description: "The definitive database for professional esports headphones, pro player audio settings, and gaming audio equipment data.",
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What headphones do most pro esports players use?",
                    acceptedAnswer: { "@type": "Answer", text: "The SteelSeries Arctis Pro is the most popular gaming headset among professional esports players in 2025-2026, used across CS2, Valorant, and League of Legends. The HyperX Cloud Orbit S and ASUS ROG Strix are also top choices among competitive players." },
                  },
                  {
                    "@type": "Question",
                    name: "What audio settings do pro esports players prefer?",
                    acceptedAnswer: { "@type": "Answer", text: "Professional esports players typically prefer closed-back headphones with clear positional audio and low latency. Most pros prioritize comfort for long gaming sessions, noise isolation for focus, and a flat frequency response for accurate sound positioning in competitive games." },
                  },
                  {
                    "@type": "Question",
                    name: "Do esports players prefer wired or wireless headphones?",
                    acceptedAnswer: { "@type": "Answer", text: "Most professional esports players prefer wired headphones for competitive play due to lower latency and reliability. However, premium wireless headsets with 2.4GHz connections and sub-1ms latency are becoming increasingly popular at the pro level." },
                  },
                  {
                    "@type": "Question",
                    name: "What is the best headphone impedance for gaming?",
                    acceptedAnswer: { "@type": "Answer", text: "Gaming headphones typically range from 16-600 ohms. Most professional gamers prefer headphones in the 20-50 ohm range for better compatibility with gaming peripherals and consistent sound across different devices without requiring additional amplification." },
                  },
                  {
                    "@type": "Question",
                    name: "Do pro gamers use surround sound headphones?",
                    acceptedAnswer: { "@type": "Answer", text: "Professional esports players primarily use stereo headphones with advanced positional audio technology like Dolby Atmos or spatial audio rather than traditional 7.1 surround sound. Stereo with proper sound design provides better accuracy for competitive gaming than surround sound formats." },
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
