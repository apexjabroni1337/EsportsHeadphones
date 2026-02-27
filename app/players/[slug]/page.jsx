import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { proPlayers, headphones, allPlayers, headphone_DESCRIPTIONS, BRAND_COLORS, amazonLink, countryName } from "@/data";
import { PLAYER_BIOS } from "@/data/bios";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
const findHeadphone = (name) => name ? headphones.find((m) => name.includes(m.name) || m.name.includes(name)) : undefined;
const mSlug = (name) => { const m = findHeadphone(name); return m ? slug(m.name) : null; };

// Only pre-build pages for proPlayers (have bios/profiles ~263 players).
// All other players still work via on-demand rendering (dynamicParams = true by default).
function getUniquePlayersBySlug() {
  const slugMap = new Map();
  proPlayers.forEach((p) => {
    const s = slug(p.name);
    if (!slugMap.has(s)) slugMap.set(s, p);
  });
  allPlayers.forEach((p) => {
    const s = slug(p.name);
    if (!slugMap.has(s)) slugMap.set(s, p);
  });
  return slugMap;
}

const playerSlugMap = getUniquePlayersBySlug();

export function generateStaticParams() {
  // CS2 & Valorant: top 150 each. All other games: top 50 each.
  // Remaining players still work via on-demand SSR.
  const CAPS = { CS2: 150, Valorant: 150 };
  const DEFAULT_CAP = 50;
  const gameCounts = {};
  const staticSlugs = new Set();
  const params = [];

  // proPlayers first (have bios, higher value)
  for (const p of proPlayers) {
    const s = slug(p.name);
    if (staticSlugs.has(s)) continue;
    const cap = CAPS[p.game] || DEFAULT_CAP;
    gameCounts[p.game] = (gameCounts[p.game] || 0) + 1;
    if (gameCounts[p.game] > cap) continue;
    staticSlugs.add(s);
    params.push({ slug: s });
  }

  // Then remaining allPlayers
  for (const p of allPlayers) {
    const s = slug(p.name);
    if (staticSlugs.has(s)) continue;
    const cap = CAPS[p.game] || DEFAULT_CAP;
    gameCounts[p.game] = (gameCounts[p.game] || 0) + 1;
    if (gameCounts[p.game] > cap) continue;
    staticSlugs.add(s);
    params.push({ slug: s });
  }

  return params;
}

