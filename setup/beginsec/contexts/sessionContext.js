"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/session");
      setIsAuthenticated(res.ok);
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
    <SessionContext.Provider value={{ isAuthenticated, checkSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
