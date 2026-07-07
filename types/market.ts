export const heatMapOptions = [
  "Commercial Development",
  "Infrastructure Projects",
  "Population Growth",
  "Business Expansion",
  "Industrial Growth",
  "Retail Growth",
  "Healthcare Growth",
  "Energy Activity",
  "Public Financing Signals"
] as const;

export type HeatMetric = (typeof heatMapOptions)[number];

export type IndicatorLevel = "Strong" | "Moderate" | "Limited";

export type MarketIndicators = Record<HeatMetric, IndicatorLevel>;

export type SourceStatus = "Live" | "Cached" | "Seeded" | "Unavailable";

export type EvidenceItem = {
  id: string;
  title: string;
  summary: string;
  description: string;
  bankingRelevance: string;
  source: string;
  sourceUrl: string;
  sourceType?: string;
  sourceStatus?: SourceStatus;
  lastUpdated: string;
  metric: HeatMetric;
};

export type NearbyProject = {
  id: string;
  name: string;
  location: string;
  category: string;
  status: string;
  estimatedInvestment?: string;
  expectedCompletion?: string;
  developer?: string;
  lenderRelevance: string;
  financingOpportunities: string[];
  borrowerTypes: string[];
  source: string;
  sourceUrl: string;
  sourceType?: string;
  sourceStatus?: SourceStatus;
  lastUpdated?: string;
};

export type Market = {
  id: string;
  name: string;
  county: string;
  metroArea: string;
  estimatedPopulation: string;
  coordinates: [number, number];
  radiusMeters: number;
  primaryIndustries: string[];
  summary: string;
  indicators: MarketIndicators;
  evidence: EvidenceItem[];
  nearbyProjects: NearbyProject[];
};

export type LoanRecommendation = {
  rank: number;
  name: string;
  confidence: "High" | "Medium" | "Low";
  reason: string;
  score: number;
};
