import { describe, it, expect } from "vitest";
import { API_ENDPOINTS, HTTP_STATUS } from "../constants/api.constants";
import { SOCKET_EVENTS } from "../constants/socket.constants";
import { TRADING_TIMEFRAMES, ORDER_STATUS, ORDER_DIRECTION } from "../constants/trading.constants";

describe("Constants", () => {
  describe("API_ENDPOINTS", () => {
    it("should have auth endpoints", () => {
      expect(API_ENDPOINTS.AUTH.LOGIN).toBe("/api/v1/auth/login");
      expect(API_ENDPOINTS.AUTH.REGISTER).toBe("/api/v1/auth/register");
      expect(API_ENDPOINTS.AUTH.LOGOUT).toBe("/api/v1/auth/logout");
    });

    it("should have wallet endpoints", () => {
      expect(API_ENDPOINTS.WALLET.BALANCE).toBe("/api/v1/wallet/balance");
      expect(API_ENDPOINTS.WALLET.TRANSACTIONS).toBe("/api/v1/wallet/transactions");
    });

    it("should have trading endpoints", () => {
      expect(API_ENDPOINTS.TRADING.ASSETS).toBe("/api/v1/trading/assets");
      expect(API_ENDPOINTS.TRADING.ORDERS).toBe("/api/v1/trading/orders");
    });
  });

  describe("HTTP_STATUS", () => {
    it("should have correct status codes", () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.CREATED).toBe(201);
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
      expect(HTTP_STATUS.UNAUTHORIZED).toBe(401);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500);
    });
  });

  describe("SOCKET_EVENTS", () => {
    it("should have price update event", () => {
      expect(SOCKET_EVENTS.PRICE_UPDATE).toBe("price-update");
    });

    it("should have subscription events", () => {
      expect(SOCKET_EVENTS.SUBSCRIBE).toBe("subscribe");
      expect(SOCKET_EVENTS.UNSUBSCRIBE).toBe("unsubscribe");
    });
  });

  describe("TRADING_TIMEFRAMES", () => {
    it("should have correct timeframe values", () => {
      expect(TRADING_TIMEFRAMES.SIXTY_SECONDS).toBe(60);
      expect(TRADING_TIMEFRAMES.TWO_MINUTES).toBe(120);
      expect(TRADING_TIMEFRAMES.FIVE_MINUTES).toBe(300);
    });
  });

  describe("ORDER_STATUS", () => {
    it("should have all status values", () => {
      expect(ORDER_STATUS.PENDING).toBe("pending");
      expect(ORDER_STATUS.WON).toBe("won");
      expect(ORDER_STATUS.LOST).toBe("lost");
      expect(ORDER_STATUS.CANCELLED).toBe("cancelled");
    });
  });

  describe("ORDER_DIRECTION", () => {
    it("should have call and put directions", () => {
      expect(ORDER_DIRECTION.CALL).toBe("call");
      expect(ORDER_DIRECTION.PUT).toBe("put");
    });
  });
});
