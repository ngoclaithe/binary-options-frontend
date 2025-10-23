"use client";

import { useEffect, useState, useCallback } from "react";

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      // Try to fetch current user; backend should expose /api/v1/auth/me
      const res = await fetch("/api/v1/auth/me", { credentials: "include" });
      if (!res.ok) {
        setUser(null);
      } else {
        const json = await res.json();
        setUser(json?.user ?? json ?? null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST", credentials: "include" });
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
    }
  }, []);

  return { user, loading, fetchUser, signOut };
}
