"use client";

import { useEffect, useState } from "react";
import { useWallet } from "../../../hooks/useWallet";

export default function WalletPage() {
  const { balance, currency, transactions, loading, loadBalance, loadTransactions } =
    useWallet();
  const [activeTab, setActiveTab] = useState<"overview" | "history">("overview");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  useEffect(() => {
    loadBalance();
    loadTransactions();
  }, [loadBalance, loadTransactions]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    // This would call a deposit API
    alert(`Deposit ${amount} ${currency} initiated`);
    setDepositAmount("");
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }
    // This would call a withdraw API
    alert(`Withdraw ${amount} ${currency} initiated`);
    setWithdrawAmount("");
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Wallet</h1>

        {loading ? (
          <div className="text-center py-8 text-sm opacity-70">Loading wallet data...</div>
        ) : (
          <>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-8 mb-8 bg-gradient-to-br from-foreground/5 to-background">
              <p className="text-sm opacity-70 mb-2">Available Balance</p>
              <p className="text-5xl font-bold tabular-nums mb-4">
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-2xl">{currency}</span>
              </p>
              <button
                onClick={loadBalance}
                className="text-sm text-blue-600 dark:text-blue-400 underline"
              >
                Refresh Balance
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <form
                onSubmit={handleDeposit}
                className="rounded-lg border border-black/10 dark:border-white/10 p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Deposit Funds</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Amount ({currency})</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[10, 50, 100, 500].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDepositAmount(amt.toString())}
                        className="px-3 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        +{amt}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full h-10 bg-green-600 text-white font-medium hover:opacity-90"
                  >
                    Deposit
                  </button>
                </div>
              </form>

              <form
                onSubmit={handleWithdraw}
                className="rounded-lg border border-black/10 dark:border-white/10 p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Withdraw Funds</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Amount ({currency})</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={balance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                    />
                  </div>
                  <div className="text-xs opacity-70">
                    Available: {balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full h-10 bg-red-600 text-white font-medium hover:opacity-90"
                  >
                    Withdraw
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
              <div className="flex gap-4 mb-6 border-b border-black/10 dark:border-white/10">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 font-medium border-b-2 -mb-6 ${
                    activeTab === "overview"
                      ? "border-foreground text-foreground"
                      : "border-transparent text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 font-medium border-b-2 -mb-6 ${
                    activeTab === "history"
                      ? "border-foreground text-foreground"
                      : "border-transparent text-gray-600 dark:text-gray-400"
                  }`}
                >
                  History
                </button>
              </div>

              {activeTab === "overview" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                      <p className="text-xs opacity-70 mb-2">Total Deposits</p>
                      <p className="text-xl font-semibold">
                        $
                        {transactions
                          .filter((t) => t.type === "deposit" && t.status === "completed")
                          .reduce((sum, t) => sum + t.amount, 0)
                          .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                      <p className="text-xs opacity-70 mb-2">Total Withdrawals</p>
                      <p className="text-xl font-semibold">
                        $
                        {transactions
                          .filter((t) => t.type === "withdraw" && t.status === "completed")
                          .reduce((sum, t) => sum + t.amount, 0)
                          .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                      <p className="text-xs opacity-70 mb-2">Pending</p>
                      <p className="text-xl font-semibold">
                        $
                        {transactions
                          .filter((t) => t.status === "pending")
                          .reduce((sum, t) => sum + t.amount, 0)
                          .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {transactions.length === 0 ? (
                    <p className="text-center py-8 text-sm opacity-70">No transactions yet</p>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex justify-between items-center p-4 rounded-lg border border-black/10 dark:border-white/10"
                      >
                        <div>
                          <p className="font-semibold capitalize">{tx.type}</p>
                          <p className="text-xs opacity-70">
                            {new Date(tx.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {tx.type === "withdraw" ? "-" : "+"}${tx.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </p>
                          <p
                            className={`text-xs font-medium capitalize ${
                              tx.status === "completed"
                                ? "text-green-600"
                                : tx.status === "pending"
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          >
                            {tx.status}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
