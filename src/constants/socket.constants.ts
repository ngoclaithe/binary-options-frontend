export const SOCKET_EVENTS = {
  PRICE_UPDATE: "price-update",
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
  ORDER_UPDATE: "order-update",
  BALANCE_UPDATE: "balance-update",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
} as const;

export const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001";
export const SOCKET_PATH = "/socket.io";
export const SOCKET_NAMESPACE = "/price-feed";

export const SOCKET_CONFIG = {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
} as const;

export const DEFAULT_PRICE_SYMBOLS = ["BTCUSDT", "ETHUSDT"] as const;
