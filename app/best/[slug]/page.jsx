import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { headphones, allPlayers, proPlayers, BRAND_COLORS, HEADPHONE_IMAGE_URLS, amazonLink } from "@/data";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const BEST_PAGES = {
  "cs2": { game: "CS2", full: "Counter-Strike 2", tab: "cs2", intro: "Counter-Strike 2 demands precision aiming, pixel-perfect crosshair placement, and consistent flick shots. Pro CS2 players overwhelmingly prefer lightweight wireless headphones with flawless drivers and low latency. The ideal CS2 headphone combines a safe shape for long tournament sessions with sub-60g weight for fast target acquisition.", tips: "CS2 pros typically use 400-800 DPI with low in-game sensitivity (1.0-2.0 at 800 DPI). A large mousepad and low eDPI give maximum precision for headshot-heavy gameplay. Most top players prefer symmetrical shapes for consistent aim." },
  "valorant": { game: "Valorant", full: "Valorant", tab: "valorant", intro: "Valorant's tactical gameplay combines precise gunplay with ability usage, requiring a headphone that excels at both micro-adjustments and fast flicks. The best Valorant headphones are lightweight, wireless, and feature top-tier drivers. Pro Valorant players tend to use similar setups to CS2 pros, with a slight preference for even lower DPI settings.", tips: "Valorant pros favor 800 DPI with 0.2-0.5 in-game sensitivity. The game's precise hit registration rewards consistent, controlled inputs. Wireless has become the standard — virtually no top Valorant pros use wired headphones in 2025." },
  "fortnite": { game: "Fortnite", full: "Fortnite Battle Royale", tab: "fortnite", intro: "Fortnite's unique building mechanics demand a headphone that handles both rapid 180° turns during build fights and precise aim for shotgun flicks. Pro Fortnite players tend to use higher sensitivities than CS2/Valorant pros to accommodate quick building, making lightweight headphones with excellent tracking essential.", tips: "Fortnite pros use higher DPI (800-1600) with moderate sensitivity. Fast edit and build sequences require quick inputs, so ultralight headphones under 55g are popular. The side buttons need to be accessible for build keybinds." },
  "apex": { game: "Apex", full: "Apex Legends", tab: "apex", intro: "Apex Legends' fast-paced movement system, including sliding, climbing, and character abilities, demands a headphone that can track fast-moving targets while maintaining accuracy during chaotic gunfights. Pros need excellent tracking aim for weapons like the R-301 and R-99.", tips: "Apex pros use moderate sensitivity — higher than CS2 but lower than Fortnite. Tracking aim is more important than flick aim, so consistent switch performance matters. Many top players prefer ergonomic layouts for comfort during long play sessions." },
  "overwatch-2": { game: "Overwatch 2", full: "Overwatch 2", tab: "overwatch-2", intro: "Overwatch 2's hero-based gameplay means headphone requirements vary by role. Hitscan DPS players need precise flick aim, while tank and support players benefit from comfortable shapes for extended sessions. The game's fast movement speeds and vertical gameplay demand responsive tracking.", tips: "OW2 DPS pros typically use 800 DPI with 3-6 in-game sensitivity. The game rewards both flick and tracking aim depending on hero. Most pros prefer lightweight headphones for the fast-paced DPS role." },
  "r6-siege": { game: "R6 Siege", full: "Rainbow Six Siege", tab: "r6-siege", intro: "Rainbow Six Siege is a precision-focused tactical shooter where holding angles and pixel-peeking are crucial. The slow, methodical gameplay rewards extremely precise aim and low sensitivity. R6 pros need headphones with excellent sensors and comfortable shapes for holding tight angles.", tips: "R6 Siege pros use very low sensitivity, similar to CS2. Pixel-peeking and holding angles means micro-adjustments are critical. A safe, comfortable shape is essential for maintaining aim during long defensive holds." },
  "lol": { game: "LoL", full: "League of Legends", tab: "lol", intro: "League of Legends requires rapid, precise clicking for last-hitting, ability targeting, and kiting. While not an FPS, LoL demands excellent headphone accuracy for micro-intensive champions. Pro LoL players prioritize click responsiveness, comfortable shapes, and reliable sensors.", tips: "LoL pros use higher DPI (800-1600+) since the game involves rapid cursor movement across the screen. Click latency matters more than tracking accuracy. Ergonomic headphones are popular for comfort during marathon gaming sessions." },
  "pubg": { game: "PUBG", full: "PUBG: Battlegrounds", tab: "pubg", intro: "PUBG's realistic ballistics and long-range engagements demand precise aim at distance, while close-range fights in buildings require fast target acquisition. The game's varied engagement distances mean a versatile headphone setup is essential.", tips: "PUBG pros use moderate to low sensitivity for precision at range. The variety of engagement distances means a balanced setup works best. Reliable wireless performance is important for consistent aim." },
  "dota-2": { game: "Dota 2", full: "Dota 2", tab: "dota-2", intro: "Dota 2 requires precise clicking for last-hitting, spell targeting, and micro-management of units. Like LoL, headphone click responsiveness and comfort are the primary concerns. Many Dota 2 pros prefer ergonomic headphones for comfort during the long game durations.", tips: "Dota 2 pros use higher DPI for fast cursor movement. Click feel and reliability matter more than switch precision. Ergonomic layouts dominate due to the long average game length." },
  "rocket-league": { game: "Rocket League", full: "Rocket League", tab: "rocket-league", intro: "While Rocket League is primarily a controller game, some PC players use headphone and mouse. The game's fast aerial mechanics and precise car control mean responsiveness is key for the small percentage of pro players who opt for M&K.", tips: "Most Rocket League pros use controllers, but M&K players benefit from responsive headphones with comfortable shapes for the game's fast-paced aerial gameplay." },
  "call-of-duty": { game: "Call of Duty", full: "Call of Duty", tab: "call-of-duty", intro: "Call of Duty's fast-paced arcade shooter gameplay rewards quick target acquisition and snap aim. The game's fast time-to-kill means getting on target first is crucial, making lightweight headphones with fast click response essential for competitive play.", tips: "CoD PC pros use moderate sensitivity for fast target acquisition. The fast pace rewards quick reactions over precision. Lightweight wireless headphones are the standard for competitive CoD on PC." },
  "marvel-rivals": { game: "Marvel Rivals", full: "Marvel Rivals", tab: "marvel-rivals", intro: "Marvel Rivals is a newer hero shooter that combines fast movement with varied aiming styles depending on the character. Like Overwatch, different heroes demand different aiming mechanics, but fast-tracking and flick aim are both important.", tips: "Marvel Rivals plays similarly to Overwatch in terms of aim requirements. Pros tend to use similar setups to OW2 players — lightweight wireless headphones with responsive sensors." },
  "lightweight": { game: null, full: "Lightweight & Ultralight", tab: null, intro: "The ultralight headphone revolution has transformed competitive gaming. Lighter headphones allow faster flicks, reduce fatigue during long sessions, and give players more control during rapid movements. The sweet spot for most pros is 45-60g, balancing minimal weight with solid build quality.", tips: "Under 50g is considered ultralight, 50-60g is lightweight. Most pros prefer the 50-58g range as it offers the best balance of speed and control. Very light headphones (under 45g) can feel too fast for some players." },
  "tournament-favorites": { collection: true, full: "Tournament Favorites", category: "Tournament Winners", intro: "The headphones dominating major esports championships worldwide. These are the trusted choices of the world's best professional players, proven in the highest-pressure competitive environments. Tournament favorites combine proven reliability, lightweight design, and superior audio clarity that gives pros a competitive edge when millions of dollars are on the line. Every headphone on this list has been chosen by championship-winning teams and top-tier esports organizations.", tips: "Tournament-winning headphones share common traits: sub-80g weight, wireless connectivity, proven reliability under pressure, and industry-leading sensors. These headphones have been battle-tested at multiple international LANs and consistently deliver when it matters most. Pros trust these because they've proven themselves at the highest levels of competitive play." },
  "anc": { collection: true, full: "Best ANC Headsets", category: "Noise Cancellation", intro: "Active noise cancellation transforms the competitive gaming experience at noisy LAN events. When tournament crowds, venue sound systems, and ambient noise threaten to distract from precision gameplay, ANC headphones create a bubble of focus. The best gaming ANC headsets deliver noise cancellation without the latency penalty, combining active isolation with responsive sensors for tournament-level performance. Whether you're grinding ranked at home or competing at a major LAN, quality ANC gives you the audio environment control essential for peak performance.", tips: "Top ANC gaming headphones use passive isolation combined with active cancellation to eliminate low-frequency rumble without introducing perceptible latency. Look for headphones that allow toggling ANC on/off, as some pros prefer it only during practice sessions. Battery life becomes critical with ANC enabled — ensure you have backup power for tournament days." },
  "budget": { collection: true, full: "Budget Champions", category: "Value Kings", intro: "Professional-grade gaming performance doesn't require premium pricing. The budget esports headphones in our database prove that excellent competitive gaming audio is achievable under $100. These are the headphones chosen by rising competitive players, content creators, and esports organizations looking for exceptional value. Budget champions feature the same quality sensors found in expensive headphones, reliable wireless connectivity, and proven track records in competitive play. Whether you're breaking into esports or upgrading from basic gaming audio, these headphones deliver tournament-ready performance at accessible prices.", tips: "Budget gaming headphones have undergone massive improvements in recent years. Modern sub-$100 headphones often include top-tier sensor technology that rivals headphones costing twice as much. The real differences at lower price points are typically in build materials, weight, and battery life — not core performance. Look for headphones with proven pro usage stats, even if they're budget-priced." },
  "wireless": { collection: true, full: "Wireless Freedom", category: "Cordless Champions", intro: "The wireless revolution in esports gaming has been complete — the vast majority of professional players now compete on wireless headphones. Modern wireless technology has eliminated any latency concerns, while the freedom of movement offered by cordless audio provides a tangible competitive advantage. No cable drag, no caught headphone cables, no physical constraints — just pure focus on your game. Wireless gaming headphones have gone from curiosity to standard in professional esports, and the best options rival or exceed wired alternatives in every meaningful way.", tips: "Top wireless gaming headphones operate at 2.4GHz or better with sub-1ms latency, making them indistinguishable from wired alternatives in competitive contexts. Battery life varies significantly — tournament headphones should offer 30+ hours of gaming on a single charge. Look for headphones with quick charge capability (full charge in under 3 hours) for tournament day convenience. Most pros keep backup batteries or charging cables in their tournament bags." },
  "audiophile": { collection: true, full: "Audiophile Grade", category: "High-Fidelity Audio", intro: "For competitive players who refuse to compromise on audio quality, audiophile-grade open-back headphones deliver pristine, revealing sound that exposes competitive audio cues invisible to other headphones. Open-back design creates a spacious soundstage that makes positional audio more intuitive and rewarding. Professional studio headphones like the beyerdynamic DT 990 Pro and Sennheiser HD 600 have discovered a second life in esports, beloved by players who value audio accuracy as much as gaming performance. These headphones demand more: better amplification, careful impedance matching, and discipline in listening environments. But for players who want the ultimate audio experience, audiophile headphones transform gaming into an art form.", tips: "Open-back headphones excel at soundstage and clarity but require careful setup. High-impedance variants (especially the 250-ohm DT 990 Pro) need a dedicated amplifier for proper performance. Open-back design means audio leakage — great for solo practice, challenging for shared environments. Many audiophile players use these for home practice and isolated training but switch to closed-back headphones for shared LANs. The detail these headphones reveal can actually improve competitive performance through better spatial awareness." },
};

