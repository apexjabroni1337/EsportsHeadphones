import EsportsHeadphones from "@/components/ClientApp";
import { headphones, allPlayers, BRAND_COLORS, HEADPHONE_DIMS, amazonLink } from "@/data";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const SHAPES = {
  symmetrical: {
    title: "Symmetrical",
    aka: "Ambidextrous",
    description: "Symmetrical (ambidextrous) headphones have a mirror-image design that is identical on both sides. They are the dominant shape in professional esports, favored by claw and fingertip grip players for their versatility and precision. The symmetrical form allows rapid micro-adjustments and consistent tracking regardless of how you position your hand. Notable symmetrical designs include the Wooting 60HE, Razer Huntsman V3 Pro Mini, and Logitech G Pro X 60. Over 70% of professional FPS players use symmetrical headphones.",
    gripAdvice: "Best for claw grip and fingertip grip. Palm grip users with smaller hands can also be comfortable with larger symmetrical headphones. The flat sides provide consistent contact points for precise control during fast flick movements.",
    prosAdvice: "Symmetrical headphones dominate competitive FPS because they allow the widest range of grip adjustments mid-game. Players can shift their hand position forward for aggressive play or back for passive angles without losing control. The consistent side profile also makes it easier to develop muscle memory for consistent aim.",
  },
  ergonomic: {
    title: "Ergonomic",
    aka: "Right-Handed",
    description: "Ergonomic (right-handed) headphones feature an asymmetric design that curves to fit the natural resting position of the right hand. They provide superior comfort for long sessions by reducing wrist strain and encouraging a more relaxed grip. Classic ergonomic designs like the Razer Huntsman Elite, Corsair K70, and Vaxee Outset have been staples in professional gaming for over a decade. While less common than symmetrical headphones in the pro scene, ergonomic headphones are preferred by players who prioritize comfort and use a palm or relaxed claw grip.",
    gripAdvice: "Best for palm grip and relaxed claw grip. The contoured shape fills the hand naturally, reducing the need for grip pressure. Not recommended for fingertip grip due to the pronounced hump and curved sides.",
    prosAdvice: "Ergonomic headphones are favored by players who play long sessions or who prioritize comfort over raw speed. Many Counter-Strike veterans who grew up on the traditional full-size headphones continue to prefer ergonomic layouts even as the meta shifts toward symmetrical designs.",
  },
};

export function generateStaticParams() {
  return Object.keys(SHAPES).map(s => ({ slug: s }));
}

