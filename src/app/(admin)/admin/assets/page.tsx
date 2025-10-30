"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTrading } from "../../../../hooks/useTrading";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function AdminAssetsPage() {
  const { assets, loadAssets, loading } = useTrading();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    profitRate: 0.85,
    minBet: 1,
    maxBet: 10000,
    isActive: true,
  });

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would call an API to create/update asset
    console.log("Submit asset form:", formData);
    setShowForm(false);
    setFormData({
      symbol: "",
      name: "",
      profitRate: 0.85,
      minBet: 1,
      maxBet: 10000,
      isActive: true,
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Assets</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background font-medium hover:opacity-90"
          >
            <Plus size={18} />
            New Asset
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-black/10 dark:border-white/10 p-6 mb-8"
          >
            <h2 className="text-lg font-semibold mb-4">Create New Asset</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Symbol</label>
                <input
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={(e) =>
                    setFormData({ ...formData, symbol: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g., BTCUSDT"
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Bitcoin"
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profit Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  required
                  value={formData.profitRate}
                  onChange={(e) =>
                    setFormData({ ...formData, profitRate: parseFloat(e.target.value) })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Min Bet</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  required
                  value={formData.minBet}
                  onChange={(e) => setFormData({ ...formData, minBet: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Bet</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  required
                  value={formData.maxBet}
                  onChange={(e) => setFormData({ ...formData, maxBet: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-foreground text-background font-medium hover:opacity-90"
              >
                Create Asset
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          {loading ? (
            <div className="text-center py-8 text-sm opacity-70">Loading assets...</div>
          ) : assets.length === 0 ? (
            <div className="text-center py-8 text-sm opacity-70">No assets found</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Symbol</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-right font-semibold">Profit Rate</th>
                  <th className="px-6 py-4 text-right font-semibold">Min/Max Bet</th>
                  <th className="px-6 py-4 text-center font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-black/10 dark:border-white/10 hover:bg-black/2 dark:hover:bg-white/2"
                  >
                    <td className="px-6 py-4 font-semibold">{asset.symbol}</td>
                    <td className="px-6 py-4">{asset.name}</td>
                    <td className="px-6 py-4 text-right">{(asset.profitRate * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4 text-right">
                      ${asset.minBet} - ${asset.maxBet}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {asset.isActive ? (
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-black/10 dark:hover:bg-white/10">
                        <Edit2 size={16} />
                      </button>
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
