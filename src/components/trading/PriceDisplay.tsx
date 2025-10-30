"use client";

import type { PriceData } from "../../types/price.types";
import PriceTicker from "./PriceTicker";

interface PriceDisplayProps {
  price?: PriceData;
  symbol?: string;
}

export default function PriceDisplay({ price, symbol }: PriceDisplayProps) {
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
      {price ? (
        <PriceTicker price={price} animated={true} />
      ) : (
        <div className="text-center py-8 text-sm opacity-70">
          {symbol
            ? `Waiting for price data for ${symbol}...`
            : "Select an asset to see price"}
        </div>
      )}
    </div>
  );
}
