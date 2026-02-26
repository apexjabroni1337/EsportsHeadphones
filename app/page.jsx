import Link from "next/link";
import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRGrid,
  SSRStat,
  SSRLink,
  SSRDivider,
} from "@/components/ssr";
import { headphones, proPlayers, gameBreakdown, brandMarketShare } from "@/data";

export const metadata = {
  title: "EsportsHeadphones — The Definitive Guide to Pro Gaming Audio",
  description:
    "Explore the complete database of professional esports headphones. Discover what headphones your favorite pro players use, compare brands, and find the best gaming audio for competitive play.",
  keywords:
    "esports headphones, pro gaming headphones, best gaming audio, professional gamers equipment, gaming headset comparison",
  openGraph: {
    title: "EsportsHeadphones — Pro Gaming Audio Guide",
    description:
      "Discover the headphones used by professional esports players across all major games.",
    url: "https://esportsheadphones.com",
    type: "website",
    images: [
      {
        url: "https://esportsheadphones.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsHeadphones — Pro Gaming Audio Guide",
    description: "Discover pro player headphone choices and gaming audio trends.",
  },
};

export default function HomePage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">
          EsportsHeadphones
          <span className="text-cyan-400">.</span>
        </SSRTitle>
        <SSRSub>
          The definitive database of professional esports headphones. Discover
          what audio gear the world's best players trust for competitive gaming.
        </SSRSub>
        <SSRDivider />
        <SSRGrid>
          <SSRStat
            label="Headphones Tracked"
            value={headphones.length}
            color="#00f0ff"
          />
          <SSRStat
            label="Pro Players"
            value={proPlayers.length}
            color="#b366ff"
          />
          <SSRStat
            label="Games Covered"
            value={gameBreakdown.length}
            color="#ff3366"
          />
          <SSRStat
            label="Brands Analyzed"
            value={brandMarketShare.length}
            color="#ffaa00"
          />
        </SSRGrid>
        <SSRDivider />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SSRLink href="/headphones">All Headphones</SSRLink>
          <SSRLink href="/players">Pro Players</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/games">Games</SSRLink>
          <SSRLink href="/trends">Trends</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/teams">Teams</SSRLink>
          <SSRLink href="/lab">Lab</SSRLink>
        </div>
      </SSRSection>

      {/* Hidden article element for SEO */}
      <article className="hidden" itemScope itemType="https://schema.org/Article">
        <h1 itemProp="headline">
          Professional Esports Headphones: The Complete Guide
        </h1>
        <p itemProp="description">
          Explore the comprehensive database of gaming headphones used by
          professional esports players across Valorant, CS2, Dota 2, League of
          Legends, fighting games, and more. Compare specifications, brands, and
          find the best audio equipment for competitive gaming.
        </p>
        <div itemProp="articleBody">
          <p>
            Professional esports players rely on high-quality audio equipment to
            maintain a competitive edge. Sound positioning, audio clarity, and
            comfort are crucial factors when competing at the highest levels.
            This comprehensive guide covers the headphones used by pro players
            across all major esports titles.
          </p>
          <p>
            Discover trending brands like SteelSeries, HyperX, Razer, Logitech,
            and others. Learn about wireless vs wired preferences, over-ear vs
            in-ear styles, and price ranges that professional gamers prefer.
            Track equipment choices across different games and regions.
          </p>
        </div>
      </article>

      <EsportsHeadphones initialTab="overview" />
    </>
  );
}
