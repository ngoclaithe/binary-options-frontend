export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    LOGOUT: "/api/v1/auth/logout",
    ME: "/api/v1/auth/me",
    REFRESH: "/api/v1/auth/refresh",
  },
  WALLET: {
    BALANCE: "/api/v1/wallet/balance",
    TRANSACTIONS: "/api/v1/wallet/transactions",
    DEPOSIT: "/api/v1/wallet/deposit",
    WITHDRAW: "/api/v1/wallet/withdraw",
  },
  TRADING: {
    ORDERS: "/api/v1/trading/orders",
    CREATE_ORDER: "/api/v1/trading/orders",
    ASSETS: "/api/v1/trading/assets",
    HISTORY: "/api/v1/trading/history",
  },
  ADMIN: {
    USERS: "/api/v1/admin/users",
    ASSETS: "/api/v1/admin/assets",
    ORDERS: "/api/v1/admin/orders",
    DASHBOARD: "/api/v1/admin/dashboard",
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
