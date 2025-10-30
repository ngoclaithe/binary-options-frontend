"use client";

import { TRADING_TIMEFRAMES } from "../../constants/trading.constants";

interface TimeframeSelectorProps {
  selected: number;
  onSelect: (timeframe: number) => void;
}

export default function TimeframeSelector({
  selected,
  onSelect,
}: TimeframeSelectorProps) {
  const timeframes = [
    { value: TRADING_TIMEFRAMES.SIXTY_SECONDS, label: "60s" },
    { value: TRADING_TIMEFRAMES.TWO_MINUTES, label: "2m" },
    { value: TRADING_TIMEFRAMES.FIVE_MINUTES, label: "5m" },
  ];

  return (
    <div className="flex gap-2">
      {timeframes.map((tf) => (
        <button
          key={tf.value}
          onClick={() => onSelect(tf.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selected === tf.value
              ? "bg-foreground text-background"
              : "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
}
