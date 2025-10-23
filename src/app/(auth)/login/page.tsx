"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Đăng nhập thất bại");
      // Optionally handle redirect here
      window.location.href = "/(dashboard)/trading";
    } catch (e: any) {
      setError(e?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full h-10 bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <div className="text-sm text-center">
            Chưa có tài khoản? <Link className="underline" href="/(auth)/register">Đăng ký</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
