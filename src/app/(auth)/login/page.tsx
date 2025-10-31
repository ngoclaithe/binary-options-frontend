"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { loginUser, clearError } from "../../../store/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/trading");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Tên đăng nhập hoặc email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={1}
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
              minLength={1}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
            />
          </div>
          {error && (
            <div className="text-sm text-red-500 flex justify-between items-center">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => dispatch(clearError())}
                className="text-xs underline"
              >
                Clear
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full h-10 bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <div className="text-sm text-center">
            Chưa có tài khoản?{" "}
            <Link className="underline" href="/register">
              Đăng ký
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
