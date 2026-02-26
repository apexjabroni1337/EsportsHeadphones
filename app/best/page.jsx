import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Best Pro Gaming Headphones — Professional Recommendations",
  description:
    "Discover the best gaming headphones used by professional esports players. Find the top headphones for competitive gaming based on real player data.",
  keywords:
    "best gaming headphones, top esports headphones, professional gaming headsets, best audio for gaming",
  openGraph: {
    title: "Best Gaming Headphones for Esports",
    description:
      "The best gaming headphones recommended by professional esports players.",
    url: "https://esportsheadphones.com/best",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Gaming Headphones",
    description: "Top headphones used by professional esports players.",
  },
};

export default function BestPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="yellow">
          Best Gaming
          <span className="text-cyan-400"> Headphones</span>
        </SSRTitle>
        <SSRSub>
          Discover the best gaming headphones based on real professional esports
          player data. Find the audio gear trusted by competitive gamers
          worldwide.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Product">
        <h1 itemProp="name">Best Gaming Headphones for Esports</h1>
        <p itemProp="description">
          The best professional gaming headphones based on esports player choices.
          Top-rated headphones for competitive gaming across all esports titles.
        </p>
      </article>

      <EsportsHeadphones initialTab="headphones" />
    </>
  );
}
