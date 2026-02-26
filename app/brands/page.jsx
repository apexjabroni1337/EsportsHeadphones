import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import { brandMarketShare } from "@/data";

export const metadata = {
  title: "Gaming Headphone Brands — Market Analysis",
  description:
    "Analyze gaming headphone brands used by professional esports players. See market share, brand preferences, and equipment trends across competitive gaming.",
  keywords:
    "gaming headphone brands, Razer, HyperX, SteelSeries, Logitech, esports brands, market analysis, pro gaming equipment",
  openGraph: {
    title: "Gaming Headphone Brands",
    description:
      "Explore market share and brand preferences in professional esports.",
    url: "https://esportsheadphones.com/brands",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Headphone Brands",
    description: "Brand analysis and market share in esports audio equipment.",
  },
};

export default function BrandsPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="yellow">
          Gaming
          <span className="text-cyan-400"> Brands</span>
        </SSRTitle>
        <SSRSub>
          Analyze the {brandMarketShare.length} major brands dominating
          professional esports. Explore market share, brand distribution, and
          equipment preferences.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Organization">
        <h1 itemProp="name">Gaming Headphone Brands</h1>
        <p itemProp="description">
          Market analysis of gaming headphone brands in professional esports.
          Includes brand market share, adoption rates, and professional player
          preferences across all competitive gaming titles.
        </p>
      </article>

      <EsportsHeadphones initialTab="brands" />
    </>
  );
}
