"use client";

import { useState, useCallback } from "react";
import { MIN_BET, MAX_BET } from "../../constants/trading.constants";
import type { Asset, OrderDirection } from "../../types/trading.types";

interface OrderPanelProps {
  asset?: Asset;
  onPlaceOrder: (direction: OrderDirection, amount: number, expiryTime: number) => Promise<void>;
  loading?: boolean;
  price?: number;
}

export default function OrderPanel({
  asset,
  onPlaceOrder,
  loading = false,
  price,
}: OrderPanelProps) {
  const [direction, setDirection] = useState<OrderDirection>("call");
  const [amount, setAmount] = useState<string>((MIN_BET * 10).toString());
  const [expiryTime, setExpiryTime] = useState<number>(60);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAmountChange = useCallback((value: string) => {
    const num = parseFloat(value) || 0;
    if (num < MIN_BET) {
      setAmount(MIN_BET.toString());
    } else if (num > MAX_BET) {
      setAmount(MAX_BET.toString());
    } else {
      setAmount(value);
    }
  }, []);

  const calculateProfit = useCallback(() => {
    if (!asset) return 0;
    const betAmount = parseFloat(amount) || 0;
    return betAmount * asset.profitRate;
  }, [amount, asset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!asset) {
      setError("Please select an asset");
      return;
    }

    const betAmount = parseFloat(amount);
    if (isNaN(betAmount) || betAmount < MIN_BET || betAmount > MAX_BET) {
      setError(`Bet amount must be between ${MIN_BET} and ${MAX_BET}`);
      return;
    }

    try {
      await onPlaceOrder(direction, betAmount, expiryTime);
      setSuccess("Order placed successfully!");
      setAmount((MIN_BET * 10).toString());
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to place order");
    }
  };

  const profit = calculateProfit();

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-black/10 dark:border-white/10 p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold">Place Order</h2>

      {!asset && (
        <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded">
          Please select an asset to continue
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded">
          {success}
        </div>
      )}

      <div className="space-y-3">
        <label className="block text-sm font-medium">Direction</label>
        <div className="grid grid-cols-2 gap-3">
          {(["call", "put"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => setDirection(dir)}
              className={`py-3 rounded-lg font-semibold transition-colors uppercase text-sm tracking-wide ${
                direction === dir
                  ? dir === "call"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {dir === "call" ? "📈 Call" : "📉 Put"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">Bet Amount</label>
          <span className="text-xs opacity-70">
            {MIN_BET} - {MAX_BET}
          </span>
        </div>
        <input
          type="number"
          step="1"
          min={MIN_BET}
          max={MAX_BET}
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          disabled={loading || !asset}
          className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent disabled:opacity-50"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Expiry Time</label>
        <select
          value={expiryTime}
          onChange={(e) => setExpiryTime(parseInt(e.target.value))}
          disabled={loading || !asset}
          className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent disabled:opacity-50"
        >
          <option value={60}>1 Minute</option>
          <option value={120}>2 Minutes</option>
          <option value={300}>5 Minutes</option>
        </select>
      </div>

      {asset && (
        <div className="space-y-2 p-4 rounded-lg bg-black/5 dark:bg-white/5">
          <div className="flex justify-between text-sm">
            <span className="opacity-70">Current Price</span>
            <span className="font-semibold">
              {price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "-"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="opacity-70">Return Rate</span>
            <span className="font-semibold">{asset.profitRate * 100}%</span>
          </div>
          <div className="border-t border-black/10 dark:border-white/10 pt-2 mt-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Potential Profit</span>
              <span className="font-semibold text-green-600">
                +
                {profit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !asset}
        className="w-full rounded-full h-12 bg-foreground text-background font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
