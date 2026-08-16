"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  getCurrentUser,
  loginUser as apiLogin,
  registerUser as apiRegister,
} from "@/lib/api";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  target_role: string;
  experience_level: string;

  avatar_url?: string;
  bio?: string;
  location?: string;
  phone?: string;

  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;

  target_salary_min?: number;
  target_salary_max?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  login: (email: string, pass: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;

  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  authMode: "login" | "register" | "forgot";
  setAuthMode: (mode: "login" | "register" | "forgot") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const [authMode, setAuthMode] = useState<
    "login" | "register" | "forgot"
  >("login");

  /**
   * Load the currently authenticated user.
   *
   * If there is no token, the user remains logged out.
   * If the token is invalid or expired, it is removed.
   */
  const refreshUser = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const storedToken = localStorage.getItem("token");

      // No token = user is not authenticated
      if (!storedToken) {
        setToken(null);
        setUser(null);
        return;
      }

      // Token exists
      setToken(storedToken);

      // Ask backend who owns this token
      const userData = await getCurrentUser();

      setUser(userData);
    } catch (error) {
      console.error("Authentication check failed:", error);

      // Token is invalid or expired
      localStorage.removeItem("token");

      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check authentication when the application loads.
   */
  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
  const handleOpenAuth = (event: Event) => {
    const customEvent = event as CustomEvent<{
      mode?: "login" | "register" | "forgot";
    }>;

    const mode = customEvent.detail?.mode ?? "login";

    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  window.addEventListener("open-auth", handleOpenAuth);

  return () => {
    window.removeEventListener("open-auth", handleOpenAuth);
  };
}, []);

  /**
   * Login
   */
  const login = async (
    email: string,
    pass: string
  ): Promise<void> => {
    const res = await apiLogin({
      email,
      password: pass,
    });

    // Store authentication token
    localStorage.setItem("token", res.access_token);

    // Update application state immediately
    setToken(res.access_token);
    setUser(res.user);

    // Close authentication modal
    setAuthModalOpen(false);
  };

  /**
   * Register
   */
  const register = async (
    payload: any
  ): Promise<void> => {
    const res = await apiRegister(payload);

    // Store authentication token
    localStorage.setItem("token", res.access_token);

    // Update application state immediately
    setToken(res.access_token);
    setUser(res.user);

    // Close authentication modal
    setAuthModalOpen(false);
  };

  /**
   * Logout
   */
  const logout = (): void => {
    // Remove authentication token
    localStorage.removeItem("token");

    // Clear authentication state
    setToken(null);
    setUser(null);

    // Reset authentication UI
    setAuthModalOpen(false);
    setAuthMode("login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,

        login,
        register,
        logout,
        refreshUser,

        isAuthModalOpen,
        setAuthModalOpen,

        authMode,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};