import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink } from "@/components/ssr";
import { headphones } from "@/data";

export const metadata = {
  title: "Headphone Layouts — Open-Back vs Closed-Back Design Comparison",
  description: "Compare headphone form factors and layouts used by esports professionals. Analysis of open-back, closed-back, and in-ear designs across all major gaming headphones.",
  alternates: { canonical: "https://esportsheadphones.com/shapes" },
  openGraph: {
    title: "Headphone Layouts — Open-Back vs Closed-Back Design Comparison",
    description: "Compare headphone form factors and layouts used by esports professionals.",
    url: "https://esportsheadphones.com/shapes",
    images: [{ url: "https://esportsheadphones.com/og?title=Layouts&subtitle=Open-Back+vs+Closed-Back+Design", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ShapesPage() {
  const layouts = [...new Set(headphones.map(m => m.layout).filter(Boolean))];
  const openBack = headphones.filter(m => m.layout === "Open-Back" || m.layout === "Symmetrical");
  const closedBack = headphones.filter(m => m.layout === "Closed-Back" || m.layout === "Ergonomic");

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Headphone Form Factor & Layout Comparison for Esports</h1>
        <p>
          Compare {layouts.length} headphone layouts across {headphones.length} gaming headphones used by professional
          esports players. Analyze open-back vs closed-back designs and their impact on competitive gaming.
        </p>
        <h2>Layout Types</h2>
        <ul>
          {layouts.map(l => (
            <li key={l}>{l} — {headphones.filter(m => m.layout === l).length} headphones</li>
          ))}
        </ul>
        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/sensors">Driver Comparison</a></li>
          <li><a href="/compare">Compare Headphones</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Headphone">Layouts</SSRTitle>
        <SSRSub>Compare headphone form factors across {headphones.length} gaming headphones used by esports professionals.</SSRSub>
        <SSRGrid>
          <SSRStat label="Headphones" value={headphones.length} color="#14b8a6" />
          <SSRStat label="Layouts" value={layouts.length} color="#14b8a6" />
          <SSRStat label="Open-Back" value={openBack.length} color="#14b8a6" />
          <SSRStat label="Closed-Back" value={closedBack.length} color="#14b8a6" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones" color="#14b8a6">All Headphones</SSRLink>
          <SSRLink href="/sensors" color="#14b8a6">Drivers</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="shapes" />
    </>
  );
}
