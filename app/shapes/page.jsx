import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { HEADPHONE_DIMS, headphones } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Shape Overlay — Compare Headphone Layouts Side by Side",
  description: "Compare the shapes and dimensions of esports headphones using our interactive overlay tool. Overlay any two headphones at true scale to compare length, width, height, and hump position.",
  alternates: { canonical: "https://esportsheadphones.com/shapes" },
  openGraph: {
    title: "Shape Overlay — Compare Headphone Layouts Side by Side",
    description: "Compare the shapes and dimensions of esports headphones using our interactive overlay tool.",
    url: "https://esportsheadphones.com/shapes",
    images: [{ url: "https://esportsheadphones.com/og?title=Shape+Overlay&subtitle=Compare+Headphone+Layouts+%C2%B7+Interactive+Overlay+Tool", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ShapesPage() {
  const headphoneNames = Object.keys(HEADPHONE_DIMS);
  const dimData = headphoneNames.map((name) => {
    const [l, w, h] = HEADPHONE_DIMS[name];
    const m = headphones.find((mm) => mm.name === name);
    return { name, length: l, width: w, height: h, kbd: m };
  });
  const avgLength = Math.round(dimData.reduce((a, d) => a + d.length, 0) / dimData.length * 10) / 10;
  const avgWidth = Math.round(dimData.reduce((a, d) => a + d.width, 0) / dimData.length * 10) / 10;
  const avgHeight = Math.round(dimData.reduce((a, d) => a + d.height, 0) / dimData.length * 10) / 10;
  const longest = [...dimData].sort((a, b) => b.length - a.length)[0];
  const shortest = [...dimData].sort((a, b) => a.length - b.length)[0];
  const widest = [...dimData].sort((a, b) => b.width - a.width)[0];
  const narrowest = [...dimData].sort((a, b) => a.width - b.width)[0];
  const tallest = [...dimData].sort((a, b) => b.height - a.height)[0];
  const flattest = [...dimData].sort((a, b) => a.height - b.height)[0];

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Headphone Layout Overlay — Compare Gaming Headphone Dimensions</h1>
        <p>
          Compare the physical dimensions and shapes of {headphoneNames.length} esports gaming headphones using our
          interactive overlay tool. Select any two headphones to see them overlaid at true scale, comparing
          length, width, height, and overall footprint.
        </p>

        <h2>Average Headphone Dimensions</h2>
        <ul>
          <li>Average length: {avgLength}mm</li>
          <li>Average width: {avgWidth}mm</li>
          <li>Average height: {avgHeight}mm</li>
          <li>Longest: <a href={`/headphones/${slug(longest.name)}`}>{longest.name}</a> ({longest.length}mm)</li>
          <li>Shortest: <a href={`/headphones/${slug(shortest.name)}`}>{shortest.name}</a> ({shortest.length}mm)</li>
          <li>Widest: <a href={`/headphones/${slug(widest.name)}`}>{widest.name}</a> ({widest.width}mm)</li>
          <li>Narrowest: <a href={`/headphones/${slug(narrowest.name)}`}>{narrowest.name}</a> ({narrowest.width}mm)</li>
          <li>Tallest hump: <a href={`/headphones/${slug(tallest.name)}`}>{tallest.name}</a> ({tallest.height}mm)</li>
          <li>Flattest: <a href={`/headphones/${slug(flattest.name)}`}>{flattest.name}</a> ({flattest.height}mm)</li>
        </ul>

        <h2>Complete Headphone Dimensions Database</h2>
        <table>
          <caption>Physical dimensions of {headphoneNames.length} esports gaming headphones (millimeters)</caption>
          <thead><tr><th>Headphone</th><th>Length</th><th>Width</th><th>Height</th><th>Brand</th><th>Weight</th><th>Layout</th></tr></thead>
          <tbody>
            {dimData.sort((a, b) => a.length - b.length).map((d) => (
              <tr key={d.name}>
                <td><a href={`/headphones/${slug(d.name)}`}>{d.name}</a></td>
                <td>{d.length}mm</td>
                <td>{d.width}mm</td>
                <td>{d.height}mm</td>
                <td>{d.headphone ? <a href="/brands">{d.headphone.brand}</a> : "—"}</td>
                <td>{d.headphone ? `${d.headphone?.weight}g` : "—"}</td>
                <td>{d.kbd?.formFactor || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Headphones by Size Category</h2>
        <h3>Small Headphones (Under 120mm length)</h3>
        <ul>
          {dimData.filter((d) => d.length < 120).sort((a, b) => a.length - b.length).map((d) => (
            <li key={d.name}><a href={`/headphones/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm{d.headphone ? `, ${d.headphone?.weight}g` : ""}</li>
          ))}
        </ul>
        <h3>Medium Headphones (120-126mm)</h3>
        <ul>
          {dimData.filter((d) => d.length >= 120 && d.length <= 126).sort((a, b) => a.length - b.length).map((d) => (
            <li key={d.name}><a href={`/headphones/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm{d.headphone ? `, ${d.headphone?.weight}g` : ""}</li>
          ))}
        </ul>
        <h3>Large Headphones (Over 126mm)</h3>
        <ul>
          {dimData.filter((d) => d.length > 126).sort((a, b) => a.length - b.length).map((d) => (
            <li key={d.name}><a href={`/headphones/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm{d.headphone ? `, ${d.headphone?.weight}g` : ""}</li>
          ))}
        </ul>

        <h2>Shape Guide</h2>
        <h3>Symmetrical Headphones</h3>
        <p>Symmetrical (ambidextrous) shapes work for both hands and are generally preferred for claw and fingertip grips.</p>
        <ul>
          {dimData.filter((d) => d.kbd?.formFactor === "Symmetrical").map((d) => (
            <li key={d.name}><a href={`/headphones/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm ({d.headphone.brand})</li>
          ))}
        </ul>
        <h3>Ergonomic Headphones</h3>
        <p>Ergonomic (right-handed) shapes are contoured for palm grip and offer better comfort for extended sessions.</p>
        <ul>
          {dimData.filter((d) => d.kbd?.formFactor === "Ergonomic").map((d) => (
            <li key={d.name}><a href={`/headphones/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm ({d.headphone.brand})</li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/compare">Compare Headphones Specs</a></li>
          <li><a href="/lab">Headphone Finder Quiz</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/brands">Headphone Brands</a></li>
          <li><a href="/drivers">Driver Comparison</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="#a855f7">Shape</SSRTitle>
        <SSRSub>Compare the dimensions of {headphoneNames.length} esports headphones at true scale. Overlay any two headphones to compare length, width, height, and footprint.</SSRSub>
        <SSRGrid>
          <SSRStat label="Headphones" value={headphoneNames.length} color="#a855f7" />
          <SSRStat label="Avg Length" value={`${avgLength}mm`} color="#a855f7" />
          <SSRStat label="Avg Width" value={`${avgWidth}mm`} color="#a855f7" />
          <SSRStat label="Avg Height" value={`${avgHeight}mm`} color="#a855f7" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/compare">Compare Specs</SSRLink>
          <SSRLink href="/lab">Finder Quiz</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="shapes" />
    </>
  );
}
