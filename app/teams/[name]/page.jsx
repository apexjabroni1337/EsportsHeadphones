import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const teamName = decodeURIComponent(params.name);

  return {
    title: `${teamName} Equipment & Headphones`,
    description: `Discover the gaming headphones and equipment used by ${teamName}. Professional gaming gear analysis for competitive esports.`,
    keywords: `${teamName}, esports team, gaming equipment, team gear, headphones`,
    openGraph: {
      title: `${teamName} Equipment & Headphones`,
      description: `Professional gaming equipment used by ${teamName}.`,
      url: `https://esportsheadphones.com/teams/${params.name}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${teamName} Gaming Equipment`,
      description: `Equipment and headphones used by ${teamName}.`,
    },
  };
}

export default function TeamDetailPage({ params }) {
  const teamName = decodeURIComponent(params.name);

  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">{teamName}</SSRTitle>
        <SSRSub>
          Professional gaming equipment and headphones used by {teamName}. Team
          gear preferences and player equipment analysis.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Organization">
        <h1 itemProp="name">{teamName}</h1>
        <p itemProp="description">
          Professional esports team equipment and gaming headphone preferences.
          Detailed analysis of {teamName} player gear and equipment strategies.
        </p>
      </article>

      <EsportsHeadphones
        initialTab="teams"
        initialTeam={teamName}
      />
    </>
  );
}
