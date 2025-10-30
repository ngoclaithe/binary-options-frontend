import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AssetCard from "../AssetCard";
import type { Asset } from "../../../types/trading.types";
import type { PriceData } from "../../../types/price.types";

describe("AssetCard", () => {
  const mockAsset: Asset = {
    id: "1",
    symbol: "BTCUSDT",
    name: "Bitcoin",
    profitRate: 0.85,
    minBet: 1,
    maxBet: 10000,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  };

  const mockPrice: PriceData = {
    symbol: "BTCUSDT",
    minuteTimestamp: Date.now(),
    minuteTime: new Date().toISOString(),
    summary: {
      open: 40000,
      high: 41000,
      low: 39000,
      close: 40500,
      volume: 100,
    },
    secondsData: [],
  };

  it("renders asset symbol and name", () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText("BTCUSDT")).toBeDefined();
    expect(screen.getByText("Bitcoin")).toBeDefined();
  });

  it("displays profit rate correctly", () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText("85%")).toBeDefined();
  });

  it("shows inactive badge when asset is inactive", () => {
    const inactiveAsset = { ...mockAsset, isActive: false };
    render(<AssetCard asset={inactiveAsset} />);
    expect(screen.getByText("Inactive")).toBeDefined();
  });

  it("displays price data when provided", () => {
    render(<AssetCard asset={mockAsset} price={mockPrice} />);
    expect(screen.getByText("40,500.00")).toBeDefined();
  });

  it("calculates price change correctly", () => {
    render(<AssetCard asset={mockAsset} price={mockPrice} />);
    const changePercent = ((40500 - 40000) / 40000) * 100;
    expect(screen.getByText(`+${changePercent.toFixed(2)}%`)).toBeDefined();
  });
});
