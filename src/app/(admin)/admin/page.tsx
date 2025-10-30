"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useTrading } from "../../../hooks/useTrading";
import { useAuth } from "../../../hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { orders, assets, loadOrders, loadAssets } = useTrading();

  useEffect(() => {
    loadAssets();
    loadOrders();
  }, [loadAssets, loadOrders]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalAssets = assets.length;
    const activeAssets = assets.filter((a) => a.isActive).length;
    const totalVolume = orders.reduce((sum, o) => sum + o.amount, 0);

    return { totalOrders, totalAssets, activeAssets, totalVolume };
  }, [orders, assets]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-sm opacity-70">Welcome back, {user?.name || "Admin"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <p className="text-xs opacity-70 mb-2">Total Orders</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
            <Link
              href="/admin/orders"
              className="text-xs text-blue-600 dark:text-blue-400 underline mt-2 block"
            >
              View All
            </Link>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <p className="text-xs opacity-70 mb-2">Total Assets</p>
            <p className="text-3xl font-bold">{stats.totalAssets}</p>
            <Link
              href="/admin/assets"
              className="text-xs text-blue-600 dark:text-blue-400 underline mt-2 block"
            >
              View All
            </Link>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <p className="text-xs opacity-70 mb-2">Active Assets</p>
            <p className="text-3xl font-bold">{stats.activeAssets}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {((stats.activeAssets / stats.totalAssets) * 100).toFixed(0)}% of total
            </p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <p className="text-xs opacity-70 mb-2">Total Volume</p>
            <p className="text-3xl font-bold">${stats.totalVolume.toLocaleString()}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Trading volume</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/assets"
            className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Manage Assets</h3>
            <p className="text-sm opacity-70 mb-4">Create, edit, and delete trading assets</p>
            <button className="text-sm text-blue-600 dark:text-blue-400 underline">
              Go to Assets
            </button>
          </Link>

          <Link
            href="/admin/users"
            className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
            <p className="text-sm opacity-70 mb-4">View and manage user accounts</p>
            <button className="text-sm text-blue-600 dark:text-blue-400 underline">
              Go to Users
            </button>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
            <p className="text-sm opacity-70 mb-4">Monitor and review all trading orders</p>
            <button className="text-sm text-blue-600 dark:text-blue-400 underline">
              Go to Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
