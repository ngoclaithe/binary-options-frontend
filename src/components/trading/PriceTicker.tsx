"use client";

import type { PriceData } from "../../types/price.types";

interface PriceTickerProps {
  price: PriceData;
  animated?: boolean;
}

export default function PriceTicker({ price, animated = true }: PriceTickerProps) {
  const changePercent =
    ((price.summary.close - price.summary.open) / price.summary.open) * 100;
  const isUp = changePercent >= 0;

  return (
    <div className={`${animated ? "animate-pulse" : ""}`}>
      <div className="flex justify-between items-baseline">
        <div>
          <p className="text-xs opacity-70 mb-1">{price.symbol}</p>
          <p className="text-2xl font-bold tabular-nums">
            {price.summary.close.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className={`text-right ${isUp ? "text-green-600" : "text-red-600"}`}>
          <p className="text-sm font-semibold">
            {isUp ? "+" : ""}
            {changePercent.toFixed(2)}%
          </p>
          <p className="text-xs opacity-70">
            {new Date(price.minuteTime).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
