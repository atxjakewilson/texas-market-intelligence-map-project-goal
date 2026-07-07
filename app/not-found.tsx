import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-banker-paper px-6 text-banker-ink">
      <section className="w-full max-w-xl rounded-lg border border-banker-line bg-white p-6 shadow-banker">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-banker-rust">Page not found</div>
        <h1 className="mt-3 text-2xl font-semibold">Return to the market map.</h1>
        <p className="mt-3 text-sm leading-6 text-banker-muted">
          The requested page does not exist. The public market intelligence dashboard is available from the homepage.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex h-10 items-center rounded-md bg-banker-rust px-4 text-sm font-semibold text-white transition hover:bg-banker-rustDark"
        >
          Open dashboard
        </Link>
      </section>
    </main>
  );
}
