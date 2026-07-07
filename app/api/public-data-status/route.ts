import { NextResponse } from "next/server";

const CENSUS_ENDPOINT =
  "https://api.census.gov/data/2023/acs/acs5/profile?get=NAME,DP05_0001E&for=state:48";

type SourceCheck = {
  id: string;
  name: string;
  status: "available" | "limited" | "unavailable";
  lastChecked: string;
  lastUpdated: string;
  message: string;
  url: string;
};

function fallbackSources(lastChecked = new Date().toISOString()): SourceCheck[] {
  return [
    {
      id: "seeded-public-records",
      name: "Seeded public-source dataset",
      status: "limited",
      lastChecked,
      lastUpdated: "Seeded public-source links verified during dataset assembly",
      message: "Live public data checks are unavailable; the dashboard remains available from cached public-source records.",
      url: "https://data.texas.gov/"
    }
  ];
}

async function checkCensus(): Promise<SourceCheck> {
  const lastChecked = new Date().toISOString();
  const url = process.env.CENSUS_API_KEY
    ? `${CENSUS_ENDPOINT}&key=${process.env.CENSUS_API_KEY}`
    : CENSUS_ENDPOINT;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(4500)
    });

    if (!response.ok) {
      return {
        id: "census-acs",
        name: "U.S. Census Bureau ACS",
        status: response.status === 403 ? "limited" : "unavailable",
        lastChecked,
        lastUpdated: "2023 ACS 5-year profile endpoint",
        message:
          response.status === 403
            ? "Live endpoint reached, but this Census API now requires a key. Add CENSUS_API_KEY to enable live reads."
            : `Live endpoint returned HTTP ${response.status}; using seeded population estimates.`,
        url: "https://api.census.gov/data.html"
      };
    }

    const payload = await response.json();
    const texasPopulation = Array.isArray(payload?.[1]) ? payload[1][1] : undefined;

    return {
      id: "census-acs",
      name: "U.S. Census Bureau ACS",
      status: "available",
      lastChecked,
      lastUpdated: "2023 ACS 5-year profile endpoint",
      message: texasPopulation
        ? `Live Census endpoint available. Texas population estimate returned: ${Number(
            texasPopulation
          ).toLocaleString()}.`
        : "Live Census endpoint available.",
      url: "https://api.census.gov/data.html"
    };
  } catch {
    return {
      id: "census-acs",
      name: "U.S. Census Bureau ACS",
      status: "unavailable",
      lastChecked,
      lastUpdated: "2023 ACS 5-year profile endpoint",
      message: "Live Census check timed out or failed; using seeded population estimates.",
      url: "https://api.census.gov/data.html"
    };
  }
}

export async function GET() {
  const now = new Date().toISOString();

  try {
    const census = await checkCensus();
    const publicSourceChecks: SourceCheck[] = [
      census,
      {
        id: "txdot",
        name: "TxDOT Project Tracker and project pages",
        status: "limited",
        lastChecked: now,
        lastUpdated: "Seeded public-source links verified during dataset assembly",
        message: "Project references remain clickable; no keyless structured TxDOT project feed is configured.",
        url: "https://www.txdot.gov/projects/project-tracker.html"
      },
      {
        id: "local-public-records",
        name: "Local government, port, EDC, and company announcements",
        status: "limited",
        lastChecked: now,
        lastUpdated: "Seeded public-source links verified during dataset assembly",
        message: "The dashboard uses transparent source links and continues operating when live feeds are unavailable.",
        url: "https://data.texas.gov/"
      }
    ];

    return NextResponse.json({ sources: publicSourceChecks });
  } catch {
    return NextResponse.json({ sources: fallbackSources(now) });
  }
}
