"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "@/services/authService";

import type {
  LoginData,
  RegisterData,
  User,
} from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (
    data: LoginData
  ) => Promise<User>;

  register: (
    data: RegisterData
  ) => Promise<User>;

  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);
      } catch {
        localStorage.removeItem(
          "token"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    data: LoginData
  ) => {
    const result =
      await loginUser(data);

    localStorage.setItem(
      "token",
      result.token
    );

    setUser(result.user);

    return result.user;
  };

  const register = async (
    data: RegisterData
  ) => {
    const result =
      await registerUser(data);

    localStorage.setItem(
      "token",
      result.token
    );

    setUser(result.user);

    return result.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};