"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 dark:border-white/10 backdrop-blur bg-background/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Binary Options</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/(dashboard)/trading">Trading</Link>
          {user && !loading ? (
            <Link className="hover:underline" href="/(dashboard)/wallet">Wallet</Link>
          ) : null}
          {!user ? <Link className="hover:underline" href="/(auth)/login">Login</Link> : <Link className="hover:underline" href="/(dashboard)/profile">Profile</Link>}
        </nav>
      </div>
    </header>
  );
}
