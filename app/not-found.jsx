import Link from "next/link";
import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="pink">
          404
          <span className="text-cyan-400"> Not Found</span>
        </SSRTitle>
        <SSRSub>
          The page you're looking for doesn't exist in our database.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <div className="mx-auto max-w-2xl px-4 py-12 text-center text-white">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-pink-400">
            Page Not Found
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            We couldn't find what you were looking for. Let's get you back to
            exploring esports headphones.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/"
            className="rounded-lg border border-cyan-400/20 px-6 py-3 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
          >
            Home
          </Link>
          <Link
            href="/headphones"
            className="rounded-lg border border-purple-400/20 px-6 py-3 transition hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-purple-400"
          >
            All Headphones
          </Link>
          <Link
            href="/players"
            className="rounded-lg border border-pink-400/20 px-6 py-3 transition hover:border-pink-400/50 hover:bg-pink-400/10 hover:text-pink-400"
          >
            Pro Players
          </Link>
          <Link
            href="/brands"
            className="rounded-lg border border-yellow-400/20 px-6 py-3 transition hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-400"
          >
            Brands
          </Link>
        </div>
      </div>
    </>
  );
}
