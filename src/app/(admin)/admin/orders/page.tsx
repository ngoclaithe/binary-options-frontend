"use client";

import { useEffect } from "react";
import { useTrading } from "../../../../hooks/useTrading";

export default function AdminOrdersPage() {
  const { orders, loadOrders, loading } = useTrading();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          {loading ? (
            <div className="text-center py-8 text-sm opacity-70">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-sm opacity-70">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Symbol</th>
                    <th className="px-6 py-4 text-center font-semibold">Direction</th>
                    <th className="px-6 py-4 text-right font-semibold">Amount</th>
                    <th className="px-6 py-4 text-right font-semibold">Entry Price</th>
                    <th className="px-6 py-4 text-center font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Result</th>
                    <th className="px-6 py-4 text-left font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-black/10 dark:border-white/10 hover:bg-black/2 dark:hover:bg-white/2"
                    >
                      <td className="px-6 py-4 font-mono text-xs">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 font-semibold">{order.symbol}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={
                            order.direction === "call"
                              ? "text-green-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {order.direction === "call" ? "📈 CALL" : "📉 PUT"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        ${order.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.entryPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            order.status === "pending"
                              ? "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-100"
                              : order.status === "won"
                                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100"
                                : order.status === "lost"
                                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100"
                                  : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">
                        {order.status === "pending"
                          ? "-"
                          : order.status === "won"
                            ? `+$${(order.profit || 0).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}`
                            : `-$${(order.loss || 0).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}`}
                      </td>
                      <td className="px-6 py-4 text-sm opacity-70">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
