import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, proPlayers, BRAND_COLORS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Brands — Esports Headphone Manufacturers Compared",
  description: "Compare Razer, Logitech, Wooting, Cherry, Pulsar, Lamzu, SteelSeries, Corsair, and more. Pro share, headphone lineups, average weight, pricing, and expert ratings for every esports headphone brand.",
  alternates: { canonical: "https://esportsheadphones.com/brands" },
  openGraph: {
    title: "Brands — Esports Headphone Manufacturers Compared",
    description: "Compare the top gaming headphone brands used by professional esports players.",
    url: "https://esportsheadphones.com/brands",
    images: [{ url: "https://esportsheadphones.com/og?title=Brands&subtitle=Wooting+%C2%B7+Razer+%C2%B7+Logitech+%C2%B7+SteelSeries+%C2%B7+Cherry+%C2%B7+Keychron", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BrandsPage() {
  const brandData = [...new Set(headphones.map((m) => m.brand))].map((brand) => {
    const brandHeadphones = headphones.filter((m) => m.brand === brand);
    const avgWeight = Math.round(brandHeadphones.reduce((a, m) => a + m?.weight, 0) / brandHeadphones.length);
    const avgPrice = Math.round(brandHeadphones.reduce((a, m) => a + m?.price, 0) / brandHeadphones.length);
    const avgRating = (brandHeadphones.reduce((a, m) => a + m.rating, 0) / brandHeadphones.length).toFixed(1);
    const totalProUsage = brandHeadphones.reduce((a, m) => a + m.proUsage, 0);
    const lightest = [...brandHeadphones].sort((a, b) => a?.weight - b?.weight)[0];
    const mostPopular = [...brandHeadphones].sort((a, b) => b?.proUsage - a?.proUsage)[0];
    const drivers = [...new Set(brandHeadphones.map((m) => m.driverType))];
    const shapes = [...new Set(brandHeadphones.map((m) => m.formFactor))];
    const priceRange = `$${Math.min(...brandHeadphones.map((m) => m?.price))}-$${Math.max(...brandHeadphones.map((m) => m?.price))}`;
    const weightRange = `${Math.min(...brandHeadphones.map((m) => m?.weight))}g-${Math.max(...brandHeadphones.map((m) => m?.weight))}g`;
    const brandPros = proPlayers.filter((p) => {
      const pm = (p.headphone || "").toLowerCase();
      return pm && brandHeadphones.some((m) => pm.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(pm));
    });
    return { brand, headphones: brandHeadphones, avgWeight, avgPrice, avgRating, totalProUsage, lightest, mostPopular, drivers, shapes, priceRange, weightRange, pros: brandPros };
  }).sort((a, b) => b.totalProUsage - a.totalProUsage);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Esports Headphone Brands Ranked by Pro Usage",
        numberOfItems: brandData.length,
        itemListElement: brandData.map((b, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/brands/${slug(b.brand)}`,
          name: b.brand,
          item: { "@type": "Brand", name: b.brand },
        })),
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Esports Headphone Brands — Complete Comparison and Analysis</h1>
        <p>
          Compare {brandData.length} gaming headphone manufacturers used by professional esports players.
          See headphone lineups, pro usage share, average specs, pricing, and featured pro players for each brand.
        </p>

        <h2>Brand Rankings Overview</h2>
        <table>
          <caption>All esports headphone brands ranked by combined pro usage</caption>
          <thead><tr><th>Rank</th><th>Brand</th><th>Headphones</th><th>Pro Usage</th><th>Avg Weight</th><th>Price Range</th><th>Avg Rating</th><th>Most Popular</th></tr></thead>
          <tbody>
            {brandData.map((b, i) => (
              <tr key={b.brand}>
                <td>{i + 1}</td>
                <td><a href={`/brands/${slug(b.brand)}`}>{b.brand}</a></td>
                <td>{b.headphones.length}</td>
                <td>{b.totalProUsage}%</td>
                <td>{b.avgWeight}g</td>
                <td>{b?.priceRange}</td>
                <td>{b.avgRating}/10</td>
                <td><a href={`/headphones/${slug(b.mostPopular.name)}`}>{b.mostPopular.name}</a></td>
              </tr>
            ))}
          </tbody>
        </table>

        {brandData.map((b) => (
          <section key={b.brand}>
            <h2><a href={`/brands/${slug(b.brand)}`}>{b.brand} — Complete Esports Headphone Lineup</a></h2>
            <p>
              {b.brand} has {b.headphones.length} esports headphones with a combined {b.totalProUsage}% pro usage.
              Weight range: {b?.weightRange}. Price range: {b?.priceRange}. Average rating: {b.avgRating}/10.
              Drivers used: {b.drivers.join(", ")}. Shapes offered: {b.shapes.join(", ")}.
              <a href={`/brands/${slug(b.brand)}`}> View full {b.brand} page →</a>
            </p>

            <h3>{b.brand} Headphone Lineup</h3>
            <table>
              <thead><tr><th>Headphone</th><th>Weight</th><th>Driver</th><th>Layout</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr></thead>
              <tbody>
                {b.headphones.sort((a, c) => c.proUsage - a?.proUsage).map((m) => (
                  <tr key={m.id}>
                    <td><a href={`/headphones/${slug(m.name)}`}>{m.name}</a></td>
                    <td>{m?.weight}g</td>
                    <td><a href="/drivers">{m.driverType}</a></td>
                    <td>{m.formFactor}</td>
                    <td><a href={amazonLink(m.name)}>${m?.price}</a></td>
                    <td>{m.proUsage}%</td>
                    <td>{m.rating}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {b.pros.length > 0 && (
              <>
                <h3>Pro Players Using Headphones</h3>
                <table>
                  <thead><tr><th>Player</th><th>Game</th><th>Team</th><th>Headphone</th></tr></thead>
                  <tbody>
                    {b.pros.slice(0, 10).map((p, i) => (
                      <tr key={`${p.name}-${i}`}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.game}</td>
                        <td>{p.team}</td>
                        <td>{p.headphone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </section>
        ))}

        <nav aria-label="Brand Pages">
          <h2>Individual Brand Pages</h2>
          <ul>
            {brandData.map((b) => (
              <li key={b.brand}><a href={`/brands/${slug(b.brand)}`}>{b.brand} Esports Headphones — {b.headphones.length} headphones, {b.totalProUsage}% pro usage</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Related">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/headphones">All Esports Headphones</a></li>
            <li><a href="/players">Pro Player Settings</a></li>
            <li><a href="/drivers">Driver Comparison</a></li>
            <li><a href="/trends">Industry Trends</a></li>
            <li><a href="/compare">Compare Headphones</a></li>
            <li><a href="/games">Headphone Usage by Game</a></li>
            <li><a href="/">EsportsHeadphones Home</a></li>
          </ul>
        </nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Headphone">Brands</SSRTitle>
        <SSRSub>Compare {brandData.length} gaming headphone manufacturers. Pro usage share, lineups, average specs, pricing, and featured players for each brand.</SSRSub>
        <SSRGrid>
          {brandData.slice(0, 4).map((b) => (
            <SSRStat key={b.brand} label={b.brand} value={`${b.totalProUsage}% pro`} color={BRAND_COLORS[b.brand]} />
          ))}
        </SSRGrid>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9e9578" }}>
            Brand Rankings by Pro Usage
          </p>
          <div style={{
            border: "1px solid #e6e3d6",
            borderRadius: "8px",
            overflow: "hidden",
            fontSize: "14px"
          }}>
            {brandData.slice(0, 6).map((b, i) => (
              <div key={b.brand} style={{
                padding: "12px 16px",
                background: i % 2 === 0 ? "#ffffff" : "#f5f3ea",
                borderBottom: i < 5 ? "1px solid #e6e3d6" : "none",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: BRAND_COLORS[b.brand] || "#c9a227"
                }} />
                <span style={{
                  fontWeight: "bold",
                  color: BRAND_COLORS[b.brand] || "#1a1614",
                  flex: 1
                }}>
                  {b.brand}
                </span>
                <span style={{
                  fontWeight: "bold",
                  color: BRAND_COLORS[b.brand] || "#c9a227"
                }}>
                  {b.totalProUsage}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {brandData.map((b) => (
            <SSRLink key={b.brand} href={`/brands/${slug(b.brand)}`}>{b.brand}</SSRLink>
          ))}
        </div>
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/drivers">Drivers</SSRLink>
          <SSRLink href="/trends">Trends</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="brands" />
    </>
  );
}
