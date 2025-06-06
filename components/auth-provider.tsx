"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { UserBasic } from "@/types/user";

type AuthContextType = {
  user: UserBasic | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  logout: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserBasic | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken === "dummy_token_123") {
      setToken(storedToken);
      loadUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/profile", "/notes"];
    const isProtected = protectedRoutes.some((route) =>
      pathname?.startsWith(route)
    );

    // if (isProtected && !loading && !token) {
    //   router.push("/login");
    // }
  }, [pathname, token, loading, router]);

  const loadUserData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay

    setUser({
      id: 1,
      username: "johndoe",
      email: "johndoe@example.com",
      name: "John Doe",
    });

    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay

    if (email && password) {
      const dummyToken = "dummy_token_123";
      localStorage.setItem("auth_token", dummyToken);
      setToken(dummyToken);
      await loadUserData();
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // simulate delay
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
