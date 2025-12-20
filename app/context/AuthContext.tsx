"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "teacher" | "kepsek";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const savedUser = localStorage.getItem("slb_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("slb_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
                localStorage.setItem("slb_user", JSON.stringify(userData));
                return { success: true };
            } else {
                const error = await res.json();
                return { success: false, error: error.error || "Username atau password salah" };
            }
        } catch (error) {
            return { success: false, error: "Terjadi kesalahan sistem" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("slb_user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin",
                isTeacher: user?.role === "teacher",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
