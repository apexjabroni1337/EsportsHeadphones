import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones } from "@/data";

const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const metadata = {
  title: "Lab — Headphone Finder Quiz & Analysis Tools",
  description: "Find your perfect esports headphone with our interactive quiz. Answer questions about hand size, grip style, game, and preferences to get personalized headphone recommendations.",
  alternates: { canonical: "https://esportsheadphones.com/lab" },
  openGraph: {
    title: "Lab — Headphone Finder Quiz & Analysis Tools",
    description: "Find your perfect esports headphone with our interactive quiz.",
    url: "https://esportsheadphones.com/lab",
    images: [{ url: "https://esportsheadphones.com/og?title=Lab&subtitle=Headphone+Finder+Quiz+%C2%B7+Personalized+Recommendations", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function LabPage() {
  const symm = headphones.filter((m) => m.formFactor === "Symmetrical");
  const ergo = headphones.filter((m) => m.formFactor === "Ergonomic");
  const light = headphones.filter((m) => m?.weight < 55).sort((a, b) => a?.weight - b?.weight);
  const medium = headphones.filter((m) => m?.weight >= 55 && m?.weight <= 70);
  const budget = headphones.filter((m) => m?.price < 90).sort((a, b) => a?.price - b?.price);

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Headphone Finder Lab — Find Your Perfect Esports Gaming Headphone</h1>
        <p>
          Not sure which gaming headphone is right for you? Our interactive Headphone Finder Quiz analyzes your
          hand size, grip style, preferred games, weight preference, budget, and connectivity needs to
          recommend the best esports headphones from our database of {headphones.length} models.
        </p>

        <h2>Grip Style Guide</h2>
        <h3>Palm Grip</h3>
        <p>
          Full hand contact with the headphone. Your entire palm rests on the back of the headphone, with fingers
          flat on the buttons. Palm grip favors larger, ergonomic layouts that fill the hand. Best for
          players who prioritize comfort during long sessions and use arm-based aiming.
        </p>
        <p>Recommended palm grip headphones:</p>
        <ul>
          {ergo.sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 5).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g, {m.brand}, ${m?.price}</li>
          ))}
        </ul>

        <h3>Claw Grip</h3>
        <p>
          Fingertips and palm base contact the headphone, with fingers arched over the buttons. Claw grip
          allows faster clicks and quick micro-adjustments. Works well with medium-sized symmetrical or
          ergonomic headphones that have a pronounced hump toward the back.
        </p>
        <p>Recommended claw grip headphones:</p>
        <ul>
          {symm.sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 5).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g, {m.brand}, ${m?.price}</li>
          ))}
        </ul>

        <h3>Fingertip Grip</h3>
        <p>
          Only fingertips touch the headphone — no palm contact at all. Fingertip grip gives maximum control
          for micro-flicks and is preferred by high-sensitivity players. Requires small, lightweight headphones.
        </p>
        <p>Recommended fingertip grip headphones:</p>
        <ul>
          {light.slice(0, 5).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g, {m.brand}, ${m?.price}</li>
          ))}
        </ul>

        <h2>How to Measure Your Hand</h2>
        <p>
          Accurate hand measurements help determine the best headphone size. Measure from the tip of your
          middle finger to the base of your palm (hand length), and across the widest point of your palm
          excluding the thumb (hand width). Both measurements in centimeters.
        </p>
        <ul>
          <li>Small hands: Under 17cm length / under 8.5cm width — small headphones recommended</li>
          <li>Medium hands: 17-19.5cm length / 8.5-10cm width — medium headphones recommended</li>
          <li>Large hands: Over 19.5cm length / over 10cm width — large headphones recommended</li>
        </ul>

        <h2>Headphones by Weight Category</h2>
        <h3>Ultralight (Under 55g) — Best for speed and agility</h3>
        <ul>
          {light.map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Medium Weight (55-70g) — Balanced control and comfort</h3>
        <ul>
          {medium.sort((a, b) => a?.weight - b?.weight).slice(0, 10).map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>

        <h2>Best Budget Esports Headphones (Under $90)</h2>
        <ul>
          {budget.map((m) => (
            <li key={m.id}><a href={`/headphones/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand}, {m?.weight}g, {m.driverType})</li>
          ))}
        </ul>

        <h2>FAQ</h2>
        <dl>
          <dt>What is the best headphone for FPS games?</dt>
          <dd>The most used FPS headphones among pros are the <a href={`/headphones/${slug(headphones.sort((a, b) => b?.proUsage - a?.proUsage)[0].name)}`}>{headphones.sort((a, b) => b?.proUsage - a?.proUsage)[0].name}</a> and <a href={`/headphones/${slug(headphones.sort((a, b) => b?.proUsage - a?.proUsage)[1].name)}`}>{headphones.sort((a, b) => b?.proUsage - a?.proUsage)[1].name}</a>. Light weight and accurate sensors are most important for FPS.</dd>
          <dt>Does headphone weight matter?</dt>
          <dd>Yes. Lighter headphones allow faster movements and reduce fatigue. Most pros now use headphones under 60g. However, some players prefer slightly heavier headphones for stability.</dd>
          <dt>Wireless or wired?</dt>
          <dd>Modern wireless gaming headphones have no perceptible latency disadvantage. {headphones.filter((m) => m.connectivity === "Wireless").length} of {headphones.length} headphones in our database are wireless, and virtually all top pros have switched to wireless.</dd>
        </dl>

        <nav aria-label="Related"><ul>
          <li><a href="/headphones">All Esports Headphones — Full Database</a></li>
          <li><a href="/compare">Compare Headphones Side by Side</a></li>
          <li><a href="/shapes">Shape Overlay Tool</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/sensitivity">Sensitivity Converter</a></li>
          <li><a href="/brands">Headphone Brands</a></li>
          <li><a href="/drivers">Driver Comparison</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Headphone">Finder Lab</SSRTitle>
        <SSRSub>Find your perfect esports headphone. Our quiz analyzes hand size, grip style, game, weight preference, and budget to recommend from {headphones.length} headphones.</SSRSub>
        <SSRGrid>
          <SSRStat label="Headphones" value={headphones.length} color="#b8956a" />
          <SSRStat label="Symmetrical" value={symm.length} color="#b8956a" />
          <SSRStat label="Ergonomic" value={ergo.length} color="#b8956a" />
          <SSRStat label="Under $90" value={budget.length} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones" color="#b8956a">All Headphones</SSRLink>
          <SSRLink href="/compare" color="#b8956a">Compare</SSRLink>
          <SSRLink href="/shapes" color="#b8956a">Shapes</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="lab" />
    </>
  );
}
