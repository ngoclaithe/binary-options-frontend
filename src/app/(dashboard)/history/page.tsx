"use client";

import { useEffect, useMemo } from "react";
import { useTrading } from "../../../hooks/useTrading";

export default function HistoryPage() {
  const { orders, loading, loadOrders } = useTrading();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const stats = useMemo(() => {
    const closedOrders = orders.filter((o) => o.status !== "pending");
    const wonOrders = closedOrders.filter((o) => o.status === "won");
    const lostOrders = closedOrders.filter((o) => o.status === "lost");

    const totalProfit = wonOrders.reduce((sum, o) => sum + (o.profit || 0), 0);
    const totalLoss = lostOrders.reduce((sum, o) => sum + (o.loss || 0), 0);
    const netProfit = totalProfit - totalLoss;
    const winRate = closedOrders.length ? (wonOrders.length / closedOrders.length) * 100 : 0;

    return {
      totalOrders: closedOrders.length,
      wonOrders: wonOrders.length,
      lostOrders: lostOrders.length,
      winRate,
      totalProfit,
      totalLoss,
      netProfit,
    };
  }, [orders]);

  const bySymbol = useMemo(() => {
    const map = new Map<string, typeof stats>();
    orders
      .filter((o) => o.status !== "pending")
      .forEach((o) => {
        if (!map.has(o.symbol)) {
          map.set(o.symbol, {
            totalOrders: 0,
            wonOrders: 0,
            lostOrders: 0,
            winRate: 0,
            totalProfit: 0,
            totalLoss: 0,
            netProfit: 0,
          });
        }
        const stat = map.get(o.symbol)!;
        stat.totalOrders++;
        if (o.status === "won") {
          stat.wonOrders++;
          stat.totalProfit += o.profit || 0;
        } else {
          stat.lostOrders++;
          stat.totalLoss += o.loss || 0;
        }
        stat.netProfit = stat.totalProfit - stat.totalLoss;
        stat.winRate = stat.totalOrders ? (stat.wonOrders / stat.totalOrders) * 100 : 0;
      });
    return Array.from(map.entries());
  }, [orders]);

  const closedOrders = orders.filter((o) => o.status !== "pending");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Trading History</h1>

        {loading ? (
          <div className="text-center py-8 text-sm opacity-70">Loading history...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-black/2 dark:bg-white/2">
                <p className="text-xs opacity-70 mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-green-50 dark:bg-green-900/20">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1">Won Orders</p>
                <p className="text-3xl font-bold text-green-600">{stats.wonOrders}</p>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-red-50 dark:bg-red-900/20">
                <p className="text-xs text-red-700 dark:text-red-400 mb-1">Lost Orders</p>
                <p className="text-3xl font-bold text-red-600">{stats.lostOrders}</p>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">Win Rate</p>
                <p className="text-3xl font-bold text-blue-600">{stats.winRate.toFixed(1)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
                <p className="text-sm opacity-70 mb-2">Total Profit</p>
                <p className="text-2xl font-bold text-green-600">
                  +${stats.totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
                <p className="text-sm opacity-70 mb-2">Total Loss</p>
                <p className="text-2xl font-bold text-red-600">
                  -${stats.totalLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
                <p className="text-sm opacity-70 mb-2">Net P/L</p>
                <p
                  className={`text-2xl font-bold ${
                    stats.netProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stats.netProfit >= 0 ? "+" : ""}${stats.netProfit.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">By Asset</h2>
              <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Symbol</th>
                      <th className="px-4 py-3 text-right font-semibold">Orders</th>
                      <th className="px-4 py-3 text-right font-semibold">Won</th>
                      <th className="px-4 py-3 text-right font-semibold">Lost</th>
                      <th className="px-4 py-3 text-right font-semibold">Win Rate</th>
                      <th className="px-4 py-3 text-right font-semibold">Net P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bySymbol.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center opacity-70">
                          No trades yet
                        </td>
                      </tr>
                    ) : (
                      bySymbol.map(([symbol, stat]) => (
                        <tr
                          key={symbol}
                          className="border-b border-black/10 dark:border-white/10 hover:bg-black/2 dark:hover:bg-white/2"
                        >
                          <td className="px-4 py-3 font-semibold">{symbol}</td>
                          <td className="px-4 py-3 text-right">{stat.totalOrders}</td>
                          <td className="px-4 py-3 text-right text-green-600 font-semibold">
                            {stat.wonOrders}
                          </td>
                          <td className="px-4 py-3 text-right text-red-600 font-semibold">
                            {stat.lostOrders}
                          </td>
                          <td className="px-4 py-3 text-right">{stat.winRate.toFixed(1)}%</td>
                          <td
                            className={`px-4 py-3 text-right font-semibold ${
                              stat.netProfit >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {stat.netProfit >= 0 ? "+" : ""}$
                            {stat.netProfit.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">All Trades</h2>
              <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Symbol</th>
                        <th className="px-4 py-3 text-left font-semibold">Direction</th>
                        <th className="px-4 py-3 text-right font-semibold">Amount</th>
                        <th className="px-4 py-3 text-right font-semibold">Result</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-left font-semibold">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {closedOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center opacity-70">
                            No closed trades
                          </td>
                        </tr>
                      ) : (
                        closedOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-black/10 dark:border-white/10 hover:bg-black/2 dark:hover:bg-white/2"
                          >
                            <td className="px-4 py-3 font-semibold">{order.symbol}</td>
                            <td className="px-4 py-3">
                              <span
                                className={
                                  order.direction === "call"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {order.direction === "call" ? "📈 Call" : "📉 Put"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              ${order.amount.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-semibold ${
                                (order.profit || 0) - (order.loss || 0) >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {(order.profit || 0) - (order.loss || 0) >= 0 ? "+" : ""}$
                              {(
                                (order.profit || 0) -
                                (order.loss || 0)
                              ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                  order.status === "won"
                                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100"
                                    : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100"
                                }`}
                              >
                                {order.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs opacity-70">
                              {order.resultAt
                                ? new Date(order.resultAt).toLocaleString()
                                : "-"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
