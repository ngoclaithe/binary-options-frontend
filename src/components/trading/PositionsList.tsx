"use client";

import type { Order } from "../../types/trading.types";
import { ORDER_STATUS } from "../../constants/trading.constants";

interface PositionsListProps {
  positions: Order[];
  loading?: boolean;
}

export default function PositionsList({ positions, loading = false }: PositionsListProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case ORDER_STATUS.WON:
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case ORDER_STATUS.LOST:
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
      case ORDER_STATUS.PENDING:
        return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
      case ORDER_STATUS.CANCELLED:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
      default:
        return "text-gray-600";
    }
  };

  const getDirectionColor = (direction: Order["direction"]) => {
    return direction === "call" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
      <h2 className="text-lg font-semibold mb-4">Open Positions</h2>

      {loading ? (
        <div className="text-center py-8 text-sm opacity-70">Loading positions...</div>
      ) : positions.length === 0 ? (
        <div className="text-center py-8 text-sm opacity-70">No open positions</div>
      ) : (
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.id}
              className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{position.symbol}</h3>
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide ${getDirectionColor(
                        position.direction
                      )}`}
                    >
                      {position.direction === "call" ? "📈 Call" : "📉 Put"}
                    </span>
                  </div>
                  <p className="text-xs opacity-70">
                    Entry: {position.entryPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(
                    position.status
                  )}`}
                >
                  {position.status.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3 pb-3 border-b border-black/10 dark:border-white/10">
                <div>
                  <p className="opacity-70 mb-1">Bet Amount</p>
                  <p className="font-semibold">
                    ${position.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="opacity-70 mb-1">Return Rate</p>
                  <p className="font-semibold">{position.profitRate * 100}%</p>
                </div>
                {position.status !== "pending" && (
                  <>
                    <div>
                      <p className="opacity-70 mb-1">P/L</p>
                      <p className={`font-semibold ${
                        (position.profit || 0) >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {(position.profit || 0) >= 0 ? "+" : ""}$
                        {((position.profit || 0) - (position.loss || 0)).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="opacity-70 mb-1">Closed</p>
                      <p className="font-semibold">
                        {position.resultAt
                          ? new Date(position.resultAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })
                          : "-"}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="text-xs opacity-70">
                Expires: {new Date(position.expiresAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
