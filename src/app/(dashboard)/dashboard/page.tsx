"use client";

import { useEffect } from "react";
import { useTrading } from "../../../hooks/useTrading";
import { usePriceFeed } from "../../../hooks/usePriceFeed";
import { DEFAULT_PRICE_SYMBOLS } from "../../../constants/socket.constants";
import AssetCard from "../../../components/trading/AssetCard";

export default function DashboardPage() {
  const { assets, loadAssets, loading: assetsLoading } = useTrading();
  const { connected, list: prices } = usePriceFeed({ defaultSymbols: [...DEFAULT_PRICE_SYMBOLS] });

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm opacity-70 mb-8">
          {connected ? "🟢 Live price feed connected" : "🔴 Price feed disconnected"}
        </p>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Available Assets</h2>
          {assetsLoading ? (
            <div className="text-center py-8 text-sm opacity-70">Loading assets...</div>
          ) : assets.length === 0 ? (
            <div className="text-center py-8 text-sm opacity-70">No assets available</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  price={prices.find((p) => p.symbol === asset.symbol)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-70">Active Assets</span>
                <span className="font-semibold">{assets.filter((a) => a.isActive).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Monitored Symbols</span>
                <span className="font-semibold">{prices.length}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <h3 className="font-semibold mb-4">Connection Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-70">Price Feed</span>
                <span className={connected ? "text-green-600" : "text-red-600"}>
                  {connected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
