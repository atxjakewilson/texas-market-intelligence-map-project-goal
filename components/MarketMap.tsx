"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { Circle, MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { getAssessment, getHeatColor } from "@/lib/assessment";
import type { HeatMetric, Market } from "@/types/market";

const texasBounds: [[number, number], [number, number]] = [
  [25.6, -106.8],
  [36.7, -93.2]
];

type MarketMapProps = {
  markets: Market[];
  selectedMarket: Market | null;
  selectedMetric: HeatMetric;
  onSelectMarket: (market: Market) => void;
};

function selectedIcon(market: Market, selectedMetric: HeatMetric, isSelected: boolean) {
  const color = getHeatColor(market.indicators[selectedMetric]);
  const initials = market.name
    .split(/[\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return L.divIcon({
    className: "",
    html: `<div class="market-marker${isSelected ? " selected" : ""}" style="background:${color}">${initials}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
}

function clusterIcon(count: number) {
  return L.divIcon({
    className: "",
    html: `<div class="market-cluster">${count}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
}

function Recenter({ selectedMarket }: { selectedMarket: Market | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedMarket) {
      return;
    }

    map.flyTo(selectedMarket.coordinates, Math.max(map.getZoom(), 7), {
      animate: true,
      duration: 0.65
    });
  }, [map, selectedMarket]);

  return null;
}

function clusterMarkets(markets: Market[], zoom: number) {
  if (zoom >= 8 || markets.length < 12) {
    return markets.map((market) => ({
      id: market.id,
      center: market.coordinates,
      markets: [market]
    }));
  }

  const cellSize = zoom <= 5 ? 1.55 : zoom <= 6 ? 0.75 : 0.34;
  const buckets = new Map<string, { markets: Market[]; lat: number; lng: number }>();

  markets.forEach((market) => {
    const key = `${Math.round(market.coordinates[0] / cellSize)}:${Math.round(market.coordinates[1] / cellSize)}`;
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.markets.push(market);
      bucket.lat += market.coordinates[0];
      bucket.lng += market.coordinates[1];
      return;
    }

    buckets.set(key, {
      markets: [market],
      lat: market.coordinates[0],
      lng: market.coordinates[1]
    });
  });

  return Array.from(buckets.entries()).map(([key, bucket]) => ({
    id: key,
    center: [bucket.lat / bucket.markets.length, bucket.lng / bucket.markets.length] as [number, number],
    markets: bucket.markets
  }));
}

function MarketLayer({
  markets,
  selectedMarket,
  selectedMetric,
  onSelectMarket
}: MarketMapProps) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => setZoom(map.getZoom())
  });

  const clusters = useMemo(() => clusterMarkets(markets, zoom), [markets, zoom]);

  return (
    <>
      {clusters.map((cluster) => {
        if (cluster.markets.length > 1) {
          return (
            <Marker
              key={`cluster-${cluster.id}-${selectedMetric}`}
              position={cluster.center}
              icon={clusterIcon(cluster.markets.length)}
              eventHandlers={{
                click: () => map.flyTo(cluster.center, Math.min(zoom + 2, 9), { animate: true, duration: 0.55 })
              }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <div className="min-w-[190px]">
                  <div className="font-semibold text-banker-ink">{cluster.markets.length} nearby markets</div>
                  <div className="mt-1 text-xs text-banker-muted">
                    {cluster.markets.slice(0, 5).map((market) => market.name).join(", ")}
                    {cluster.markets.length > 5 ? "..." : ""}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        }

        const market = cluster.markets[0];
        const isSelected = market.id === selectedMarket?.id;
        const heatColor = getHeatColor(market.indicators[selectedMetric]);

        return (
          <Fragment key={`${market.id}-${selectedMetric}`}>
            <Circle
              center={market.coordinates}
              radius={market.radiusMeters}
              eventHandlers={{ click: () => onSelectMarket(market) }}
              pathOptions={{
                color: heatColor,
                fillColor: heatColor,
                fillOpacity: isSelected ? 0.32 : 0.1,
                opacity: isSelected ? 0.86 : 0.32,
                weight: isSelected ? 3 : 1
              }}
            >
              <Tooltip sticky direction="top" offset={[0, -8]}>
                <div className="min-w-[190px]">
                  <div className="font-semibold text-banker-ink">{market.name}</div>
                  <div className="text-xs text-banker-muted">{getAssessment(market.indicators)}</div>
                  <div className="mt-1 text-xs">
                    {selectedMetric}: <strong>{market.indicators[selectedMetric]}</strong>
                  </div>
                </div>
              </Tooltip>
            </Circle>
            <Marker
              position={market.coordinates}
              icon={selectedIcon(market, selectedMetric, isSelected)}
              eventHandlers={{ click: () => onSelectMarket(market) }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

export function MarketMap({ markets, selectedMarket, selectedMetric, onSelectMarket }: MarketMapProps) {
  return (
    <MapContainer
      center={[31.15, -99.3]}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      maxBounds={texasBounds}
      scrollWheelZoom
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarketLayer
        markets={markets}
        selectedMarket={selectedMarket}
        selectedMetric={selectedMetric}
        onSelectMarket={onSelectMarket}
      />

      <Recenter selectedMarket={selectedMarket} />
    </MapContainer>
  );
}
