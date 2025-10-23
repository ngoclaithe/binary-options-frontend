"use client";

import { useEffect } from "react";
import { usePriceFeed } from "../../hooks/usePriceFeed";

interface PriceTickerProps {
  symbols: string[];
}

export default function PriceTicker({ symbols }: PriceTickerProps) {
  const { connected, list, subscribe, unsubscribe } = usePriceFeed();

  useEffect(() => {
    if (symbols?.length) subscribe(symbols);
    return () => {
      if (symbols?.length) unsubscribe(symbols);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols?.join(",")]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Live Prices</h2>
        <span className={`text-sm ${connected ? "text-emerald-500" : "text-gray-500"}`}>
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-500">Waiting for price data...</div>
        )}
        {list.map((p) => (
          <div key={p.symbol} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-foreground text-background">
            <div className="flex items-center justify-between">
              <div className="font-medium">{p.symbol}</div>
              <div className="text-xs opacity-80">{new Date(p.timestamp).toLocaleTimeString()}</div>
            </div>
            <div className="mt-2 text-2xl font-bold tabular-nums">{p.price.toFixed(5)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
