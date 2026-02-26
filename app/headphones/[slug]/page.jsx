import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import { headphones } from "@/data";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return headphones.map((headphone) => ({
    slug: headphone.slug,
  }));
}

export async function generateMetadata({ params }) {
  const headphone = headphones.find((h) => h.slug === params.slug);

  if (!headphone) {
    return {
      title: "Headphone Not Found",
      description: "The headphone you're looking for doesn't exist in our database.",
    };
  }

  return {
    title: `${headphone.name} — Professional Gaming Headphones`,
    description: `${headphone.name} specifications, pro player usage, and detailed information for competitive esports gaming.`,
    keywords: `${headphone.name}, gaming headphones, esports audio, ${headphone.brand || "gaming"}`,
    openGraph: {
      title: `${headphone.name} — Pro Gaming Headphones`,
      description: `Learn about the ${headphone.name} used by professional esports players.`,
      url: `https://esportsheadphones.com/headphones/${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${headphone.name} — Pro Gaming Headphones`,
      description: `Professional gaming headphone specs and pro player usage.`,
    },
  };
}

export default function HeadphoneDetailPage({ params }) {
  const headphone = headphones.find((h) => h.slug === params.slug);

  if (!headphone) {
    return (
      <SSRSection>
        <SSRTitle accent="pink">Headphone Not Found</SSRTitle>
        <SSRSub>
          The headphone you're looking for doesn't exist in our database.
        </SSRSub>
      </SSRSection>
    );
  }

  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">{headphone.name}</SSRTitle>
        <SSRSub>
          {headphone.brand && `Brand: ${headphone.brand} • `}
          {headphone.type && `Type: ${headphone.type} • `}
          {headphone.style && `Style: ${headphone.style}`}
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Product">
        <h1 itemProp="name">{headphone.name}</h1>
        <p itemProp="brand">{headphone.brand || "Gaming Headphones"}</p>
        <p itemProp="description">
          Professional gaming headphone used by esports players. {headphone.type} {headphone.style} designed for competitive gaming.
        </p>
      </article>

      <EsportsHeadphones
        initialTab="headphoneDetail"
        initialHeadphoneSlug={params.slug}
      />
    </>
  );
}
