export type TransactionType = "deposit" | "withdraw" | "trade";
export type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  reference?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface WalletState {
  balance: number;
  currency: string;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}
