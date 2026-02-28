import EsportsHeadphones from "@/components/ClientApp";
import { headphones, allPlayers, proPlayers, BRAND_COLORS, HEADPHONE_IMAGE_URLS, amazonLink, getHeadphoneImage } from "@/data";
import Link from "next/link";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const BEST_PAGES = {
  "cs2": { game: "CS2", full: "Counter-Strike 2", tab: "cs2", intro: "Counter-Strike 2 demands precision audio positioning, crystal-clear footstep detection, and consistent sound staging across long tournament sessions. Pro CS2 players overwhelmingly prefer closed-back wireless headphones with excellent passive isolation and reliable low-latency connections. The ideal CS2 headphone combines a comfortable fit for marathon sessions with detailed, accurate sound reproduction that reveals every audio cue.", tips: "CS2 pros typically prefer closed-back headphones for isolation at LAN events. Wireless has become the standard — low-latency 2.4GHz connections eliminate cable interference. Most top players value comfort and sound clarity over bass response, as footstep detection and spatial awareness are critical in competitive CS2." },
  "valorant": { game: "Valorant", full: "Valorant", tab: "valorant", intro: "Valorant's tactical gameplay combines precise gunplay with ability usage, requiring headphones that deliver crystal-clear directional audio for tracking enemy positions. The best Valorant headphones feature detailed sound staging that reveals footsteps, ability activations, and environmental cues. Pro Valorant players tend to use similar setups to CS2 pros, prioritizing clarity and spatial accuracy.", tips: "Valorant pros favor headphones with excellent mid-range clarity for footstep detection. Wireless has become standard — virtually no top Valorant pros use wired headphones in 2025. Closed-back designs dominate for noise isolation during tournaments." },
  "fortnite": { game: "Fortnite", full: "Fortnite Battle Royale", tab: "fortnite", intro: "Fortnite's unique building mechanics demand headphones with excellent 360-degree spatial audio. Pro Fortnite players need to hear enemy builds, footsteps from multiple directions, and material harvesting sounds simultaneously. Wide soundstage and accurate positional audio are critical for awareness during build fights and late-game rotations.", tips: "Fortnite pros tend to prefer headphones with wider soundstage for spatial awareness. Being able to hear builds, gunshots, and footsteps from all directions is critical. Lightweight and wireless headphones are popular for comfort during long sessions." },
  "apex": { game: "Apex", full: "Apex Legends", tab: "apex", intro: "Apex Legends' fast-paced movement system demands headphones that can deliver clear audio during chaotic gunfights. Pros need to hear footsteps through gunfire, track enemy legends using ability audio cues, and communicate clearly with teammates. Comfort is essential for the game's longer match durations.", tips: "Apex pros value clear audio separation — hearing footsteps through gunfire is critical. Wireless headphones dominate for freedom of movement. Many top players prefer over-ear designs for isolation during intense team fights." },
  "overwatch-2": { game: "Overwatch 2", full: "Overwatch 2", tab: "overwatch-2", intro: "Overwatch 2's hero-based gameplay means audio requirements vary by role. DPS players need to track enemy ultimates and footsteps, tanks need spatial awareness for team positioning, and supports need to hear flankers approaching. Wide soundstage and clear positional audio give competitive advantages across all roles.", tips: "OW2 pros need headphones that handle the game's complex audio landscape — multiple abilities, ultimates, and footsteps all happening simultaneously. Clear audio separation matters more than raw bass. Comfortable headphones are essential for the game's fast-paced sessions." },
  "r6-siege": { game: "R6 Siege", full: "Rainbow Six Siege", tab: "r6-siege", intro: "Rainbow Six Siege is the most audio-dependent competitive shooter. Sound propagation through walls, floors, and destructible environments makes headphone quality a direct competitive advantage. R6 pros invest heavily in audio equipment because hearing a soft footstep through a reinforced wall can mean the difference between winning and losing a round.", tips: "R6 Siege is arguably where headphones matter most in esports. Sound travels through destruction holes and soft walls. Many pros prefer open-back headphones for wider soundstage and more natural spatial audio, despite the isolation tradeoff. High-impedance audiophile headphones are more common here than in any other esport." },
  "lol": { game: "LoL", full: "League of Legends", tab: "lol", intro: "League of Legends prioritizes team communication and comfort over competitive audio advantages. While positional audio matters less than in FPS titles, clear voice chat and fatigue-free comfort during long gaming sessions are essential. Pro LoL players prioritize headphone comfort, microphone quality, and reliable wireless performance.", tips: "LoL pros prioritize comfort and microphone quality since team communication is paramount. Lightweight wireless headphones dominate the scene. Long game durations mean comfort is non-negotiable — heavy headphones cause neck fatigue during marathon sessions." },
  "pubg": { game: "PUBG", full: "PUBG: Battlegrounds", tab: "pubg", intro: "PUBG's realistic ballistics and varied engagement distances demand headphones with excellent sound staging. Detecting vehicle sounds at distance, footsteps in buildings, and gunshot directions across the map requires wide, accurate positional audio. The game's slow-paced tactical moments punctuated by intense firefights test both audio clarity and comfort.", tips: "PUBG pros need wide soundstage for detecting distant vehicle sounds and gunshots. The game's varied environments — open fields, dense cities, indoor CQB — require headphones that perform well across all scenarios. Comfort matters for the longer match durations." },
  "dota-2": { game: "Dota 2", full: "Dota 2", tab: "dota-2", intro: "Dota 2 requires team communication above all else. Like LoL, the audio competitive advantage is minimal, but clear voice chat and marathon-session comfort define the best Dota 2 headphones. Many Dota 2 pros prefer comfort-focused headphones with excellent microphones for coordinating complex team fights.", tips: "Dota 2 pros prioritize comfort and microphone quality. Games can last 40-60+ minutes, making lightweight, breathable headphones essential. Voice communication quality directly impacts team coordination in late-game teamfights." },
  "rocket-league": { game: "Rocket League", full: "Rocket League", tab: "rocket-league", intro: "While Rocket League is primarily a controller game, audio cues for boost pads, demolitions, and ball contact provide competitive advantages. The game's fast aerial mechanics benefit from spatial audio awareness. Most Rocket League pros use comfortable wireless headphones that deliver clear game audio alongside team voice chat.", tips: "Rocket League audio is less critical than in shooters, but boost pad sounds and demolition warnings provide an edge. Most pros prioritize comfort and wireless freedom since the game demands rapid controller movements." },
  "call-of-duty": { game: "Call of Duty", full: "Call of Duty", tab: "call-of-duty", intro: "Call of Duty's fast-paced arcade gameplay rewards spatial audio awareness for detecting enemy footsteps and pre-aiming corners. The game's fast time-to-kill means hearing an enemy first often determines the outcome. Lightweight wireless headphones with low latency are the standard for competitive CoD on PC.", tips: "CoD pros need low-latency wireless headphones for fast-paced competitive play. Footstep audio and directional awareness are critical in Search & Destroy. Comfort matters for long tournament days." },
  "marvel-rivals": { game: "Marvel Rivals", full: "Marvel Rivals", tab: "marvel-rivals", intro: "Marvel Rivals is a newer hero shooter that combines fast movement with complex ability audio. Like Overwatch, different heroes produce distinctive audio cues that skilled players track for competitive advantage. Clear audio separation through chaotic team fights is essential.", tips: "Marvel Rivals plays similarly to Overwatch in terms of audio requirements. Pros tend to use similar setups — wireless headphones with clear audio separation for tracking abilities through chaotic fights." },
  "lightweight": { game: null, full: "Lightweight & Ultralight", tab: null, intro: "The lightweight headphone trend has transformed competitive gaming comfort. Lighter headphones reduce neck fatigue during long sessions, allow for longer practice hours, and improve overall comfort without sacrificing audio quality. The sweet spot for most pros is 250-310g, balancing minimal weight with solid build quality and audio performance.", tips: "Under 250g is considered ultralight, 250-310g is lightweight. Most pros prefer the 280-320g range as it offers the best balance of comfort and audio quality. Very light headphones may sacrifice bass response or build quality." },
  "tournament-favorites": { collection: true, full: "Tournament Favorites", category: "Tournament Winners", intro: "The headphones dominating major esports championships worldwide. These are the trusted choices of the world's best professional players, proven in the highest-pressure competitive environments. Tournament favorites combine proven reliability, comfortable design, and superior audio clarity that gives pros a competitive edge when millions of dollars are on the line. Every headphone on this list has been chosen by championship-winning teams and top-tier esports organizations.", tips: "Tournament-winning headphones share common traits: comfortable over-ear design, wireless connectivity with sub-1ms latency, proven reliability under pressure, and industry-leading audio quality. These headphones have been battle-tested at multiple international LANs and consistently deliver when it matters most." },
  "anc": { collection: true, full: "Best ANC Headsets", category: "Noise Cancellation", intro: "Active noise cancellation transforms the competitive gaming experience at noisy LAN events. When tournament crowds, venue sound systems, and ambient noise threaten to distract from precision gameplay, ANC headphones create a bubble of focus. The best gaming ANC headsets deliver noise cancellation without audio latency, combining active isolation with responsive low-latency wireless for tournament-level performance.", tips: "Top ANC gaming headphones use passive isolation combined with active cancellation to eliminate low-frequency rumble without introducing perceptible audio latency. Look for headphones that allow toggling ANC on/off, as some pros prefer it only during practice sessions. Battery life becomes critical with ANC enabled." },
  "budget": { collection: true, full: "Budget Champions", category: "Value Kings", intro: "Professional-grade gaming audio doesn't require premium pricing. The budget esports headphones in our database prove that excellent competitive gaming audio is achievable under $100. These are the headphones chosen by rising competitive players, content creators, and esports organizations looking for exceptional value. Budget champions feature quality drivers, reliable wireless connectivity, and proven track records in competitive play.", tips: "Budget gaming headphones have undergone massive improvements in recent years. Modern sub-$100 headphones often include quality audio technology that rivals headphones costing twice as much. The real differences at lower price points are typically in build materials, weight, and ANC features — not core audio performance." },
  "wireless": { collection: true, full: "Wireless Freedom", category: "Cordless Champions", intro: "The wireless revolution in esports has been decisive — the vast majority of professional players now compete on wireless headphones. Modern 2.4GHz wireless technology has eliminated latency concerns, while the freedom from cable clutter provides tangible quality-of-life improvements. No cable snags, no tangled headphone cables, no physical constraints — just pure focus on your game.", tips: "Top wireless gaming headphones operate at 2.4GHz with sub-1ms latency, making them indistinguishable from wired alternatives. Battery life varies significantly — tournament headphones should offer 30+ hours on a single charge. Quick charge capability is essential for tournament day convenience." },
  "audiophile": { collection: true, full: "Audiophile Grade", category: "High-Fidelity Audio", intro: "For competitive players who refuse to compromise on audio quality, audiophile-grade open-back headphones deliver pristine, revealing sound that exposes competitive audio cues invisible to other headphones. Open-back design creates a spacious soundstage that makes positional audio more intuitive and rewarding. Professional studio headphones like the beyerdynamic DT 990 Pro and Sennheiser HD 600 have found a dedicated following in esports.", tips: "Open-back headphones excel at soundstage and clarity but require careful setup. High-impedance variants (especially 250-ohm models) need a dedicated amplifier. Open-back design means audio leakage — great for solo practice but challenging for shared LAN environments. The detail these headphones reveal can improve competitive performance through better spatial awareness." },
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
    topHeadphonesForPage = [...headphones].sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "anc") {
    topHeadphonesForPage = [...headphones].filter(m => m.anc === true).sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "wireless") {
    topHeadphonesForPage = [...headphones].filter(m => m.connectivity === "Wireless").sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "budget") {
    topHeadphonesForPage = [...headphones].filter(m => m?.price <= 100).sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "audiophile") {
    const audiophileNames = ["beyerdynamic DT 990 Pro", "beyerdynamic DT 900 Pro X", "Sennheiser HD 600", "Sennheiser HD800 S", "Sennheiser HD 560S", "Sennheiser GAME ONE"];
    topHeadphonesForPage = headphones
      .filter(m => audiophileNames.some(name => m.name.toLowerCase().includes(name.toLowerCase())))
      .sort((a, b) => b?.proUsage - a?.proUsage)
      .map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "lightweight") {
    topHeadphonesForPage = [...headphones].filter(m => m?.weight < 280).sort((a, b) => a?.weight - b?.weight).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
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

  const faq = isGame ? [
    { q: `What is the best headphone for ${page.full}?`, a: `The most popular headphone among ${page.game} pros is the ${topHeadphonesForPage[0]?.name || "Razer BlackShark V2 Pro"}, used by ${topHeadphonesForPage[0]?.gamePercent || "N/A"}% of tracked players. The top 3 are: ${topHeadphonesForPage.slice(0, 3).map(m => m.name).join(", ")}.` },
    { q: `Do ${page.game} pros use wireless headphones?`, a: `Yes — the vast majority of ${page.game} pros now use wireless headphones. Modern wireless headphones from Razer, Logitech, and others have sub-1ms latency, making them equal to or better than wired alternatives.` },
  ] : isCollection ? [
    { q: `What are the best ${page.full.toLowerCase()} headphones?`, a: `The top ${page.full.toLowerCase()} headphones based on professional esports usage are: ${topHeadphonesForPage.slice(0, 5).map(m => m.name).join(", ")}. These headphones are ranked by adoption rate among ${allPlayers.length}+ professional esports players.` },
  ] : [
    { q: `What is the best ${page.full.toLowerCase()} gaming headphone?`, a: `The top ${page.full.toLowerCase()} gaming headphones based on pro usage are: ${topHeadphonesForPage.slice(0, 5).map(m => m.name).join(", ")}. These are ranked by adoption rate among ${allPlayers.length}+ professional esports players.` },
  ];

  const otherPages = ALL_SLUGS.filter(s => s !== params.slug).slice(0, 8);

  const tierData = [
    { tier: "S", label: "S-Tier — The Best", color: "#b8956a", headphones: topHeadphonesForPage.slice(0, 1) },
    { tier: "A", label: "A-Tier — Excellent", color: "#8a7460", headphones: topHeadphonesForPage.slice(1, 3) },
    { tier: "B", label: "B-Tier — Great", color: "#6b635b", headphones: topHeadphonesForPage.slice(3, 6) },
    { tier: "C", label: "C-Tier — Solid", color: "#a09890", headphones: topHeadphonesForPage.slice(6, 10) },
  ];

  return (
    <>
      {/* JSON-LD Schema */}
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

      {/* ── VISIBLE ARTICLE CONTENT ── */}
      <div style={{ background: "#f5f0e8", minHeight: "100vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 60px" }}>

          {/* Breadcrumb */}
          <nav style={{ marginBottom: 24, fontSize: 13, color: "#a09890" }}>
            <Link href="/" style={{ color: "#a09890", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 6px" }}>›</span>
            <Link href="/best" style={{ color: "#a09890", textDecoration: "none" }}>Best Headphones</Link>
            <span style={{ margin: "0 6px" }}>›</span>
            <span style={{ color: "#6b635b", fontWeight: 700 }}>{isGame ? page.full : page.full}</span>
          </nav>

          {/* Title */}
          <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#1a1614", marginBottom: 8, lineHeight: 1.15 }}>
            {isGame ? <>Best Headphone for <span style={{ color: "#b8956a" }}>{page.full}</span></> : isCollection ? <>{page.full}</> : <>Best <span style={{ color: "#b8956a" }}>{page.full}</span> Headphones</>}
          </h1>

          {/* Category tag */}
          {isCollection && page.category && (
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, padding: "4px 12px", borderRadius: 99, background: "#b8956a12", color: "#b8956a", border: "1px solid #b8956a20", marginBottom: 16 }}>{page.category}</span>
          )}

          {/* Intro paragraph */}
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a4340", marginBottom: 32, maxWidth: 720 }}>{page.intro}</p>

          {/* Stats bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: "12px 20px", border: "1px solid #e8e4df", flex: "1 1 120px", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#a09890", marginBottom: 4 }}>Headphones Ranked</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#b8956a" }}>{topHeadphonesForPage.length}</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: "12px 20px", border: "1px solid #e8e4df", flex: "1 1 120px", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#a09890", marginBottom: 4 }}>Pro Players</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1614" }}>{(players?.length || allPlayers.length).toLocaleString()}+</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: "12px 20px", border: "1px solid #e8e4df", flex: "1 1 120px", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#a09890", marginBottom: 4 }}>#1 Pick</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#1a1614" }}>{topHeadphonesForPage[0]?.name?.replace(topHeadphonesForPage[0]?.brand + " ", "") || "—"}</div>
            </div>
          </div>

          {/* ── TIER LIST ── */}
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 20, fontWeight: 800, color: "#1a1614", marginBottom: 20 }}>
            {isGame ? `${page.game} Pro Headphone Tier List` : `${page.full} Tier List`}
          </h2>

          {tierData.map((tg) => (
            tg.headphones.length > 0 && (
              <div key={tg.tier} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 6, background: tg.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#f5f0e8" }}>{tg.tier}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: tg.color }}>{tg.label}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {tg.headphones.map((hp) => (
                    <div key={hp.name} style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", border: "1px solid #e8e4df", borderLeft: `4px solid ${tg.color}`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                      {getHeadphoneImage(hp.name) && (
                        <img loading="lazy" src={getHeadphoneImage(hp.name)} alt={hp.name} style={{ height: 48, objectFit: "contain", flexShrink: 0 }} />
                      )}
                      <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1614" }}>{hp.name}</div>
                        <div style={{ fontSize: 12, color: "#a09890", marginTop: 2 }}>{hp.brand} · {hp.driverType} · {hp.connectivity}</div>
                      </div>
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#a09890" }}>Usage</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#b8956a" }}>{hp.gamePercent}%</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#a09890" }}>Weight</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1614" }}>{hp.weight}g</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#a09890" }}>Price</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1614" }}>${hp.price}</div>
                        </div>
                        <a href={amazonLink(hp.name)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 8, background: "#b8956a", color: "#fff", fontSize: 12, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}>
                          Buy ${hp.price}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}

          {/* ── TIPS SECTION ── */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e8e4df", marginTop: 40, marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1614", marginBottom: 12 }}>
              {isGame ? `${page.game} Audio Tips` : "Expert Tips"}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#4a4340" }}>{page.tips}</p>
          </div>

          {/* ── FAQ ── */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1614", marginBottom: 16 }}>Frequently Asked Questions</h2>
            {faq.map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", border: "1px solid #e8e4df", marginBottom: 10 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#1a1614", marginBottom: 6 }}>{f.q}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6b635b", margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>

          {/* ── MORE GUIDES ── */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1614", marginBottom: 16 }}>More Headphone Guides</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {otherPages.map(s => (
                <Link key={s} href={`/best/${s}`} style={{ display: "inline-block", padding: "8px 16px", borderRadius: 10, background: "#fff", border: "1px solid #e8e4df", color: "#6b635b", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  {BEST_PAGES[s].full}
                </Link>
              ))}
            </div>
          </div>

          {/* Back to home */}
          <div style={{ textAlign: "center", paddingTop: 20, borderTop: "1px solid #e8e4df" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 12, background: "#b8956a", color: "#fff", fontSize: 14, fontWeight: 800, textDecoration: "none" }}>
              ← Back to EsportsHeadphones
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
