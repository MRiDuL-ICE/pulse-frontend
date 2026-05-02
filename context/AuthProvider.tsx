"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { getAccessToken, getRefreshToken, clearTokens } from "@/lib/auth";
import { auth, tenant } from "@/lib/api";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  const updateUser = useCallback((nextUser: User | null) => {
    if (!isMountedRef.current) return;
    setUser(nextUser);
  }, []);

  const fetchUser = useCallback(
    async (token?: string) => {
      const t = token || getAccessToken();

      if (!t) {
        updateUser(null);
        return;
      }

      try {
        const data = await tenant.me(t);
        // console.log("data", data);
        setUser(data);
        updateUser(data);
      } catch {
        updateUser(null);
      }
    },
    [updateUser],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      const refresh = getRefreshToken();
      const access = getAccessToken();
      if (refresh && access) {
        await auth.logout(refresh, access);
      }
    } catch (error) {
      console.error("logout error:", error);
    } finally {
      clearTokens();
      updateUser(null);
    }
  }, [updateUser]);

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      if (isMountedRef.current) {
        setLoading(false);
      }
    };

    init();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchUser]);

  const value = useMemo(
    () => ({ user, loading, fetchUser, logout }),
    [user, loading, fetchUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
