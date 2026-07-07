"use client";

import { Database, ExternalLink } from "lucide-react";
import { usePublicDataStatus } from "@/hooks/usePublicDataStatus";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function SourceStatusBar() {
  const { sources, isLoading } = usePublicDataStatus();

  return (
    <div className="absolute bottom-4 left-4 right-4 z-[500] rounded-lg border border-banker-line bg-white/95 p-3 shadow-subtle backdrop-blur lg:right-auto lg:w-[520px]">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-banker-muted">
        <Database className="h-3.5 w-3.5 text-banker-rust" />
        Public Data Sources
      </div>
      {isLoading ? (
        <p className="text-sm text-banker-muted">Checking public source availability...</p>
      ) : (
        <div className="space-y-2">
          {sources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start justify-between gap-3 rounded-md border border-banker-line bg-banker-paper px-3 py-2 text-left transition hover:border-banker-bronze"
            >
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-banker-ink">
                  {source.name}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${
                      source.status === "available"
                        ? "bg-green-100 text-green-800"
                        : source.status === "limited"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {source.status}
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-5 text-banker-muted">
                  Last updated: {source.lastUpdated}. Checked: {formatDate(source.lastChecked)}. {source.message}
                </span>
              </span>
              <ExternalLink className="mt-1 h-4 w-4 flex-none text-banker-rust" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
