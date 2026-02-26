import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const metadata = {
  title: "Compare Gaming Headphones — Side-by-Side Specifications",
  description:
    "Compare professional gaming headphones side-by-side. Analyze specs, prices, features, and find the best gaming audio for your needs.",
  keywords:
    "headphone comparison, gaming headsets comparison, audio specs comparison, gaming gear comparison",
  openGraph: {
    title: "Compare Gaming Headphones",
    description: "Side-by-side comparison of professional gaming headphones.",
    url: "https://esportsheadphones.com/compare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Gaming Headphones",
    description: "Compare gaming headphone specs and features.",
  },
};

export default function ComparePage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="purple">
          Compare
          <span className="text-cyan-400"> Headphones</span>
        </SSRTitle>
        <SSRSub>
          Select and compare gaming headphones side-by-side. Analyze
          specifications, prices, features, and find the best audio for
          competitive gaming.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Product">
        <h1 itemProp="name">Gaming Headphone Comparison Tool</h1>
        <p itemProp="description">
          Interactive comparison tool for professional gaming headphones. Compare
          specifications, prices, features, and find the best gaming audio
          equipment for your needs.
        </p>
      </article>

      <EsportsHeadphones initialTab="compare" />
    </>
  );
}
