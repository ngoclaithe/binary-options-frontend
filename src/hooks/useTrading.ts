"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import {
  fetchAssets,
  fetchOrders,
  createOrder,
  updateOrderStatus,
  clearError,
} from "../store/slices/tradingSlice";
import type { Order } from "../types/trading.types";

export function useTrading() {
  const dispatch = useAppDispatch();
  const { orders, assets, loading, error } = useAppSelector((state) => state.trading);

  const loadAssets = useCallback(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const loadOrders = useCallback(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const placeOrder = useCallback(
    async (
      symbol: string,
      direction: "call" | "put",
      amount: number,
      expiryTime: number
    ) => {
      const res = await dispatch(
        createOrder({
          userId: "",
          symbol,
          direction,
          amount,
          entryPrice: 0,
          expiryTime,
          profitRate: 0.85,
        } as any)
      );
      return res.payload;
    },
    [dispatch]
  );

  const updateOrder = useCallback(
    (orderId: string, status: Order["status"]) => {
      dispatch(updateOrderStatus({ orderId, status }));
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    orders,
    assets,
    loading,
    error,
    loadAssets,
    loadOrders,
    placeOrder,
    updateOrder,
    clearError: handleClearError,
  };
}
