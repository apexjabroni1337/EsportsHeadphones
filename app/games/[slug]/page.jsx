import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import { gameBreakdown } from "@/data";

export async function generateStaticParams() {
  return gameBreakdown.map((game) => ({
    slug: game.slug || (game.name || game.game || "").toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }) {
  const game = gameBreakdown.find(
    (g) => (g.slug || (g.name || g.game || "").toLowerCase().replace(/\s+/g, "-")) === params.slug
  );

  if (!game) {
    return {
      title: "Game Not Found",
      description: "The game data you are looking for does not exist in our database.",
    };
  }

  const gameName = game.name || game.game || "Unknown";

  return {
    title: gameName + " Gaming Headphones & Equipment",
    description: "Discover the gaming headphones and equipment used by professional " + gameName + " esports players.",
    keywords: gameName + ", esports headphones, gaming audio, " + gameName + " equipment, competitive gaming",
    openGraph: {
      title: gameName + " Gaming Equipment",
      description: "Professional gaming headphones used in " + gameName + ".",
      url: "https://esportsheadphones.com/games/" + params.slug,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: gameName + " Gaming Equipment",
      description: "Headphones and gear for competitive " + gameName + ".",
    },
  };
}

export default function GameDetailPage({ params }) {
  const game = gameBreakdown.find(
    (g) => (g.slug || (g.name || g.game || "").toLowerCase().replace(/\s+/g, "-")) === params.slug
  );

  if (!game) {
    return (
      <SSRSection>
        <SSRTitle accent="pink">Game Not Found</SSRTitle>
        <SSRSub>
          The game data you are looking for does not exist in our database.
        </SSRSub>
      </SSRSection>
    );
  }

  const gameName = game.name || game.game || "Unknown";

  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">{gameName}</SSRTitle>
        <SSRSub>
          Professional gaming headphones used in competitive {gameName} esports.
          Explore equipment trends and player preferences.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/VideoGame">
        <h1 itemProp="name">{gameName}</h1>
        <p itemProp="description">
          Gaming equipment and headphone preferences for competitive {gameName} esports players.
          Professional headphones, audio gear, and equipment analysis.
        </p>
      </article>

      <EsportsHeadphones initialTab="games" initialGameSlug={params.slug} />
    </>
  );
}
