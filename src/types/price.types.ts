export interface PriceSummary {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SecondData {
  second: number;
  timestamp: number;
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceData {
  symbol: string;
  minuteTimestamp: number;
  minuteTime: string;
  summary: PriceSummary;
  secondsData: SecondData[];
}

export type PriceMap = Record<string, PriceData>;
