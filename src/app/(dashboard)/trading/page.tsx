"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useTrading } from "../../../hooks/useTrading";
import { usePriceFeed } from "../../../hooks/usePriceFeed";
import { DEFAULT_PRICE_SYMBOLS } from "../../../constants/socket.constants";
import AssetSelector from "../../../components/trading/AssetSelector";
import TimeframeSelector from "../../../components/trading/TimeframeSelector";
import PriceDisplay from "../../../components/trading/PriceDisplay";
import TradingChart from "../../../components/trading/TradingChart";
import OrderPanel from "../../../components/trading/OrderPanel";
import PositionsList from "../../../components/trading/PositionsList";
import { TRADING_TIMEFRAMES } from "../../../constants/trading.constants";

export default function TradingPage() {
  const searchParams = useSearchParams();
  const {
    assets,
    orders,
    loading: assetsLoading,
    placeOrder,
    loadAssets,
    loadOrders,
  } = useTrading();
  const { prices, subscribe, unsubscribe } = usePriceFeed({
    defaultSymbols: [...DEFAULT_PRICE_SYMBOLS],
  });

  const [selectedSymbol, setSelectedSymbol] = useState<string>(
    searchParams.get("symbol") || "BTCUSDT"
  );
  const [timeframe, setTimeframe] = useState(TRADING_TIMEFRAMES.SIXTY_SECONDS);
  const [orderLoading, setOrderLoading] = useState(false);

  const currentPrice = prices[selectedSymbol];
  const selectedAsset = assets.find((a) => a.symbol === selectedSymbol);

  useEffect(() => {
    loadAssets();
    loadOrders();
  }, [loadAssets, loadOrders]);

  useEffect(() => {
    if (selectedSymbol && !Object.keys(prices).includes(selectedSymbol)) {
      subscribe([selectedSymbol]);
    }
    return () => {
      if (selectedSymbol) {
        unsubscribe([selectedSymbol]);
      }
    };
  }, [selectedSymbol, prices, subscribe, unsubscribe]);

  const handlePlaceOrder = useCallback(
    async (direction: "call" | "put", amount: number, expiryTime: number) => {
      setOrderLoading(true);
      try {
        await placeOrder(selectedSymbol, direction, amount, expiryTime);
        loadOrders();
      } finally {
        setOrderLoading(false);
      }
    },
    [selectedSymbol, placeOrder, loadOrders]
  );

  const openOrders = orders.filter((o) => o.status === "pending");
  const closedOrders = orders.filter((o) => o.status !== "pending");

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Trading Terminal</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
              <label className="block text-sm font-medium mb-3">Select Asset</label>
              <AssetSelector
                assets={assets}
                selectedSymbol={selectedSymbol}
                onSelect={setSelectedSymbol}
                loading={assetsLoading}
              />
            </div>

            <PriceDisplay price={currentPrice} symbol={selectedSymbol} />

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-3">Timeframe</label>
                <TimeframeSelector selected={timeframe} onSelect={setTimeframe} />
              </div>

              <TradingChart
                priceData={currentPrice}
                chartType="area"
                height={350}
              />
            </div>
          </div>

          <div>
            <OrderPanel
              asset={selectedAsset}
              onPlaceOrder={handlePlaceOrder}
              loading={orderLoading}
              price={currentPrice?.summary.close}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PositionsList positions={openOrders} loading={assetsLoading} />

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Trades</h2>

            {closedOrders.length === 0 ? (
              <div className="text-center py-8 text-sm opacity-70">
                No closed orders yet
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {closedOrders.slice(0, 10).map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-black/10 dark:border-white/10 p-3 text-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{order.symbol}</p>
                        <p className="text-xs opacity-70">
                          {order.direction === "call" ? "📈 Call" : "📉 Put"}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.status === "won"
                            ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                            : "text-red-600 bg-red-50 dark:bg-red-900/20"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs opacity-70">
                      <span>${order.amount}</span>
                      <span>
                        {order.profit
                          ? `+$${order.profit}`
                          : order.loss
                            ? `-$${order.loss}`
                            : "-"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
