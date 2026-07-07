"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Building2, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { HeatSelector } from "@/components/HeatSelector";
import { InfoPanel } from "@/components/InfoPanel";
import { SearchResults } from "@/components/SearchResults";
import { markets } from "@/data/markets";
import { searchMarkets } from "@/lib/search";
import type { HeatMetric, Market } from "@/types/market";

const MarketMap = dynamic(() => import("@/components/MarketMap").then((module) => module.MarketMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#eee9df] text-sm font-medium text-banker-muted">
      Loading Texas map...
    </div>
  )
});

export function MarketDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<HeatMetric>("Commercial Development");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [query, setQuery] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("Cached public-source records loaded.");

  const filteredMarkets = useMemo(() => searchMarkets(markets, query), [query]);

  async function refreshMarketData() {
    setIsRefreshing(true);
    setRefreshMessage("Refreshing available public sources...");

    try {
      const response = await fetch("/api/refresh-market-data", { method: "POST" });
      if (!response.ok) {
        throw new Error("Market refresh request failed");
      }

      const payload = (await response.json()) as { refreshedAt: string; message: string };

      setLastRefreshed(payload.refreshedAt ?? new Date().toISOString());
      setRefreshMessage(payload.message ?? "Cached public-source records remain available.");
    } catch {
      const timestamp = new Date().toISOString();
      setLastRefreshed(timestamp);
      setRefreshMessage("Live refresh failed; cached public-source records remain available.");
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-4 text-banker-ink sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1800px] flex-col gap-4 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-banker-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-banker-rust shadow-sm">
            <Building2 className="h-3.5 w-3.5" />
            Commercial Banking Intelligence
          </div>
          <h1 className="text-3xl font-semibold tracking-normal text-banker-ink sm:text-4xl">
            Texas Market Intelligence Map
          </h1>
          <p className="mt-2 text-base text-banker-muted">
            Interactive public market intelligence for commercial lenders.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 lg:w-[520px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-banker-muted" />
            <span className="sr-only">Search by city, county, metro area, industry, project, or developer</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search city, county, industry, project, developer..."
              className="h-11 w-full rounded-lg border border-banker-line bg-white pl-10 pr-4 text-sm text-banker-ink shadow-sm outline-none transition focus:border-banker-rust focus:ring-4 focus:ring-banker-rust/10"
            />
          </label>
          {query ? (
            <SearchResults
              markets={filteredMarkets}
              query={query}
              onSelect={(market) => {
                setSelectedMarket(market);
                setQuery("");
              }}
            />
          ) : null}
        </div>
      </header>

      <section
        className={`mx-auto grid max-w-[1800px] gap-4 ${
          selectedMarket ? "xl:grid-cols-[minmax(0,1fr)_430px]" : "xl:grid-cols-1"
        }`}
      >
        <div className="relative min-h-[640px] overflow-hidden rounded-lg border border-banker-line bg-white shadow-banker lg:min-h-[calc(100vh-190px)]">
          <div className="absolute left-4 top-4 z-[500] w-[292px] rounded-lg border border-banker-line bg-white/95 p-3 shadow-subtle backdrop-blur">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-banker-muted">
              <SlidersHorizontal className="h-3.5 w-3.5 text-banker-rust" />
              Heat Map By
            </div>
            <HeatSelector value={selectedMetric} onChange={setSelectedMetric} />
            <button
              type="button"
              onClick={refreshMarketData}
              disabled={isRefreshing}
              className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-banker-rust px-3 text-sm font-semibold text-white transition hover:bg-banker-rustDark disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Market Data
            </button>
            <div className="mt-2 text-xs leading-5 text-banker-muted">
              <div>Last refreshed: {lastRefreshed ? new Date(lastRefreshed).toLocaleString() : "Not refreshed this session"}</div>
              <div>{refreshMessage}</div>
            </div>
          </div>

          <MarketMap
            markets={filteredMarkets}
            selectedMarket={selectedMarket}
            selectedMetric={selectedMetric}
            onSelectMarket={setSelectedMarket}
          />
        </div>

        {selectedMarket ? <InfoPanel market={selectedMarket} selectedMetric={selectedMetric} lastRefreshed={lastRefreshed} /> : null}
      </section>
    </main>
  );
}
