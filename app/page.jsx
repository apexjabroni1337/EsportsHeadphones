import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, proPlayers, BRAND_COLORS } from "@/data";

export const metadata = {
  title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
  description: "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across CS2, Valorant, League of Legends, Fortnite, and 10+ major competitive titles. Full specs, rankings, and pro settings.",
  alternates: { canonical: "https://esportsheadphones.com" },
  openGraph: {
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description: "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across 13 major games.",
    url: "https://esportsheadphones.com",
    images: [{ url: "https://esportsheadphones.com/og?title=The+Definitive+Guide+to+Pro+Esports+Headphones&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Headsets+%C2%B7+13+Games", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsHeadphones — The Definitive Guide to Pro Esports Headphones",
    description: "The #1 database of professional esports headphones. Compare headsets used by 2100+ pro players across 13 major games.",
  },
};

export default function HomePage() {
  const totalPlayers = allPlayers.length;
  const totalHeadphones = headphones.length;
  const totalGames = new Set(allPlayers.map((p) => p.game)).size;
  const topHeadphones = [...headphones].sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10);
  const topBrands = Object.entries(
    headphones.reduce((acc, m) => { acc[m.brand] = (acc[m.brand] || 0) + m.proUsage; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 7);

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>EsportsHeadphones — The Definitive Guide to Pro Esports Gaming Headphones</h1>
        <p>
          EsportsHeadphones is the most comprehensive database of professional esports gaming headphones, tracking
          the gear and settings of {totalPlayers.toLocaleString()}+ professional players across {totalGames} major
          competitive titles including Counter-Strike 2, Valorant, League of Legends, Fortnite, Dota 2,
          Apex Legends, Call of Duty, Overwatch 2, Rainbow Six Siege, and more.
        </p>
        <p>
          Our database covers {totalHeadphones} gaming headsets from brands including SteelSeries, HyperX, ASUS, Audio-Technica,
          Sennheiser, Corsair, Turtle Beach, and more. Every headphone includes full specifications, pro usage
          statistics, expert ratings, and direct purchase links.
        </p>

        <h2>Most Popular Esports Headphones in {new Date().getFullYear()}</h2>
        <ol>
          {topHeadphones.map((m) => (
            <li key={m.id}>
              <a href={`/headphones/${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
              {" "}— {m.brand}, {m?.weight}g, {m.proUsage}% pro usage, ${m?.price}
            </li>
          ))}
        </ol>

        <h2>Top Headphone Brands in Professional Esports</h2>
        <ul>
          {topBrands.map(([brand, usage]) => (
            <li key={brand}><a href="/brands">{brand}</a> — {usage}% combined pro usage</li>
          ))}
        </ul>

        <h2>Featured Pro Players</h2>
        <ul>
          {proPlayers.slice(0, 20).map((p) => {
            const pm = headphones.find((m) => p.headphone.includes(m.name) || m.name.includes(p.headphone));
            const mSlug = pm ? pm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : null;
            return (
              <li key={`${p.name}-${p.game}`}>
                <a href={`/players/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{p.name}</a>
                {" "}— {p.game} ({p.team}) — Uses{" "}
                {mSlug ? <a href={`/headphones/${mSlug}`}>{p.headphone}</a> : p.headphone}
              </li>
            );
          })}
        </ul>

        <h2>Esports Games Covered</h2>
        <ul>
          {[...new Set(allPlayers.map((p) => p.game))].sort((a, b) => {
            const ca = allPlayers.filter((p) => p.game === a).length;
            const cb = allPlayers.filter((p) => p.game === b).length;
            return cb - ca;
          }).map((game) => (
            <li key={game}><a href={`/games/${game.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{game}</a> — {allPlayers.filter((p) => p.game === game).length} pro players tracked</li>
          ))}
        </ul>

        <h2>Headphone Drivers</h2>
        <ul>
          {[...new Set(headphones.map((m) => m.driverType))].slice(0, 8).map((driverName) => (
            <li key={driverName}><a href="/drivers">{driverName}</a> — used in {headphones.filter((m) => m.driverType === driverName).length} headphones</li>
          ))}
        </ul>

        <nav aria-label="Site sections">
          <h2>Explore EsportsHeadphones</h2>
          <ul>
            <li><a href="/headphones">All Esports Headphones — Complete database with specs and rankings</a></li>
            <li><a href="/players">Pro Player Settings — Audio settings and gear for {totalPlayers.toLocaleString()}+ players</a></li>
            <li><a href="/games">Games — Headphone choices by esports title</a></li>
            <li><a href="/brands">Brands — Compare SteelSeries, HyperX, ASUS, and more</a></li>
            <li><a href="/drivers">Drivers — Dynamic, neodymium, and other driver types</a></li>
            <li><a href="/trends">Trends — Weight, connectivity, audio frequency data</a></li>
            <li><a href="/compare">Compare — Side-by-side headphone comparison tool</a></li>
            <li><a href="/lab">Lab — Find your perfect headphone with our quiz</a></li>
            <li><a href="/best">Best Headphones — Curated rankings by use case</a></li>
          </ul>
        </nav>
      </article>

      <SSRSection>
        <SSRTitle accent="ESPORTS">HEADPHONES</SSRTitle>
        <SSRSub>
          The most comprehensive database of professional esports gaming headphones, tracking the gear and settings
          of {totalPlayers.toLocaleString()}+ professional players across {totalGames} major competitive titles.
        </SSRSub>
        <SSRGrid>
          <SSRStat label="Pro Players" value={totalPlayers.toLocaleString() + "+"} color="#b8956a" />
          <SSRStat label="Headphones" value={totalHeadphones} color="#b8956a" />
          <SSRStat label="Games" value={totalGames} color="#b8956a" />
          <SSRStat label="Profiles" value={proPlayers.length} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/games">Games</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/drivers">Drivers</SSRLink>
          <SSRLink href="/trends">Trends</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/best">Best</SSRLink>
          <SSRLink href="/lab">Lab</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="overview" />
    </>
  );
}
