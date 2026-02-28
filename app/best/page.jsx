import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { allPlayers } from "@/data";

export const metadata = {
  title: "Best Gaming Headphone Guides (2026) — By Game, Weight, Budget & More",
  description: `Find the best esports gaming headphone for your game and playstyle. Pro-data-driven guides for CS2, Valorant, Fortnite, Apex Legends, and more. Based on data from ${2100}+ professional players.`,
  alternates: { canonical: "https://esportsheadphones.com/best" },
  openGraph: {
    title: "Best Gaming Headphone Guides (2026) — By Game, Weight, Budget & More",
    description: "Find the best esports gaming headphone for your game and playstyle.",
    url: "https://esportsheadphones.com/best",
    images: [{ url: "https://esportsheadphones.com/og?title=Best+Esports+Headphones&subtitle=Guides+by+Game+%C2%B7+Weight+%C2%B7+Budget+%C2%B7+2026", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const GUIDES = [
  // Curated Collections
  { slug: "tournament-favorites", label: "Tournament Favorites", sub: "The headphones winning major championships", collection: true },
  { slug: "anc", label: "Best ANC Headsets", sub: "Active noise cancellation for noisy LAN events", collection: true },
  { slug: "budget", label: "Budget Champions", sub: "Pro-grade audio performance under $100", collection: true },
  { slug: "wireless", label: "Wireless Freedom", sub: "Cutting the cord without cutting performance", collection: true },
  { slug: "audiophile", label: "Audiophile Grade", sub: "Open-back headphones for pristine sound staging", collection: true },
  // Game Guides
  { slug: "cs2", label: "Best Headphone for CS2", sub: "Counter-Strike 2 pro picks" },
  { slug: "valorant", label: "Best Headphone for Valorant", sub: "Tactical FPS pro picks" },
  { slug: "fortnite", label: "Best Headphone for Fortnite", sub: "Build & aim pro picks" },
  { slug: "apex", label: "Best Headphone for Apex Legends", sub: "Battle royale pro picks" },
  { slug: "overwatch-2", label: "Best Headphone for Overwatch 2", sub: "Hero shooter pro picks" },
  { slug: "r6-siege", label: "Best Headphone for R6 Siege", sub: "Tactical shooter pro picks" },
  { slug: "lol", label: "Best Headphone for League of Legends", sub: "MOBA pro picks" },
  { slug: "pubg", label: "Best Headphone for PUBG", sub: "Battle royale pro picks" },
  { slug: "call-of-duty", label: "Best Headphone for Call of Duty", sub: "Arena FPS pro picks" },
  { slug: "dota-2", label: "Best Headphone for Dota 2", sub: "MOBA pro picks" },
  { slug: "marvel-rivals", label: "Best Headphone for Marvel Rivals", sub: "Hero shooter pro picks" },
  { slug: "rocket-league", label: "Best Headphone for Rocket League", sub: "Vehicular soccer picks" },
  { slug: "lightweight", label: "Best Lightweight Gaming Headphone", sub: "Ultralight under 60g" },
];

export default function BestIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Best Gaming Headphone Guides",
        itemListElement: GUIDES.map((g, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/best/${g.slug}`,
          name: g.label,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "EsportsHeadphones", item: "https://esportsheadphones.com" },
          { "@type": "ListItem", position: 2, name: "Best Headphones Guides", item: "https://esportsheadphones.com/best" },
        ],
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Best Gaming Headphone Guides (2026)</h1>
        <p>Data-driven guides to the best esports gaming headphones, broken down by game, weight class, and budget. Every recommendation is backed by real pro player usage data from {allPlayers.length}+ tracked professionals.</p>

        <h2>Curated Collections</h2>
        <ul>
          {GUIDES.filter(g => g.collection).map(g => (
            <li key={g.slug}><a href={`/best/${g.slug}`}>{g.label}</a> — {g.sub}</li>
          ))}
        </ul>

        <h2>Best Headphone by Game</h2>
        <ul>
          {GUIDES.filter(g => !g.collection && !["lightweight"].includes(g.slug)).map(g => (
            <li key={g.slug}><a href={`/best/${g.slug}`}>{g.label}</a> — {g.sub}</li>
          ))}
        </ul>

        <h2>By Weight Class</h2>
        <ul>
          {GUIDES.filter(g => ["lightweight"].includes(g.slug)).map(g => (
            <li key={g.slug}><a href={`/best/${g.slug}`}>{g.label}</a> — {g.sub}</li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/compare">Compare Headphones</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Best Headphones">Guides by Game & Category</SSRTitle>
        <SSRSub>Data-driven recommendations backed by {allPlayers.length}+ pro player setups. Find the perfect headphone for your game.</SSRSub>
        <SSRGrid>
          {GUIDES.map(g => (
            <SSRLink key={g.slug} href={`/best/${g.slug}`}>{g.label}</SSRLink>
          ))}
        </SSRGrid>
      </SSRSection>

      <EsportsHeadphones initialTab="rankings" />
    </>
  );
}
