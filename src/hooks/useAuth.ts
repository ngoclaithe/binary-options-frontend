"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import { fetchCurrentUser, logoutUser } from "../store/slices/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const signOut = async () => {
    await dispatch(logoutUser());
  };

  return { user, loading, isAuthenticated, signOut };
}
