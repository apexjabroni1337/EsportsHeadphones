import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, proPlayers, BRAND_COLORS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Esports Headphone Rankings — Pro Usage Leaderboard",
  description: "Complete rankings of professional esports headphones sorted by pro player adoption. Compare top gaming headphones used by the world's best competitive players.",
  alternates: { canonical: "https://esportsheadphones.com/rankings" },
  openGraph: {
    title: "Esports Headphone Rankings — Pro Usage Leaderboard",
    description: "Complete rankings of professional esports headphones sorted by pro player adoption.",
    url: "https://esportsheadphones.com/rankings",
    images: [{ url: "https://esportsheadphones.com/og?title=Headphone+Rankings&subtitle=Pro+Usage+Leaderboard", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RankingsPage() {
  const sorted = [...headphones].sort((a, b) => b?.proUsage - a?.proUsage);
  const brands = [...new Set(headphones.map((m) => m.brand))];
  const avgWeight = Math.round(headphones.reduce((a, m) => a + m?.weight, 0) / headphones.length);
  const avgPrice = Math.round(headphones.reduce((a, m) => a + m?.price, 0) / headphones.length);
  const wirelessCount = headphones.filter((m) => m.connectivity === "Wireless").length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Esports Headphone Rankings by Pro Usage",
        description: `Top ${headphones.length} professional esports headphones ranked by pro player adoption`,
        numberOfItems: sorted.length,
        itemListElement: sorted.slice(0, 20).map((m, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/headphones/${slug(m.name)}`,
          name: m.name,
          item: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: m.brand }, description: `${m.name} by ${m.brand}. ${m?.weight}g with ${m.driverType} driver. ${m.proUsage}% pro usage.` },
        })),
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Esports Headphone Rankings — Pro Usage Leaderboard</h1>
        <p>
          Complete rankings of {headphones.length} professional esports headphones used by
          {allPlayers.length.toLocaleString()}+ competitive players, sorted by pro adoption rate.
        </p>

        <h2>Top 20 Headphones by Pro Usage</h2>
        <table>
          <caption>Top esports headphones ranked by professional player usage</caption>
          <thead>
            <tr><th>Rank</th><th>Headphone</th><th>Brand</th><th>Weight</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {sorted.slice(0, 20).map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td><a href={`/headphones/${slug(m.name)}`}>{m.name}</a></td>
                <td><a href="/brands">{m.brand}</a></td>
                <td>{m?.weight}g</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td>{m.rating}/10</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Headphones Database</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/compare">Compare Headphones</a></li>
          <li><a href="/brands">Brand Analysis</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Headphone">Rankings</SSRTitle>
        <SSRSub>Complete pro usage leaderboard for {headphones.length} esports headphones across {new Set(allPlayers.map(p => p.game)).size} competitive titles.</SSRSub>
        <SSRGrid>
          <SSRStat label="Total Headphones" value={headphones.length} color="#c9a227" />
          <SSRStat label="Brands" value={brands.length} color="#c9a227" />
          <SSRStat label="Avg Weight" value={`${avgWeight}g`} color="#c9a227" />
          <SSRStat label="Avg Price" value={`$${avgPrice}`} color="#c9a227" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="rankings" />
    </>
  );
}
