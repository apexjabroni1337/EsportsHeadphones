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
    slug: game.slug || game.game.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }) {
  const game = gameBreakdown.find(
    (g) => (g.slug || g.game.toLowerCase().replace(/\s+/g, "-")) === params.slug
  );

  if (!game) {
    return {
      title: "Game Not Found",
      description: "The game data you're looking for doesn't exist in our database.",
    };
  }

  return {
    title: `${game.game} Gaming Headphones & Equipment`,
    description: `Discover the gaming headphones and equipment used by professional ${game.game} esports players.`,
    keywords: `${game.game}, esports headphones, gaming audio, ${game.game} equipment, competitive gaming`,
    openGraph: {
      title: `${game.game} Gaming Equipment`,
      description: `Professional gaming headphones used in ${game.game}.`,
      url: `https://esportsheadphones.com/games/${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.game} Gaming Equipment`,
      description: `Headphones and gear for competitive ${game.game}.`,
    },
  };
}

export default function GameDetailPage({ params }) {
  const game = gameBreakdown.find(
    (g) => (g.slug || g.game.toLowerCase().replace(/\s+/g, "-")) === params.slug
  );

  if (!game) {
    return (
      <SSRSection>
        <SSRTitle accent="pink">Game Not Found</SSRTitle>
        <SSRSub>
          The game data you're looking for doesn't exist in our database.
        </SSRSub>
      </SSRSection>
    );
  }

  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">{game.game}</SSRTitle>
        <SSRSub>
          Professional gaming headphones used in competitive {game.game} esports.
          Explore equipment trends and player preferences.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/VideoGame">
        <h1 itemProp="name">{game.game}</h1>
        <p itemProp="description">
          Gaming equipment and headphone preferences for competitive {game.game} esports players.
          Professional headphones, audio gear, and equipment analysis.
        </p>
      </article>

      <EsportsHeadphones initialTab="games" initialGameSlug={params.slug} />
    </>
  );
}
