import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, proPlayers, BRAND_COLORS, HEADPHONE_DESCRIPTIONS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "All Esports Headphones — Complete Database & Rankings",
  description: "Browse every headphone used by professional esports players. Filter by brand, weight, driver type, impedance, and price. Compare 150+ gaming headsets with full specs and pro usage statistics.",
  alternates: { canonical: "https://esportsheadphones.com/headphones" },
  openGraph: {
    title: "All Esports Headphones — Complete Database & Rankings",
    description: "Browse every headphone used by professional esports players. 150+ gaming headsets with full specs and pro usage statistics.",
    url: "https://esportsheadphones.com/headphones",
    images: [{ url: "https://esportsheadphones.com/og?title=All+Esports+Headphones&subtitle=Complete+Database+%C2%B7+150%2B+Headsets+%C2%B7+Full+Specs+%C2%B7+Pro+Usage", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HeadphonesPage() {
  const sorted = [...headphones].sort((a, b) => b?.proUsage - a?.proUsage);
  const brands = [...new Set(headphones.map((m) => m.brand))];
  const drivers = [...new Set(headphones.map((m) => m.driverType))];
  const avgWeight = Math.round(headphones.reduce((a, m) => a + m?.weight, 0) / headphones.length);
  const avgPrice = Math.round(headphones.reduce((a, m) => a + m?.price, 0) / headphones.length);
  const lightest = [...headphones].sort((a, b) => a?.weight - b?.weight)[0];
  const heaviest = [...headphones].sort((a, b) => b?.weight - a?.weight)[0];
  const cheapest = [...headphones].sort((a, b) => a?.price - b?.price)[0];
  const mostExpensive = [...headphones].sort((a, b) => b?.price - a?.price)[0];
  const highestRated = [...headphones].sort((a, b) => b.rating - a.rating)[0];
  const wirelessCount = headphones.filter((m) => m.connectivity === "Wireless").length;

  return (
    <>
      {/* ItemList schema for rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Best Esports Headphones Ranked by Pro Usage",
        description: `Top ${headphones.length} professional esports gaming headsets ranked by pro player adoption`,
        numberOfItems: sorted.length,
        itemListElement: sorted.slice(0, 20).map((m, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/headphones/${slug(m.name)}`,
          name: m.name,
          item: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: m.brand }, description: `${m.name} by ${m.brand}. ${m?.weight}g headphone with ${m.driverType} driver. ${m.proUsage}% pro usage.` },
        })),
      }) }} />
      {/* FAQ schema for headphones page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best esports headphone in 2025?", acceptedAnswer: { "@type": "Answer", text: `The ${sorted[0].name} is currently the most used headphone among professional esports players with ${sorted[0].proUsage}% pro usage, followed by the ${sorted[1].name} (${sorted[1].proUsage}%) and ${sorted[2].name} (${sorted[2].proUsage}%). The best choice depends on your comfort, audio preference, and game.` }},
          { "@type": "Question", name: "What is the lightest gaming headphone for esports?", acceptedAnswer: { "@type": "Answer", text: `The ${lightest.name} is the lightest esports headphone in our database at just ${lightest?.weight}g. Ultralight headphones (under 200g) include ${headphones.filter(m => m?.weight < 200).map(m => m.name).join(", ")}. Most pros prefer headphones between 150-250g.` }},
          { "@type": "Question", name: "Are wireless headphones good for esports?", acceptedAnswer: { "@type": "Answer", text: `Yes — ${wirelessCount} of ${headphones.length} (${Math.round(wirelessCount/headphones.length*100)}%) headphones in our pro database are wireless. Modern wireless headphones with low latency have eliminated the connectivity concerns. The vast majority of top esports pros now use wireless headsets.` }},
          { "@type": "Question", name: "How much does a pro esports headphone cost?", acceptedAnswer: { "@type": "Answer", text: `The average price of a pro esports headphone is $${avgPrice}. Prices range from $${cheapest?.price} (${cheapest.name}) to $${mostExpensive?.price} (${mostExpensive.name}). Most competitive headphones fall between $100-$200.` }},
        ],
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>All Esports Gaming Headphones — Complete Database and Rankings</h1>
        <p>
          Browse our complete database of {headphones.length} professional esports gaming headphones used by
          {allPlayers.length.toLocaleString()}+ professional players. Every headphone includes full specifications,
          pro usage statistics, expert ratings, and purchase links.
        </p>

        <h2>Quick Stats</h2>
        <ul>
          <li>Total headphones in database: {headphones.length}</li>
          <li>Average weight: {avgWeight}g</li>
          <li>Average price: ${avgPrice}</li>
          <li>Lightest: <a href={`/headphones/${slug(lightest.name)}`}>{lightest.name}</a> ({lightest?.weight}g)</li>
          <li>Heaviest: <a href={`/headphones/${slug(heaviest.name)}`}>{heaviest.name}</a> ({heaviest?.weight}g)</li>
          <li>Cheapest: <a href={`/headphones/${slug(cheapest.name)}`}>{cheapest.name}</a> (${cheapest?.price})</li>
          <li>Most expensive: <a href={`/headphones/${slug(mostExpensive.name)}`}>{mostExpensive.name}</a> (${mostExpensive?.price})</li>
          <li>Highest rated: <a href={`/headphones/${slug(highestRated.name)}`}>{highestRated.name}</a> ({highestRated.rating}/10)</li>
          <li>Wireless: {wirelessCount} of {headphones.length} ({Math.round(wirelessCount / headphones.length * 100)}%)</li>
          <li>Brands represented: {brands.length}</li>
          <li>Driver types represented: {drivers.length}</li>
        </ul>

        <h2>Esports Headphones Ranked by Pro Usage</h2>
        <table>
          <caption>All {headphones.length} esports headphones sorted by professional player usage</caption>
          <thead>
            <tr><th>Rank</th><th>Headphone</th><th>Brand</th><th>Weight</th><th>Driver</th><th>Impedance</th><th>Frequency</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {sorted.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td><a href={`/headphones/${slug(m.name)}`}>{m.name}</a></td>
                <td><a href="/brands">{m.brand}</a></td>
                <td>{m?.weight}g</td>
                <td><a href="/drivers">{m.driverType}</a></td>
                <td>{m.impedance} Ω</td>
                <td>{m.frequencyResponse} Hz</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td>{m.rating}/10</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Headphones by Weight Category</h2>
        <h3>Ultralight (Under 200g)</h3>
        <ul>
          {headphones.filter((m) => m?.weight < 200).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Lightweight (200-250g)</h3>
        <ul>
          {headphones.filter((m) => m?.weight >= 200 && m?.weight <= 250).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Medium (251-300g)</h3>
        <ul>
          {headphones.filter((m) => m?.weight > 250 && m?.weight <= 300).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Standard (Over 300g)</h3>
        <ul>
          {headphones.filter((m) => m?.weight > 300).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>

        <h2>Headphones by Brand</h2>
        {brands.sort().map((brand) => {
          const brandHeadphones = headphones.filter((m) => m.brand === brand).sort((a, b) => b?.proUsage - a?.proUsage);
          return (
            <section key={brand}>
              <h3><a href="/brands">{brand}</a> ({brandHeadphones.length} headphones)</h3>
              <ul>
                {brandHeadphones.map((m) => (
                  <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g, {m.driverType}, ${m?.price}, {m.proUsage}% pro usage</li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2>Headphones by Driver Type</h2>
        {drivers.map((dr) => {
          const driverHeadphones = headphones.filter((m) => m.driverType === dr);
          return (
            <section key={dr}>
              <h3><a href="/drivers">{dr}</a> ({driverHeadphones.length} headphones)</h3>
              <ul>
                {driverHeadphones.map((m) => (
                  <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> ({m.brand})</li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2>Headphones by Connectivity</h2>
        {[...new Set(headphones.map((m) => m.connectivity))].map((conn) => {
          const connHeadphones = headphones.filter((m) => m.connectivity === conn);
          return (
            <section key={conn}>
              <h3>{conn} Headphones ({connHeadphones.length} headphones)</h3>
              <ul>
                {connHeadphones.map((m) => (
                  <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> ({m.brand}, {m?.weight}g)</li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2>Headphones by Price Range</h2>
        <h3>Budget (Under $100)</h3>
        <ul>
          {headphones.filter((m) => m?.price < 100).sort((a, b) => a?.price - b?.price).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand})</li>
          ))}
        </ul>
        <h3>Mid-Range ($100-$200)</h3>
        <ul>
          {headphones.filter((m) => m?.price >= 100 && m?.price <= 200).sort((a, b) => a?.price - b?.price).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand})</li>
          ))}
        </ul>
        <h3>Premium (Over $200)</h3>
        <ul>
          {headphones.filter((m) => m?.price > 200).sort((a, b) => a?.price - b?.price).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand})</li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/players">Pro Player Settings and Gear</a></li>
          <li><a href="/brands">Brand Comparison and Analysis</a></li>
          <li><a href="/drivers">Driver Type Analytics and Comparison</a></li>
          <li><a href="/compare">Compare Any Two Headphones Side by Side</a></li>
          <li><a href="/games">Headphone Usage by Esports Game</a></li>
          <li><a href="/trends">Headphone Industry Trends 2019-2025</a></li>
          <li><a href="/lab">Headphone Finder Quiz</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="All">Esports Headphones</SSRTitle>
        <SSRSub>Complete database of {headphones.length} professional esports gaming headphones with full specs, pro usage stats, and expert ratings.</SSRSub>
        <SSRGrid>
          <SSRStat label="Total Headphones" value={headphones.length} color="#b8956a" />
          <SSRStat label="Avg Weight" value={`${avgWeight}g`} color="#b8956a" />
          <SSRStat label="Avg Price" value={`$${avgPrice}`} color="#b8956a" />
          <SSRStat label="Wireless" value={`${Math.round(wirelessCount/headphones.length*100)}%`} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/drivers">Drivers</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="headphones" />
    </>
  );
}
