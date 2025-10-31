"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { registerUser, clearError } from "../../../store/slices/authSlice";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      registerUser({
        email,
        username,
        password,
        fullName: fullName || undefined,
        phone: phone || undefined,
      })
    );
    if ((result as any).payload) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Đăng ký</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Họ tên (tuỳ chọn)</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={100}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Số điện thoại (tuỳ chọn)</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="^[0-9+\\-\\s()]+$"
              className="w-full rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
            />
          </div>
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
            <label className="block text-sm mb-1">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
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
              minLength={6}
              maxLength={50}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,50}$"
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
            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
          </button>
          <div className="text-sm text-center">
            Đã có tài khoản?{" "}
            <Link className="underline" href="/login">
              Đăng nhập
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
