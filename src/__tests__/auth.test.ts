import { describe, it, expect, beforeEach } from "vitest";
import { isTokenValid } from "../lib/auth";

describe("Auth Utilities", () => {
  describe("isTokenValid", () => {
    it("returns false for null token", () => {
      expect(isTokenValid(null)).toBe(false);
    });

    it("returns false for invalid token format", () => {
      expect(isTokenValid("invalid")).toBe(false);
      expect(isTokenValid("two.parts")).toBe(false);
      expect(isTokenValid("one.two.three.four")).toBe(false);
    });

    it("returns false for expired token", () => {
      const expiredPayload = {
        exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      };
      const token = `header.${btoa(JSON.stringify(expiredPayload))}.signature`;
      expect(isTokenValid(token)).toBe(false);
    });

    it("returns true for valid token", () => {
      const validPayload = {
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      };
      const token = `header.${btoa(JSON.stringify(validPayload))}.signature`;
      expect(isTokenValid(token)).toBe(true);
    });

    it("returns false for token with missing exp", () => {
      const payload = { sub: "user123" };
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;
      expect(isTokenValid(token)).toBe(false);
    });
  });
});
