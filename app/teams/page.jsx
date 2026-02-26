import EsportsHeadphones from "@/components/ClientApp";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const metadata = {
  title: "Esports Teams Equipment Database",
  description:
    "Explore the gaming equipment and headphones used by professional esports teams. Analyze team gear preferences and equipment strategies.",
  keywords:
    "esports teams, gaming equipment, team gear, professional teams, esports organizations, team equipment analysis",
  openGraph: {
    title: "Esports Teams Equipment Database",
    description: "Gaming equipment and headphones used by esports teams.",
    url: "https://esportsheadphones.com/teams",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esports Teams Equipment",
    description: "Professional esports team gaming equipment and headphones.",
  },
};

export default function TeamsPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="pink">
          Esports
          <span className="text-cyan-400"> Teams</span>
        </SSRTitle>
        <SSRSub>
          Explore gaming equipment used by professional esports teams. Analyze
          team equipment preferences, gear strategies, and collective player
          choices.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <article className="hidden" itemScope itemType="https://schema.org/Organization">
        <h1 itemProp="name">Esports Teams Equipment Database</h1>
        <p itemProp="description">
          Professional esports teams and their gaming equipment preferences.
          Includes team gear analysis, equipment strategies, and player
          equipment choices across competitive teams.
        </p>
      </article>

      <EsportsHeadphones initialTab="teams" />
    </>
  );
}