export function generateMetadata({ params }) {
  const player = playerSlugMap.get(params.slug);
  if (!player) return { title: "Player Not Found" };
  const bio = PLAYER_BIOS[player.name] || null;
  const description = bio
    ? bio.slice(0, 155) + "..."
    : `${player.name} (${player.fullName || player.name}) — ${player.game} pro for ${player.team}. Uses ${player.headphone}.`;
  const GAME_OG_COLORS = { CS2: "%23ff8c00", Valorant: "%23ff4655", Fortnite: "%234c7bd9", LoL: "%23c89b3c", "Dota 2": "%23e74c3c", "R6 Siege": "%234a86c8", "Overwatch 2": "%23f99e1a", Apex: "%23dc2626", "Call of Duty": "%235cb85c", PUBG: "%23f2a900", Deadlock: "%238b5cf6", "Quake Champions": "%23ce4a00", "Marvel Rivals": "%23ed1d24", "Rocket League": "%231a9fff" };
  const ogAccent = GAME_OG_COLORS[player.game] || "%2300ff6a";
  const ogUrl = `https://esportsheadphones.com/og?title=${encodeURIComponent(player.name)}&subtitle=${encodeURIComponent(`${player.game} · ${player.team}`)}&badge=${encodeURIComponent(player.game + ' Pro')}&accent=${ogAccent}&stat1=${encodeURIComponent(player.headphone.replace(/(Logitech |Razer |)/, ''))}&s1Label=Headphone&stat2=${encodeURIComponent(player.team)}&s2Label=Team&stat3=${encodeURIComponent(player.role)}&s3Label=Role`;
  return {
    title: `${player.name} — ${player.game} Pro Player Settings & Gear`,
    description,
    alternates: { canonical: `https://esportsheadphones.com/players/${params.slug}` },
    openGraph: {
      title: `${player.name} — ${player.game} Pro Player Settings & Gear`,
      description,
      url: `https://esportsheadphones.com/players/${params.slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${player.name} - ${player.game} pro player settings` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${player.name} — ${player.game} Pro Player Settings & Gear`,
      description,
      images: [ogUrl],
    },
  };
}

export default function PlayerProfilePage({ params }) {
  const player = playerSlugMap.get(params.slug);
  if (!player) return <EsportsHeadphones initialTab="players" />;
  const bio = PLAYER_BIOS[player.name] || null;

  const headphoneData = findHeadphone(player.headphone);
  const headphoneSlugVal = headphoneData ? slug(headphoneData.name) : null;
  const mouseDesc = headphoneData ? headphone_DESCRIPTIONS[headphoneData.name] : null;

  // Game players for context
  const allGamePlayers = allPlayers.filter((p) => p.game === player.game);

  return (
    <>
      {/* JSON-LD Person structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: player.fullName || player.name,
        alternateName: player.name,
        jobTitle: `Professional ${player.game} Player`,
        description: bio ? bio.slice(0, 300) : `${player.name} is a professional ${player.game} player for ${player.team}. Uses the ${player.headphone}.`,
        memberOf: { "@type": "SportsTeam", name: player.team },
        url: `https://esportsheadphones.com/players/${params.slug}`,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportsheadphones.com" },
          { "@type": "ListItem", position: 2, name: "Players", item: "https://esportsheadphones.com/players" },
          { "@type": "ListItem", position: 3, name: player.name, item: `https://esportsheadphones.com/players/${params.slug}` },
        ],
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/Person"
      >
        <h1 itemProp="name">{player.name} ({player.fullName || player.name}) — {player.game} Professional Player Settings and Gear</h1>
        <meta itemProp="alternateName" content={player.fullName || player.name} />
        <meta itemProp="jobTitle" content={`Professional ${player.game} Player`} />

        <h2>About {player.name}</h2>
        {bio && <p itemProp="description">{bio}</p>}
        {!bio && (
          <p>
            {player.name} ({player.fullName || player.name}) is a professional <a href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game}</a> player
            for <a href={`/teams/${player.team?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.team}</a>. They play the {player.role} role and are {player.age} years old.
            {player.name} uses the {headphoneSlugVal ? <a href={`/headphones/${headphoneSlugVal}`}>{player.headphone}</a> : player.headphone}.
          </p>
        )}

        <h2>{player.name} Complete Headphone Settings</h2>
        <table>
          <caption>Full headphone settings for {player.name} in {player.game}</caption>
          <tbody>
            <tr><th>Headphone</th><td>{headphoneSlugVal ? <a href={`/headphones/${headphoneSlugVal}`}>{player.headphone}</a> : player.headphone}</td></tr>
            <tr><th>Polling Rate</th><td>{player.hz} Hz</td></tr>
          </tbody>
        </table>

        <h2>{player.name} Player Profile</h2>
        <table>
          <caption>Personal and career information for {player.name}</caption>
          <tbody>
            <tr><th>In-Game Name</th><td>{player.name}</td></tr>
            <tr><th>Full Name</th><td>{player.fullName || player.name}</td></tr>
            <tr><th>Game</th><td><a href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game}</a></td></tr>
            <tr><th>Team</th><td><a href={`/teams/${player.team?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.team}</a></td></tr>
            <tr><th>Role</th><td>{player.role}</td></tr>
            <tr><th>Age</th><td>{player.age}</td></tr>
            <tr><th>Country</th><td>{countryName(player.country)}</td></tr>
          </tbody>
        </table>


        {headphoneData && (
          <>
            <h2>{player.name}&apos;s Headphone — {headphoneData.name} Details</h2>
            <p>
              {player.name} currently uses the <a href={`/headphones/${headphoneSlugVal}`}>{headphoneData.name}</a> by <a href={`/brands/${headphoneData.brand?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{headphoneData.brand}</a>.
              {mouseDesc ? ` ${mouseDesc.text.slice(0, 300)}...` : ` It weighs ${headphoneData?.weight}g, uses the ${headphoneData.driverType} driver, and costs $${headphoneData?.price}.`}
            </p>
            <table>
              <caption>{headphoneData.name} specifications — {player.name}&apos;s current headphone</caption>
              <tbody>
                <tr><th>Headphone</th><td><a href={`/headphones/${headphoneSlugVal}`}>{headphoneData.name}</a></td></tr>
                <tr><th>Brand</th><td><a href={`/brands/${headphoneData.brand?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{headphoneData.brand}</a></td></tr>
                <tr><th>Weight</th><td>{headphoneData?.weight}g</td></tr>
                <tr><th>Driver</th><td><a href={`/sensors/${headphoneData.driverType?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{headphoneData.driverType}</a></td></tr>
                <tr><th>Actuation</th><td>{headphoneData.actuationPoint}mm</td></tr>
                <tr><th>Polling Rate</th><td>{headphoneData.pollingRate.toLocaleString()} Hz</td></tr>
                <tr><th>Layout</th><td><a href={`/best/${headphoneData.layout?.toLowerCase()}`}>{headphoneData.layout}</a></td></tr>
                <tr><th>Connectivity</th><td>{headphoneData.connectivity}</td></tr>
                <tr><th>Price</th><td>${headphoneData?.price}</td></tr>
                <tr><th>Switches</th><td>{headphoneData.switches}</td></tr>
                <tr><th>Pro Usage</th><td>{headphoneData?.proUsage}% of all tracked pros</td></tr>
                <tr><th>Rating</th><td>{headphoneData.rating}/10</td></tr>
              </tbody>
            </table>
            <p><a href={amazonLink(headphoneData.name)}>Buy the {headphoneData.name} on Amazon for ${headphoneData?.price}</a></p>
          </>
        )}

        {player.achievements && player.achievements.length > 0 && (
          <>
            <h2>{player.name} Career Achievements and Awards</h2>
            <p>{player.name} has accumulated {player.achievements.length} major achievements and awards throughout their career:</p>
            <ul>
              {player.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </>
        )}

        {player.headphoneHistory && player.headphoneHistory.length > 0 && (
          <>
            <h2>{player.name} Headphone History Timeline</h2>
            <p>
              {player.name} has used {player.headphoneHistory.length} different headphones throughout their professional career.
              Here is the complete timeline:
            </p>
            <table>
              <caption>Complete headphone history for {player.name}</caption>
              <thead><tr><th>Headphone</th><th>Period</th><th>Brand</th></tr></thead>
              <tbody>
                {player.headphoneHistory.map((mh, i) => {
                  const histMouse = findHeadphone(mh.headphone);
                  const histSlug = histMouse ? slug(histMouse.name) : null;
                  return (
                    <tr key={i}>
                      <td>{histSlug ? <a href={`/headphones/${histSlug}`}>{mh.headphone}</a> : mh.headphone}</td>
                      <td>{mh.period}</td>
                      <td>{histMouse ? histMouse.brand : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {/* Teammates */}
        {(() => {
          const teammates = proPlayers.filter((p) => p.team === player.team && p.name !== player.name);
          if (!teammates.length) return null;
          return (
            <>
              <h2>{player.team} Roster — {player.name}&apos;s Teammates</h2>
              <p>Current {player.team} players and their headphone setups:</p>
              <table>
                <thead><tr><th>Player</th><th>Role</th><th>Headphone</th></tr></thead>
                <tbody>
                  {teammates.map((p) => {
                    const ms = mSlug(p.headphone);
                    return (
                      <tr key={p.name}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.role}</td>
                        <td>{ms ? <a href={`/headphones/${ms}`}>{p.headphone}</a> : p.headphone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Same headphone players */}
        {(() => {
          const sameMousePlayers = proPlayers.filter((p) => {
            if (p.name === player.name || !p.headphone || !player.headphone) return false;
            const pm = p.headphone.toLowerCase(), cm = player.headphone.toLowerCase();
            return pm === cm || pm.includes(cm) || cm.includes(pm);
          }).slice(0, 20);
          if (!sameMousePlayers.length) return null;
          const gameBreakdown = {};
          sameMousePlayers.forEach((p) => { gameBreakdown[p.game] = (gameBreakdown[p.game] || 0) + 1; });
          return (
            <>
              <h2>Other Pro Players Using the {player.headphone}</h2>
              <p>
                {sameMousePlayers.length} other featured pros also use the {player.headphone} across{" "}
                {Object.entries(gameBreakdown).map(([g, c]) => `${g} (${c})`).join(", ")}.
              </p>
              <table>
                <thead><tr><th>Player</th><th>Game</th><th>Team</th></tr></thead>
                <tbody>
                  {sameMousePlayers.map((p) => (
                    <tr key={`${p.name}-${p.game}`}>
                      <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                      <td>{p.game}</td>
                      <td>{p.team}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Same game players */}
        {(() => {
          const sameGame = proPlayers.filter((p) => p.game === player.game && p.name !== player.name);
          if (!sameGame.length) return null;
          return (
            <>
              <h2>All {player.game} Pro Players</h2>
              <p>{sameGame.length} other {player.game} pro players with detailed profiles:</p>
              <table>
                <thead><tr><th>Player</th><th>Team</th><th>Role</th><th>Headphone</th></tr></thead>
                <tbody>
                  {sameGame.map((p) => {
                    const ms = mSlug(p.headphone);
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
            </>
          );
        })()}

        {/* Similar sensitivity */}
        {(() => {
          const similar = proPlayers
            .filter((p) => p.name !== player.name && p.game === player.game && Math.abs(p.edpi - player.edpi) <= 150)
            .sort((a, b) => Math.abs(a.edpi - player.edpi) - Math.abs(b.edpi - player.edpi))
            .slice(0, 12);
          if (!similar.length) return null;
          return (
            <>
              <h2>{player.game} Players with Similar Sensitivity to {player.name}</h2>
              <p>{player.name} plays at {player.edpi} eDPI. These {player.game} pros use a sensitivity within ±150 eDPI:</p>
              <table>
                <thead><tr><th>Player</th><th>Team</th><th>Headphone</th></tr></thead>
                <tbody>
                  {similar.map((p) => {
                    const ms = mSlug(p.headphone);
                    return (
                      <tr key={p.name}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.team}</td>
                        <td>{ms ? <a href={`/headphones/${ms}`}>{p.headphone}</a> : p.headphone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Same role players */}
        {(() => {
          const sameRole = allPlayers
            .filter((p) => p.name !== player.name && p.game === player.game && p.role === player.role)
            .slice(0, 10);
          if (!sameRole.length) return null;
          return (
            <>
              <h2>Other {player.game} {player.role}s</h2>
              <p>Other professional {player.game} players who also play the {player.role} role:</p>
              <ul>
                {sameRole.map((p) => {
                  const ms = mSlug(p.headphone);
                  return (
                    <li key={p.name}>
                      <a href={`/players/${slug(p.name)}`}>{p.name}</a> ({p.team})
                      — uses {ms ? <a href={`/headphones/${ms}`}>{p.headphone}</a> : p.headphone}, {p.edpi} eDPI
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })()}

        {/* FAQ section */}
        <h2>Frequently Asked Questions About {player.name}</h2>
        <dl>
          <dt>What headphone does {player.name} use?</dt>
          <dd>{player.name} uses the {headphoneSlugVal ? <a href={`/headphones/${headphoneSlugVal}`}>{player.headphone}</a> : player.headphone}. {headphoneData ? `It weighs ${headphoneData?.weight}g, costs $${headphoneData?.price}, and uses the ${headphoneData.driverType} driver.` : ""}</dd>

          <dt>What team does {player.name} play for?</dt>
          <dd>{player.name} ({player.fullName || player.name}) currently plays for {player.team} as a {player.role} in {player.game}.</dd>

          <dt>What polling rate does {player.name} use?</dt>
          <dd>{player.name} uses a polling rate of {player.hz} Hz on their {player.headphone}.</dd>

          {player.headphoneHistory && player.headphoneHistory.length > 1 && (
            <>
              <dt>What headphones has {player.name} used in the past?</dt>
              <dd>{player.name} has used {player.headphoneHistory.length} headphones throughout their career: {player.headphoneHistory.map((mh) => `${mh.headphone} (${mh.period})`).join(", ")}.</dd>
            </>
          )}
        </dl>

        <nav aria-label="Related pages">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/players">All Pro Players — Complete Database</a></li>
            <li><a href="/headphones">All Esports Headphones — Specs and Rankings</a></li>
            {headphoneSlugVal && <li><a href={`/headphones/${headphoneSlugVal}`}>{player.headphone} — Full Review and Specs</a></li>}
            <li><a href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game} Headphone Meta and Usage Data</a></li>
            <li><a href="/brands">Headphone Brand Comparison</a></li>
            <li><a href="/drivers">Headphone Driver Comparison</a></li>
            <li><a href="/compare">Compare Headphones Side by Side</a></li>
            <li><a href="/trends">Esports Headphone Industry Trends</a></li>
            <li><a href="/best">Headphone Layout Overlay Tool</a></li>
            <li><a href="/lab">Headphone Finder Quiz</a></li>
            <li><a href="/">EsportsHeadphones Home</a></li>
          </ul>
        </nav>
      </article>

      {/* Visible server-rendered content */}
      <SSRSection>
        <SSRTitle accent={player.game}>{player.name}</SSRTitle>
        <SSRSub>
          {bio
            ? bio.slice(0, 280) + "..."
            : `${player.name} (${player.fullName || player.name}) is a professional ${player.game} ${player.role} for ${player.team}. Uses the ${player.headphone}.`
          }
        </SSRSub>
        <SSRGrid>
          <SSRStat label="Headphone" value={player.headphone.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")} color="#00d4ff" />
          <SSRStat label="Polling Rate" value={`${player.hz} Hz`} color="#00d4ff" />
          <SSRStat label="Team" value={player.team} />
          <SSRStat label="Role" value={player.role} />
        </SSRGrid>
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          {headphoneSlugVal && <SSRLink href={`/headphones/${headphoneSlugVal}`}>{player.headphone.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")} →</SSRLink>}
          <SSRLink href="/players">All Players</SSRLink>
          <SSRLink href=>Convert Sensitivity</SSRLink>
          <SSRLink href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game}</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="players" initialPlayerSlug={params.slug} />
    </>
  );
}
