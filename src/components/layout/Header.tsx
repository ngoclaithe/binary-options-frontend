"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";

interface BalanceResponse {
  balance: number;
  currency: string;
}

export default function Header() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState<BalanceResponse | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (!user) return;

    const run = async () => {
      setLoadingBalance(true);
      setBalanceError(null);
      try {
        const res = await fetch("/api/v1/wallet/balance", { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as BalanceResponse;
        setBalance(json);
      } catch (e: any) {
        setBalanceError(e?.message || "Failed to load balance");
        setBalance(null);
      } finally {
        setLoadingBalance(false);
      }
    };

    run();
  }, [open, user]);

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 dark:border-white/10 backdrop-blur bg-background/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Binary Options</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/(dashboard)/trading">Trading</Link>

          {user && !loading ? (
            <div className="relative" ref={containerRef}>
              <button
                onClick={() => setOpen((s) => !s)}
                className="rounded-md px-3 py-1 text-sm border border-black/10 dark:border-white/10 bg-transparent flex items-center gap-2"
              >
                Wallet
                <span className="text-xs opacity-70">
                  {balance ? ` ${balance.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${balance.currency}` : ""}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-black/10 dark:border-white/10 bg-background shadow-lg p-3">
                  {loadingBalance && <div className="text-sm text-gray-500">Loading balance...</div>}
                  {balanceError && <div className="text-sm text-red-500">{balanceError}</div>}
                  {balance && (
                    <div className="space-y-3">
                      <div className="text-xs text-gray-600">Available</div>
                      <div className="text-lg font-semibold tabular-nums">{balance.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {balance.currency}</div>
                      <div className="flex gap-2">
                        <Link className="flex-1 text-center rounded-full px-3 py-1 bg-foreground text-background text-sm" href="/(dashboard)/wallet">Deposit</Link>
                        <Link className="flex-1 text-center rounded-full px-3 py-1 border border-black/10 dark:border-white/10 text-sm" href="/(dashboard)/wallet">Withdraw</Link>
                      </div>
                      <div className="text-xs text-gray-500"><Link href="/(dashboard)/wallet" className="underline">View wallet</Link></div>
                    </div>
                  )}

                  {!loadingBalance && !balance && !balanceError && (
                    <div className="text-sm text-gray-500">No balance information</div>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {!user ? (
            <Link className="hover:underline" href="/(auth)/login">Login</Link>
          ) : (
            <Link className="hover:underline" href="/(dashboard)/profile">Profile</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
