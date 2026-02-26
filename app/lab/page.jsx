import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const metadata = {
  title: "EsportsHeadphones Lab — Advanced Analysis",
  description:
    "Explore advanced analysis tools for gaming headphones. Deep dive into specifications, performance metrics, and professional gaming equipment analysis.",
  keywords:
    "gaming audio analysis, headphone testing, audio equipment lab, gaming gear analysis, esports equipment testing",
  openGraph: {
    title: "EsportsHeadphones Lab",
    description: "Advanced gaming headphone analysis and testing laboratory.",
    url: "https://esportsheadphones.com/lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsHeadphones Lab",
    description: "Advanced analysis tools for gaming headphones.",
  },
};

export default function LabPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">
          EsportsHeadphones
          <span className="text-pink-400"> Lab</span>
        </SSRTitle>
        <SSRSub>
          Advanced analysis tools for professional gaming headphones. Explore
          in-depth metrics, performance data, and detailed equipment analysis.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Article">
        <h1 itemProp="headline">EsportsHeadphones Lab</h1>
        <p itemProp="description">
          Advanced gaming headphone analysis laboratory. Detailed performance
          metrics, equipment testing data, and professional gaming audio
          specifications.
        </p>
      </article>

      <EsportsHeadphones initialTab="lab" />
    </>
  );
}
