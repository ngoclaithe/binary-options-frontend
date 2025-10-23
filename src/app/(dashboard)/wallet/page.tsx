"use client";

import { useEffect, useState } from "react";

interface BalanceResponse {
  balance: number;
  currency: string;
}

export default function WalletPage() {
  const [data, setData] = useState<BalanceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/v1/wallet/balance", { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as BalanceResponse;
        setData(json);
      } catch (e: any) {
        setError(e?.message || "Failed to load balance");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
        {loading && <div className="text-sm opacity-70">Loading...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {data && (
          <div className="flex items-center justify-between">
            <div className="text-sm opacity-70">Available Balance</div>
            <div className="text-3xl font-bold tabular-nums">
              {data.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.currency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
