"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const {
    balance,
    currency,
    loadBalance,
    loading: walletLoading,
    error: walletError,
  } = useWallet();
  const [open, setOpen] = useState(false);
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
    if (open && user) {
      loadBalance();
    }
  }, [open, user, loadBalance]);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 dark:border-white/10 backdrop-blur bg-background/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          BrotherX
        </Link>
        <nav className="flex items-center gap-4 text-sm">

          {user && !loading ? (
            <div className="relative" ref={containerRef}>
              <button
                onClick={() => setOpen((s) => !s)}
                className="rounded-md px-3 py-1 text-sm border border-black/10 dark:border-white/10 bg-transparent flex items-center gap-2"
              >
                Wallet
                <span className="text-xs opacity-70">
                  {balance
                    ? ` ${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`
                    : ""}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-black/10 dark:border-white/10 bg-background shadow-lg p-3">
                  {walletLoading && <div className="text-sm text-gray-500">Loading balance...</div>}
                  {walletError && <div className="text-sm text-red-500">{walletError}</div>}
                  {!walletLoading && balance && (
                    <div className="space-y-3">
                      <div className="text-xs text-gray-600">Available</div>
                      <div className="text-lg font-semibold tabular-nums">
                        {balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {currency}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          className="flex-1 text-center rounded-full px-3 py-1 bg-foreground text-background text-sm"
                          href="/wallet"
                        >
                          Deposit
                        </Link>
                        <Link
                          className="flex-1 text-center rounded-full px-3 py-1 border border-black/10 dark:border-white/10 text-sm"
                          href="/wallet"
                        >
                          Withdraw
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500">
                        <Link href="/wallet" className="underline">
                          View wallet
                        </Link>
                      </div>
                    </div>
                  )}

                  {!walletLoading && !balance && !walletError && (
                    <div className="text-sm text-gray-500">No balance information</div>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {!user && !loading ? (
            <div className="flex items-center gap-2">
              <Link href="/register" className="btn-accent text-sm px-4 py-1.5">
                Đăng ký
              </Link>
              <Link href="/login" className="btn-outline text-sm px-4 py-1.5">
                Đăng nhập
              </Link>
            </div>
          ) : user && !loading ? (
            <div className="flex items-center gap-2">
              <Link className="hover:underline" href="/profile">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-1 text-sm border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
