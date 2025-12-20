"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function TeacherDashboard() {
    const router = useRouter();
    const { user, isTeacher, isLoading, logout } = useAuth();
    const { getProductsByTeacher } = useData();

    useEffect(() => {
        if (!isLoading && !isTeacher) {
            router.push("/login");
        }
    }, [isLoading, isTeacher, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!isTeacher || !user) return null;

    const myProducts = getProductsByTeacher(user.id);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white pt-36 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard Guru</h1>
                            <p className="text-orange-100 mt-1">Selamat datang, {user.name}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm">Produk Saya</p>
                                <p className="text-4xl font-bold mt-1">{myProducts.length}</p>
                            </div>
                            <span className="text-4xl">📦</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm">Total Nilai</p>
                                <p className="text-4xl font-bold mt-1">
                                    Rp {myProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString("id-ID")}
                                </p>
                            </div>
                            <span className="text-4xl">💰</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-slate-800 mb-4">Menu</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        href="/teacher/products"
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">📦</span>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800">Kelola Produk</h3>
                        <p className="text-slate-600 text-sm mt-1">Tambah, edit, atau hapus produk siswa</p>
                    </Link>

                    <Link
                        href="/shop"
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🛒</span>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800">Lihat Toko</h3>
                        <p className="text-slate-600 text-sm mt-1">Lihat tampilan toko produk</p>
                    </Link>

                    <Link
                        href="/"
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🏠</span>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800">Lihat Website</h3>
                        <p className="text-slate-600 text-sm mt-1">Buka halaman depan website</p>
                    </Link>
                </div>

                {/* My Products */}
                <h2 className="text-xl font-bold text-slate-800 mb-4 mt-10">Produk Saya</h2>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {myProducts.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-slate-500 mb-4">Belum ada produk</p>
                            <Link
                                href="/teacher/products"
                                className="text-emerald-600 font-medium hover:text-emerald-800"
                            >
                                + Tambah Produk Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            {myProducts.slice(0, 3).map((product) => (
                                <div key={product.id} className="bg-slate-50 rounded-xl p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
                                    />
                                    <h3 className="font-medium text-slate-800">{product.name}</h3>
                                    <p className="text-emerald-600 font-semibold">
                                        Rp {product.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
