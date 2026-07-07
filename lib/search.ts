import type { Market } from "@/types/market";

export function searchMarkets(markets: Market[], query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return markets;
  }

  return markets.filter((market) => {
    const projectFields = market.nearbyProjects.flatMap((project) => [
      project.name,
      project.category,
      project.developer ?? "",
      project.location,
      ...project.borrowerTypes
    ]);

    const fields = [
      market.name,
      market.county,
      market.metroArea,
      ...market.primaryIndustries,
      ...market.evidence.map((item) => item.title),
      ...projectFields
    ];

    return fields.some((field) => field.toLowerCase().includes(normalized));
  });
}
