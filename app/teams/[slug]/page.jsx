export const dynamic = "force-dynamic";
import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, TEAM_DESCRIPTIONS, TEAM_LOGOS, BRAND_COLORS, amazonLink, countryName } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
const GAME_COLORS = { CS2: "#c47000", Valorant: "#c43848", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#3a60b0", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Overwatch 2": "#c48018", Apex: "#a82020", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };

function getTeamData(teamName) {
  const teamPlayers = allPlayers.filter(p => p.team === teamName);
  const seen = new Set();
  const uniquePlayers = teamPlayers.filter(p => {
    const key = p.name + "|" + p.game;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const byGame = {};
  uniquePlayers.forEach(p => {
    if (!byGame[p.game]) byGame[p.game] = [];
    byGame[p.game].push(p);
  });
  const gameEntries = Object.entries(byGame).sort((a, b) => b[1].length - a[1].length);

  const headphoneCounts = {};
  uniquePlayers.forEach(p => { if (p.headphone && p.headphone !== "Unknown") headphoneCounts[p.headphone] = (headphoneCounts[p.headphone] || 0) + 1; });
  const topHeadphones = Object.entries(headphoneCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const countries = [...new Set(uniquePlayers.map(p => p.country).filter(Boolean))];
  const desc = TEAM_DESCRIPTIONS[teamName];

  return { uniquePlayers, gameEntries, topHeadphones, countries, desc };
}

function getAllTeams() {
  const teamSet = new Set();
  allPlayers.forEach(p => {
    if (p.team && !["Free Agent", "Content Creator", "Content", "Retired", "Streamer", ""].includes(p.team)) {
      teamSet.add(p.team);
    }
  });
  return [...teamSet];
}

export function generateStaticParams() {
  return getAllTeams().map(t => ({ slug: slug(t) }));
}

export function generateMetadata({ params }) {
  const allTeams = getAllTeams();
  const teamName = allTeams.find(t => slug(t) === params.slug);
  if (!teamName) return { title: "Team Not Found" };

  const { uniquePlayers, gameEntries, desc } = getTeamData(teamName);
  const games = gameEntries.map(([g]) => g).join(", ");
  const description = desc?.bio
    ? desc.bio.slice(0, 155) + "..."
    : `${teamName} esports team — ${uniquePlayers.length} tracked pro players across ${games}. Headphone preferences, switch types, and complete gear setups.`;

  return {
    title: `${teamName} — Pro Player Settings, Headphones & Gear`,
    description,
    alternates: { canonical: `https://esportsheadphones.com/teams/${params.slug}` },
    openGraph: {
      title: `${teamName} — Pro Player Settings, Headphones & Gear`,
      description,
      url: `https://esportsheadphones.com/teams/${params.slug}`,
      images: [{ url: `https://esportsheadphones.com/og?title=${encodeURIComponent(teamName)}&subtitle=${encodeURIComponent(`${uniquePlayers.length} Players · ${gameEntries.length} Games · Pro Settings`)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function TeamPage({ params }) {
  const allTeams = getAllTeams();
  const teamName = allTeams.find(t => slug(t) === params.slug);

  if (!teamName) {
    return (
      <>
        <div style={{ padding: 40, textAlign: "center", color: "#1a1614" }}>
          <h1>Team Not Found</h1>
          <p>This team doesn't exist in our database.</p>
        </div>
        <EsportsHeadphones initialTab="teams" />
      </>
    );
  }

  const { uniquePlayers, gameEntries, topHeadphones, countries, desc } = getTeamData(teamName);
  const games = gameEntries.map(([g]) => g);
  const logoUrl = TEAM_LOGOS[teamName];

  return (
    <>
      {/* JSON-LD SportsTeam structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        name: teamName,
        description: desc?.bio || `${teamName} is a professional esports organization with ${uniquePlayers.length} tracked players across ${games.join(", ")}.`,
        url: `https://esportsheadphones.com/teams/${params.slug}`,
        ...(logoUrl ? { logo: `https://esportsheadphones.com${logoUrl}` } : {}),
        sport: games.join(", "),
        member: uniquePlayers.slice(0, 20).map(p => ({
          "@type": "Person",
          name: p.fullName || p.name,
          alternateName: p.name,
          jobTitle: `Professional ${p.game} Player`,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportsheadphones.com" },
          { "@type": "ListItem", position: 2, name: "Teams", item: "https://esportsheadphones.com/teams" },
          { "@type": "ListItem", position: 3, name: teamName, item: `https://esportsheadphones.com/teams/${params.slug}` },
        ],
      }) }} />

      {/* Server-rendered SEO content */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/SportsTeam"
      >
        <h1 itemProp="name">{teamName} — Professional Esports Team Settings, Headphones and Gear</h1>
        {logoUrl && <meta itemProp="logo" content={`https://esportsheadphones.com${logoUrl}`} />}
        <meta itemProp="url" content={`https://esportsheadphones.com/teams/${params.slug}`} />

        <h2>About {teamName}</h2>
        {desc?.bio ? (
          <p itemProp="description">{desc.bio}</p>
        ) : (
          <p itemProp="description">
            {teamName} is a professional esports organization with {uniquePlayers.length} tracked players
            competing across {games.join(", ")}.
          </p>
        )}

        {desc?.achievements && (
          <>
            <h2>{teamName} Key Achievements</h2>
            <ul>
              {desc.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </>
        )}

        <h2>{teamName} Team Statistics</h2>
        <table>
          <caption>Overview of {teamName} esports organization</caption>
          <tbody>
            <tr><th>Total Players Tracked</th><td>{uniquePlayers.length}</td></tr>
            <tr><th>Games</th><td>{games.join(", ")}</td></tr>
            {countries.length > 0 && <tr><th>Nationalities</th><td>{countries.map(c => countryName(c)).join(", ")}</td></tr>}
          </tbody>
        </table>

        {topHeadphones.length > 0 && (
          <>
            <h2>Most Used Headphones in {teamName}</h2>
            <table>
              <caption>Headphone popularity among {teamName} players</caption>
              <thead><tr><th>Headphone</th><th>Players Using</th></tr></thead>
              <tbody>
                {topHeadphones.map(([m, count]) => (
                  <tr key={m}>
                    <td><a href={`/headphones/${slug(m)}`}>{m}</a></td>
                    <td>{count} {count === 1 ? "player" : "players"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h2>{teamName} Player Roster and Settings</h2>
        {gameEntries.map(([game, players]) => {
          const gameColor = GAME_COLORS[game] || "#8a8460";
          return (
          <div key={game}>
            <h3 style={{ color: gameColor, borderLeftColor: gameColor, borderLeftWidth: "3px", paddingLeft: "12px" }}>{teamName} {game} Roster</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <caption>{teamName} {game} player settings and headphones</caption>
              <thead><tr style={{ borderBottomWidth: "2px", borderBottomColor: gameColor }}><th style={{ textAlign: "left", paddingBottom: "8px", color: gameColor, fontWeight: "700" }}>Player</th><th style={{ textAlign: "left", paddingBottom: "8px", color: gameColor, fontWeight: "700" }}>Role</th><th style={{ textAlign: "left", paddingBottom: "8px", color: gameColor, fontWeight: "700" }}>Headphone</th></tr></thead>
              <tbody>
                {players.map((p, idx) => (
                  <tr key={p.name + p.game} style={{ background: idx % 2 === 0 ? "transparent" : "#f5f3ea", borderBottomWidth: "1px", borderBottomColor: "#e6e3d6" }}>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>{p.role}</td>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}><a href={`/headphones/${slug(p.headphone)}`}>{p.headphone}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        })}

        {/* Internal links */}
        <h2>Related Pages</h2>
        <nav>
          <ul>
            {games.map(g => <li key={g}><a href={`/games/${slug(g)}`}>{g} Pro Settings</a></li>)}
            {topHeadphones.slice(0, 5).map(([m]) => <li key={m}><a href={`/headphones/${slug(m)}`}>{m} Review</a></li>)}
            <li><a href="/teams">All Pro Teams</a></li>
            <li><a href="/players">All Pro Players</a></li>
          </ul>
        </nav>
      </article>

      <EsportsHeadphones initialTab="teamDetail" initialTeam={teamName} />
    </>
  );
}
