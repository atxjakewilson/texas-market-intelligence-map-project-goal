"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Landmark, MapPinned, Target } from "lucide-react";
import { getAssessment, getMetricScore, getMetricTone } from "@/lib/assessment";
import { getRankedLoanOpportunities } from "@/lib/recommendations";
import { sourceFromEvidence, type SourceReference } from "@/lib/sources";
import { heatMapOptions, type EvidenceItem, type HeatMetric, type Market } from "@/types/market";

type InfoPanelProps = {
  market: Market;
  selectedMetric: HeatMetric;
  lastRefreshed?: string | null;
};

export function InfoPanel({ market, selectedMetric, lastRefreshed }: InfoPanelProps) {
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(market.evidence[0]?.id ?? null);
  const recommendations = useMemo(() => getRankedLoanOpportunities(market), [market]);

  useEffect(() => {
    setExpandedEvidence(market.evidence[0]?.id ?? null);
  }, [market.id, market.evidence]);

  return (
    <aside className="max-h-none overflow-hidden rounded-lg border border-banker-line bg-white shadow-banker xl:max-h-[calc(100vh-190px)] xl:overflow-auto">
      <div className="border-b border-banker-line bg-banker-paper px-5 py-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-banker-rust px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
          <Target className="h-3.5 w-3.5" />
          {getAssessment(market.indicators)}
        </div>
        <h2 className="text-2xl font-semibold text-banker-ink">{market.name}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Fact label="County" value={market.county} />
          <Fact label="Metro Area" value={market.metroArea} />
          <Fact label="Estimated Population" value={market.estimatedPopulation} />
          <Fact label="Heat Selection" value={`${selectedMetric}: ${market.indicators[selectedMetric]}`} />
          {lastRefreshed ? <Fact label="Last Refreshed" value={formatDateTime(lastRefreshed)} /> : null}
        </div>
        <p className="mt-4 text-sm leading-6 text-banker-muted">{market.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {market.primaryIndustries.map((industry) => (
            <span key={industry} className="rounded-full border border-banker-line bg-white px-3 py-1 text-xs font-semibold text-banker-muted">
              {industry}
            </span>
          ))}
        </div>
      </div>

      <Section title="Market Metrics" icon={<Landmark className="h-4 w-4" />}>
        <div className="space-y-3">
          {heatMapOptions.map((metric) => (
            <div key={metric}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-banker-ink">{metric}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-banker-muted">
                  {market.indicators[metric]}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-stone-200">
                <div
                  className={`h-full rounded-full transition-all ${getMetricTone(market.indicators[metric])}`}
                  style={{ width: `${getMetricScore(market.indicators[metric])}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Evidence / Why This Market Matters" icon={<MapPinned className="h-4 w-4" />}>
        <div className="space-y-2">
          {market.evidence.map((item) => (
            <EvidenceDisclosure
              key={item.id}
              item={item}
              isOpen={expandedEvidence === item.id}
              onToggle={() => setExpandedEvidence((current) => (current === item.id ? null : item.id))}
            />
          ))}
        </div>
      </Section>

      <Section title="Nearby Projects" icon={<MapPinned className="h-4 w-4" />}>
        <div className="space-y-3">
          {market.nearbyProjects.map((project) => (
            <article key={project.id} className="rounded-lg border border-banker-line bg-banker-paper p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-banker-ink">{project.name}</h3>
                  <p className="mt-1 text-xs text-banker-muted">{project.location}</p>
                </div>
                <span className="rounded-full bg-banker-bronzeSoft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-banker-rustDark">
                  {project.category}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <Fact label="Status" value={project.status} compact />
                <Fact label="Investment" value={project.estimatedInvestment ?? "Not publicly stated"} compact />
                <Fact label="Completion" value={project.expectedCompletion ?? "Not publicly stated"} compact />
                <Fact label="Developer" value={project.developer ?? "Multiple / public"} compact />
              </div>
              <p className="mt-3 text-sm leading-6 text-banker-muted">{project.lenderRelevance}</p>
              <TagList label="Potential financing opportunities" items={project.financingOpportunities} />
              <TagList label="Potential borrower types" items={project.borrowerTypes} />
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-banker-rust hover:text-banker-rustDark"
              >
                {project.source}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Prospective Lending Opportunities" icon={<Landmark className="h-4 w-4" />}>
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-banker-rust">
          Ranked Highest Potential -&gt; Lowest Potential
        </div>
        <div className="space-y-3">
          {recommendations.map((recommendation) => (
            <div key={recommendation.name} className="rounded-lg border border-banker-line bg-white p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-banker-muted">#{recommendation.rank}</div>
                  <div className="mt-1 font-semibold text-banker-ink">{recommendation.name}</div>
                </div>
                <ConfidenceBadge confidence={recommendation.confidence} />
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-banker-muted">Reason</div>
              <p className="mt-1 text-sm leading-5 text-banker-muted">{recommendation.reason}</p>
            </div>
          ))}
        </div>
      </Section>

    </aside>
  );
}

function Section({
  title,
  icon,
  children
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-banker-line px-5 py-5 last:border-b-0">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-banker-muted">
        <span className="text-banker-rust">{icon}</span>
        {title}
      </div>
      {children}
    </section>
  );
}

function Fact({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={compact ? "rounded-md bg-white px-2.5 py-2" : ""}>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-banker-muted">{label}</div>
      <div className={`${compact ? "text-xs" : "text-sm"} mt-1 font-semibold text-banker-ink`}>{value}</div>
    </div>
  );
}

function EvidenceDisclosure({ item, isOpen, onToggle }: { item: EvidenceItem; isOpen: boolean; onToggle: () => void }) {
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const source = sourceFromEvidence(item);

  return (
    <article className="overflow-hidden rounded-lg border border-banker-line bg-white">
      <div className="flex items-start gap-2 px-3 py-3 transition hover:bg-banker-paper">
        <button onClick={onToggle} className="flex flex-1 items-start justify-between gap-3 text-left focus:outline-none">
          <span>
            <span className="block text-sm font-semibold text-banker-ink">{item.title}</span>
            <span className="mt-1 block text-sm leading-5 text-banker-muted">{item.summary}</span>
          </span>
          <ChevronDown className={`mt-1 h-4 w-4 flex-none text-banker-rust transition ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <button
          type="button"
          data-testid={`evidence-source-${item.id}`}
          onClick={() => setIsSourceOpen((current) => !current)}
          className="mt-0.5 flex-none rounded-md border border-banker-line bg-white px-2.5 py-1.5 text-xs font-semibold text-banker-rust transition hover:border-banker-bronze hover:bg-banker-bronzeSoft focus:outline-none focus:ring-4 focus:ring-banker-rust/10"
        >
          View sources
        </button>
      </div>
      {isSourceOpen ? (
        <div className="border-t border-banker-line bg-white px-3 py-3">
          <SourceDetail source={source} compact />
        </div>
      ) : null}
      {isOpen ? (
        <div className="border-t border-banker-line bg-banker-paper px-3 py-3">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-banker-ink">Description</dt>
              <dd className="mt-1 leading-6 text-banker-muted">{item.description}</dd>
            </div>
            <div>
              <dt className="font-semibold text-banker-ink">Why it matters for commercial banking</dt>
              <dd className="mt-1 leading-6 text-banker-muted">{item.bankingRelevance}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </article>
  );
}

function SourceDetail({ source, compact = false }: { source: SourceReference; compact?: boolean }) {
  return (
    <div className={compact ? "rounded-md border border-banker-line bg-banker-paper p-3" : ""}>
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <Fact label="Source name" value={source.name} compact />
        <Fact label="Source type" value={source.type} compact />
        <Fact label="Last updated" value={formatSourceDate(source.lastUpdated)} compact />
        <div className="rounded-md bg-white px-2.5 py-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-banker-muted">Status</div>
          <div className="mt-1">
            <SourceStatusBadge status={source.status} />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-md bg-white px-2.5 py-2">
        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-banker-muted">Used for</div>
        <div className="mt-1 text-sm leading-5 text-banker-muted">{source.usedFor.join(", ")}</div>
      </div>
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-banker-rust hover:text-banker-rustDark"
      >
        Open public source
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function SourceStatusBadge({ status }: { status: SourceReference["status"] }) {
  const tone =
    status === "Live"
      ? "bg-green-100 text-green-800"
      : status === "Cached"
        ? "bg-amber-100 text-amber-800"
        : status === "Seeded"
          ? "bg-stone-200 text-stone-700"
          : "bg-stone-100 text-stone-500";

  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${tone}`}>{status}</span>;
}

function ConfidenceBadge({ confidence }: { confidence: "High" | "Medium" | "Low" }) {
  const tone =
    confidence === "High"
      ? "bg-green-100 text-green-800"
      : confidence === "Medium"
        ? "bg-amber-100 text-amber-800"
        : "bg-stone-200 text-stone-700";

  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${tone}`}>
      Confidence: {confidence}
    </span>
  );
}

function formatSourceDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-banker-muted">{label}</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-banker-line bg-white px-2.5 py-1 text-xs font-medium text-banker-muted">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
