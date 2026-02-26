import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import { gameBreakdown } from "@/data";

export const metadata = {
  title: "Esports Games Equipment Database",
  description:
    "Explore gaming headphones and equipment used across major esports titles including Valorant, CS2, Dota 2, League of Legends, and fighting games.",
  keywords:
    "esports games, gaming equipment, Valorant headphones, CS2 gear, Dota 2 audio, League of Legends setup, fighting games",
  openGraph: {
    title: "Esports Games Equipment Database",
    description:
      "See what headphones and gear are used in competitive esports games.",
    url: "https://esportsheadphones.com/games",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esports Games Equipment",
    description:
      "Equipment and headphone data across all major esports titles.",
  },
};

export default function GamesPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="pink">
          Esports Games
          <span className="text-cyan-400"> Database</span>
        </SSRTitle>
        <SSRSub>
          Analyze headphone and equipment trends across {gameBreakdown.length}{" "}
          major esports titles. See which audio gear dominates each competitive
          game.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/VideoGame">
        <h1 itemProp="name">Esports Games Equipment Database</h1>
        <p itemProp="description">
          Comprehensive database of gaming equipment and headphones used in
          competitive esports games. Covers Valorant, Counter-Strike 2, Dota 2,
          League of Legends, fighting games, and more.
        </p>
      </article>

      <EsportsHeadphones initialTab="games" />
    </>
  );
}
