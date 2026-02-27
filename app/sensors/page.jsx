import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink } from "@/components/ssr";
import { headphones } from "@/data";

export const metadata = {
  title: "Headphone Drivers — Driver Technology Comparison & Analysis",
  description: "Compare headphone driver technologies used by professional esports players. Detailed analysis of dynamic, planar magnetic, and electrostatic drivers across all major gaming headphones.",
  alternates: { canonical: "https://esportsheadphones.com/sensors" },
  openGraph: {
    title: "Headphone Drivers — Driver Technology Comparison & Analysis",
    description: "Compare headphone driver technologies used by professional esports players.",
    url: "https://esportsheadphones.com/sensors",
    images: [{ url: "https://esportsheadphones.com/og?title=Drivers&subtitle=Driver+Technology+Comparison", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function SensorsPage() {
  const driverTypes = [...new Set(headphones.map(m => m.driverType).filter(Boolean))];
  const wireless = headphones.filter(m => m.connectivity === "Wireless");

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Headphone Driver Technology Comparison for Esports</h1>
        <p>
          Comprehensive analysis of {driverTypes.length} driver technologies across {headphones.length} gaming headphones
          used by professional esports players. Compare driver size, type, frequency response, and impedance.
        </p>
        <h2>Driver Types</h2>
        <ul>
          {driverTypes.map(d => (
            <li key={d}>{d} — used in {headphones.filter(m => m.driverType === d).length} headphones</li>
          ))}
        </ul>
        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/compare">Compare Headphones</a></li>
          <li><a href="/brands">Headphone Brands</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Driver">Technology</SSRTitle>
        <SSRSub>Compare driver technologies across {headphones.length} gaming headphones used by professional esports players.</SSRSub>
        <SSRGrid>
          <SSRStat label="Headphones" value={headphones.length} color="#2a8a62" />
          <SSRStat label="Driver Types" value={driverTypes.length} color="#2a8a62" />
          <SSRStat label="Wireless" value={wireless.length} color="#2a8a62" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones" color="#2a8a62">All Headphones</SSRLink>
          <SSRLink href="/compare" color="#2a8a62">Compare</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="sensors" />
    </>
  );
}
