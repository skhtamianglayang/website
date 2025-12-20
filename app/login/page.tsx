"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, isAdmin, isTeacher } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    if (isAuthenticated) {
        if (isAdmin) {
            router.push("/admin");
        } else if (isTeacher) {
            router.push("/teacher");
        }
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await login(username, password);

        if (result.success) {
            // Redirect based on role
            const savedUser = localStorage.getItem("slb_user");
            if (savedUser) {
                const user = JSON.parse(savedUser);
                if (user.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/teacher");
                }
            }
        } else {
            setError(result.error || "Login gagal");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 pt-36 sm:pt-40 pb-12 px-4">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-32 h-32 mx-auto mb-4">
                            <Image
                                src="/img/logo_skh.png"
                                alt="Logo SKH"
                                width={128}
                                height={128}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Login Dashboard</h1>
                        <p className="text-slate-600 mt-2">Masuk ke panel administrasi</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="Masukkan username"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? "Memproses..." : "Masuk"}
                        </Button>
                    </form>

                    {/* Demo Accounts */}
                    {/* <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-sm text-slate-500 text-center mb-4">Akun Demo:</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-slate-600">Admin</span>
                                <span className="text-slate-800 font-mono">admin@slb.sch.id / admin123</span>
                            </div>
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-slate-600">Guru</span>
                                <span className="text-slate-800 font-mono">guru@slb.sch.id / guru123</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
