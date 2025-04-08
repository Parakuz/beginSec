"use client";

import { getUser } from "@/lib/getUser";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/user/session");
      setIsAuthenticated(res.ok);

      const data = await res.json();

      const res2 = await fetch("/api/user/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: data.userId }),
      });

      if (!res2.ok) {
        return;
      }

      const userData = await res2.json();
      setUser(userData);
    } catch (error) {
      console.error("Error checking session:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, checkSession, loading, user }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
