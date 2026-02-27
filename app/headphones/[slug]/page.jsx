import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, HEADPHONE_DESCRIPTIONS, BRAND_COLORS, HEADPHONE_IMAGE_URLS, allPlayers, amazonLink } from "@/data";

export function generateStaticParams() {
  return headphones.map((hp) => ({
    slug: hp.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
  }));
}

export function generateMetadata({ params }) {
  const hp = headphones.find(
    (m) => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === params.slug
  );
  if (!hp) {
    return { title: "Headphone Not Found" };
  }
  const desc = HEADPHONE_DESCRIPTIONS[hp.name];
  const description = desc
    ? (desc?.text?.slice(0, 155) ?? "") + "..."
    : `${hp.name} by ${hp.brand} — ${hp?.weight ?? 0}g, ${hp.driverType || "Unknown"} driver, ${hp.impedance ?? 0}Ω impedance, $${hp?.price ?? 0}. Used by ${hp?.proUsage ?? 0}% of tracked pro esports players.`;

  return {
    title: `${hp.name} — Pro Esports Headphone Review & Stats`,
    description,
    alternates: { canonical: `https://esportsheadphones.com/headphones/${params.slug}` },
    openGraph: {
      title: `${hp.name} — Pro Esports Headphone Review & Stats`,
      description,
      url: `https://esportsheadphones.com/headphones/${params.slug}`,
      images: [{
        url: `https://esportsheadphones.com/og?title=${encodeURIComponent(hp.name)}&subtitle=${encodeURIComponent(`${hp.brand} · ${hp.driverType}`)}&badge=${encodeURIComponent(hp.brand)}&accent=${encodeURIComponent(BRAND_COLORS[hp.brand] || '#b8956a')}&stat1=${encodeURIComponent(hp?.weight + 'g')}&s1Label=Weight&stat2=${encodeURIComponent(hp?.proUsage + '%')}&s2Label=Pro+Usage&stat3=${encodeURIComponent('$' + hp?.price)}&s3Label=Price`,
        width: 1200, height: 630,
        alt: `${hp.name} by ${hp.brand} - esports gaming headphone`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${hp.name} — Pro Esports Headphone Review & Stats`,
      description,
      images: [`https://esportsheadphones.com/og?title=${encodeURIComponent(hp.name)}&subtitle=${encodeURIComponent(`${hp.brand} · ${hp.driverType}`)}&badge=${encodeURIComponent(hp.brand)}&accent=${encodeURIComponent(BRAND_COLORS[hp.brand] || '#b8956a')}&stat1=${encodeURIComponent(hp?.weight + 'g')}&s1Label=Weight&stat2=${encodeURIComponent(hp?.proUsage + '%')}&s2Label=Pro+Usage&stat3=${encodeURIComponent('$' + hp?.price)}&s3Label=Price`],
    },
  };
}

export default function HeadphoneDetailPage({ params }) {
  const hp = headphones.find(
    (m) => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === params.slug
  );
  if (!hp) return <EsportsHeadphones initialTab="overview" />;

  const desc = HEADPHONE_DESCRIPTIONS[hp.name];
  const usedBy = allPlayers.filter((p) => {
    const mn = hp.name.toLowerCase();
    const pm = (p.headphone || "").toLowerCase();
    return pm === mn || pm.includes(mn) || mn.includes(pm);
  }).slice(0, 30);
  const imgUrl = HEADPHONE_IMAGE_URLS[hp.name];

  return (
    <>
      {/* JSON-LD Product structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: hp.name,
        brand: { "@type": "Brand", name: hp.brand },
        description: desc ? (typeof desc === "string" ? desc : (desc.text || "")).slice(0, 300) : `${hp.name} by ${hp.brand}. ${hp?.weight ?? 0}g gaming headphone with ${hp.driverType || "Unknown"} driver. Used by ${hp?.proUsage ?? 0}% of pro esports players.`,
        ...(imgUrl ? { image: `https://esportsheadphones.com${imgUrl}` } : {}),
        offers: {
          "@type": "Offer",
          price: String(hp?.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: amazonLink(hp.name),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(hp.rating),
          bestRating: "10",
          ratingCount: String(Math.max(usedBy.length, 1)),
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Weight", value: `${hp?.weight}g` },
          { "@type": "PropertyValue", name: "Driver Type", value: hp.driverType },
          { "@type": "PropertyValue", name: "Impedance", value: `${hp.impedance}Ω` },
          { "@type": "PropertyValue", name: "Frequency Response", value: `${hp.frequencyResponse} Hz` },
          { "@type": "PropertyValue", name: "Connectivity", value: hp.connectivity },
          { "@type": "PropertyValue", name: "Pro Usage", value: `${hp?.proUsage}%` },
        ],
      }) }} />
      {/* Breadcrumb JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportsheadphones.com" },
          { "@type": "ListItem", position: 2, name: "Headphones", item: "https://esportsheadphones.com/headphones" },
          { "@type": "ListItem", position: 3, name: hp.name, item: `https://esportsheadphones.com/headphones/${params.slug}` },
        ],
      }) }} />
      {/* Server-rendered SEO content — in the HTML for crawlers, visually hidden */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/Product"
      >
        <h1 itemProp="name">{hp.name} — Professional Esports Gaming Headphone Review and Stats</h1>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content={hp.brand} />
        </div>
        {imgUrl && <meta itemProp="image" content={`https://esportsheadphones.com${imgUrl}`} />}
        <meta itemProp="description" content={desc ? (typeof desc === "string" ? desc : (desc.text || "")) : `${hp.name} by ${hp.brand}. ${hp?.weight ?? 0}g, ${hp.driverType || "Unknown"} driver.`} />
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="price" content={String(hp?.price)} />
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <meta itemProp="url" content={amazonLink(hp.name)} />
        </div>
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="ratingValue" content={String(hp.rating)} />
          <meta itemProp="bestRating" content="10" />
          <meta itemProp="ratingCount" content="1" />
        </div>

        <h2>About the {hp.name}</h2>
        {desc ? <p>{typeof desc === "string" ? desc : (desc.text || "")}</p> : (
          <p>
            The {hp.name} is a {hp.connectivity.toLowerCase()} gaming headphone
            made by {hp.brand}. It weighs {hp?.weight} grams and features the {hp.driverType} driver
            with {hp.impedance}Ω impedance and {hp.frequencyResponse} Hz frequency response. It is priced at ${hp?.price} USD and rated {hp.rating}/10.
          </p>
        )}

        <h2>{hp.name} Full Specifications</h2>
        <table>
          <caption>Complete specifications for the {hp.name} by {hp.brand}</caption>
          <tbody>
            <tr><th>Brand</th><td><a href={`/brands/${hp.brand.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{hp.brand}</a></td></tr>
            <tr><th>Weight</th><td>{hp?.weight} grams</td></tr>
            <tr><th>Driver Type</th><td>{hp.driverType ? <a href={`/drivers/${hp.driverType.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{hp.driverType}</a> : "—"}</td></tr>
            <tr><th>Impedance</th><td>{hp.impedance} Ω</td></tr>
            <tr><th>Frequency Response</th><td>{hp.frequencyResponse} Hz</td></tr>
            <tr><th>Connectivity</th><td>{hp.connectivity}</td></tr>
            <tr><th>Price</th><td>${hp?.price} USD</td></tr>
            <tr><th>Battery Life</th><td>{hp.batteryLife} hours</td></tr>
            <tr><th>Release Year</th><td>{hp.releaseYear}</td></tr>
            <tr><th>Pro Usage</th><td>{hp?.proUsage}% of tracked professional players</td></tr>
            <tr><th>Rating</th><td>{hp.rating} out of 10</td></tr>
          </tbody>
        </table>

        {usedBy.length > 0 && (
          <>
            <h2>Professional Players Using the {hp.name}</h2>
            <p>The {hp.name} is used by {usedBy.length}+ professional esports players across {[...new Set(usedBy.map((p) => p.game))].map((g, i, arr) => (
              <span key={g}>{i > 0 && (i === arr.length - 1 ? " and " : ", ")}<a href={`/games/${g.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{g}</a></span>
            ))}.</p>
            <ul>
              {usedBy.map((p, i) => (
                <li key={i}>
                  <a href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{p.name}</a>
                  {" "}— <a href={`/games/${p.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{p.game}</a> (<a href={`/teams/${p.team.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{p.team}</a>)
                </li>
              ))}
            </ul>
          </>
        )}

        {desc && typeof desc !== "string" && desc.highlights && (
          <><h2>Key Highlights</h2><ul>{desc.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul></>
        )}

        <p><a href={amazonLink(hp.name)}>Buy the {hp.name} on Amazon for ${hp?.price}</a></p>

        {/* Other headphones by the same brand */}
        {(() => {
          const sameBrand = headphones.filter((m) => m.brand === hp.brand && m.id !== hp.id);
          if (!sameBrand.length) return null;
          return (
            <>
              <h2>Other {hp.brand} Esports Headphones</h2>
              <ul>
                {sameBrand.map((m) => (
                  <li key={m.id}>
                    <a href={`/headphones/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}— {m?.weight}g, {m.proUsage}% pro usage, ${m?.price}
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        {/* Headphones with the same driver */}
        {(() => {
          const sameDriver = headphones.filter((m) => m.driverType === hp.driverType && m.id !== hp.id);
          if (!sameDriver.length) return null;
          return (
            <>
              <h2>Other Headphones with {hp.driverType} drivers</h2>
              <ul>
                {sameDriver.map((m) => (
                  <li key={m.id}>
                    <a href={`/headphones/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}({m.brand}) — {m?.weight}g, ${m?.price}
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        {/* Similar headphones by weight */}
        {(() => {
          const similar = headphones
            .filter((m) => m.id !== hp.id && Math.abs(m?.weight - hp?.weight) <= 50)
            .sort((a, b) => Math.abs(a?.weight - hp?.weight) - Math.abs(b?.weight - hp?.weight))
            .slice(0, 8);
          if (!similar.length) return null;
          return (
            <>
              <h2>Similar Weight Esports Headphones (±50g of {hp?.weight}g)</h2>
              <ul>
                {similar.map((m) => (
                  <li key={m.id}>
                    <a href={`/headphones/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}({m.brand}) — {m?.weight}g, {m.proUsage}% pro usage
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        {/* Same connectivity headphones */}
        {(() => {
          const sameConnectivity = headphones.filter((m) => m.connectivity === hp.connectivity && m.id !== hp.id).slice(0, 8);
          if (!sameConnectivity.length) return null;
          return (
            <>
              <h2>Other {hp.connectivity} Esports Headphones</h2>
              <ul>
                {sameConnectivity.map((m) => (
                  <li key={m.id}>
                    <a href={`/headphones/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}({m.brand}) — {m?.weight}g, ${m?.price}
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        <nav aria-label="Related pages">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/headphones">All Esports Headphones</a></li>
            <li><a href="/players">Pro Player Settings</a></li>
            <li><a href="/brands">{hp.brand} and Other Brands</a></li>
            <li><a href="/drivers">{hp.driverType} and Other Drivers</a></li>
            <li><a href="/compare">Compare {hp.name} vs Other Headphones</a></li>
            <li><a href="/games">Headphone Usage by Game</a></li>
            <li><a href="/trends">Headphone Industry Trends</a></li>
            <li><a href="/lab">Headphone Finder Quiz</a></li>
            <li><a href="/">EsportsHeadphones Home</a></li>
          </ul>
        </nav>
      </article>

      {/* Visible server-rendered content */}
      <SSRSection>
        <SSRTitle accent={hp.brand}>{hp.name}</SSRTitle>

        {/* Review Card Score Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem", marginTop: "1rem" }}>
          <div style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: BRAND_COLORS[hp.brand] || "#b8956a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#f5f0e8", lineHeight: "1" }}>
              {hp.rating}
            </div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#f5f0e8", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Editor's
            </div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#f5f0e8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Rating
            </div>
          </div>
        </div>

        <SSRSub>
          {desc
            ? (typeof desc === "string" ? desc : (desc.text || "")).slice(0, 280) + "..."
            : `The ${hp.name} is a ${hp?.weight}g ${hp.connectivity.toLowerCase()} gaming headphone by ${hp.brand}, featuring the ${hp.driverType} driver with ${hp.impedance}Ω impedance. Used by ${hp?.proUsage}% of tracked professional esports players.`
          }
        </SSRSub>

        {/* Key Specs Section */}
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1614", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
            Key Specs
          </div>
          <SSRGrid>
            <SSRStat label="Weight" value={`${hp?.weight}g`} color={BRAND_COLORS[hp.brand]} />
            <SSRStat label="Driver Type" value={hp.driverType} color={BRAND_COLORS[hp.brand]} />
            <SSRStat label="Impedance" value={`${hp.impedance}Ω`} color={BRAND_COLORS[hp.brand]} />
            <SSRStat label="Frequency" value={`${hp.frequencyResponse} Hz`} color={BRAND_COLORS[hp.brand]} />
          </SSRGrid>
        </div>

        {/* Value & Adoption Section */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1614", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
            Value & Adoption
          </div>
          <SSRGrid>
            <SSRStat label="Price" value={`$${hp?.price}`} color={BRAND_COLORS[hp.brand]} />
            <SSRStat label="Pro Usage" value={`${hp?.proUsage}%`} color={BRAND_COLORS[hp.brand]} />
            <SSRStat label="Rating" value={`${hp.rating}/10`} color={BRAND_COLORS[hp.brand]} />
            <SSRStat label="Connectivity" value={hp.connectivity} color={BRAND_COLORS[hp.brand]} />
          </SSRGrid>
        </div>

        {/* Verdict Section */}
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f5f0e8",
          borderLeft: `4px solid ${BRAND_COLORS[hp.brand] || "#b8956a"}`,
          marginBottom: "2rem",
          fontStyle: "italic",
          color: "#1a1614",
          fontSize: "14px",
          lineHeight: "1.6"
        }}>
          The {hp.name} is a headphone from {hp.brand} with {hp.driverType} drivers — used by {hp?.proUsage}% of tracked pros.
        </div>

        {usedBy.length > 0 && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#a09890" }}>
              Used by {usedBy.length}+ pros including
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {usedBy.slice(0, 8).map((p) => (
                <SSRLink key={p.name} href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`} color={BRAND_COLORS[hp.brand]}>
                  {p.name} · {p.game}
                </SSRLink>
              ))}
            </div>
          </>
        )}
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/drivers">Drivers</SSRLink>
          <SSRLink href="/brands">{hp.brand}</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="headphoneDetail" initialHeadphoneSlug={params.slug} />
    </>
  );
}
