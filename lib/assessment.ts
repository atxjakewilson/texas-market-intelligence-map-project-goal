import type { HeatMetric, IndicatorLevel, MarketIndicators } from "@/types/market";

const levelScores: Record<IndicatorLevel, number> = {
  Strong: 2,
  Moderate: 1,
  Limited: 0
};

export function getAssessment(indicators: MarketIndicators) {
  const levels = Object.values(indicators);
  const strongCount = levels.filter((level) => level === "Strong").length;
  const moderateCount = levels.filter((level) => level === "Moderate").length;
  const score = levels.reduce((sum, level) => sum + levelScores[level], 0);

  if (strongCount >= 6 && score >= 14) {
    return "Excellent Prospecting Market";
  }

  if (strongCount >= 4 || score >= 11) {
    return "High Potential Market";
  }

  if (strongCount >= 2 && moderateCount >= 4) {
    return "Growing Market";
  }

  if (score >= 5) {
    return "Moderate Opportunity";
  }

  return "Limited Activity";
}

export function getMetricScore(level: IndicatorLevel) {
  return level === "Strong" ? 100 : level === "Moderate" ? 62 : 28;
}

export function getMetricTone(level: IndicatorLevel) {
  if (level === "Strong") {
    return "bg-banker-sage";
  }

  if (level === "Moderate") {
    return "bg-banker-amber";
  }

  return "bg-stone-400";
}

export function getHeatColor(level: IndicatorLevel) {
  if (level === "Strong") {
    return "#a4471f";
  }

  if (level === "Moderate") {
    return "#c79b55";
  }

  return "#9a948b";
}

export function getMetricDisplayName(metric: HeatMetric) {
  return metric;
}
