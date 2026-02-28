import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, proPlayers } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Drivers — Headphone Driver Analytics & Comparison",
  description: "Comprehensive breakdown of every switch powering pro esports headphones. Compare PAW3395, Focus Pro 36K, HERO 2, PAW3950, and more. Pro usage stats, specifications, and headphones using each switch.",
  alternates: { canonical: "https://esportsheadphones.com/sensors" },
  openGraph: {
    title: "Drivers — Headphone Driver Analytics & Comparison",
    description: "Comprehensive breakdown of every switch powering pro esports headphones.",
    url: "https://esportsheadphones.com/sensors",
    images: [{ url: "https://esportsheadphones.com/og?title=Sensors&subtitle=PAW3395+%C2%B7+Focus+Pro+36K+%C2%B7+HERO+2+%C2%B7+Pro+Usage+Stats", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SensorsPage() {
  const switchData = [...new Set(headphones.map((m) => m.driverType))].map((switchName) => {
    const switchKbds = headphones.filter((m) => m.driverType === switchName);
    const totalProUsage = switchKbds.reduce((a, m) => a + m.proUsage, 0);
    const avgWeight = Math.round(switchKbds.reduce((a, m) => a + m?.weight, 0) / switchKbds.length);
    const avgPrice = Math.round(switchKbds.reduce((a, m) => a + m?.price, 0) / switchKbds.length);
    const brands = [...new Set(switchKbds.map((m) => m.brand))];
    const maxPolling = Math.max(...switchKbds.map((m) => m.frequencyResponse));
    const switchPros = proPlayers.filter((p) =>
      p.headphone && switchKbds.some((m) => p.headphone.includes(m.name) || m.name.includes(p.headphone))
    );
    return { switchName, headphones: switchKbds, totalProUsage, avgWeight, avgPrice, brands, maxPolling, pros: switchPros };
  }).sort((a, b) => b.totalProUsage - a.totalProUsage);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Esports Headphone Drivers Ranked by Pro Usage",
        numberOfItems: switchData.length,
        itemListElement: switchData.map((s, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/sensors/${slug(s.switchName)}`,
          name: s.switchName,
        })),
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Headphone Driver Analytics — Every Driver in Professional Esports</h1>
        <p>
          Comprehensive breakdown of {switchData.length} optical switchs powering professional esports headphones.
          Compare specifications, pro usage data, and see which sensors dominate competitive gaming.
        </p>

        <h2>Driver Rankings</h2>
        <table>
          <caption>Headphone drivers ranked by professional player usage</caption>
          <thead><tr><th>Rank</th><th>Driver</th><th>Headphones</th><th>Pro Usage</th><th>Max Hz</th><th>Brands</th></tr></thead>
          <tbody>
            {switchData.map((s, i) => (
              <tr key={s.switchName}>
                <td>{i + 1}</td>
                <td>{s.switchName}</td>
                <td>{s.headphones.length}</td>
                <td>{s.totalProUsage}%</td>
                <td>{s.maxPolling.toLocaleString()}</td>
                <td>{s.brands.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {switchData.map((s) => (
          <section key={s.switchName}>
            <h2>{s.switchName} — Full Analysis</h2>
            <p>
              The {s.switchName} is found in {s.headphones.length} esports headphones with a combined {s.totalProUsage}% pro usage.
              It supports up to {s.maxPolling.toLocaleString()} Hz polling.
              Average headphone weight with this switch: {s.avgWeight}g. Average price: ${s.avgPrice}.
              Used by: {s.brands.join(", ")}.
            </p>

            <h3>Headphones Using the {s.switchName}</h3>
            <table>
              <thead><tr><th>Headphone</th><th>Brand</th><th>Weight</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr></thead>
              <tbody>
                {s.headphones.sort((a, b) => b?.proUsage - a?.proUsage).map((m) => (
                  <tr key={m.id}>
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

            {s.pros.length > 0 && (
              <>
                <h3>Pro Players Using Headphones</h3>
                <ul>
                  {s.pros.slice(0, 8).map((p) => (
                    <li key={p.name}>
                      <a href={`/players/${slug(p.name)}`}>{p.name}</a> — {p.game} ({p.team}), {p.headphone}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}

        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/compare">Compare Headphones Side by Side</a></li>
          <li><a href="/brands">Headphone Brands</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/trends">Industry Trends</a></li>
          <li><a href="/games">Headphone Usage by Game</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Driver Type">Analytics</SSRTitle>
        <SSRSub>Comprehensive breakdown of {switchData.length} optical switchs powering professional esports headphones. Compare specs, pro usage, and see which sensors dominate.</SSRSub>
        <SSRGrid>
          {switchData.slice(0, 4).map((s) => (
            <SSRStat key={s.switchName} label={s.switchName} value={`${s.totalProUsage}% pro`} color="#00d4ff" />
          ))}
        </SSRGrid>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9e9578" }}>
            Driver Rankings by Pro Usage
          </p>
          <div style={{
            border: "1px solid #e6e3d6",
            borderRadius: "8px",
            overflow: "hidden",
            fontSize: "14px"
          }}>
            {switchData.slice(0, 6).map((s, i) => (
              <div key={s.switchName} style={{
                padding: "12px 16px",
                background: i % 2 === 0 ? "#ffffff" : "#f5f3ea",
                borderLeft: "4px solid #00d4ff",
                borderBottom: i < 5 ? "1px solid #e6e3d6" : "none",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  fontWeight: "bold",
                  color: "#00d4ff",
                  flex: 1
                }}>
                  {s.switchName}
                </span>
                <span style={{
                  fontWeight: "bold",
                  color: "#00d4ff"
                }}>
                  {s.totalProUsage}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones" color="#00d4ff">All Headphones</SSRLink>
          <SSRLink href="/compare" color="#00d4ff">Compare</SSRLink>
          <SSRLink href="/brands" color="#00d4ff">Brands</SSRLink>
          <SSRLink href="/players" color="#00d4ff">Pro Settings</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="sensors" />
    </>
  );
}
