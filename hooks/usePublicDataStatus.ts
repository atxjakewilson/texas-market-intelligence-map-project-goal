"use client";

import { useEffect, useState } from "react";

type PublicSourceStatus = {
  id: string;
  name: string;
  status: "available" | "limited" | "unavailable";
  lastChecked: string;
  lastUpdated: string;
  message: string;
  url: string;
};

function fallbackSources(): PublicSourceStatus[] {
  return [
    {
      id: "seeded-public-records",
      name: "Seeded public-source dataset",
      status: "limited",
      lastChecked: new Date().toISOString(),
      lastUpdated: "Seeded public-source links verified during dataset assembly",
      message: "Live public data status check failed; dashboard remains available from cached public-source records.",
      url: "https://data.texas.gov/"
    }
  ];
}

export function usePublicDataStatus() {
  const [sources, setSources] = useState<PublicSourceStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/public-data-status")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Public data status request failed");
        }

        return response.json();
      })
      .then((payload: { sources: PublicSourceStatus[] }) => {
        if (isMounted) {
          setSources(Array.isArray(payload.sources) && payload.sources.length > 0 ? payload.sources : fallbackSources());
        }
      })
      .catch(() => {
        if (isMounted) {
          setSources(fallbackSources());
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { sources, isLoading };
}
