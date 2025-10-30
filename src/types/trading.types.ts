export type OrderDirection = "call" | "put";
export type OrderStatus = "pending" | "won" | "lost" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  direction: OrderDirection;
  amount: number;
  entryPrice: number;
  expiryTime: number;
  status: OrderStatus;
  profitRate: number;
  profit?: number;
  loss?: number;
  createdAt: string;
  expiresAt: string;
  resultAt?: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  profitRate: number;
  minBet: number;
  maxBet: number;
  isActive: boolean;
  createdAt: string;
}

export interface TradingState {
  orders: Order[];
  assets: Asset[];
  loading: boolean;
  error: string | null;
}
