import type { EvidenceItem, HeatMetric, Market, MarketIndicators, NearbyProject, SourceStatus } from "@/types/market";

type MarketProfile = "major" | "suburban" | "exurban" | "industrial" | "portEnergy" | "energy" | "border" | "higherEd" | "regional";

type SourceKey =
  | "census"
  | "txdot"
  | "tdlr"
  | "sba"
  | "texasBusiness"
  | "austinAirport"
  | "ausJourney"
  | "cotaland"
  | "cotaHotel"
  | "sh71East"
  | "tesla"
  | "samsung"
  | "friscoEdc"
  | "georgetownEdc"
  | "roundRockChamber"
  | "dallasChamber"
  | "ghp"
  | "portHouston"
  | "portCorpus"
  | "dfwAirport"
  | "tmc"
  | "governor"
  | "eia"
  | "borderTrade"
  | "ti"
  | "corpusPort"
  | "portBeaumont";

type SourceRef = {
  source: string;
  sourceUrl: string;
  sourceType: string;
  sourceStatus: SourceStatus;
  lastUpdated: string;
};

type AnchorEvidence = {
  title: string;
  summary: string;
  description: string;
  bankingRelevance: string;
  metric: HeatMetric;
  sourceKey: SourceKey;
};

type MarketSeed = {
  id: string;
  name: string;
  county: string;
  metroArea: string;
  estimatedPopulation: string;
  coordinates: [number, number];
  radiusMeters: number;
  primaryIndustries: string[];
  profile: MarketProfile;
  summary?: string;
  sourceKey?: SourceKey;
  anchors?: AnchorEvidence[];
  projects?: NearbyProject[];
};

