import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Esports Equipment Trends — Gaming Headphones Analysis",
  description:
    "Explore trending gaming headphones and equipment in professional esports. Analyze price trends, wireless adoption, and brand preferences over time.",
  keywords:
    "esports trends, gaming equipment trends, wireless headphones, gaming audio trends, pro equipment analysis",
  openGraph: {
    title: "Esports Equipment Trends",
    description:
      "See the latest trends in professional gaming headphones and equipment.",
    url: "https://esportsheadphones.com/trends",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esports Equipment Trends",
    description:
      "Gaming equipment and headphone trends in professional esports.",
  },
};

export default function TrendsPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="pink">
          Equipment
          <span className="text-cyan-400"> Trends</span>
        </SSRTitle>
        <SSRSub>
          Analyze real-time trends in professional esports equipment. Track
          wireless adoption, price movements, brand preferences, and equipment
          evolution over time.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Article">
        <h1 itemProp="headline">Esports Equipment Trends</h1>
        <p itemProp="description">
          Comprehensive analysis of gaming equipment and headphone trends in
          professional esports. Track wireless adoption, price trends, and brand
          popularity among competitive players.
        </p>
      </article>

      <EsportsHeadphones initialTab="trends" />
    </>
  );
}
