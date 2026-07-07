"use client";

import { heatMapOptions, type HeatMetric } from "@/types/market";

type HeatSelectorProps = {
  value: HeatMetric;
  onChange: (metric: HeatMetric) => void;
};

export function HeatSelector({ value, onChange }: HeatSelectorProps) {
  return (
    <select
      id="heat-map-selector"
      aria-label="Heat Map By"
      value={value}
      onChange={(event) => onChange(event.target.value as HeatMetric)}
      className="h-10 w-full rounded-md border border-banker-line bg-banker-paper px-3 text-sm font-semibold text-banker-ink outline-none transition focus:border-banker-rust focus:ring-4 focus:ring-banker-rust/10"
    >
      {heatMapOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
