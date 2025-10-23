export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number; // Unix ms
}

export type PriceMap = Record<string, PriceData>;
