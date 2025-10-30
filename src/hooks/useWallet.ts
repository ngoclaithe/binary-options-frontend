"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import {
  fetchBalance,
  fetchTransactions,
  updateBalance,
  addTransaction,
  clearError,
} from "../store/slices/walletSlice";
import type { Transaction } from "../types/wallet.types";

export function useWallet() {
  const dispatch = useAppDispatch();
  const { balance, currency, transactions, loading, error } = useAppSelector(
    (state) => state.wallet
  );

  const loadBalance = useCallback(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const loadTransactions = useCallback(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleUpdateBalance = useCallback(
    (newBalance: number) => {
      dispatch(updateBalance(newBalance));
    },
    [dispatch]
  );

  const handleAddTransaction = useCallback(
    (transaction: Transaction) => {
      dispatch(addTransaction(transaction));
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    balance,
    currency,
    transactions,
    loading,
    error,
    loadBalance,
    loadTransactions,
    updateBalance: handleUpdateBalance,
    addTransaction: handleAddTransaction,
    clearError: handleClearError,
  };
}
