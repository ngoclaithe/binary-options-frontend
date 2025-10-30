"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PriceData } from "../../types/price.types";

interface TradingChartProps {
  priceData?: PriceData;
  chartType?: "line" | "area";
  height?: number;
}

export default function TradingChart({
  priceData,
  chartType = "area",
  height = 400,
}: TradingChartProps) {
  const chartData = useMemo(() => {
    if (!priceData || !priceData.secondsData) return [];

    return priceData.secondsData.map((tick) => ({
      time: new Date(tick.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      price: tick.price,
      open: tick.open,
      high: tick.high,
      low: tick.low,
      close: tick.close,
      volume: tick.volume,
    }));
  }, [priceData]);

  const stats = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { min: 0, max: 0, avg: 0 };
    }

    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

    return { min, max, avg };
  }, [chartData]);

  if (!priceData) {
    return (
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 flex items-center justify-center" style={{ height }}>
        <p className="text-sm opacity-70">Select an asset to view chart</p>
      </div>
    );
  }

  const isUp = (priceData.summary.close - priceData.summary.open) >= 0;

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{priceData.symbol} Price</h3>
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-3xl font-bold tabular-nums">
            {priceData.summary.close.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className={`text-lg font-semibold ${isUp ? "text-green-600" : "text-red-600"}`}>
            {isUp ? "+" : ""}
            {(priceData.summary.close - priceData.summary.open).toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs mb-4">
          <div>
            <p className="opacity-70 mb-1">High</p>
            <p className="font-semibold">
              {stats.max.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="opacity-70 mb-1">Low</p>
            <p className="font-semibold">
              {stats.min.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="opacity-70 mb-1">Avg</p>
            <p className="font-semibold">
              {stats.avg.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="opacity-70 mb-1">Volume</p>
            <p className="font-semibold">{priceData.summary.volume.toFixed(4)}</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        {chartType === "line" ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="time"
              stroke="rgba(0,0,0,0.5)"
              style={{ fontSize: "12px" }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(0,0,0,0.5)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 1", "dataMax + 1"]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
              }}
              formatter={(value: any) =>
                value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isUp ? "#16a34a" : "#dc2626"}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        ) : (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="time"
              stroke="rgba(0,0,0,0.5)"
              style={{ fontSize: "12px" }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(0,0,0,0.5)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 1", "dataMax + 1"]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
              }}
              formatter={(value: any) =>
                value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
            />
            <Area
              type="monotone"
              dataKey="price"
              fill={isUp ? "#16a34a" : "#dc2626"}
              stroke={isUp ? "#16a34a" : "#dc2626"}
              fillOpacity={0.1}
              isAnimationActive={false}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
