import { NextResponse } from "next/server";

type LiveSourceCheck = {
  name: string;
  status: "Live" | "Unavailable";
  url: string;
  message: string;
};

const checks = [
  {
    name: "U.S. Census Bureau Population Estimates",
    url: "https://www.census.gov/programs-surveys/popest.html"
  },
  {
    name: "TxDOT Project Tracker",
    url: "https://www.txdot.gov/projects/project-tracker.html"
  },
  {
    name: "TDLR TABS Project Search",
    url: "https://www.tdlr.texas.gov/TABS/Search"
  },
  {
    name: "SBA Open Data",
    url: "https://data.sba.gov/"
  }
];

async function checkSource(source: { name: string; url: string }): Promise<LiveSourceCheck> {
  try {
    const response = await fetch(source.url, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });

    return {
      name: source.name,
      url: source.url,
      status: response.ok ? "Live" : "Unavailable",
      message: response.ok ? "Live public source reached." : `Source returned HTTP ${response.status}.`
    };
  } catch {
    return {
      name: source.name,
      url: source.url,
      status: "Unavailable",
      message: "Source check failed or timed out."
    };
  }
}

export async function POST() {
  const refreshedAt = new Date().toISOString();

  try {
    const sourceChecks = await Promise.all(checks.map(checkSource));
    const liveCount = sourceChecks.filter((source) => source.status === "Live").length;

    return NextResponse.json({
      refreshedAt,
      sourceChecks,
      message:
        liveCount > 0
          ? `${liveCount} public source checks completed. Cached evidence and project records remain available for market review.`
          : "Live public source checks were unavailable; cached evidence and project records remain available."
    });
  } catch {
    return NextResponse.json({
      refreshedAt,
      sourceChecks: [],
      message: "Live public source checks failed; cached evidence and project records remain available."
    });
  }
}
