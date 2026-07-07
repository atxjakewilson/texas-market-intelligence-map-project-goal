import type { HeatMetric, IndicatorLevel, LoanRecommendation, Market } from "@/types/market";

const levelScores: Record<IndicatorLevel, number> = {
  Strong: 3,
  Moderate: 2,
  Limited: 0
};

type OpportunityRule = {
  name: string;
  metrics: HeatMetric[];
  terms: string[];
  reason: (market: Market, matchedTerms: string[]) => string;
};

const opportunityRules: OpportunityRule[] = [
  {
    name: "Construction Lending",
    metrics: ["Commercial Development", "Infrastructure Projects", "Population Growth", "Public Financing Signals"],
    terms: [
      "hotel",
      "convention",
      "airport",
      "theme park",
      "terminal",
      "construction",
      "development",
      "subdivision",
      "master-planned",
      "campus",
      "highway",
      "interchange",
      "capital",
      "public works"
    ],
    reason: (market, matchedTerms) =>
      `${market.name} shows construction demand signals from ${matchedTerms.slice(0, 3).join(", ") || "development and infrastructure evidence"}, supporting potential draws for horizontal, vertical, and tenant-improvement work.`
  },
  {
    name: "Owner-Occupied Commercial Real Estate",
    metrics: ["Business Expansion", "Commercial Development", "Retail Growth", "Healthcare Growth"],
    terms: ["owner", "clinic", "medical", "service business", "retail", "office", "local business", "expanding", "practice"],
    reason: (market, matchedTerms) =>
      `Business expansion and local-service evidence in ${market.name} point to operators that may prefer owning facilities instead of leasing, especially around ${matchedTerms.slice(0, 2).join(" and ") || "retail and service corridors"}.`
  },
  {
    name: "Investor Commercial Real Estate",
    metrics: ["Commercial Development", "Population Growth", "Industrial Growth", "Retail Growth"],
    terms: [
      "hotel",
      "hospitality",
      "convention",
      "entertainment",
      "airport",
      "warehouse",
      "industrial",
      "retail center",
      "multifamily",
      "distribution",
      "flex",
      "trade area",
      "commercial space"
    ],
    reason: (market, matchedTerms) =>
      `Growth and property-use signals around ${market.name} suggest leased space demand for ${matchedTerms.slice(0, 3).join(", ") || "retail, industrial, and flex properties"}.`
  },
  {
    name: "Equipment Financing",
    metrics: ["Infrastructure Projects", "Industrial Growth", "Business Expansion", "Energy Activity"],
    terms: ["equipment", "contractor", "manufacturing", "fleet", "logistics", "airport", "terminal", "warehouse", "fabrication", "energy", "port"],
    reason: (market, matchedTerms) =>
      `${market.name} has contractor, industrial, or logistics indicators tied to ${matchedTerms.slice(0, 3).join(", ") || "equipment-heavy operating activity"}, which can create machinery, fleet, and specialty equipment demand.`
  },
  {
    name: "Working Capital Lines",
    metrics: ["Business Expansion", "Commercial Development", "Industrial Growth", "Retail Growth"],
    terms: ["supplier", "contract", "receivables", "inventory", "growth", "business formation", "service", "operator", "hospitality", "event", "tourism", "vendor"],
    reason: (market, matchedTerms) =>
      `Expanding firms in ${market.name} may need liquidity for payroll, inventory, and receivables as activity tied to ${matchedTerms.slice(0, 3).join(", ") || "growth corridors"} scales.`
  },
  {
    name: "SBA Lending",
    metrics: ["Retail Growth", "Population Growth", "Business Expansion"],
    terms: ["small business", "retail", "restaurant", "childcare", "clinic", "service", "trade area", "household", "hospitality", "tourism", "entertainment"],
    reason: (market, matchedTerms) =>
      `${market.name}'s household and small-business indicators create a measured SBA opportunity around ${matchedTerms.slice(0, 3).join(", ") || "retail and service formation"}.`
  },
  {
    name: "Treasury and Deposit Relationships",
    metrics: ["Business Expansion", "Industrial Growth", "Public Financing Signals"],
    terms: ["treasury", "deposit", "operator", "vendor", "contractor", "manufacturer", "logistics", "public"],
    reason: (market, matchedTerms) =>
      `Operating businesses and project vendors in ${market.name} can create deposit, payments, fraud-control, and cash-management opportunities tied to ${matchedTerms.slice(0, 3).join(", ") || "commercial activity"}.`
  }
];

function marketText(market: Market) {
  return [
    market.summary,
    ...market.primaryIndustries,
    ...market.evidence.flatMap((item) => [item.title, item.summary, item.description, item.bankingRelevance]),
    ...market.nearbyProjects.flatMap((project) => [
      project.name,
      project.category,
      project.status,
      project.lenderRelevance,
      ...project.financingOpportunities,
      ...project.borrowerTypes
    ])
  ]
    .join(" ")
    .toLowerCase();
}

export function getRankedLoanOpportunities(market: Market): LoanRecommendation[] {
  const text = marketText(market);

  return opportunityRules
    .map((rule) => {
      const metricScore = rule.metrics.reduce((sum, metric) => sum + levelScores[market.indicators[metric]], 0);
      const matchedTerms = rule.terms.filter((term) => text.includes(term.toLowerCase()));
      const score = metricScore + Math.min(matchedTerms.length, 5);
      const confidence: LoanRecommendation["confidence"] = score >= 10 ? "High" : score >= 7 ? "Medium" : "Low";

      return {
        rank: 0,
        name: rule.name,
        confidence,
        reason: rule.reason(market, matchedTerms),
        score
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((opportunity, index) => ({ ...opportunity, rank: index + 1 }));
}
