import * as React from "react";
import { tokenStorage } from "@/services/api";
import type { AdminUser } from "@/types";

interface AuthContextValue {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (admin: AdminUser, token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const ADMIN_USER_KEY = "shajiya-sri-admin-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = React.useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = tokenStorage.get();
    const storedAdmin = localStorage.getItem(ADMIN_USER_KEY);
    if (token && storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch {
        tokenStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (adminUser: AdminUser, token: string) => {
    tokenStorage.set(token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(adminUser));
    setAdmin(adminUser);
  };

  const logout = () => {
    tokenStorage.clear();
    localStorage.removeItem(ADMIN_USER_KEY);
    setAdmin(null);
  };

  const value: AuthContextValue = {
    admin,
    isAuthenticated: Boolean(admin),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
