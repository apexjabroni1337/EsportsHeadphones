import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import { headphones } from "@/data";

export const metadata = {
  title: "All Pro Esports Headphones — Complete Database",
  description:
    "Browse the complete database of professional esports headphones. Filter by brand, type, price, and features used by pro players in competitive gaming.",
  keywords:
    "gaming headphones, esports headphones database, wireless gaming headsets, gaming audio comparison, professional headphones",
  openGraph: {
    title: "All Pro Esports Headphones",
    description:
      "Explore all gaming headphones used by professional esports players.",
    url: "https://esportsheadphones.com/headphones",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Pro Esports Headphones",
    description: "Complete database of gaming headphones used by pro players.",
  },
};

export default function HeadphonesPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">
          Professional Esports
          <span className="text-purple-400"> Headphones</span>
        </SSRTitle>
        <SSRSub>
          Explore all {headphones.length} professional gaming headphones in our
          database. Filter, sort, and compare specifications used by top
          esports players.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Product">
        <h1 itemProp="name">
          Professional Esports Headphones Database
        </h1>
        <p itemProp="description">
          Complete catalog of gaming headphones used by professional esports
          players. Includes specifications, brands, types, prices, and pro
          player usage data.
        </p>
      </article>

      <EsportsHeadphones initialTab="headphones" />
    </>
  );
}