const sourceRefs: Record<SourceKey, SourceRef> = {
  census: {
    source: "U.S. Census Bureau Population Estimates",
    sourceUrl: "https://www.census.gov/programs-surveys/popest.html",
    sourceType: "Federal public dataset",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  txdot: {
    source: "TxDOT Project Tracker",
    sourceUrl: "https://www.txdot.gov/projects/project-tracker.html",
    sourceType: "State public project database",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  tdlr: {
    source: "Texas Department of Licensing and Regulation TABS",
    sourceUrl: "https://www.tdlr.texas.gov/TABS/Search",
    sourceType: "State public building project registry",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  sba: {
    source: "U.S. Small Business Administration Open Data",
    sourceUrl: "https://data.sba.gov/",
    sourceType: "Federal public small business dataset",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  texasBusiness: {
    source: "Texas Economic Development and Tourism",
    sourceUrl: "https://gov.texas.gov/business",
    sourceType: "State economic development source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  austinAirport: {
    source: "Austin-Bergstrom International Airport",
    sourceUrl: "https://www.austintexas.gov/department/airport",
    sourceType: "Airport authority public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  ausJourney: {
    source: "Journey With AUS Airport Expansion Program",
    sourceUrl: "https://www.flyaustin.com/expansion-development-program",
    sourceType: "Airport authority expansion program",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  cotaland: {
    source: "COTALAND at Circuit of The Americas",
    sourceUrl: "https://cotaland.com/",
    sourceType: "Official entertainment development source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  cotaHotel: {
    source: "MySA COTA Hotel and Convention Center Reporting",
    sourceUrl: "https://www.mysanantonio.com/business/article/cota-hotel-convention-center-20793721.php",
    sourceType: "Reputable local business news",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  sh71East: {
    source: "TxDOT SH 71 East Corridor",
    sourceUrl: "https://www.txdot.gov/projects/projects-studies/austin/sh71-east-corridor.html",
    sourceType: "State public infrastructure source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  tesla: {
    source: "Tesla Giga Texas",
    sourceUrl: "https://www.tesla.com/giga-texas",
    sourceType: "Company public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  samsung: {
    source: "Samsung Newsroom",
    sourceUrl: "https://news.samsung.com/us/samsung-announces-new-advanced-semiconductor-fab-site-taylor-texas/",
    sourceType: "Company press release",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  friscoEdc: {
    source: "Frisco Economic Development Corporation",
    sourceUrl: "https://friscoedc.com/",
    sourceType: "Economic development corporation",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  georgetownEdc: {
    source: "Georgetown Economic Development",
    sourceUrl: "https://invest.georgetown.org/",
    sourceType: "Economic development corporation",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  roundRockChamber: {
    source: "Round Rock Chamber Economic Development",
    sourceUrl: "https://roundrockchamber.org/economic-development/",
    sourceType: "Economic development corporation",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  dallasChamber: {
    source: "Dallas Regional Chamber",
    sourceUrl: "https://www.dallaschamber.org/",
    sourceType: "Regional chamber and economic development source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  ghp: {
    source: "Greater Houston Partnership",
    sourceUrl: "https://www.houston.org/",
    sourceType: "Regional chamber and economic development source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  portHouston: {
    source: "Port Houston Project 11",
    sourceUrl: "https://porthouston.com/project11/",
    sourceType: "Port authority capital project source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  portCorpus: {
    source: "Port of Corpus Christi Channel Improvement Project",
    sourceUrl: "https://portofcc.com/channel-improvement-project/",
    sourceType: "Port authority capital project source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  dfwAirport: {
    source: "DFW International Airport Newsroom",
    sourceUrl: "https://www.dfwairport.com/dfwnewsroom/",
    sourceType: "Airport authority public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  tmc: {
    source: "Texas Medical Center Helix Park",
    sourceUrl: "https://www.tmc.edu/helixpark/",
    sourceType: "Healthcare campus public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  governor: {
    source: "Office of the Texas Governor",
    sourceUrl: "https://gov.texas.gov/news",
    sourceType: "State public announcement source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  eia: {
    source: "U.S. Energy Information Administration",
    sourceUrl: "https://www.eia.gov/petroleum/drilling/",
    sourceType: "Federal public energy dataset",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  borderTrade: {
    source: "TxDOT Border Trade Advisory Committee",
    sourceUrl: "https://www.txdot.gov/projects/projects-studies/statewide/border-trade-advisory-committee.html",
    sourceType: "State border trade planning source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  ti: {
    source: "Texas Instruments Newsroom",
    sourceUrl: "https://www.ti.com/about-ti/newsroom.html",
    sourceType: "Company public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  corpusPort: {
    source: "Port of Corpus Christi",
    sourceUrl: "https://portofcc.com/",
    sourceType: "Port authority public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  },
  portBeaumont: {
    source: "Port of Beaumont",
    sourceUrl: "https://www.portofbeaumont.com/",
    sourceType: "Port authority public source",
    sourceStatus: "Cached",
    lastUpdated: "2026-07-02T09:00:00-05:00"
  }
};

const indicatorPresets: Record<MarketProfile, MarketIndicators> = {
  major: {
    "Commercial Development": "Strong",
    "Infrastructure Projects": "Strong",
    "Population Growth": "Strong",
    "Business Expansion": "Strong",
    "Industrial Growth": "Strong",
    "Retail Growth": "Strong",
    "Healthcare Growth": "Strong",
    "Energy Activity": "Moderate",
    "Public Financing Signals": "Strong"
  },
  suburban: {
    "Commercial Development": "Strong",
    "Infrastructure Projects": "Moderate",
    "Population Growth": "Strong",
    "Business Expansion": "Strong",
    "Industrial Growth": "Moderate",
    "Retail Growth": "Strong",
    "Healthcare Growth": "Moderate",
    "Energy Activity": "Limited",
    "Public Financing Signals": "Moderate"
  },
  exurban: {
    "Commercial Development": "Moderate",
    "Infrastructure Projects": "Moderate",
    "Population Growth": "Strong",
    "Business Expansion": "Moderate",
    "Industrial Growth": "Moderate",
    "Retail Growth": "Moderate",
    "Healthcare Growth": "Limited",
    "Energy Activity": "Limited",
    "Public Financing Signals": "Moderate"
  },
  industrial: {
    "Commercial Development": "Strong",
    "Infrastructure Projects": "Strong",
    "Population Growth": "Moderate",
    "Business Expansion": "Strong",
    "Industrial Growth": "Strong",
    "Retail Growth": "Moderate",
    "Healthcare Growth": "Limited",
    "Energy Activity": "Limited",
    "Public Financing Signals": "Strong"
  },
  portEnergy: {
    "Commercial Development": "Moderate",
    "Infrastructure Projects": "Strong",
    "Population Growth": "Moderate",
    "Business Expansion": "Strong",
    "Industrial Growth": "Strong",
    "Retail Growth": "Moderate",
    "Healthcare Growth": "Moderate",
    "Energy Activity": "Strong",
    "Public Financing Signals": "Strong"
  },
  energy: {
    "Commercial Development": "Moderate",
    "Infrastructure Projects": "Moderate",
    "Population Growth": "Moderate",
    "Business Expansion": "Moderate",
    "Industrial Growth": "Strong",
    "Retail Growth": "Limited",
    "Healthcare Growth": "Limited",
    "Energy Activity": "Strong",
    "Public Financing Signals": "Moderate"
  },
  border: {
    "Commercial Development": "Moderate",
    "Infrastructure Projects": "Strong",
    "Population Growth": "Moderate",
    "Business Expansion": "Strong",
    "Industrial Growth": "Moderate",
    "Retail Growth": "Moderate",
    "Healthcare Growth": "Moderate",
    "Energy Activity": "Limited",
    "Public Financing Signals": "Strong"
  },
  higherEd: {
    "Commercial Development": "Moderate",
    "Infrastructure Projects": "Moderate",
    "Population Growth": "Strong",
    "Business Expansion": "Moderate",
    "Industrial Growth": "Moderate",
    "Retail Growth": "Moderate",
    "Healthcare Growth": "Strong",
    "Energy Activity": "Limited",
    "Public Financing Signals": "Moderate"
  },
  regional: {
    "Commercial Development": "Moderate",
    "Infrastructure Projects": "Moderate",
    "Population Growth": "Moderate",
    "Business Expansion": "Moderate",
    "Industrial Growth": "Moderate",
    "Retail Growth": "Moderate",
    "Healthcare Growth": "Moderate",
    "Energy Activity": "Limited",
    "Public Financing Signals": "Moderate"
  }
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function withSource(sourceKey: SourceKey) {
  return sourceRefs[sourceKey];
}

function makeEvidence(seed: MarketSeed): EvidenceItem[] {
  const regionalSource = withSource(seed.sourceKey ?? sourceKeyForProfile(seed.profile));
  const evidence: EvidenceItem[] = [];

  seed.anchors?.forEach((anchor, index) => {
    const source = withSource(anchor.sourceKey);
    evidence.push({
      id: `${seed.id}-anchor-${index + 1}`,
      title: anchor.title,
      summary: anchor.summary,
      description: anchor.description,
      bankingRelevance: anchor.bankingRelevance,
      metric: anchor.metric,
      ...source
    });
  });

  evidence.push(
    {
      id: `${seed.id}-population`,
      title: "Population and household formation signal",
      summary: `${seed.name} is part of a Texas growth corridor where Census population estimates help identify expanding household and service demand.`,
      description:
        "Population estimates and ACS context are used as a public baseline for market size, household growth, labor force depth, and follow-on demand for retail, medical, childcare, and service businesses.",
      bankingRelevance:
        "Household growth often precedes owner-occupied commercial real estate, small business build-outs, SBA lending, deposit growth, and working capital needs.",
      metric: "Population Growth",
      ...withSource("census")
    },
    {
      id: `${seed.id}-transportation`,
      title: "TxDOT project visibility in the corridor",
      summary: "Public transportation project records provide a reliable way to monitor highway, interchange, bridge, and access improvements near the market.",
      description:
        "TxDOT Project Tracker is used as the official starting point for identifying nearby highway and mobility projects that may affect access, land value, contractor demand, and commercial site selection.",
      bankingRelevance:
        "Transportation work can create near-term equipment and working capital demand for contractors, while improved access can support future retail, industrial, and owner-occupied real estate.",
      metric: "Infrastructure Projects",
      ...withSource("txdot")
    },
    {
      id: `${seed.id}-commercial-projects`,
      title: "Commercial project registrations and accessibility filings",
      summary: "TDLR TABS public project registrations help lenders monitor commercial, retail, medical, office, and public-facility construction activity.",
      description:
        "The Texas Architectural Barriers online search is a statewide structured public source for project registrations, useful for confirming whether building activity is occurring near a market.",
      bankingRelevance:
        "New registered projects can point to developers, contractors, tenants, medical practices, retailers, and owner-occupied businesses that may need financing or treasury services.",
      metric: "Commercial Development",
      ...withSource("tdlr")
    },
    profileEvidence(seed, regionalSource),
    {
      id: `${seed.id}-small-business`,
      title: "Small business and SBA lending backdrop",
      summary: "SBA open data and public small-business records provide context for lender demand among local operators and service businesses.",
      description:
        "SBA public datasets can be reviewed alongside local growth evidence to understand small-business credit activity and sectors likely to follow population and commercial expansion.",
      bankingRelevance:
        "Small operating businesses may need SBA loans, owner-occupied real estate, equipment, working capital, deposits, and treasury management as local demand expands.",
      metric: "Business Expansion",
      ...withSource("sba")
    }
  );

  return evidence.slice(0, 10);
}

function profileEvidence(seed: MarketSeed, source: SourceRef): EvidenceItem {
  const common = {
    id: `${seed.id}-profile`,
    source: source.source,
    sourceUrl: source.sourceUrl,
    sourceType: source.sourceType,
    sourceStatus: source.sourceStatus,
    lastUpdated: source.lastUpdated
  };

  if (seed.profile === "industrial") {
    return {
      ...common,
      title: "Industrial and supplier activity",
      summary: `${seed.name} has public indicators tied to industrial, manufacturing, logistics, or supplier activity.`,
      description: "Industrial corridors are monitored through state economic development, project registrations, and transportation sources.",
      bankingRelevance:
        "Industrial growth can create owner-occupied CRE, equipment, working capital, deposit, and treasury management opportunities with suppliers and contractors.",
      metric: "Industrial Growth"
    };
  }

  if (seed.profile === "portEnergy") {
    return {
      ...common,
      title: "Port, petrochemical, or energy corridor activity",
      summary: `${seed.name} is tied to freight, marine, petrochemical, or energy activity that supports equipment-heavy operating businesses.`,
      description: "Port and energy public sources are used to track infrastructure, vessel access, industrial expansion, and supply-chain demand.",
      bankingRelevance:
        "Port and energy corridors can support lending to marine contractors, truckers, fabricators, warehouse operators, equipment vendors, and industrial service companies.",
      metric: "Energy Activity"
    };
  }

  if (seed.profile === "energy") {
    return {
      ...common,
      title: "Energy service activity",
      summary: `${seed.name} participates in an energy-service economy where production cycles affect contractors, logistics, equipment, and local service demand.`,
      description: "EIA and public energy data provide an outside signal for drilling, production, and field-service conditions.",
      bankingRelevance:
        "Energy-linked operators frequently need equipment financing, receivables support, fleet financing, treasury services, and working capital lines.",
      metric: "Energy Activity"
    };
  }

  if (seed.profile === "border") {
    return {
      ...common,
      title: "Border trade and logistics corridor",
      summary: `${seed.name} benefits from cross-border trade, freight movement, warehousing, customs, and international service demand.`,
      description: "Border trade planning sources help lenders monitor freight corridors, international bridge activity, and infrastructure priorities.",
      bankingRelevance:
        "Trade corridors can generate lending opportunities with trucking companies, customs brokers, cold storage, warehouses, repair shops, and import-export service firms.",
      metric: "Business Expansion"
    };
  }

  if (seed.profile === "higherEd") {
    return {
      ...common,
      title: "Higher education, medical, and public institution anchors",
      summary: `${seed.name} has institution-driven demand from higher education, healthcare, public facilities, and related service businesses.`,
      description: "Institutional anchors support recurring construction, housing, medical, research, vendor, and professional services activity.",
      bankingRelevance:
        "Institutional markets can support medical office, contractor, vendor, housing, restaurant, retail, and professional service lending opportunities.",
      metric: "Healthcare Growth"
    };
  }

  if (seed.profile === "major") {
    return {
      ...common,
      title: "Regional employment and infrastructure diversity",
      summary: `${seed.name} has diversified public activity across employers, infrastructure, construction, healthcare, retail, and business services.`,
      description: "Major metros are scored using a broader mix of Census, transportation, building, regional chamber, airport, port, and public development sources.",
      bankingRelevance:
        "Diverse metros create a larger prospect universe across construction lending, investor CRE, owner-occupied CRE, equipment, treasury, and deposits.",
      metric: "Business Expansion"
    };
  }

  if (seed.profile === "suburban") {
    return {
      ...common,
      title: "Suburban trade-area expansion",
      summary: `${seed.name} is a suburban growth market where residential rooftops, retail corridors, healthcare, and small-business services tend to follow each other.`,
      description: "Suburban markets are tracked through public population sources, TDLR registrations, transportation records, and regional economic development sources.",
      bankingRelevance:
        "Suburban growth can support retail centers, medical offices, service businesses, restaurants, childcare, owner-occupied facilities, and SBA lending.",
      metric: "Retail Growth"
    };
  }

  if (seed.profile === "exurban") {
    return {
      ...common,
      title: "Edge-growth and land conversion",
      summary: `${seed.name} is an edge-growth market where residential development, road access, utilities, and commercial services can emerge quickly.`,
      description: "Exurban markets are monitored with Census, TxDOT, TDLR, and local economic development signals rather than assuming every announcement is live.",
      bankingRelevance:
        "Edge-growth areas may create early opportunities with land developers, contractors, local services, owner-occupied users, and small business operators.",
      metric: "Population Growth"
    };
  }

  return {
    ...common,
    title: "Regional service hub activity",
    summary: `${seed.name} serves as a regional trade, healthcare, education, or logistics market with recurring middle-market operating needs.`,
    description: "Regional markets are tracked through public population, building, transportation, small-business, and economic development sources.",
    bankingRelevance:
      "Regional service hubs can create steady commercial real estate, equipment, working capital, SBA, deposits, and treasury management opportunities.",
    metric: "Business Expansion"
  };
}

function sourceKeyForProfile(profile: MarketProfile): SourceKey {
  if (profile === "energy") return "eia";
  if (profile === "portEnergy") return "portHouston";
  if (profile === "border") return "borderTrade";
  if (profile === "major" || profile === "suburban" || profile === "exurban") return "texasBusiness";
  return "tdlr";
}

function makeProject(seed: MarketSeed): NearbyProject[] {
  if (seed.projects?.length) {
    return seed.projects;
  }

  const projectSource = withSource(seed.anchors?.[0]?.sourceKey ?? seed.sourceKey ?? sourceKeyForProfile(seed.profile));
  const isIndustrial = ["industrial", "portEnergy", "energy", "border"].includes(seed.profile);
  const category = isIndustrial ? "Industrial and infrastructure activity" : seed.profile === "higherEd" ? "Institutional and medical activity" : "Commercial growth corridor";

  return [
    {
      id: `${seed.id}-corridor-projects`,
      name: `${seed.name} public growth corridor`,
      location: seed.name,
      category,
      status: "Public-source monitoring",
      estimatedInvestment: "Varies by project; verify through linked public sources",
      expectedCompletion: "Varies by project",
      developer: "Multiple public and private participants",
      lenderRelevance: `${seed.name} has public-source indicators that can point lenders toward commercial borrowers tied to construction, infrastructure, business formation, and operating expansion.`,
      financingOpportunities: projectFinancing(seed.profile),
      borrowerTypes: borrowerTypes(seed.profile),
      source: projectSource.source,
      sourceUrl: projectSource.sourceUrl,
      sourceType: projectSource.sourceType,
      sourceStatus: projectSource.sourceStatus,
      lastUpdated: projectSource.lastUpdated
    },
    {
      id: `${seed.id}-tdlr-projects`,
      name: `${seed.name} commercial project registrations`,
      location: `${seed.county} public records`,
      category: "Commercial building activity",
      status: "Public registry review",
      estimatedInvestment: "Project-specific",
      expectedCompletion: "Project-specific",
      developer: "Multiple owners and design teams",
      lenderRelevance:
        "TDLR project registrations can identify commercial construction, public facilities, medical offices, retail spaces, and tenant improvements that warrant lender follow-up.",
      financingOpportunities: ["Construction lending", "Owner-occupied CRE", "Equipment financing", "Treasury management"],
      borrowerTypes: ["Developers", "General contractors", "Specialty contractors", "Owner-occupants", "Commercial tenants"],
      ...withSource("tdlr")
    }
  ];
}

function projectFinancing(profile: MarketProfile) {
  if (profile === "energy") return ["Equipment financing", "Working capital lines", "Owner-occupied CRE", "Treasury management"];
  if (profile === "portEnergy" || profile === "border") return ["Equipment financing", "Working capital lines", "Investor CRE", "Treasury management"];
  if (profile === "industrial") return ["Owner-occupied CRE", "Equipment financing", "Construction lending", "Working capital lines"];
  if (profile === "higherEd") return ["Owner-occupied CRE", "Equipment financing", "SBA lending", "Treasury management"];
  return ["Construction lending", "Owner-occupied CRE", "Investor CRE", "SBA lending"];
}

function borrowerTypes(profile: MarketProfile) {
  if (profile === "energy") return ["Energy service firms", "Fleet operators", "Fabricators", "Equipment rental firms"];
  if (profile === "portEnergy") return ["Marine contractors", "Warehouse operators", "Industrial service companies", "Truckers"];
  if (profile === "border") return ["Trucking companies", "Customs brokers", "Warehouse operators", "Cross-border service firms"];
  if (profile === "industrial") return ["Manufacturers", "Suppliers", "Logistics firms", "Specialty contractors"];
  if (profile === "higherEd") return ["Medical practices", "Food service operators", "Student housing vendors", "Professional services"];
  return ["Developers", "Retail operators", "Medical office users", "Local service businesses", "Contractors"];
}

function makeMarket(seed: MarketSeed): Market {
  return {
    id: seed.id,
    name: seed.name,
    county: seed.county,
    metroArea: seed.metroArea,
    estimatedPopulation: seed.estimatedPopulation,
    coordinates: seed.coordinates,
    radiusMeters: seed.radiusMeters,
    primaryIndustries: seed.primaryIndustries,
    summary:
      seed.summary ??
      `${seed.name} is tracked as a ${seed.profile.replace(/([A-Z])/g, " $1").toLowerCase()} market using public population, project, transportation, and business-formation signals relevant to commercial lending.`,
    indicators: indicatorPresets[seed.profile],
    evidence: makeEvidence(seed),
    nearbyProjects: makeProject(seed)
  };
}

const seeds: MarketSeed[] = [
  {
    id: "austin",
    name: "Austin",
    county: "Travis County",
    metroArea: "Austin-Round Rock-San Marcos",
    estimatedPopulation: "2.4M+ metro",
    coordinates: [30.2672, -97.7431],
    radiusMeters: 36000,
    primaryIndustries: ["Software", "Semiconductors", "Higher education", "Healthcare", "Construction"],
    profile: "major",
    sourceKey: "texasBusiness",
    anchors: [
      {
        title: "I-35 Capital Express and central mobility investment",
        summary: "TxDOT project records provide visibility into major corridor reconstruction through Austin.",
        description: "The I-35 corridor remains one of Central Texas' most consequential public infrastructure programs.",
        bankingRelevance: "Large public works support contractors, suppliers, equipment users, and access-driven commercial real estate.",
        metric: "Infrastructure Projects",
        sourceKey: "txdot"
      }
    ]
  },
  { id: "round-rock", name: "Round Rock", county: "Williamson County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Fast-growth Austin submarket", coordinates: [30.5083, -97.6789], radiusMeters: 17000, primaryIndustries: ["Healthcare", "Technology", "Retail", "Construction"], profile: "suburban", sourceKey: "roundRockChamber" },
  { id: "georgetown", name: "Georgetown", county: "Williamson County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Fast-growth Austin exurb", coordinates: [30.6333, -97.6778], radiusMeters: 17000, primaryIndustries: ["Residential development", "Healthcare", "Retail", "Advanced manufacturing"], profile: "exurban", sourceKey: "georgetownEdc" },
  { id: "cedar-park", name: "Cedar Park", county: "Williamson County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Austin northwest submarket", coordinates: [30.5052, -97.8203], radiusMeters: 14000, primaryIndustries: ["Retail", "Healthcare", "Professional services", "Construction"], profile: "suburban" },
  { id: "leander", name: "Leander", county: "Williamson County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Fast-growth Austin northwest submarket", coordinates: [30.5788, -97.8531], radiusMeters: 15000, primaryIndustries: ["Residential development", "Retail", "Local services", "Construction"], profile: "exurban" },
  { id: "liberty-hill", name: "Liberty Hill", county: "Williamson County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Emerging Austin exurb", coordinates: [30.6649, -97.9225], radiusMeters: 13000, primaryIndustries: ["Residential development", "Construction", "Local services"], profile: "exurban" },
  { id: "pflugerville", name: "Pflugerville", county: "Travis County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Austin northeast submarket", coordinates: [30.4394, -97.62], radiusMeters: 13000, primaryIndustries: ["Logistics", "Retail", "Healthcare", "Construction"], profile: "suburban" },
  { id: "hutto", name: "Hutto", county: "Williamson County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Fast-growth Austin northeast submarket", coordinates: [30.5427, -97.5467], radiusMeters: 13000, primaryIndustries: ["Industrial", "Residential development", "Retail", "Construction"], profile: "industrial" },
  {
    id: "taylor",
    name: "Taylor",
    county: "Williamson County",
    metroArea: "Austin-Round Rock-San Marcos",
    estimatedPopulation: "Austin semiconductor growth submarket",
    coordinates: [30.5708, -97.4094],
    radiusMeters: 15000,
    primaryIndustries: ["Semiconductors", "Manufacturing", "Construction", "Logistics"],
    profile: "industrial",
    anchors: [
      {
        title: "Samsung semiconductor fabrication campus",
        summary: "Samsung's Taylor semiconductor investment is a major industrial anchor for northeast Austin.",
        description: "The public company announcement identifies Taylor as a strategic advanced semiconductor manufacturing location.",
        bankingRelevance: "Supplier, contractor, logistics, equipment, workforce, and industrial real estate needs can follow a major manufacturing anchor.",
        metric: "Industrial Growth",
        sourceKey: "samsung"
      }
    ]
  },
  { id: "manor", name: "Manor", county: "Travis County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Austin east growth submarket", coordinates: [30.3408, -97.5569], radiusMeters: 13000, primaryIndustries: ["Residential development", "Logistics", "Construction", "Retail"], profile: "exurban" },
  {
    id: "del-valle",
    name: "Del Valle",
    county: "Travis County",
    metroArea: "Austin-Round Rock-San Marcos",
    estimatedPopulation: "Eastern Travis airport, entertainment, and industrial growth submarket",
    coordinates: [30.1669, -97.5986],
    radiusMeters: 15000,
    primaryIndustries: ["Airport logistics", "EV manufacturing", "Motorsports and tourism", "Industrial logistics", "Residential construction", "Hospitality"],
    profile: "industrial",
    summary:
      "Del Valle is one of Central Texas' most concentrated public-growth markets, sitting between COTA/COTALAND, Austin-Bergstrom International Airport, Tesla Giga Texas, SH 71, and SH 130. The strongest lender signals are construction, hospitality, airport logistics, industrial suppliers, and eastern Travis County residential-service growth.",
    anchors: [
      {
        title: "COTA and COTALAND year-round entertainment expansion",
        summary: "COTALAND is under construction next to Circuit of The Americas and is planned as a family theme park opening in summer 2026.",
        description:
          "The official COTALAND site describes a theme park located next to Circuit of The Americas, with construction underway, summer 2026 opening plans, and access through Route 71, SH 130, and Elroy Road.",
        bankingRelevance:
          "A year-round entertainment draw can create construction, hospitality, restaurant, vendor, payroll, deposits, and treasury opportunities beyond race-week traffic.",
        metric: "Commercial Development",
        sourceKey: "cotaland"
      },
      {
        title: "Planned COTA hotel and convention center",
        summary: "Public reporting describes a planned 1,000-room hotel and convention center next to COTA on a city-owned 21-acre site.",
        description:
          "Reputable local reporting says Austin moved forward with land ownership and a development structure for a COTA-adjacent hotel and convention center, while noting reviews and environmental studies were still required before the project could proceed.",
        bankingRelevance:
          "A large hotel and convention project would rank among Del Valle's highest-impact lending signals because it can drive construction draws, hospitality vendors, food service, equipment, working capital, and deposit relationships.",
        metric: "Commercial Development",
        sourceKey: "cotaHotel"
      },
      {
        title: "Tesla Giga Texas manufacturing anchor",
        summary: "Tesla identifies Giga Texas as a 2,500-acre U.S. manufacturing hub with over 10 million square feet of factory floor.",
        description:
          "Tesla's public Giga Texas page identifies the Austin facility as a major manufacturing hub for Model Y and Cybertruck, reinforcing Del Valle's supplier, workforce, logistics, and contractor ecosystem.",
        bankingRelevance:
          "Large manufacturing anchors can create high-impact prospects among suppliers, industrial service firms, logistics operators, equipment vendors, contractors, and owner-occupied industrial users.",
        metric: "Industrial Growth",
        sourceKey: "tesla"
      },
      {
        title: "Austin-Bergstrom airport expansion program",
        summary: "Journey With AUS is a multi-year airport expansion program with terminal, gate, concourse, parking, and airfield work.",
        description:
          "Austin-Bergstrom's public expansion program includes near-term terminal projects, West Gate expansion, Concourse M, long-term Concourse B and tunnel planning, parking, and airfield work funded through airport development sources.",
        bankingRelevance:
          "Airport expansion can create sustained demand for contractors, equipment, concession operators, logistics firms, hotel operators, shuttle fleets, and treasury services.",
        metric: "Infrastructure Projects",
        sourceKey: "ausJourney"
      },
      {
        title: "SH 71 East Corridor mobility investment",
        summary: "TxDOT identifies SH 71 as the corridor serving AUS, Bastrop, and eastern Travis growth, with active and planned overpass/frontage-road work.",
        description:
          "TxDOT's SH 71 East Corridor page notes continued growth in eastern Travis and Bastrop counties, completed Ross/Kellam overpasses, and the $58.5 million Tucker Hill Lane project anticipated for completion in fall 2028.",
        bankingRelevance:
          "Highway access improvements can increase construction demand now and make future commercial, industrial, hospitality, and residential-support sites more bankable.",
        metric: "Infrastructure Projects",
        sourceKey: "sh71East"
      },
      {
        title: "SH 71, SH 130, airport, and COTA access node",
        summary: "Del Valle sits at a rare intersection of airport, toll-road, highway, entertainment, and industrial demand drivers.",
        description:
          "COTALAND points visitors toward Route 71, SH 130, and Elroy Road, while TxDOT describes SH 71 as a major route for Austin-Bergstrom, Bastrop, and eastern Travis County growth.",
        bankingRelevance:
          "The access node supports freight, shuttle, fuel, fleet, lodging, food service, quick-service retail, contractor yard, and light-industrial prospecting.",
        metric: "Public Financing Signals",
        sourceKey: "sh71East"
      },
      {
        title: "Industrial and logistics development around airport/Tesla/COTA",
        summary: "TDLR project registrations provide a public way to monitor commercial, industrial, retail, and tenant-improvement activity around Del Valle.",
        description:
          "Because many individual industrial and logistics projects come through local permits or private announcements, the TDLR TABS registry is used as a structured statewide source for confirming active commercial construction records in Travis County and nearby cities.",
        bankingRelevance:
          "Registered projects can identify developers, contractors, industrial tenants, warehouse users, build-out vendors, and owner-occupants that may need construction, equipment, CRE, deposits, and treasury services.",
        metric: "Industrial Growth",
        sourceKey: "tdlr"
      },
      {
        title: "Eastern Travis residential and household growth",
        summary: "Census population estimates and TxDOT corridor planning both point to growth pressure east and southeast of Austin.",
        description:
          "The Census Population Estimates Program provides the population baseline, while TxDOT specifically cites continued growth in eastern Travis and Bastrop counties as a reason for SH 71 corridor improvements.",
        bankingRelevance:
          "Residential growth increases demand for service businesses, medical offices, childcare, restaurants, local retail, contractor working capital, SBA loans, and deposit relationships.",
        metric: "Population Growth",
        sourceKey: "census"
      },
      {
        title: "Tourism, events, and neighborhood service demand",
        summary: "COTA, COTALAND, a potential hotel/convention center, airport growth, and residential rooftops create overlapping visitor and local-service demand.",
        description:
          "The Del Valle opportunity is not just one project; it is the combination of destination entertainment, airport expansion, major manufacturing, highway access, and household growth in a historically underbuilt service area.",
        bankingRelevance:
          "This mix supports practical prospecting with hotel vendors, restaurants, maintenance companies, contractors, shuttle operators, medical users, convenience retailers, and small business owners.",
        metric: "Retail Growth",
        sourceKey: "cotaland"
      }
    ],
    projects: [
      {
        id: "del-valle-cotaland",
        name: "COTALAND theme park at Circuit of The Americas",
        location: "Circuit of The Americas, Del Valle area",
        category: "Entertainment and hospitality",
        status: "Construction underway; planned summer 2026 opening",
        estimatedInvestment: "Not publicly stated on official source",
        expectedCompletion: "Summer 2026 planned opening",
        developer: "Circuit of The Americas / COTALAND",
        lenderRelevance:
          "Highest-impact hospitality and service-business signal because it turns COTA activity into a more recurring family entertainment destination.",
        financingOpportunities: ["Construction lending", "Investor CRE", "Working capital lines", "SBA lending", "Treasury management"],
        borrowerTypes: ["Restaurant operators", "Event vendors", "Hospitality suppliers", "Maintenance contractors", "Shuttle and parking operators"],
        ...withSource("cotaland")
      },
      {
        id: "del-valle-cota-hotel-convention",
        name: "Planned COTA hotel and convention center",
        location: "COTA-adjacent 21-acre site, Del Valle area",
        category: "Hotel and convention development",
        status: "Reported/planned; subject to reviews and environmental studies",
        estimatedInvestment: "Not publicly finalized in cited reporting",
        expectedCompletion: "Not publicly finalized",
        developer: "RIDA Development structure reported publicly",
        lenderRelevance:
          "A major hotel/convention project would likely create the largest construction, hospitality, vendor, equipment, and treasury opportunity cluster in the immediate market.",
        financingOpportunities: ["Construction lending", "Investor commercial real estate", "Equipment financing", "Working capital lines", "Deposit accounts"],
        borrowerTypes: ["Hospitality operators", "General contractors", "Food and beverage vendors", "Event service firms", "Facility maintenance companies"],
        ...withSource("cotaHotel")
      },
      {
        id: "del-valle-tesla-giga-texas",
        name: "Tesla Giga Texas supplier and logistics ecosystem",
        location: "Eastern Travis County / SH 130 corridor",
        category: "Manufacturing and industrial suppliers",
        status: "Active manufacturing anchor",
        estimatedInvestment: "Facility scale publicly stated as 2,500 acres and 10M+ square feet",
        expectedCompletion: "Ongoing operating and supplier growth",
        developer: "Tesla",
        lenderRelevance:
          "Major manufacturing anchors can drive the deepest commercial borrower universe, including suppliers, contractors, fleet users, and industrial owner-occupants.",
        financingOpportunities: ["Equipment financing", "Owner-occupied CRE", "Working capital lines", "Treasury management"],
        borrowerTypes: ["Manufacturing suppliers", "Logistics firms", "Industrial service providers", "Equipment vendors", "Specialty contractors"],
        ...withSource("tesla")
      },
      {
        id: "del-valle-aus-expansion",
        name: "Journey With AUS airport expansion",
        location: "Austin-Bergstrom International Airport",
        category: "Airport infrastructure and concessions",
        status: "Active multi-year expansion and design program",
        estimatedInvestment: "$165M West Gate Expansion; $1.031B authorized for Concourse B pre-construction/construction services",
        expectedCompletion: "2026 through early 2030s by project phase",
        developer: "Austin-Bergstrom International Airport",
        lenderRelevance:
          "Airport capital work can support multi-year lending and treasury conversations with contractors, concessionaires, ground transportation, and hospitality operators.",
        financingOpportunities: ["Equipment financing", "Working capital lines", "Treasury management", "Owner-occupied CRE"],
        borrowerTypes: ["Airport contractors", "Concession operators", "Shuttle fleets", "Logistics providers", "Hospitality businesses"],
        ...withSource("ausJourney")
      },
      {
        id: "del-valle-sh71-east",
        name: "SH 71 East Corridor improvements",
        location: "SH 71 east of SH 130 toward eastern Travis and Bastrop counties",
        category: "Highway and access infrastructure",
        status: "Complete, active, and planned corridor projects",
        estimatedInvestment: "$58.5M Tucker Hill Lane project; additional projects vary",
        expectedCompletion: "Tucker Hill Lane anticipated fall 2028; later projects vary",
        developer: "TxDOT",
        lenderRelevance:
          "Transportation improvements strengthen land access and create near-term contractor demand plus longer-term commercial site opportunities.",
        financingOpportunities: ["Equipment financing", "Working capital lines", "Construction lending", "Treasury management"],
        borrowerTypes: ["Road contractors", "Material suppliers", "Fleet operators", "Fuel and service businesses", "Commercial site developers"],
        ...withSource("sh71East")
      },
      {
        id: "del-valle-industrial-logistics",
        name: "Airport/Tesla/COTA industrial and logistics pipeline",
        location: "Del Valle, airport area, SH 71, and SH 130 corridors",
        category: "Industrial, warehouse, and tenant improvements",
        status: "Public-source monitoring through TDLR and local permits",
        estimatedInvestment: "Varies by registered project",
        expectedCompletion: "Varies by project",
        developer: "Multiple owners and design teams",
        lenderRelevance:
          "This pipeline is the best recurring prospecting source for warehouse users, contractors, tenant build-outs, owner-occupied facilities, and distribution operators.",
        financingOpportunities: ["Owner-occupied CRE", "Investor commercial real estate", "Equipment financing", "Working capital lines"],
        borrowerTypes: ["Warehouse users", "Distribution operators", "Commercial tenants", "General contractors", "Industrial owner-occupants"],
        ...withSource("tdlr")
      },
      {
        id: "del-valle-eastern-travis-growth",
        name: "Eastern Travis residential and local-service growth",
        location: "Eastern Travis County and southeast Austin growth corridor",
        category: "Residential-support retail and services",
        status: "Population and corridor-growth monitoring",
        estimatedInvestment: "Not applicable; market-growth signal",
        expectedCompletion: "Ongoing",
        developer: "Multiple builders, businesses, and public agencies",
        lenderRelevance:
          "Household growth creates the broadest small-business opportunity set after major anchors, including childcare, medical, restaurants, trades, and local services.",
        financingOpportunities: ["SBA lending", "Owner-occupied CRE", "Working capital lines", "Deposit accounts"],
        borrowerTypes: ["Local service businesses", "Restaurants", "Medical office users", "Childcare operators", "Residential contractors"],
        ...withSource("census")
      }
    ]
  },
  { id: "kyle", name: "Kyle", county: "Hays County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "I-35 Austin-San Antonio growth corridor", coordinates: [29.9891, -97.8772], radiusMeters: 14000, primaryIndustries: ["Residential development", "Retail", "Healthcare", "Construction"], profile: "suburban" },
  { id: "buda", name: "Buda", county: "Hays County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "I-35 Austin-San Antonio growth corridor", coordinates: [30.0852, -97.8403], radiusMeters: 13000, primaryIndustries: ["Retail", "Logistics", "Residential development", "Construction"], profile: "suburban" },
  { id: "dripping-springs", name: "Dripping Springs", county: "Hays County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Hill Country growth submarket", coordinates: [30.1902, -98.0867], radiusMeters: 14000, primaryIndustries: ["Residential development", "Tourism", "Local services", "Construction"], profile: "exurban" },
  { id: "lakeway", name: "Lakeway", county: "Travis County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "West Austin lake-area submarket", coordinates: [30.3638, -97.9796], radiusMeters: 11000, primaryIndustries: ["Healthcare", "Retail", "Professional services", "Residential development"], profile: "suburban" },
  { id: "bee-cave", name: "Bee Cave", county: "Travis County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "West Austin retail and household-growth submarket", coordinates: [30.3085, -97.945], radiusMeters: 9000, primaryIndustries: ["Retail", "Healthcare", "Hospitality", "Professional services"], profile: "suburban" },
  { id: "bastrop", name: "Bastrop", county: "Bastrop County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Austin eastern regional growth market", coordinates: [30.1105, -97.3153], radiusMeters: 16000, primaryIndustries: ["Residential development", "Public services", "Retail", "Construction"], profile: "regional" },
  { id: "elgin", name: "Elgin", county: "Bastrop County", metroArea: "Austin-Round Rock-San Marcos", estimatedPopulation: "Austin east exurban market", coordinates: [30.3497, -97.3703], radiusMeters: 13000, primaryIndustries: ["Residential development", "Manufacturing", "Local services"], profile: "exurban" },
  { id: "dallas", name: "Dallas", county: "Dallas County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "8.1M+ DFW metro", coordinates: [32.7767, -96.797], radiusMeters: 37000, primaryIndustries: ["Corporate headquarters", "Finance", "Healthcare", "Logistics", "Construction"], profile: "major", sourceKey: "dallasChamber" },
  { id: "fort-worth", name: "Fort Worth", county: "Tarrant County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "8.1M+ DFW metro", coordinates: [32.7555, -97.3308], radiusMeters: 35000, primaryIndustries: ["Aviation", "Logistics", "Manufacturing", "Healthcare"], profile: "major", sourceKey: "dallasChamber" },
  { id: "frisco", name: "Frisco", county: "Collin and Denton Counties", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North Platinum Corridor submarket", coordinates: [33.1507, -96.8236], radiusMeters: 16000, primaryIndustries: ["Corporate offices", "Sports and entertainment", "Healthcare", "Retail"], profile: "suburban", sourceKey: "friscoEdc" },
  { id: "plano", name: "Plano", county: "Collin County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North Dallas corporate submarket", coordinates: [33.0198, -96.6989], radiusMeters: 15000, primaryIndustries: ["Corporate offices", "Technology", "Healthcare", "Retail"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "mckinney", name: "McKinney", county: "Collin County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "Fast-growth Collin County submarket", coordinates: [33.1972, -96.6398], radiusMeters: 17000, primaryIndustries: ["Residential development", "Healthcare", "Retail", "Professional services"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "allen", name: "Allen", county: "Collin County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North Dallas suburban submarket", coordinates: [33.1032, -96.6706], radiusMeters: 12000, primaryIndustries: ["Retail", "Healthcare", "Professional services", "Residential development"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "prosper", name: "Prosper", county: "Collin and Denton Counties", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "Fast-growth DFW exurb", coordinates: [33.2362, -96.8011], radiusMeters: 12000, primaryIndustries: ["Residential development", "Retail", "Local services", "Construction"], profile: "exurban", sourceKey: "dallasChamber" },
  { id: "celina", name: "Celina", county: "Collin and Denton Counties", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "Fast-growth DFW exurb", coordinates: [33.3246, -96.7844], radiusMeters: 13000, primaryIndustries: ["Residential development", "Construction", "Retail", "Local services"], profile: "exurban", sourceKey: "dallasChamber" },
  { id: "melissa", name: "Melissa", county: "Collin County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North Collin County growth market", coordinates: [33.2859, -96.5728], radiusMeters: 11000, primaryIndustries: ["Residential development", "Retail", "Construction"], profile: "exurban", sourceKey: "dallasChamber" },
  { id: "anna", name: "Anna", county: "Collin County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North Collin County growth market", coordinates: [33.349, -96.5486], radiusMeters: 11000, primaryIndustries: ["Residential development", "Construction", "Local services"], profile: "exurban", sourceKey: "dallasChamber" },
  { id: "forney", name: "Forney", county: "Kaufman County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "East DFW growth submarket", coordinates: [32.7482, -96.4719], radiusMeters: 13000, primaryIndustries: ["Residential development", "Retail", "Logistics"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "rockwall", name: "Rockwall", county: "Rockwall County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "East DFW lake-area submarket", coordinates: [32.9312, -96.4597], radiusMeters: 13000, primaryIndustries: ["Retail", "Healthcare", "Professional services", "Residential development"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "mansfield", name: "Mansfield", county: "Tarrant, Johnson, and Ellis Counties", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "South DFW growth submarket", coordinates: [32.5632, -97.1417], radiusMeters: 14000, primaryIndustries: ["Residential development", "Healthcare", "Retail", "Construction"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "midlothian", name: "Midlothian", county: "Ellis County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "South DFW industrial growth market", coordinates: [32.4824, -96.9944], radiusMeters: 15000, primaryIndustries: ["Manufacturing", "Industrial", "Logistics", "Construction"], profile: "industrial", sourceKey: "texasBusiness" },
  { id: "denton", name: "Denton", county: "Denton County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North DFW university and growth market", coordinates: [33.2148, -97.1331], radiusMeters: 16000, primaryIndustries: ["Higher education", "Healthcare", "Retail", "Logistics"], profile: "higherEd", sourceKey: "dallasChamber" },
  { id: "lewisville", name: "Lewisville", county: "Denton County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North DFW logistics and retail submarket", coordinates: [33.0462, -96.9942], radiusMeters: 13000, primaryIndustries: ["Logistics", "Retail", "Healthcare", "Professional services"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "flower-mound", name: "Flower Mound", county: "Denton and Tarrant Counties", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "North DFW household-growth submarket", coordinates: [33.0146, -97.0969], radiusMeters: 13000, primaryIndustries: ["Residential development", "Retail", "Healthcare", "Professional services"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "southlake", name: "Southlake", county: "Tarrant County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "Northeast Tarrant retail and office submarket", coordinates: [32.9412, -97.1342], radiusMeters: 10000, primaryIndustries: ["Retail", "Professional services", "Healthcare", "Hospitality"], profile: "suburban", sourceKey: "dallasChamber" },
  { id: "grapevine", name: "Grapevine", county: "Tarrant County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "DFW airport and hospitality submarket", coordinates: [32.9343, -97.0781], radiusMeters: 12000, primaryIndustries: ["Airport logistics", "Hospitality", "Retail", "Distribution"], profile: "industrial", sourceKey: "dfwAirport" },
  { id: "irving", name: "Irving", county: "Dallas County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "DFW office, airport, and logistics submarket", coordinates: [32.814, -96.9489], radiusMeters: 16000, primaryIndustries: ["Corporate offices", "Airport logistics", "Healthcare", "Hospitality"], profile: "major", sourceKey: "dfwAirport" },
  { id: "arlington", name: "Arlington", county: "Tarrant County", metroArea: "Dallas-Fort Worth-Arlington", estimatedPopulation: "Mid-Cities entertainment and industrial submarket", coordinates: [32.7357, -97.1081], radiusMeters: 16000, primaryIndustries: ["Entertainment", "Higher education", "Manufacturing", "Healthcare"], profile: "major", sourceKey: "dallasChamber" },
  { id: "houston", name: "Houston", county: "Harris County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "7.5M+ metro", coordinates: [29.7604, -95.3698], radiusMeters: 38000, primaryIndustries: ["Energy", "Port logistics", "Healthcare", "Petrochemicals", "Construction"], profile: "major", sourceKey: "ghp", anchors: [{ title: "Houston Ship Channel Project 11", summary: "Port Houston's channel expansion strengthens freight, petrochemical, and logistics capacity.", description: "Project 11 is a public port infrastructure program tied to channel improvements and supply-chain capacity.", bankingRelevance: "Port projects can generate equipment, working capital, treasury, and industrial real estate demand.", metric: "Infrastructure Projects", sourceKey: "portHouston" }, { title: "Texas Medical Center Helix Park", summary: "Life science and medical office activity continues around the Texas Medical Center.", description: "Helix Park is a major life science and medical innovation district in Houston.", bankingRelevance: "Medical and life science clusters can support equipment, owner-occupied CRE, deposits, and working capital.", metric: "Healthcare Growth", sourceKey: "tmc" }] },
  { id: "katy", name: "Katy", county: "Harris, Fort Bend, and Waller Counties", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "West Houston growth submarket", coordinates: [29.7858, -95.8245], radiusMeters: 16000, primaryIndustries: ["Residential development", "Retail", "Healthcare", "Logistics"], profile: "suburban", sourceKey: "ghp" },
  { id: "sugar-land", name: "Sugar Land", county: "Fort Bend County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Southwest Houston corporate and household submarket", coordinates: [29.6197, -95.6349], radiusMeters: 15000, primaryIndustries: ["Corporate offices", "Healthcare", "Retail", "Professional services"], profile: "suburban", sourceKey: "ghp" },
  { id: "the-woodlands", name: "The Woodlands", county: "Montgomery County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "North Houston master-planned submarket", coordinates: [30.1658, -95.4613], radiusMeters: 16000, primaryIndustries: ["Healthcare", "Corporate offices", "Retail", "Professional services"], profile: "suburban", sourceKey: "ghp" },
  { id: "conroe", name: "Conroe", county: "Montgomery County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "North Houston growth market", coordinates: [30.3119, -95.4561], radiusMeters: 17000, primaryIndustries: ["Residential development", "Industrial", "Retail", "Construction"], profile: "exurban", sourceKey: "ghp" },
  { id: "pearland", name: "Pearland", county: "Brazoria County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "South Houston growth submarket", coordinates: [29.5636, -95.286], radiusMeters: 15000, primaryIndustries: ["Healthcare", "Retail", "Residential development", "Professional services"], profile: "suburban", sourceKey: "ghp" },
  { id: "league-city", name: "League City", county: "Galveston County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Bay Area Houston growth submarket", coordinates: [29.5075, -95.0949], radiusMeters: 15000, primaryIndustries: ["Healthcare", "Aerospace support", "Retail", "Residential development"], profile: "suburban", sourceKey: "ghp" },
  { id: "baytown", name: "Baytown", county: "Harris and Chambers Counties", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Houston Ship Channel industrial submarket", coordinates: [29.7355, -94.9774], radiusMeters: 16000, primaryIndustries: ["Petrochemicals", "Port logistics", "Industrial services", "Construction"], profile: "portEnergy", sourceKey: "portHouston" },
  { id: "cypress", name: "Cypress", county: "Harris County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Northwest Houston growth submarket", coordinates: [29.9691, -95.6972], radiusMeters: 16000, primaryIndustries: ["Residential development", "Retail", "Healthcare", "Local services"], profile: "suburban", sourceKey: "ghp" },
  { id: "spring", name: "Spring", county: "Harris County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "North Houston growth submarket", coordinates: [30.0799, -95.4172], radiusMeters: 14000, primaryIndustries: ["Retail", "Healthcare", "Professional services", "Residential development"], profile: "suburban", sourceKey: "ghp" },
  { id: "tomball", name: "Tomball", county: "Harris County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Northwest Houston exurban market", coordinates: [30.0972, -95.6161], radiusMeters: 14000, primaryIndustries: ["Residential development", "Retail", "Healthcare", "Construction"], profile: "exurban", sourceKey: "ghp" },
  { id: "missouri-city", name: "Missouri City", county: "Fort Bend and Harris Counties", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Southwest Houston household-growth submarket", coordinates: [29.6186, -95.5377], radiusMeters: 13000, primaryIndustries: ["Residential development", "Retail", "Healthcare", "Professional services"], profile: "suburban", sourceKey: "ghp" },
  { id: "richmond", name: "Richmond", county: "Fort Bend County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "Fort Bend growth market", coordinates: [29.5822, -95.7608], radiusMeters: 14000, primaryIndustries: ["Residential development", "Retail", "Construction", "Local services"], profile: "exurban", sourceKey: "ghp" },
  { id: "fulshear", name: "Fulshear", county: "Fort Bend County", metroArea: "Houston-The Woodlands-Sugar Land", estimatedPopulation: "West Fort Bend growth market", coordinates: [29.6899, -95.8997], radiusMeters: 13000, primaryIndustries: ["Residential development", "Retail", "Construction", "Local services"], profile: "exurban", sourceKey: "ghp" },
  { id: "san-antonio", name: "San Antonio", county: "Bexar County", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "2.7M+ metro", coordinates: [29.4241, -98.4936], radiusMeters: 34000, primaryIndustries: ["Healthcare", "Military", "Cybersecurity", "Manufacturing", "Tourism"], profile: "major", sourceKey: "texasBusiness", anchors: [{ title: "Manufacturing expansion announcements", summary: "State public announcements identify advanced manufacturing growth in the San Antonio market.", description: "Manufacturing announcements are used as evidence of supplier and contractor demand in the broader San Antonio economy.", bankingRelevance: "Manufacturing anchors can create equipment, supplier, owner-occupied CRE, and working capital opportunities.", metric: "Industrial Growth", sourceKey: "governor" }] },
  { id: "new-braunfels", name: "New Braunfels", county: "Comal and Guadalupe Counties", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "I-35 Austin-San Antonio growth corridor", coordinates: [29.703, -98.1245], radiusMeters: 16000, primaryIndustries: ["Residential development", "Tourism", "Healthcare", "Retail"], profile: "suburban", sourceKey: "texasBusiness" },
  { id: "boerne", name: "Boerne", county: "Kendall County", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "Hill Country San Antonio growth market", coordinates: [29.7947, -98.732], radiusMeters: 13000, primaryIndustries: ["Residential development", "Tourism", "Professional services", "Healthcare"], profile: "exurban", sourceKey: "texasBusiness" },
  { id: "seguin", name: "Seguin", county: "Guadalupe County", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "San Antonio east industrial corridor", coordinates: [29.5688, -97.9647], radiusMeters: 14000, primaryIndustries: ["Manufacturing", "Logistics", "Construction", "Retail"], profile: "industrial", sourceKey: "texasBusiness" },
  { id: "schertz", name: "Schertz", county: "Guadalupe, Bexar, and Comal Counties", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "Northeast San Antonio logistics submarket", coordinates: [29.5522, -98.2697], radiusMeters: 13000, primaryIndustries: ["Logistics", "Retail", "Healthcare", "Residential development"], profile: "industrial", sourceKey: "txdot" },
  { id: "cibolo", name: "Cibolo", county: "Guadalupe County", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "Northeast San Antonio growth submarket", coordinates: [29.5616, -98.2269], radiusMeters: 10000, primaryIndustries: ["Residential development", "Retail", "Local services"], profile: "suburban", sourceKey: "texasBusiness" },
  { id: "converse", name: "Converse", county: "Bexar County", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "Northeast San Antonio household-growth submarket", coordinates: [29.518, -98.3161], radiusMeters: 10000, primaryIndustries: ["Residential development", "Retail", "Local services"], profile: "suburban", sourceKey: "texasBusiness" },
  { id: "selma", name: "Selma", county: "Bexar, Comal, and Guadalupe Counties", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "I-35 northeast San Antonio commercial node", coordinates: [29.5844, -98.3058], radiusMeters: 9000, primaryIndustries: ["Retail", "Logistics", "Hospitality", "Local services"], profile: "suburban", sourceKey: "txdot" },
  { id: "live-oak", name: "Live Oak", county: "Bexar County", metroArea: "San Antonio-New Braunfels", estimatedPopulation: "Northeast San Antonio infill market", coordinates: [29.5652, -98.3364], radiusMeters: 9000, primaryIndustries: ["Retail", "Healthcare", "Local services", "Hospitality"], profile: "suburban", sourceKey: "texasBusiness" },
  { id: "college-station", name: "College Station", county: "Brazos County", metroArea: "College Station-Bryan", estimatedPopulation: "Brazos Valley university market", coordinates: [30.6279, -96.3344], radiusMeters: 15000, primaryIndustries: ["Higher education", "Healthcare", "Research", "Retail"], profile: "higherEd", sourceKey: "texasBusiness" },
  { id: "bryan", name: "Bryan", county: "Brazos County", metroArea: "College Station-Bryan", estimatedPopulation: "Brazos Valley regional market", coordinates: [30.6744, -96.37], radiusMeters: 14000, primaryIndustries: ["Healthcare", "Manufacturing", "Higher education", "Retail"], profile: "higherEd", sourceKey: "texasBusiness" },
  { id: "temple", name: "Temple", county: "Bell County", metroArea: "Killeen-Temple", estimatedPopulation: "Central Texas healthcare and logistics market", coordinates: [31.0982, -97.3428], radiusMeters: 15000, primaryIndustries: ["Healthcare", "Logistics", "Manufacturing", "Retail"], profile: "regional", sourceKey: "tdlr" },
  { id: "waco", name: "Waco", county: "McLennan County", metroArea: "Waco", estimatedPopulation: "Central Texas regional market", coordinates: [31.5493, -97.1467], radiusMeters: 16000, primaryIndustries: ["Higher education", "Healthcare", "Manufacturing", "Tourism"], profile: "regional", sourceKey: "tdlr" },
  { id: "tyler", name: "Tyler", county: "Smith County", metroArea: "Tyler", estimatedPopulation: "East Texas regional market", coordinates: [32.3513, -95.3011], radiusMeters: 15000, primaryIndustries: ["Healthcare", "Retail", "Manufacturing", "Education"], profile: "regional", sourceKey: "texasBusiness" },
  { id: "longview", name: "Longview", county: "Gregg County", metroArea: "Longview", estimatedPopulation: "East Texas industrial market", coordinates: [32.5007, -94.7405], radiusMeters: 15000, primaryIndustries: ["Manufacturing", "Energy services", "Logistics", "Healthcare"], profile: "industrial", sourceKey: "texasBusiness" },
  { id: "midland", name: "Midland", county: "Midland County", metroArea: "Midland", estimatedPopulation: "Permian Basin energy market", coordinates: [31.9973, -102.0779], radiusMeters: 18000, primaryIndustries: ["Oil and gas", "Industrial services", "Equipment", "Logistics"], profile: "energy", sourceKey: "eia" },
  { id: "odessa", name: "Odessa", county: "Ector County", metroArea: "Odessa", estimatedPopulation: "Permian Basin industrial service market", coordinates: [31.8457, -102.3676], radiusMeters: 18000, primaryIndustries: ["Oil and gas", "Industrial services", "Fabrication", "Logistics"], profile: "energy", sourceKey: "eia" },
  { id: "lubbock", name: "Lubbock", county: "Lubbock County", metroArea: "Lubbock", estimatedPopulation: "South Plains regional market", coordinates: [33.5779, -101.8552], radiusMeters: 17000, primaryIndustries: ["Higher education", "Healthcare", "Agribusiness", "Retail"], profile: "higherEd", sourceKey: "tdlr" },
  { id: "corpus-christi", name: "Corpus Christi", county: "Nueces County", metroArea: "Corpus Christi", estimatedPopulation: "Gulf Coast port and energy market", coordinates: [27.8006, -97.3964], radiusMeters: 19000, primaryIndustries: ["Port logistics", "Energy", "Petrochemicals", "Tourism"], profile: "portEnergy", sourceKey: "portCorpus", anchors: [{ title: "Ship channel improvement and port activity", summary: "Port of Corpus Christi public sources identify channel and port infrastructure activity.", description: "Channel and port improvements support freight, energy exports, marine services, and industrial activity.", bankingRelevance: "Port activity can support equipment financing, working capital, treasury, and industrial real estate prospects.", metric: "Infrastructure Projects", sourceKey: "portCorpus" }] },
  { id: "el-paso", name: "El Paso", county: "El Paso County", metroArea: "El Paso", estimatedPopulation: "West Texas border trade metro", coordinates: [31.7619, -106.485], radiusMeters: 22000, primaryIndustries: ["Border trade", "Logistics", "Military", "Healthcare"], profile: "border", sourceKey: "borderTrade" },
  { id: "brownsville", name: "Brownsville", county: "Cameron County", metroArea: "Brownsville-Harlingen", estimatedPopulation: "Lower Rio Grande Valley border and port market", coordinates: [25.9017, -97.4975], radiusMeters: 17000, primaryIndustries: ["Border trade", "Port logistics", "Aerospace support", "Healthcare"], profile: "border", sourceKey: "borderTrade" },
  { id: "mcallen", name: "McAllen", county: "Hidalgo County", metroArea: "McAllen-Edinburg-Mission", estimatedPopulation: "Rio Grande Valley trade and healthcare market", coordinates: [26.2034, -98.2300], radiusMeters: 18000, primaryIndustries: ["Border trade", "Healthcare", "Retail", "Logistics"], profile: "border", sourceKey: "borderTrade" },
  { id: "harlingen", name: "Harlingen", county: "Cameron County", metroArea: "Brownsville-Harlingen", estimatedPopulation: "Lower Rio Grande Valley logistics and healthcare market", coordinates: [26.1906, -97.6961], radiusMeters: 15000, primaryIndustries: ["Healthcare", "Logistics", "Retail", "Border trade"], profile: "border", sourceKey: "borderTrade" },
  { id: "laredo", name: "Laredo", county: "Webb County", metroArea: "Laredo", estimatedPopulation: "Major border trade and logistics market", coordinates: [27.5036, -99.5076], radiusMeters: 19000, primaryIndustries: ["Border trade", "Trucking", "Warehousing", "Customs services"], profile: "border", sourceKey: "borderTrade" },
  { id: "amarillo", name: "Amarillo", county: "Potter and Randall Counties", metroArea: "Amarillo", estimatedPopulation: "Panhandle regional market", coordinates: [35.2219, -101.8313], radiusMeters: 17000, primaryIndustries: ["Agribusiness", "Healthcare", "Logistics", "Manufacturing"], profile: "regional", sourceKey: "texasBusiness" },
  { id: "beaumont", name: "Beaumont", county: "Jefferson County", metroArea: "Beaumont-Port Arthur", estimatedPopulation: "Southeast Texas industrial and port market", coordinates: [30.0802, -94.1266], radiusMeters: 17000, primaryIndustries: ["Petrochemicals", "Port logistics", "Healthcare", "Industrial services"], profile: "portEnergy", sourceKey: "portBeaumont" },
  { id: "port-arthur", name: "Port Arthur", county: "Jefferson County", metroArea: "Beaumont-Port Arthur", estimatedPopulation: "Southeast Texas port and refining market", coordinates: [29.8849, -93.9399], radiusMeters: 15000, primaryIndustries: ["Refining", "Port logistics", "Industrial services", "Energy"], profile: "portEnergy", sourceKey: "portBeaumont" },
  { id: "sherman-denison", name: "Sherman-Denison", county: "Grayson County", metroArea: "Sherman-Denison", estimatedPopulation: "North Texas semiconductor and manufacturing market", coordinates: [33.6357, -96.6089], radiusMeters: 17000, primaryIndustries: ["Semiconductors", "Manufacturing", "Logistics", "Construction"], profile: "industrial", sourceKey: "ti", anchors: [{ title: "Texas Instruments semiconductor manufacturing presence", summary: "Texas Instruments public sources are used to monitor Sherman-area semiconductor activity.", description: "Large semiconductor anchors can reshape supplier, contractor, and workforce-service demand in smaller metros.", bankingRelevance: "Supplier facilities, contractors, equipment vendors, logistics operators, and owner-occupied industrial users may need financing.", metric: "Industrial Growth", sourceKey: "ti" }] }
];

export const markets: Market[] = seeds.map(makeMarket);
