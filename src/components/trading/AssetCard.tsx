"use client";

import Link from "next/link";
import type { Asset } from "../../types/trading.types";
import type { PriceData } from "../../types/price.types";

interface AssetCardProps {
  asset: Asset;
  price?: PriceData;
}

export default function AssetCard({ asset, price }: AssetCardProps) {
  const changePercent = price
    ? ((price.summary.close - price.summary.open) / price.summary.open) * 100
    : 0;
  const isUp = changePercent >= 0;

  return (
    <Link href={`/trading?symbol=${asset.symbol}`}>
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold">{asset.symbol}</h3>
            <p className="text-xs opacity-60">{asset.name}</p>
          </div>
          {!asset.isActive && (
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-2 py-1 rounded">
              Inactive
            </span>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {price && (
            <>
              <div>
                <p className="text-xs opacity-70 mb-1">Current Price</p>
                <p className="text-lg font-semibold tabular-nums">
                  {price.summary.close.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="opacity-70">High</p>
                  <p className="font-mono">
                    {price.summary.high.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="opacity-70">Low</p>
                  <p className="font-mono">
                    {price.summary.low.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="text-xs opacity-70 mb-1">Return</p>
            <p className="font-semibold">{asset.profitRate * 100}%</p>
          </div>
          {price && (
            <div className={`text-right ${isUp ? "text-green-600" : "text-red-600"}`}>
              <p className="text-xs opacity-70 mb-1">Change</p>
              <p className="font-semibold">{changePercent.toFixed(2)}%</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
