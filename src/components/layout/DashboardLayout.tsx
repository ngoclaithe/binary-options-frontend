"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Trading", href: "/(dashboard)/trading" },
  { label: "Dashboard", href: "/(dashboard)/dashboard" },
  { label: "History", href: "/(dashboard)/history" },
  { label: "Wallet", href: "/(dashboard)/wallet" },
  { label: "Profile", href: "/(dashboard)/profile" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <aside className="w-56 border-r border-black/10 dark:border-white/10 bg-background/50">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-foreground text-background"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