const ALL_SLUGS = Object.keys(BEST_PAGES);

export function generateStaticParams() {
  return ALL_SLUGS.map(s => ({ slug: s }));
}

export function generateMetadata({ params }) {
  const page = BEST_PAGES[params.slug];
  if (!page) return { title: "Best Esports Headphone" };

  const isGame = !!page.game;
  const title = isGame
    ? `Best Headphone for ${page.full} (2026) — Top Pro Picks & Settings`
    : `Best ${page.full} Gaming Headphone (2026) — Pro Picks & Rankings`;
  const description = isGame
    ? `Find the best gaming headphone for ${page.full}. See what headphones pro ${page.game} players actually use, with full specs, prices, and settings. Data from ${allPlayers.filter(p => p.game === page.game).length}+ pro players.`
    : `The best ${page.full.toLowerCase()} gaming headphones for esports in 2026. Compare top picks used by ${allPlayers.length}+ pro players with full specs, prices, and rankings.`;

  return {
    title,
    description,
    alternates: { canonical: `https://esportsheadphones.com/best/${params.slug}` },
    openGraph: {
      title, description,
      url: `https://esportsheadphones.com/best/${params.slug}`,
      images: [{
        url: `https://esportsheadphones.com/og?title=${encodeURIComponent(isGame ? "Best Headphone for " + page.full : "Best " + page.full + " Headphones")}&subtitle=${encodeURIComponent("2026 Pro Player Data")}`,
        width: 1200, height: 630,
      }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function BestForPage({ params }) {
  const page = BEST_PAGES[params.slug];
  if (!page) return <EsportsHeadphones initialTab="rankings" />;

  const isGame = !!page.game;
  const isCollection = page.collection;

  // Get headphones sorted by usage for this game, or all headphones for category pages
  let topHeadphonesForPage;
  let players;
  if (isGame) {
    players = allPlayers.filter(p => p.game === page.game);
    const headphoneCounts = {};
    players.forEach(p => {
      if (!p.headphone) return;
      const matched = headphones.find(m => m.name.toLowerCase() === p.headphone.toLowerCase());
      if (matched) headphoneCounts[matched.name] = (headphoneCounts[matched.name] || 0) + 1;
    });
    topHeadphonesForPage = Object.entries(headphoneCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => {
        const m = headphones.find(mm => mm.name === name);
        if (!m) return null;
        return { ...m, gameUsage: count, gamePercent: ((count / players.length) * 100).toFixed(1) };
      }).filter(Boolean);
  } else if (params.slug === "tournament-favorites") {
    // Top 10 headphones by pro usage
    topHeadphonesForPage = [...headphones].sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "anc") {
    // Headphones with ANC enabled, sorted by pro usage
    topHeadphonesForPage = [...headphones].filter(m => m.anc === true).sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "wireless") {
    // Wireless headphones sorted by pro usage
    topHeadphonesForPage = [...headphones].filter(m => m.connectivity === "Wireless").sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "budget") {
    // Headphones under $100, sorted by pro usage
    topHeadphonesForPage = [...headphones].filter(m => m?.price <= 100).sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "audiophile") {
    // Open-back headphones (beyerdynamic DT 990, DT 900, Sennheiser HD series, etc)
    const audiophileNames = ["beyerdynamic DT 990 Pro", "beyerdynamic DT 900 Pro X", "Sennheiser HD 600", "Sennheiser HD800 S", "Sennheiser HD 560S", "Sennheiser GAME ONE"];
    topHeadphonesForPage = headphones
      .filter(m => audiophileNames.some(name => m.name.toLowerCase().includes(name.toLowerCase())))
      .sort((a, b) => b?.proUsage - a?.proUsage)
      .map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "lightweight") {
    // Lightweight headphones under 60g, sorted by weight
    topHeadphonesForPage = [...headphones].filter(m => m?.weight < 60).sort((a, b) => a?.weight - b?.weight).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else {
    topHeadphonesForPage = [...headphones].sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  }


  const pageTitle = isGame
    ? `Best Headphone for ${page.full} (2026)`
    : isCollection
    ? `${page.full} (2026)`
    : `Best ${page.full} Gaming Headphone (2026)`;

  // FAQ schema
  const faq = isGame ? [
    { q: `What is the best headphone for ${page.full}?`, a: `The most popular headphone among ${page.game} pros is the ${topHeadphonesForPage[0]?.name || "Wooting 60HE"}, used by ${topHeadphonesForPage[0]?.gamePercent || "N/A"}% of tracked players. The top 3 are: ${topHeadphonesForPage.slice(0, 3).map(m => m.name).join(", ")}.` },
    { q: `Do ${page.game} pros use wireless headphones?`, a: `Yes — the vast majority of ${page.game} pros now use wireless headphones. Modern wireless headphones from Razer, Logitech, and others have sub-1ms latency, making them equal to or better than wired alternatives.` },
  ] : isCollection ? [
    { q: `What are the best ${page.full.toLowerCase()} headphones?`, a: `The top ${page.full.toLowerCase()} headphones based on professional esports usage are: ${topHeadphonesForPage.slice(0, 5).map(m => m.name).join(", ")}. These headphones are ranked by adoption rate among ${allPlayers.length}+ professional esports players competing at the highest levels.` },
  ] : [
    { q: `What is the best ${page.full.toLowerCase()} gaming headphone?`, a: `The top ${page.full.toLowerCase()} gaming headphones based on pro usage are: ${topHeadphonesForPage.slice(0, 5).map(m => m.name).join(", ")}. These are ranked by adoption rate among ${allPlayers.length}+ professional esports players.` },
  ];

  // Other best-of pages
  const otherPages = ALL_SLUGS.filter(s => s !== params.slug).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(f => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: pageTitle,
        itemListElement: topHeadphonesForPage.slice(0, 10).map((m, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportsheadphones.com/headphones/${sl(m.name)}`,
          name: m.name,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "EsportsHeadphones", item: "https://esportsheadphones.com" },
          { "@type": "ListItem", position: 2, name: "Best Headphones", item: "https://esportsheadphones.com/best" },
          { "@type": "ListItem", position: 3, name: pageTitle, item: `https://esportsheadphones.com/best/${params.slug}` },
        ],
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>{pageTitle}</h1>
        <p>{page.intro}</p>

        <h2>Top 10 {isGame ? `${page.game} Pro` : page.full} Headphones — Ranked by {isGame ? "Pro Usage" : "Performance"}</h2>
        <table>
          <caption>{pageTitle} — Rankings</caption>
          <thead><tr><th>#</th><th>Headphone</th><th>Brand</th><th>Weight</th><th>Driver</th><th>Price</th><th>{isGame ? `${page.game} Usage` : "Pro Usage"}</th></tr></thead>
          <tbody>
            {topHeadphonesForPage.map((m, i) => (
              <tr key={m.name}>
                <td>{i + 1}</td>
                <td><a href={`/headphones/${sl(m.name)}`}>{m.name}</a></td>
                <td>{m.brand}</td>
                <td>{m?.weight}g</td>
                <td>{m.driverType}</td>
                <td>${m?.price}</td>
                <td>{m.gamePercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Tips & Settings</h2>
        <p>{page.tips}</p>


        <h2>Buy the Top Pick</h2>
        {topHeadphonesForPage.slice(0, 3).map(m => (
          <p key={m.name}><a href={amazonLink(m.name)}>Buy {m.name} on Amazon</a> — ${m?.price}, {m?.weight}g, {m.driverType}</p>
        ))}

        <h2>FAQ</h2>
        {faq.map(f => (
          <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
        ))}

        <h2>More Best Headphone Guides</h2>
        <ul>
          {otherPages.map(s => (
            <li key={s}><a href={`/best/${s}`}>Best Headphone for {BEST_PAGES[s].full}</a></li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          {isGame && <li><a href={`/games/${sl(page.game)}`}>{page.game} Game Page</a></li>}
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/compare">Compare Headphones</a></li>
          <li><a href="/sensitivity">Sensitivity Converter</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent={isGame ? page.full : page.full}>{isGame ? `Best Headphone for ${page.full}` : isCollection ? page.full : `Best ${page.full} Headphones`}</SSRTitle>
        <SSRSub>{page.intro.slice(0, 200)}...</SSRSub>

        {/* Tier List */}
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {(() => {
            const tierData = [
              {
                tier: "S",
                label: "S-Tier",
                color: "#b8956a",
                bgColor: "rgba(184, 149, 106, 0.08)",
                headphones: topHeadphonesForPage.slice(0, 1)
              },
              {
                tier: "A",
                label: "A-Tier",
                color: "#b8956a",
                bgColor: "rgba(6, 182, 212, 0.08)",
                headphones: topHeadphonesForPage.slice(1, 3)
              },
              {
                tier: "B",
                label: "B-Tier",
                color: "#2d2824",
                bgColor: "rgba(139, 92, 246, 0.08)",
                headphones: topHeadphonesForPage.slice(3, 6)
              },
              {
                tier: "C",
                label: "C-Tier",
                color: "#a09890",
                bgColor: "rgba(160, 152, 144, 0.08)",
                headphones: topHeadphonesForPage.slice(6, 10)
              }
            ];

            return tierData.map((tierGroup) => (
              tierGroup.headphones.length > 0 && (
                <div key={tierGroup.tier} style={{ marginBottom: "1.5rem" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    paddingBottom: "0.75rem",
                    marginBottom: "0.75rem",
                    borderBottom: `2px solid ${tierGroup.color}`
                  }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "4px",
                      backgroundColor: tierGroup.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#f5f0e8"
                    }}>
                      {tierGroup.tier}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#a09890", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {tierGroup.label}
                    </div>
                  </div>

                  {tierGroup.headphones.map((kbd, idx) => (
                    <div
                      key={kbd.name}
                      style={{
                        padding: "1rem",
                        backgroundColor: tierGroup.bgColor,
                        borderRadius: "4px",
                        marginBottom: idx < tierGroup.headphones.length - 1 ? "0.75rem" : "0",
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        gap: "1rem",
                        alignItems: "center",
                        borderLeft: `3px solid ${tierGroup.color}`
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "700", color: "#1a1614", fontSize: "13px" }}>{kbd.name}</div>
                        <div style={{ fontSize: "11px", color: "#a09890", marginTop: "2px" }}>{kbd.brand}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#a09890", marginBottom: "2px" }}>Pro Usage</div>
                        <div style={{ fontWeight: "700", color: "#1a1614", fontSize: "13px" }}>{kbd.gamePercent}%</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#a09890", marginBottom: "2px" }}>Weight</div>
                        <div style={{ fontWeight: "700", color: "#1a1614", fontSize: "13px" }}>{kbd?.weight}g</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "11px", color: "#a09890", marginBottom: "2px" }}>Price</div>
                        <div style={{ fontWeight: "700", color: "#1a1614", fontSize: "13px" }}>${kbd?.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ));
          })()}
        </div>

        <div className="flex flex-wrap gap-2">
          {topHeadphonesForPage.slice(0, 5).map(m => (
            <SSRLink key={m.name} href={`/headphones/${sl(m.name)}`}>{m.name}</SSRLink>
          ))}
          {isGame && <SSRLink href={`/games/${sl(page.game)}`}>{page.game}</SSRLink>}
          <SSRLink href="/headphones">All Headphones</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="rankings" />
    </>
  );
}
