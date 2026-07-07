"use client";

import { RefreshCw } from "lucide-react";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-banker-paper px-6 text-banker-ink">
      <section className="w-full max-w-xl rounded-lg border border-banker-line bg-white p-6 shadow-banker">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-banker-rust">Dashboard unavailable</div>
        <h1 className="mt-3 text-2xl font-semibold">Market intelligence could not be loaded.</h1>
        <p className="mt-3 text-sm leading-6 text-banker-muted">
          The application is still available from its seeded public-source dataset, but this page hit an unexpected loading error.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-banker-rust px-4 text-sm font-semibold text-white transition hover:bg-banker-rustDark"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </section>
    </main>
  );
}
