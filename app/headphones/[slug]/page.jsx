import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, HEADPHONE_DESCRIPTIONS, BRAND_COLORS, HEADPHONE_IMAGE_URLS, allPlayers, amazonLink } from "@/data";

export function generateStaticParams() {
  return headphones.map((kb) => ({
    slug: kb.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
  }));
}

export function generateMetadata({ params }) {
  const kb = headphones.find(
    (m) => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === params.slug
  );
  if (!kb) {
    return { title: "Headphone Not Found" };
  }
  const desc = HEADPHONE_DESCRIPTIONS[kb.name];
  const description = desc
    ? desc.text.slice(0, 155) + "..."
    : `${kb.name} by ${kb.brand} — ${kb?.weight}g, ${kb.driverType} switch, ${kb.frequencyResponse}Hz polling, $${kb?.price}. Used by ${kb?.proUsage}% of tracked pro esports players.`;

  return {
    title: `${kb.name} — Pro Esports Headphone Review & Stats`,
    description,
    alternates: { canonical: `https://esportsheadphones.com/headphones/${params.slug}` },
    openGraph: {
      title: `${kb.name} — Pro Esports Headphone Review & Stats`,
      description,
      url: `https://esportsheadphones.com/headphones/${params.slug}`,
      images: [{
        url: `https://esportsheadphones.com/og?title=${encodeURIComponent(kb.name)}&subtitle=${encodeURIComponent(`${kb.brand} · ${kb.driverType}`)}&badge=${encodeURIComponent(kb.brand)}&accent=${encodeURIComponent(BRAND_COLORS[kb.brand] || '#b8956a')}&stat1=${encodeURIComponent(kb?.weight + 'g')}&s1Label=Weight&stat2=${encodeURIComponent(kb?.proUsage + '%')}&s2Label=Pro+Usage&stat3=${encodeURIComponent('$' + kb?.price)}&s3Label=Price`,
        width: 1200, height: 630,
        alt: `${kb.name} by ${kb.brand} - esports gaming headphone`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${kb.name} — Pro Esports Headphone Review & Stats`,
      description,
      images: [`https://esportsheadphones.com/og?title=${encodeURIComponent(kb.name)}&subtitle=${encodeURIComponent(`${kb.brand} · ${kb.driverType}`)}&badge=${encodeURIComponent(kb.brand)}&accent=${encodeURIComponent(BRAND_COLORS[kb.brand] || '#b8956a')}&stat1=${encodeURIComponent(kb?.weight + 'g')}&s1Label=Weight&stat2=${encodeURIComponent(kb?.proUsage + '%')}&s2Label=Pro+Usage&stat3=${encodeURIComponent('$' + kb?.price)}&s3Label=Price`],
    },
  };
}

export default function MouseDetailPage({ params }) {
  const kb = headphones.find(
    (m) => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === params.slug
  );
  if (!kb) return <EsportsHeadphones initialTab="overview" />;

  const desc = HEADPHONE_DESCRIPTIONS[kb.name];
  const usedBy = allPlayers.filter((p) => {
    const mn = kb.name.toLowerCase();
    const pm = (p.headphone || "").toLowerCase();
    return pm && (pm === mn || pm.includes(mn) || mn.includes(pm));
  }).slice(0, 30);
  const imgUrl = HEADPHONE_IMAGE_URLS[kb.name];

  return (
    <>
      {/* JSON-LD Product structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: kb.name,
        brand: { "@type": "Brand", name: kb.brand },
        description: desc ? desc.text.slice(0, 300) : `${kb.name} by ${kb.brand}. ${kb?.weight}g ${kb.formFactor.toLowerCase()} gaming headphone with ${kb.driverType} switch, ${kb.frequencyResponse >= 1000 ? `${kb.frequencyResponse / 1000}K` : kb.frequencyResponse}Hz polling. Used by ${kb?.proUsage}% of pro esports players.`,
        ...(imgUrl ? { image: `https://esportsheadphones.com${imgUrl}` } : {}),
        offers: {
          "@type": "Offer",
          price: String(kb?.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: amazonLink(kb.name),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(kb.rating),
          bestRating: "10",
          ratingCount: String(Math.max(usedBy.length, 1)),
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Weight", value: `${kb?.weight}g` },
          { "@type": "PropertyValue", name: "Driver Type", value: kb.driverType },
          { "@type": "PropertyValue", name: "Freq. Response", value: `${kb.frequencyResponse}Hz` },
          { "@type": "PropertyValue", name: "Shape", value: kb.formFactor },
          { "@type": "PropertyValue", name: "Connectivity", value: kb.connectivity || kb.cable || "Wired" },
          { "@type": "PropertyValue", name: "Pro Usage", value: `${kb?.proUsage}%` },
        ],
      }) }} />
      {/* Breadcrumb JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportsheadphones.com" },
          { "@type": "ListItem", position: 2, name: "Headphones", item: "https://esportsheadphones.com/headphones" },
          { "@type": "ListItem", position: 3, name: kb.name, item: `https://esportsheadphones.com/headphones/${params.slug}` },
        ],
      }) }} />
      {/* Server-rendered SEO content — in the HTML for crawlers, visually hidden */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/Product"
      >
        <h1 itemProp="name">{kb.name} — Professional Esports Gaming Headphone Review and Stats</h1>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content={kb.brand} />
        </div>
        {imgUrl && <meta itemProp="image" content={`https://esportsheadphones.com${imgUrl}`} />}
        <meta itemProp="description" content={desc ? desc.text : `${kb.name} by ${kb.brand}. ${kb?.weight}g, ${kb.driverType} switch, ${kb.frequencyResponse}Hz frequency response.`} />
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="price" content={String(kb?.price)} />
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <meta itemProp="url" content={amazonLink(kb.name)} />
        </div>
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="ratingValue" content={String(kb.rating)} />
          <meta itemProp="bestRating" content="10" />
          <meta itemProp="ratingCount" content="1" />
        </div>

        <h2>About the {kb.name}</h2>
        {desc ? <p>{desc.text}</p> : (
          <p>
            The {kb.name} is a {(kb.connectivity || kb.cable || "wired").toLowerCase()} {(kb.formFactor || "over-ear").toLowerCase()} gaming headphone
            made by {kb.brand}. It weighs {kb?.weight} grams and uses the {kb.driverType} switch
            with {kb.frequencyResponse >= 1000 ? `${kb.frequencyResponse / 1000}K` : kb.frequencyResponse}Hz
            frequency response. It is priced at ${kb?.price} USD and rated {kb.rating}/10.
          </p>
        )}

        <h2>{kb.name} Full Specifications</h2>
        <table>
          <caption>Complete specifications for the {kb.name} by {kb.brand}</caption>
          <tbody>
            <tr><th>Brand</th><td><a href={`/brands/${kb.brand.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{kb.brand}</a></td></tr>
            <tr><th>Weight</th><td>{kb?.weight} grams</td></tr>
            <tr><th>Driver</th><td><a href={`/sensors/${kb.driverType.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{kb.driverType}</a></td></tr>
            <tr><th>Freq. Response</th><td>{kb.frequencyResponse.toLocaleString()} Hz</td></tr>
            <tr><th>Layout</th><td><a href={`/shapes/${kb.formFactor.toLowerCase()}`}>{kb.formFactor}</a></td></tr>
            <tr><th>Connectivity</th><td>{kb.connectivity || kb.cable || "Wired"}</td></tr>
            <tr><th>Price</th><td>${kb?.price} USD</td></tr>
            <tr><th>Drivers</th><td>{kb.driverType}</td></tr>
            {kb.batteryLife && <tr><th>Battery Life</th><td>{kb.batteryLife} hours</td></tr>}
            <tr><th>Release Year</th><td>{kb.releaseYear}</td></tr>
            <tr><th>Pro Usage</th><td>{kb?.proUsage}% of tracked professional players</td></tr>
            <tr><th>Rating</th><td>{kb.rating} out of 10</td></tr>
          </tbody>
        </table>

        {usedBy.length > 0 && (
          <>
            <h2>Professional Players Using the {kb.name}</h2>
            <p>The {kb.name} is used by {usedBy.length}+ professional esports players across {[...new Set(usedBy.map((p) => p.game))].map((g, i, arr) => (
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

        {desc?.highlights && (
          <><h2>Key Highlights</h2><ul>{desc.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul></>
        )}

        <p><a href={amazonLink(kb.name)}>Buy the {kb.name} on Amazon for ${kb?.price}</a></p>

        {/* Other headphones by the same brand */}
        {(() => {
          const sameBrand = headphones.filter((m) => m.brand === kb.brand && m.id !== kb.id);
          if (!sameBrand.length) return null;
          return (
            <>
              <h2>Other {kb.brand} Esports Headphones</h2>
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

        {/* Headphones with the same switch */}
        {(() => {
          const sameSensor = headphones.filter((m) => m.driverType === kb.driverType && m.id !== kb.id);
          if (!sameSensor.length) return null;
          return (
            <>
              <h2>Other Headphones with {kb.driverType} drivers</h2>
              <ul>
                {sameSensor.map((m) => (
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
            .filter((m) => m.id !== kb.id && Math.abs(m?.weight - kb?.weight) <= 10)
            .sort((a, b) => Math.abs(a?.weight - kb?.weight) - Math.abs(b?.weight - kb?.weight))
            .slice(0, 8);
          if (!similar.length) return null;
          return (
            <>
              <h2>Similar Weight Esports Headphones (±10g of {kb?.weight}g)</h2>
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

        {/* Same shape headphones */}
        {(() => {
          const sameShape = headphones.filter((m) => m.formFactor === kb.formFactor && m.id !== kb.id).slice(0, 8);
          if (!sameShape.length) return null;
          return (
            <>
              <h2>Other {kb.formFactor} Shape Esports Headphones</h2>
              <ul>
                {sameShape.map((m) => (
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
            <li><a href="/brands">{kb.brand} and Other Brands</a></li>
            <li><a href="/drivers">{kb.driverType} and Other Sensors</a></li>
            <li><a href="/compare">Compare {kb.name} vs Other Headphones</a></li>
            <li><a href="/games">Headphone Usage by Game</a></li>
            <li><a href="/trends">Headphone Industry Trends</a></li>
            <li><a href="/shapes">{kb.name} Shape Dimensions</a></li>
            <li><a href="/sensitivity">Sensitivity Converter</a></li>
            <li><a href="/lab">Headphone Finder Quiz</a></li>
            <li><a href="/">EsportsHeadphones Home</a></li>
          </ul>
        </nav>
      </article>

      {/* Visible server-rendered content */}
      <SSRSection>
        <SSRTitle accent={kb.brand}>{kb.name}</SSRTitle>

        {/* Review Card Score Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem", marginTop: "1rem" }}>
          <div style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: BRAND_COLORS[kb.brand] || "#b8956a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#f5f0e8", lineHeight: "1" }}>
              {kb.rating}
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
            ? desc.text.slice(0, 280) + "..."
            : `The ${kb.name} is a ${kb?.weight}g ${(kb.connectivity || kb.cable || "wired").toLowerCase()} ${(kb.formFactor || "over-ear").toLowerCase()} gaming headphone by ${kb.brand}, featuring the ${kb.driverType} driver with ${kb.frequencyResponse >= 1000 ? `${kb.frequencyResponse / 1000}K` : kb.frequencyResponse}Hz frequency response. Used by ${kb?.proUsage}% of tracked professional esports players.`
          }
        </SSRSub>

        {/* Key Specs Section */}
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1614", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
            Key Specs
          </div>
          <SSRGrid>
            <SSRStat label="Weight" value={`${kb?.weight}g`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Driver Type" value={kb.driverType} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Freq. Response" value={`${kb.frequencyResponse >= 1000 ? `${kb.frequencyResponse / 1000}K` : kb.frequencyResponse}Hz`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Layout" value={kb.formFactor} color={BRAND_COLORS[kb.brand]} />
          </SSRGrid>
        </div>

        {/* Value & Adoption Section */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1614", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
            Value & Adoption
          </div>
          <SSRGrid>
            <SSRStat label="Price" value={`$${kb?.price}`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Pro Usage" value={`${kb?.proUsage}%`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Rating" value={`${kb.rating}/10`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Connectivity" value={kb.connectivity || kb.cable || "Wired"} color={BRAND_COLORS[kb.brand]} />
          </SSRGrid>
        </div>

        {/* Verdict Section */}
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f5f0e8",
          borderLeft: `4px solid ${BRAND_COLORS[kb.brand] || "#b8956a"}`,
          marginBottom: "2rem",
          fontStyle: "italic",
          color: "#1a1614",
          fontSize: "14px",
          lineHeight: "1.6"
        }}>
          The {kb.name} is a {kb.formFactor} headphone from {kb.brand} with {kb.driverType} drivers — used by {kb?.proUsage}% of tracked pros.
        </div>

        {usedBy.length > 0 && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#a09890" }}>
              Used by {usedBy.length}+ pros including
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {usedBy.slice(0, 8).map((p) => (
                <SSRLink key={p.name} href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`} color={BRAND_COLORS[kb.brand]}>
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
          <SSRLink href="/brands">{kb.brand}</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="headphoneDetail" initialHeadphoneSlug={params.slug} />
    </>
  );
}
