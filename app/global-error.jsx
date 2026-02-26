"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-[#0a0e1a] text-white">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <h1 className="mb-4 text-5xl font-bold text-pink-400">
              Critical Error
            </h1>
            <p className="mb-8 text-lg text-gray-300">
              A critical error has occurred. Our team has been notified.
            </p>

            <div className="mb-8 rounded-lg border border-pink-400/20 bg-pink-400/5 p-6">
              <p className="text-sm text-gray-400">
                {error?.message || "An unexpected critical error occurred"}
              </p>
            </div>

            <button
              onClick={() => reset()}
              className="rounded-lg border border-cyan-400/20 px-6 py-3 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
