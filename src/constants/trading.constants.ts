export const TRADING_TIMEFRAMES = {
  SIXTY_SECONDS: 60,
  TWO_MINUTES: 120,
  FIVE_MINUTES: 300,
} as const;

export const MIN_BET = 1;
export const MAX_BET = 10000;

export const ORDER_STATUS = {
  PENDING: "pending",
  WON: "won",
  LOST: "lost",
  CANCELLED: "cancelled",
} as const;

export const ORDER_DIRECTION = {
  CALL: "call",
  PUT: "put",
} as const;

export const DEFAULT_PROFIT_RATE = 0.85;
