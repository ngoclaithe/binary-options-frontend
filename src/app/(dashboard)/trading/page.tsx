"use client";

import { useMemo, useState } from "react";
import PriceTicker from "../../../components/trading/PriceTicker";

const DEFAULT_SYMBOLS = [
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "XAUUSD",
  "BTCUSD",
  "ETHUSD",
];

export default function TradingPage() {
  const [active, setActive] = useState<string[]>(DEFAULT_SYMBOLS);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (!filter) return DEFAULT_SYMBOLS;
    return DEFAULT_SYMBOLS.filter((s) => s.toLowerCase().includes(filter.toLowerCase()));
  }, [filter]);

  const toggle = (s: string) => {
    setActive((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Trading</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search symbols..."
          className="w-full sm:w-64 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 bg-transparent"
        />
        <div className="flex flex-wrap gap-2">
          {filtered.map((s) => {
            const on = active.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggle(s)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  on
                    ? "bg-foreground text-background border-transparent"
                    : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <PriceTicker symbols={active} />
    </div>
  );
}
