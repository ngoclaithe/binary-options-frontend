"use client";

import { useState, useRef, useEffect } from "react";
import type { Asset } from "../../types/trading.types";
import { ChevronDown } from "lucide-react";

interface AssetSelectorProps {
  assets: Asset[];
  selectedSymbol?: string;
  onSelect: (symbol: string) => void;
  loading?: boolean;
}

export default function AssetSelector({
  assets,
  selectedSymbol,
  onSelect,
  loading = false,
}: AssetSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedAsset = assets.find((a) => a.symbol === selectedSymbol);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const activeAssets = assets.filter((a) => a.isActive);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
      >
        <span>{selectedAsset ? selectedAsset.symbol : "Select Asset"}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-black/10 dark:border-white/10 bg-background shadow-lg z-50">
          <div className="max-h-64 overflow-y-auto">
            {activeAssets.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm opacity-70">No active assets</div>
            ) : (
              activeAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => {
                    onSelect(asset.symbol);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                    selectedSymbol === asset.symbol ? "bg-black/10 dark:bg-white/10" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{asset.symbol}</span>
                    <span className="text-xs opacity-70">{asset.profitRate * 100}% return</span>
                  </div>
                  <p className="text-xs opacity-60 mt-1">{asset.name}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
