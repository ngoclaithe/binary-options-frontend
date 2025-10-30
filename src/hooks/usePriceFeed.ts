"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "./useAppSelector";
import {
  setPriceUpdate,
  setPriceError,
  addConnectedSymbol,
  removeConnectedSymbol,
} from "../store/slices/priceSlice";
import type { PriceData, PriceMap } from "../types/price.types";
import {
  SOCKET_URL,
  SOCKET_NAMESPACE,
  SOCKET_CONFIG,
  SOCKET_EVENTS,
} from "../constants/socket.constants";

interface UsePriceFeedOptions {
  defaultSymbols?: string[];
}

export function usePriceFeed(options: UsePriceFeedOptions = {}) {
  const { defaultSymbols = [] } = options;
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [prices, setPrices] = useState<PriceMap>({});
  const dispatch = useAppDispatch();

  const ensureSocket = useCallback(() => {
    if (socketRef.current) return socketRef.current;

    const socket = io(SOCKET_URL, {
      path: "/socket.io",
      ...SOCKET_CONFIG,
    });

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      setConnected(true);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      setConnected(false);
    });

    socket.on(SOCKET_EVENTS.PRICE_UPDATE, (data: PriceData) => {
      setPrices((prev) => ({ ...prev, [data.symbol]: data }));
      dispatch(setPriceUpdate(data));
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err: any) => {
      console.error("Socket connection error:", err);
      dispatch(setPriceError(err.message || "Connection error"));
    });

    socketRef.current = socket;
    return socket;
  }, [dispatch]);

  const subscribe = useCallback(
    (symbols: string[]) => {
      const socket = ensureSocket();
      if (!symbols?.length) return;
      socket.emit(SOCKET_EVENTS.SUBSCRIBE, { symbols });
      symbols.forEach((symbol) => dispatch(addConnectedSymbol(symbol)));
    },
    [ensureSocket, dispatch]
  );

  const unsubscribe = useCallback(
    (symbols: string[]) => {
      const socket = ensureSocket();
      if (!symbols?.length) return;
      socket.emit(SOCKET_EVENTS.UNSUBSCRIBE, { symbols });
      symbols.forEach((symbol) => dispatch(removeConnectedSymbol(symbol)));
    },
    [ensureSocket, dispatch]
  );

  useEffect(() => {
    const socket = ensureSocket();
    if (defaultSymbols.length) {
      socket.emit(SOCKET_EVENTS.SUBSCRIBE, { symbols: defaultSymbols });
      defaultSymbols.forEach((symbol) => dispatch(addConnectedSymbol(symbol)));
    }

    return () => {
      if (socket) {
        try {
          if (defaultSymbols.length) {
            socket.emit(SOCKET_EVENTS.UNSUBSCRIBE, { symbols: defaultSymbols });
            defaultSymbols.forEach((symbol) => {
              dispatch(removeConnectedSymbol(symbol));
            });
          }
        } catch (e) {
          console.error("Error during cleanup:", e);
        }
      }
    };
  }, [dispatch, defaultSymbols]);

  const list = useMemo(
    () => Object.values(prices).sort((a, b) => a.symbol.localeCompare(b.symbol)),
    [prices]
  );

  return { connected, prices, list, subscribe, unsubscribe };
}
