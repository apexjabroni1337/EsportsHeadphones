import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import { proPlayers } from "@/data";

export const metadata = {
  title: "Professional Esports Players — Equipment Guide",
  description:
    "Discover the headphones used by professional esports players across all games. Browse pro player profiles, their equipment choices, and gaming preferences.",
  keywords:
    "pro esports players, professional gamers, esports equipment, pro gaming gear, player profiles, competitive gaming",
  openGraph: {
    title: "Professional Esports Players",
    description:
      "Explore the headphones used by pro players in competitive esports.",
    url: "https://esportsheadphones.com/players",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Esports Players",
    description: "Pro player gaming equipment and headphone choices.",
  },
};

export default function PlayersPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="purple">
          Professional Esports
          <span className="text-pink-400"> Players</span>
        </SSRTitle>
        <SSRSub>
          Explore the gaming equipment of {proPlayers.length} professional
          esports players. See what headphones and gear the world's best
          competitors trust.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Person">
        <h1 itemProp="name">Professional Esports Players</h1>
        <p itemProp="description">
          Profiles of professional esports players across major competitive games
          including Valorant, CS2, Dota 2, League of Legends, and fighting games.
          Includes their gaming equipment preferences and headphone choices.
        </p>
      </article>

      <EsportsHeadphones initialTab="players" />
    </>
  );
}
