import EsportsHeadphones from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink } from "@/components/ssr";
import { headphones, allPlayers } from "@/data";

export const metadata = {
  title: "Sensitivity Converter — Convert Gaming Sensitivity Between Games",
  description: "Convert your mouse sensitivity between games like CS2, Valorant, Overwatch 2, Apex Legends, and more. Calculate eDPI and find optimal settings based on pro player data.",
  alternates: { canonical: "https://esportsheadphones.com/sensitivity" },
  openGraph: {
    title: "Sensitivity Converter — Convert Gaming Sensitivity Between Games",
    description: "Convert your mouse sensitivity between games. Calculate eDPI and find optimal settings.",
    url: "https://esportsheadphones.com/sensitivity",
    images: [{ url: "https://esportsheadphones.com/og?title=Sensitivity&subtitle=Cross-Game+Sensitivity+Converter", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function SensitivityPage() {
  const games = [...new Set(allPlayers.map(p => p.game))];

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Gaming Sensitivity Converter — Cross-Game Sensitivity Calculator</h1>
        <p>
          Convert your mouse sensitivity between {games.length} major esports titles. Supports CS2, Valorant,
          Overwatch 2, Apex Legends, Fortnite, and more. Calculate eDPI and find optimal settings based on
          data from {allPlayers.length}+ professional players.
        </p>
        <h2>Supported Games</h2>
        <ul>
          {games.map(g => (
            <li key={g}>{g} — {allPlayers.filter(p => p.game === g).length} tracked pro players</li>
          ))}
        </ul>
        <nav aria-label="Related"><ul>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/headphones">All Esports Headphones</a></li>
          <li><a href="/games">Games</a></li>
          <li><a href="/">EsportsHeadphones Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Sensitivity">Converter</SSRTitle>
        <SSRSub>Convert your sensitivity across {games.length} major esports titles. Based on data from {allPlayers.length}+ professional players.</SSRSub>
        <SSRGrid>
          <SSRStat label="Games" value={games.length} color="#7048c4" />
          <SSRStat label="Pro Players" value={allPlayers.length} color="#7048c4" />
          <SSRStat label="Headphones" value={headphones.length} color="#7048c4" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/players" color="#7048c4">Pro Settings</SSRLink>
          <SSRLink href="/games" color="#7048c4">Games</SSRLink>
        </div>
      </SSRSection>

      <EsportsHeadphones initialTab="sensitivity" />
    </>
  );
}
