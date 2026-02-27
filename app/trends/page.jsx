export const dynamic = "force-dynamic";
import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, weightTrend, pollingTrend, wirelessTrend, priceTrend } from "@/data";

const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const metadata = {
  title: "Trends — Esports Headphone Industry Trends & Data",
  description: "Track the evolution of pro esports headphones from 2019-2025. Weight trends, polling rate adoption, wireless growth, price changes, brand dominance shifts, and technology adoption data.",
  alternates: { canonical: "https://esportsheadphones.com/trends" },
  openGraph: {
    title: "Trends — Esports Headphone Industry Trends & Data",
    description: "Track the evolution of pro esports headphones from 2019-2025.",
    url: "https://esportsheadphones.com/trends",
    images: [{ url: "https://esportsheadphones.com/og?title=Trends&subtitle=Weight+%C2%B7+Polling+Rate+%C2%B7+Wireless+%C2%B7+Price+%C2%B7+2019-2025", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function TrendsPage() {
  const under50 = headphones.filter((m) => m?.weight < 50);
  const over4k = headphones.filter((m) => m.pollingRate >= 4000);
  const over8k = headphones.filter((m) => m.pollingRate >= 8000);
  const wireless = headphones.filter((m) => m.connectivity === "Wireless");
  const under100 = headphones.filter((m) => m?.price < 100);

  const byYear = {};
  headphones.forEach((m) => { if (m.releaseYear) { if (!byYear[m.releaseYear]) byYear[m.releaseYear] = []; byYear[m.releaseYear].push(m); } });

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Esports Headphone Industry Trends — Data from 2019 to 2025</h1>
        <p>
          The professional esports headphone landscape has transformed dramatically. From the ultralight revolution
          to 8KHz polling rates and near-universal wireless adoption, competitive peripherals have evolved
          faster in the past 5 years than in the previous 20.
        </p>

        <h2>Current State of Pro Esports Headphones</h2>
        <ul>
          <li>Headphones under 500g: {under50.length} — {under50.map((m) => <span key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> ({m?.weight}g), </span>)}</li>
          <li>4KHz+ polling rate: {over4k.length} headphones ({Math.round(over4k.length/headphones.length*100)}% of database)</li>
          <li>8KHz polling rate: {over8k.length} headphones</li>
          <li>Wireless: {wireless.length} of {headphones.length} ({Math.round(wireless.length/headphones.length*100)}%)</li>
          <li>Under $100: {under100.length} headphones</li>
        </ul>

        <h2>Average Headphone Weight Trend</h2>
        <p>The weight race defined the early 2020s, with brands competing to hit new lows while maintaining structural integrity.</p>
        <table>
          <caption>Average esports headphone weight by year</caption>
          <thead><tr><th>Year</th><th>Avg Weight</th><th>Change</th></tr></thead>
          <tbody>{weightTrend.map((d, i) => (
            <tr key={d.year}><td>{d.year}</td><td>{d.avgWeight || d?.weight}g</td><td>{i > 0 ? `${((d.avgWeight || d?.weight) - (weightTrend[i-1].avgWeight || weightTrend[i-1].weight)).toFixed(1)}g` : "—"}</td></tr>
          ))}</tbody>
        </table>

        <h2>Maximum Polling Rate Trend</h2>
        <p>Polling rates skyrocketed from the universal 1000Hz standard to 8000Hz, cutting input latency from 1ms to 0.125ms.</p>
        <table>
          <caption>Maximum available polling rate by year</caption>
          <thead><tr><th>Year</th><th>Max Hz</th><th>Latency</th></tr></thead>
          <tbody>{pollingTrend.map((d) => (
            <tr key={d.year}><td>{d.year}</td><td>{(d.max || d.avg || 0).toLocaleString()} Hz</td><td>{(1000/(d.max || d.avg || 1000)).toFixed(3)}ms</td></tr>
          ))}</tbody>
        </table>

        <h2>Wireless Adoption Trend</h2>
        <p>Wireless went from a competitive disadvantage to the dominant choice for professionals.</p>
        <table>
          <caption>Wireless headphone adoption in professional esports</caption>
          <thead><tr><th>Year</th><th>Wireless %</th></tr></thead>
          <tbody>{wirelessTrend.map((d) => <tr key={d.year}><td>{d.year}</td><td>{d.wireless}%</td></tr>)}</tbody>
        </table>

        <h2>Average Price Trend</h2>
        <table>
          <caption>Average esports headphone price by year</caption>
          <thead><tr><th>Year</th><th>Avg Price</th></tr></thead>
          <tbody>{priceTrend.map((d) => <tr key={d.year}><td>{d.year}</td><td>${d?.price}</td></tr>)}</tbody>
        </table>

        <h2>Headphones Released by Year</h2>
        {Object.entries(byYear).sort((a, b) => b[0] - a[0]).map(([year, yearMice]) => (
          <section key={year}>
            <h3>{year} Releases ({yearMice.length} headphones)</h3>
            <ul>
              {yearMice.map((m) => (
                <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> ({m.brand}) — {m?.weight}g, ${m?.price}</li>
              ))}
            </ul>
          </section>
        ))}

        <h2>Key Technology Milestones</h2>
        <ul>
          <li>2020 — Logitech G Pro X Mechanical popularizes premium mechanical headphones for esports</li>
          <li>2021 — Wooting 60HE introduces rapid trigger to mainstream competitive gaming</li>
          <li>2022 — Razer introduces 4KHz wireless polling with HyperPolling dongle</li>
          <li>2023 — Multiple brands offer 4KHz polling as standard</li>
          <li>2024 — 8KHz polling becomes available; sub-45g wireless headphones proliferate</li>
          <li>2025 — HITS (magnetic induction) driveres debut in Logitech Superstrike; PAW3950 driver launches</li>
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/brands">Brand Comparison</a></li>
          <li><a href="/driveres">Driver Analytics</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/games">Headphone Usage by Game</a></li>
          <li><a href="/compare">Compare Headphones</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Industry">Trends</SSRTitle>
        <SSRSub>How professional esports headphones have evolved from 2019 to 2025 — weight, polling rate, wireless adoption, and pricing data.</SSRSub>
        <SSRGrid>
          <SSRStat label="Under 50g" value={`${under50.length} headphones`} color="#b8956a" />
          <SSRStat label="8KHz Polling" value={`${over8k.length} headphones`} color="#b8956a" />
          <SSRStat label="Wireless" value={`${Math.round(wireless.length/headphones.length*100)}%`} color="#b8956a" />
          <SSRStat label="Under $100" value={`${under100.length} headphones`} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/driveres">Driveres</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="trends" />
    </>
  );
}
