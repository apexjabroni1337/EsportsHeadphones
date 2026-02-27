import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { allPlayers, proPlayers, headphones, BRAND_COLORS } from "@/data";

export const metadata = {
  title: "Pro Players — Esports Headphone Settings & Gear",
  description: "Browse 2100+ professional esports players and their headphone settings. Find frequency response, switch type, impedance, and gear for CS2, Valorant, LoL, Fortnite, and more.",
  alternates: { canonical: "https://esportsheadphones.com/players" },
  openGraph: {
    title: "Pro Players — Esports Headphone Settings & Gear",
    description: "Browse 2100+ professional esports players and their headphone settings across 13 major competitive titles.",
    url: "https://esportsheadphones.com/players",
    images: [{ url: "https://esportsheadphones.com/og?title=Pro+Players&subtitle=2100%2B+Players+%C2%B7+Headphone+Settings+%C2%B7+Drivers+%C2%B7+Gear", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function PlayersPage() {
  const slug = (name) => name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  const headphoneSlug = (mouseName) => {
    const m = headphones.find((mm) => mouseName.includes(mm.name) || mm.name.includes(mouseName));
    return m ? slug(m.name) : null;
  };

  const games = [...new Set(allPlayers.map((p) => p.game))].sort((a, b) => {
    return allPlayers.filter((p) => p.game === b).length - allPlayers.filter((p) => p.game === a).length;
  });

  const mostUsedHeadphone = (() => {
    const counts = {};
    allPlayers.forEach((p) => { if (p.headphone) { counts[p.headphone] = (counts[p.headphone] || 0) + 1; } });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  })();

  // Top teams
  const teamCounts = {};
  allPlayers.forEach((p) => {
    if (p.team && p.team !== "Free Agent" && p.team !== "Retired" && p.team !== "Content") {
      teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
    }
  });
  const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);

  // DPI distribution
  const dpiRanges = [
    { label: "200-400 DPI", min: 200, max: 400 },
    { label: "800 DPI", min: 800, max: 800 },
    { label: "1600 DPI", min: 1600, max: 1600 },
    { label: "Other", min: 0, max: 99999 },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Professional Esports Players — Headphone Settings & Gear",
        description: `${allPlayers.length}+ pro esports players and their complete headphone settings`,
        numberOfItems: allPlayers.length,
        itemListElement: proPlayers.slice(0, 20).map((p, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/players/${slug(p.name)}`,
          name: p.name,
          item: { "@type": "Person", name: p.fullName || p.name, jobTitle: `Professional ${p.game} Player`, memberOf: { "@type": "SportsTeam", name: p.team } },
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What headphones do most pro players use?", acceptedAnswer: { "@type": "Answer", text: `Among ${allPlayers.length}+ tracked pro players, the most popular headphone is the ${mostUsedHeadphone[0]} used by ${mostUsedHeadphone[1]} players. Hall Effect and active noise cancellation headphones dominate the competitive scene.` }},
          { "@type": "Question", name: "What headphone do CS2 pros use?", acceptedAnswer: { "@type": "Answer", text: `The most popular headphone among CS2 professionals is the ${mostUsedHeadphone[0]}, used by ${mostUsedHeadphone[1]} tracked players. Headphones with active noise cancellation and Hall Effect drivers dominate the CS2 pro scene.` }},
          { "@type": "Question", name: "What features matter most in a gaming headphone?", acceptedAnswer: { "@type": "Answer", text: `Pro players prioritize active noise cancellation technology, low impedance points (0.1-0.2mm), high frequency responses (1000-8000Hz), and Hall Effect magnetic drivers. Lightweight headphones with detachable cablepable drivers are also increasingly popular in competitive gaming.` }},
        ],
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Professional Esports Players — Headphone Settings and Gear</h1>
        <p>
          Browse the headphone settings and gear of {allPlayers.length.toLocaleString()}+ professional esports players
          across {games.length} major competitive titles. Find frequency response, switch type, impedance point,
          and the exact headphone model used by your favorite pros.
        </p>

        <h2>Key Statistics</h2>
        <ul>
          <li>Total players tracked: {allPlayers.length.toLocaleString()}</li>
          <li>Players with full profiles: {proPlayers.length}</li>
          <li>Games covered: {games.length}</li>
          <li>Most popular headphone: {mostUsedHeadphone[0]} ({mostUsedHeadphone[1]} players)</li>
        </ul>

        <h2>Players by Game</h2>
        <ul>
          {games.map((g) => (
            <li key={g}><a href={`/games/${g.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{g}</a> — {allPlayers.filter((p) => p.game === g).length} players tracked</li>
          ))}
        </ul>

        {/* Per-game sections with top players */}
        {games.map((game) => {
          const gamePlayers = proPlayers.filter((p) => p.game === game);
          const allGamePlayers = allPlayers.filter((p) => p.game === game);
          const headphoneCounts = {};
          allGamePlayers.forEach((p) => { headphoneCounts[p.headphone] = (headphoneCounts[p.headphone] || 0) + 1; });
          const topKbdInGame = Object.entries(headphoneCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

          if (!gamePlayers.length) return null;
          return (
            <section key={game}>
              <h2>{game} Pro Players</h2>
              <p>
                {allGamePlayers.length} {game} players tracked. Most popular headphone: {topKbdInGame[0]?.[0]}.
              </p>
              <h3>Top {game} Players with Full Profiles</h3>
              <table>
                <thead><tr><th>Player</th><th>Team</th><th>Role</th><th>Headphone</th></tr></thead>
                <tbody>
                  {gamePlayers.slice(0, 15).map((p) => {
                    const ms = headphoneSlug(p.headphone);
                    return (
                      <tr key={p.name}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.team}</td>
                        <td>{p.role}</td>
                        <td>{ms ? <a href={`/headphones/${ms}`}>{p.headphone}</a> : p.headphone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3>Most Used Headphones in {game}</h3>
              <ol>
                {topKbdInGame.map(([kbdName, count]) => {
                  const ms = headphoneSlug(kbdName);
                  return (
                    <li key={kbdName}>
                      {ms ? <a href={`/headphones/${ms}`}>{kbdName}</a> : kbdName} — {count} players ({Math.round(count / allGamePlayers.length * 100)}%)
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}

        <h2>Top Esports Teams</h2>
        <p>Teams with the most tracked players in our database:</p>
        <ul>
          {topTeams.map(([team, count]) => {
            const teamPlayers = proPlayers.filter((p) => p.team === team).slice(0, 5);
            return (
              <li key={team}>
                {team} — {count} players
                {teamPlayers.length > 0 && (
                  <> ({teamPlayers.map((p, i) => (
                    <span key={p.name}>
                      {i > 0 && ", "}
                      <a href={`/players/${slug(p.name)}`}>{p.name}</a>
                    </span>
                  ))})</>
                )}
              </li>
            );
          })}
        </ul>

        <h2>Most Popular Headphones Among All Pro Players</h2>
        {(() => {
          const counts = {};
          allPlayers.forEach((p) => { if (p.headphone) { counts[p.headphone] = (counts[p.headphone] || 0) + 1; } });
          const topHeadphones = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
          return (
            <ol>
              {topHeadphones.map(([kbdName, count]) => {
                const ms = headphoneSlug(kbdName);
                return (
                  <li key={kbdName}>
                    {ms ? <a href={`/headphones/${ms}`}>{kbdName}</a> : kbdName} — {count} players ({Math.round(count / allPlayers.length * 100)}%)
                  </li>
                );
              })}
            </ol>
          );
        })()}


        <h2>All Featured Pro Players (A-Z)</h2>
        <p>{proPlayers.length} players with detailed profiles including biography, achievements, and headphone history:</p>
        <ul>
          {[...proPlayers].sort((a, b) => a.name.localeCompare(b.name)).map((p) => {
            const ms = headphoneSlug(p.headphone);
            return (
              <li key={`${p.name}-${p.game}`}>
                <a href={`/players/${slug(p.name)}`}>{p.name}</a> — {p.game} ({p.team}),
                uses {ms ? <a href={`/headphones/${ms}`}>{p.headphone}</a> : p.headphone}
              </li>
            );
          })}
        </ul>

        <nav aria-label="Related pages">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/headphones">All Esports Headphones — Full Database</a></li>
            <li><a href="/games">Headphone Usage by Game</a></li>
            <li><a href="/brands">Headphone Brand Comparison</a></li>
            <li><a href="/compare">Compare Headphones Side by Side</a></li>
            <li><a href="/drivers">Driver Comparison</a></li>
            <li><a href="/trends">Industry Trends</a></li>
            <li><a href="/shapes">Headphone Layout Overlay</a></li>
            <li><a href="/lab">Headphone Finder Quiz</a></li>
            <li><a href="/">EsportsHeadphones Home</a></li>
          </ul>
        </nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Pro">Players</SSRTitle>
        <SSRSub>Headphone settings and gear for {allPlayers.length.toLocaleString()}+ professional esports players across {games.length} competitive titles.</SSRSub>
        <SSRGrid>
          <SSRStat label="Total Players" value={allPlayers.length.toLocaleString() + "+"} color="#b8956a" />
          <SSRStat label="Full Profiles" value={proPlayers.length} color="#b8956a" />
          <SSRStat label="Games" value={games.length} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/games">Games</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="players" />
    </>
  );
}
