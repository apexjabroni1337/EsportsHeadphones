import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const metadata = {
  title: "About EsportsHeadphones",
  description:
    "Learn about EsportsHeadphones, the definitive database of professional gaming headphones used by esports players worldwide.",
  keywords: "about, esports headphones database, gaming audio guide, professional headphones",
  openGraph: {
    title: "About EsportsHeadphones",
    description: "The story behind the definitive esports headphones database.",
    url: "https://esportsheadphones.com/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About EsportsHeadphones",
    description: "Learn more about EsportsHeadphones.",
  },
};

export default function AboutPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="cyan">
          About
          <span className="text-purple-400"> EsportsHeadphones</span>
        </SSRTitle>
        <SSRDivider />
      </SSRSection>

      <div className="mx-auto max-w-4xl px-4 py-12 text-white">
        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" className="sr-only">
            About EsportsHeadphones
          </h1>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-cyan-400">Our Mission</h2>
            <p className="mb-4 leading-relaxed text-gray-300">
              EsportsHeadphones is dedicated to providing the most comprehensive
              database of professional gaming headphones. We track the audio
              equipment choices of esports professionals across all major
              competitive gaming titles.
            </p>
            <p className="mb-4 leading-relaxed text-gray-300">
              By analyzing real player data, we help gamers discover the audio
              gear that professional competitors trust. Whether you're looking
              for competitive advantage or simply curious about pro equipment
              preferences, EsportsHeadphones has you covered.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-purple-400">
              What We Track
            </h2>
            <p className="mb-6 leading-relaxed text-gray-300">
              Our database includes:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="mr-3 text-cyan-400">▸</span>
                <span>
                  <strong>Gaming Headphones:</strong> Over 100+ professional gaming
                  headphones with detailed specifications
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-cyan-400">▸</span>
                <span>
                  <strong>Professional Players:</strong> Equipment data from top
                  esports players across all major games
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-cyan-400">▸</span>
                <span>
                  <strong>Competitive Games:</strong> Headphone trends across
                  Valorant, CS2, Dota 2, League of Legends, and fighting games
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-cyan-400">▸</span>
                <span>
                  <strong>Brand Analysis:</strong> Market share and adoption rates
                  for major gaming audio brands
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-cyan-400">▸</span>
                <span>
                  <strong>Equipment Trends:</strong> Real-time analysis of wireless
                  adoption, price trends, and brand preferences
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-pink-400">
              Why Audio Matters in Esports
            </h2>
            <p className="mb-4 leading-relaxed text-gray-300">
              Professional esports players understand that audio is crucial to
              competitive success. Sound positioning, clarity, and comfort are
              essential when competing at the highest levels.
            </p>
            <p className="mb-4 leading-relaxed text-gray-300">
              Our mission is to help you discover the audio equipment that
              matches your gaming needs. By understanding what professionals
              choose and why, you can make informed decisions about your own
              gaming setup.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-yellow-400">
              Our Community
            </h2>
            <p className="leading-relaxed text-gray-300">
              EsportsHeadphones is built for gamers, by gamers. We continuously
              update our database with the latest player equipment information,
              new product releases, and emerging trends in professional gaming
              audio.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
