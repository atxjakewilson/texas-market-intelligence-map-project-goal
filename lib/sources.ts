import type { EvidenceItem, Market, NearbyProject, SourceStatus } from "@/types/market";

export type SourceReference = {
  id: string;
  name: string;
  type: string;
  url: string;
  lastUpdated: string;
  status: SourceStatus;
  usedFor: string[];
};

function inferSourceType(name: string, url: string) {
  const source = `${name} ${url}`.toLowerCase();

  if (source.includes("census") || source.includes("eia.gov")) {
    return "Federal public dataset";
  }

  if (source.includes("txdot") || source.includes("gov.texas.gov") || source.includes("texas.gov")) {
    return "State public source";
  }

  if (source.includes("port") || source.includes("airport")) {
    return "Public infrastructure authority";
  }

  if (source.includes("economic") || source.includes("chamber")) {
    return "Economic development source";
  }

  if (source.includes("news.samsung") || source.includes("ti.com") || source.includes("cheniere") || source.includes("spacex")) {
    return "Company announcement";
  }

  return "Public source";
}

export function sourceFromEvidence(item: EvidenceItem): SourceReference {
  return {
    id: `evidence-${item.id}`,
    name: item.source,
    type: item.sourceType ?? inferSourceType(item.source, item.sourceUrl),
    url: item.sourceUrl,
    lastUpdated: item.lastUpdated,
    status: item.sourceStatus ?? "Cached",
    usedFor: [item.title]
  };
}

export function sourceFromProject(project: NearbyProject): SourceReference {
  return {
    id: `project-${project.id}`,
    name: project.source,
    type: project.sourceType ?? inferSourceType(project.source, project.sourceUrl),
    url: project.sourceUrl,
    lastUpdated: project.lastUpdated ?? "Seeded during dataset assembly",
    status: project.sourceStatus ?? "Cached",
    usedFor: [project.name]
  };
}

export function getMarketSources(market: Market) {
  const sourceMap = new Map<string, SourceReference>();

  [...market.evidence.map(sourceFromEvidence), ...market.nearbyProjects.map(sourceFromProject)].forEach((source) => {
    const key = `${source.name}-${source.url}`;
    const existing = sourceMap.get(key);

    if (existing) {
      existing.usedFor = Array.from(new Set([...existing.usedFor, ...source.usedFor]));
      return;
    }

    sourceMap.set(key, source);
  });

  return Array.from(sourceMap.values());
}
