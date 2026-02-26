import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "EsportsHeadphones Blog",
  description:
    "Read articles and analysis about esports gaming headphones, audio trends, and professional player equipment.",
  keywords: "esports blog, gaming headphones blog, audio analysis, gaming gear analysis",
  openGraph: {
    title: "EsportsHeadphones Blog",
    description:
      "Articles and analysis about esports gaming headphones and audio trends.",
    url: "https://esportsheadphones.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "EsportsHeadphones Blog",
    description: "Gaming headphones and esports audio articles.",
  },
};

export default function BlogPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="purple">
          Blog &
          <span className="text-cyan-400"> Articles</span>
        </SSRTitle>
        <SSRSub>
          Articles, analysis, and insights about professional esports gaming
          headphones and audio equipment trends.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <article className="text-white">
          <div className="rounded-lg border border-cyan-400/20 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-cyan-400">
              Coming Soon
            </h2>
            <p className="mb-6 text-gray-300">
              We're building comprehensive articles and analysis about esports
              gaming headphones, audio trends, and professional player equipment.
            </p>
            <p className="text-gray-400">
              Check back soon for in-depth guides, equipment analysis, and
              industry insights.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="mb-6 text-xl font-bold text-purple-400">
              Explore Our Database
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/headphones"
                className="rounded-lg border border-cyan-400/20 p-4 transition hover:border-cyan-400/50 hover:bg-cyan-400/5"
              >
                <div className="font-semibold text-cyan-400">All Headphones</div>
                <p className="text-sm text-gray-400">Browse our complete database</p>
              </Link>
              <Link
                href="/players"
                className="rounded-lg border border-purple-400/20 p-4 transition hover:border-purple-400/50 hover:bg-purple-400/5"
              >
                <div className="font-semibold text-purple-400">Pro Players</div>
                <p className="text-sm text-gray-400">
                  Discover player equipment
                </p>
              </Link>
              <Link
                href="/brands"
                className="rounded-lg border border-yellow-400/20 p-4 transition hover:border-yellow-400/50 hover:bg-yellow-400/5"
              >
                <div className="font-semibold text-yellow-400">Brands</div>
                <p className="text-sm text-gray-400">Market analysis & trends</p>
              </Link>
              <Link
                href="/trends"
                className="rounded-lg border border-pink-400/20 p-4 transition hover:border-pink-400/50 hover:bg-pink-400/5"
              >
                <div className="font-semibold text-pink-400">Trends</div>
                <p className="text-sm text-gray-400">
                  Equipment trends analysis
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
