"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { PriceData, PriceMap } from "../types/price.types";

interface UsePriceFeedOptions {
  defaultSymbols?: string[];
}

export function usePriceFeed(options: UsePriceFeedOptions = {}) {
  const { defaultSymbols = [] } = options;
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [prices, setPrices] = useState<PriceMap>({});

  // Stable connect function
  const ensureSocket = useCallback(() => {
    if (socketRef.current) return socketRef.current;

    // Connect to same-origin and rely on Next rewrites to proxy to backend
    const socket = io("/price-feed", {
      path: "/socket.io",
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: true,
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("price-update", (data: PriceData) => {
      setPrices((prev) => ({ ...prev, [data.symbol]: data }));
    });

    socketRef.current = socket;
    return socket;
  }, []);

  const subscribe = useCallback((symbols: string[]) => {
    const socket = ensureSocket();
    if (!symbols?.length) return;
    socket.emit("subscribe", { symbols });
  }, [ensureSocket]);

  const unsubscribe = useCallback((symbols: string[]) => {
    const socket = ensureSocket();
    if (!symbols?.length) return;
    socket.emit("unsubscribe", { symbols });
  }, [ensureSocket]);

  useEffect(() => {
    const socket = ensureSocket();
    if (defaultSymbols.length) {
      socket.emit("subscribe", { symbols: defaultSymbols });
    }
    return () => {
      if (socket) {
        try {
          if (defaultSymbols.length) {
            socket.emit("unsubscribe", { symbols: defaultSymbols });
          }
        } finally {
          socket.disconnect();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = useMemo(() => Object.values(prices).sort((a, b) => a.symbol.localeCompare(b.symbol)), [prices]);

  return { connected, prices, list, subscribe, unsubscribe };
}
