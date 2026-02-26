"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#0d1117] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center text-white">
        <h1 className="mb-4 text-5xl font-bold text-pink-400">
          Something went wrong
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          We encountered an error while trying to load this page.
        </p>

        <div className="mb-8 rounded-lg border border-pink-400/20 bg-pink-400/5 p-6">
          <p className="text-sm text-gray-400">
            {error?.message || "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg border border-cyan-400/20 px-6 py-3 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-purple-400/20 px-6 py-3 transition hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-purple-400"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
