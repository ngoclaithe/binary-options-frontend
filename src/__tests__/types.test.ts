import { describe, it, expect } from "vitest";
import type {
  PriceData,
  Order,
  Asset,
  Transaction,
} from "../types/index";

describe("Type Definitions", () => {
  describe("PriceData", () => {
    it("should have correct structure", () => {
      const priceData: PriceData = {
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
        secondsData: [
          {
            second: 0,
            timestamp: Date.now(),
            time: new Date().toISOString(),
            price: 40500,
            open: 40000,
            high: 41000,
            low: 39000,
            close: 40500,
            volume: 10,
          },
        ],
      };

      expect(priceData.symbol).toBe("BTCUSDT");
      expect(priceData.summary.close).toBe(40500);
      expect(priceData.secondsData.length).toBe(1);
    });
  });

  describe("Order", () => {
    it("should have correct structure", () => {
      const order: Order = {
        id: "order-1",
        userId: "user-1",
        symbol: "BTCUSDT",
        direction: "call",
        amount: 100,
        entryPrice: 40000,
        expiryTime: 60,
        status: "pending",
        profitRate: 0.85,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60000).toISOString(),
      };

      expect(order.direction).toBe("call");
      expect(order.status).toBe("pending");
      expect(order.profitRate).toBe(0.85);
    });
  });

  describe("Asset", () => {
    it("should have correct structure", () => {
      const asset: Asset = {
        id: "asset-1",
        symbol: "BTCUSDT",
        name: "Bitcoin",
        profitRate: 0.85,
        minBet: 1,
        maxBet: 10000,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      expect(asset.symbol).toBe("BTCUSDT");
      expect(asset.profitRate).toBe(0.85);
      expect(asset.isActive).toBe(true);
    });
  });

  describe("Transaction", () => {
    it("should have correct structure", () => {
      const transaction: Transaction = {
        id: "tx-1",
        userId: "user-1",
        type: "deposit",
        amount: 1000,
        currency: "USD",
        status: "completed",
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };

      expect(transaction.type).toBe("deposit");
      expect(transaction.status).toBe("completed");
      expect(transaction.amount).toBe(1000);
    });
  });
});