export function generateMetadata({ params }) {
  const shape = SHAPES[params.slug];
  if (!shape) return { title: "Shape Not Found" };

  const shapeHeadphones = headphones.filter(m => m.formFactor === shape.title);
  const description = `${shape.title} (${shape.aka}) gaming headphones — ${shapeHeadphones.length} headphones reviewed. Pro usage data, top picks, weight and price comparisons. Find the best ${shape.title.toLowerCase()} headphone for your grip style.`;

  return {
    title: `Best ${shape.title} Gaming Headphones — ${shapeHeadphones.length} Headphones Compared`,
    description,
    alternates: { canonical: `https://esportsheadphones.com/shapes/${params.slug}` },
    openGraph: {
      title: `Best ${shape.title} Gaming Headphones — ${shapeHeadphones.length} Headphones Compared`,
      description,
      url: `https://esportsheadphones.com/shapes/${params.slug}`,
      images: [{ url: `https://esportsheadphones.com/og?title=Best+${shape.title}+Headphones&subtitle=${shapeHeadphones.length}+Headphones+Compared+%C2%B7+Pro+Usage+Data`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function ShapePage({ params }) {
  const shape = SHAPES[params.slug];
  if (!shape) {
    return (
      <>
        <div style={{ padding: 40, textAlign: "center", color: "#1a1614" }}><h1>Shape Not Found</h1></div>
        <EsportsHeadphones initialTab="shapes" />
      </>
    );
  }

  const shapeHeadphones = headphones.filter(m => m.formFactor === shape.title).sort((a, b) => b?.proUsage - a?.proUsage);
  const totalProUsage = shapeHeadphones.reduce((a, m) => a + m.proUsage, 0);
  const avgWeight = Math.round(shapeHeadphones.reduce((a, m) => a + m?.weight, 0) / shapeHeadphones.length);
  const avgPrice = Math.round(shapeHeadphones.reduce((a, m) => a + m?.price, 0) / shapeHeadphones.length);
  const brands = [...new Set(shapeHeadphones.map(m => m.brand))].sort();
  const lightestHeadphone = [...shapeHeadphones].sort((a, b) => a?.weight - b?.weight)[0];
  const mostUsedHeadphone = shapeHeadphones[0];
  const budgetPick = [...shapeHeadphones].filter(m => m.proUsage > 0.5).sort((a, b) => a?.price - b?.price)[0];
  const wirelessCount = shapeHeadphones.filter(m => m.wireless).length;

  // Count pro players using this shape
  let playerCount = 0;
  allPlayers.forEach(p => {
    if (!p.headphone) return;
    const matched = shapeHeadphones.find(m => {
      const mn = m.name.toLowerCase();
      const pm = p.headphone.toLowerCase();
      return pm === mn || pm.includes(mn) || mn.includes(pm);
    });
    if (matched) playerCount++;
  });

  const otherShape = params.slug === "symmetrical" ? "ergonomic" : "symmetrical";
  const otherShapeData = SHAPES[otherShape];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Best ${shape.title} Gaming Headphones`,
        description: shape.description,
        url: `https://esportsheadphones.com/shapes/${params.slug}`,
        numberOfItems: shapeHeadphones.length,
        itemListElement: shapeHeadphones.slice(0, 10).map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: m.name,
            brand: { "@type": "Brand", name: m.brand },
            url: `https://esportsheadphones.com/headphones/${sl(m.name)}`,
          },
        })),
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Best {shape.title} ({shape.aka}) Gaming Headphones for Esports — {shapeHeadphones.length} Headphones Compared</h1>

        <h2>What is a {shape.title} Headphone?</h2>
        <p>{shape.description}</p>

        <h2>Grip Style Guide for Headphones</h2>
        <p>{shape.gripAdvice}</p>

        <h2>Why Pros Choose Headphones</h2>
        <p>{shape.prosAdvice}</p>

        <h2>{shape.title} Headphone Statistics</h2>
        <table>
          <caption>Overview of {shape.title.toLowerCase()} headphones in professional esports</caption>
          <tbody>
            <tr><th>Total {shape.title} Headphones</th><td>{shapeHeadphones.length}</td></tr>
            <tr><th>Combined Pro Usage</th><td>{totalProUsage}%</td></tr>
            <tr><th>Pro Players Using</th><td>{playerCount}</td></tr>
            <tr><th>Average Weight</th><td>{avgWeight}g</td></tr>
            <tr><th>Average Price</th><td>${avgPrice}</td></tr>
            <tr><th>Wireless Options</th><td>{wirelessCount} of {shapeHeadphones.length}</td></tr>
            <tr><th>Brands</th><td>{brands.join(", ")}</td></tr>
            {mostUsedHeadphone && <tr><th>Most Used by Pros</th><td><a href={`/headphones/${sl(mostUsedHeadphone.name)}`}>{mostUsedHeadphone.name}</a> ({mostUsedHeadphone.proUsage}%)</td></tr>}
            {lightestHeadphone && <tr><th>Lightest</th><td><a href={`/headphones/${sl(lightestHeadphone.name)}`}>{lightestHeadphone.name}</a> ({lightestHeadphone?.weight}g)</td></tr>}
            {budgetPick && <tr><th>Best Budget Pick</th><td><a href={`/headphones/${sl(budgetPick.name)}`}>{budgetPick.name}</a> (${budgetPick?.price})</td></tr>}
          </tbody>
        </table>

        <h2>All Headphones Ranked by Pro Usage</h2>
        <table>
          <caption>{shapeHeadphones.length} {shape.title.toLowerCase()} gaming headphones ranked by professional player usage</caption>
          <thead><tr><th>Rank</th><th>Headphone</th><th>Brand</th><th>Weight</th><th>Price</th><th>Pro Usage</th><th>Driver</th><th>Connectivity</th></tr></thead>
          <tbody>
            {shapeHeadphones.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td><a href={`/headphones/${sl(m.name)}`}>{m.name}</a></td>
                <td><a href={`/brands/${sl(m.brand)}`}>{m.brand}</a></td>
                <td>{m?.weight}g</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td><a href={`/sensors/${sl(m.driverType)}`}>{m.driverType}</a></td>
                <td>{m.connectivity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Related Pages</h2>
        <nav>
          <ul>
            <li><a href={`/shapes/${otherShape}`}>Best Headphones</a></li>
            <li><a href="/shapes">Shape Overlay Comparison Tool</a></li>
            <li><a href="/headphones">All Headphones</a></li>
            <li><a href="/lab">Headphone Finder Quiz</a></li>
            {shapeHeadphones.slice(0, 5).map(m => <li key={m.id}><a href={`/headphones/${sl(m.name)}`}>{m.name} Review</a></li>)}
          </ul>
        </nav>
      </article>

      <EsportsHeadphones initialTab="shapes" />
    </>
  );
}
