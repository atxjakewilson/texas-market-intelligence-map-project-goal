"use client";

import { MapPin } from "lucide-react";
import type { Market } from "@/types/market";

type SearchResultsProps = {
  markets: Market[];
  query: string;
  onSelect: (market: Market) => void;
};

export function SearchResults({ markets, query, onSelect }: SearchResultsProps) {
  return (
    <div className="rounded-lg border border-banker-line bg-white shadow-subtle">
      <div className="border-b border-banker-line px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-banker-muted">
        {markets.length} result{markets.length === 1 ? "" : "s"} for "{query}"
      </div>
      <div className="max-h-56 overflow-auto p-1">
        {markets.length > 0 ? (
          markets.map((market) => (
            <button
              key={market.id}
              onClick={() => onSelect(market)}
              className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left transition hover:bg-banker-paper focus:bg-banker-paper focus:outline-none"
            >
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-banker-rust" />
              <span>
                <span className="block text-sm font-semibold text-banker-ink">{market.name}</span>
                <span className="block text-xs text-banker-muted">
                  {market.county} · {market.metroArea}
                </span>
              </span>
            </button>
          ))
        ) : (
          <div className="px-3 py-4 text-sm text-banker-muted">No markets match that search.</div>
        )}
      </div>
    </div>
  );
}
