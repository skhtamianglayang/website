"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function AdminDashboard() {
    const router = useRouter();
    const { user, isAdmin, isLoading, logout } = useAuth();
    const { teachers, products, news, featuredProducts } = useData();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-600">Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) return null;

    const stats = [
        { label: "Total Guru", value: teachers.length, icon: "👨‍🏫", color: "from-emerald-500 to-teal-500", bgLight: "bg-emerald-50" },
        { label: "Total Produk", value: products.length, icon: "📦", color: "from-orange-500 to-amber-500", bgLight: "bg-orange-50" },
        { label: "Total Berita", value: news.length, icon: "📰", color: "from-blue-500 to-indigo-500", bgLight: "bg-blue-50" },
        { label: "Produk Unggulan", value: featuredProducts.length, icon: "⭐", color: "from-purple-500 to-pink-500", bgLight: "bg-purple-50" },
    ];

    const menuAkun = [
        { href: "/admin/teachers", label: "Kelola Akun Guru", desc: "Akun login untuk guru", icon: "👨‍🏫", color: "bg-emerald-100" },
        { href: "/", label: "Lihat Website", desc: "Buka halaman depan", icon: "🏠", color: "bg-slate-100" },
    ];

    const menuKonten = [
        { href: "/admin/hero-banner", label: "Hero Banner", desc: "Banner halaman utama", icon: "🎨", color: "bg-indigo-100" },
        { href: "/admin/guru-profil", label: "Profil Guru", desc: "Data guru di website", icon: "🧑‍🏫", color: "bg-emerald-100" },
        { href: "/admin/produk", label: "Produk Vokasi", desc: "Kelola produk unggulan", icon: "⭐", color: "bg-orange-100" },
        { href: "/admin/berita", label: "Berita", desc: "Kelola berita terkini", icon: "📰", color: "bg-blue-100" },
        { href: "/admin/kepala-sekolah", label: "Kepala Sekolah", desc: "Sambutan di homepage", icon: "👨‍💼", color: "bg-purple-100" },
        { href: "/admin/galeri", label: "Galeri", desc: "Foto kegiatan sekolah", icon: "🖼️", color: "bg-pink-100" },
        { href: "/admin/statistik", label: "Statistik", desc: "Data & komentar", icon: "📊", color: "bg-teal-100" },
        { href: "/admin/ppdb", label: "PPDB", desc: "Info pendaftaran", icon: "📝", color: "bg-amber-100" },
        { href: "/admin/unduhan", label: "Unduhan", desc: "File download publik", icon: "📥", color: "bg-cyan-100" },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white pt-40 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-emerald-200 text-sm">
                                {currentTime.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            </p>
                            <h1 className="text-2xl md:text-3xl font-bold mt-1">Dashboard Admin</h1>
                            <p className="text-emerald-100 mt-1">Selamat datang kembali, <strong>{user?.name}</strong></p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm">
                                🌐 Website
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 ${stat.bgLight} rounded-lg flex items-center justify-center`}>
                                    <span className="text-xl">{stat.icon}</span>
                                </div>
                                <span className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </span>
                            </div>
                            <p className="text-slate-600 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Menu Sections */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Menu Konten */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                                Kelola Konten Website
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {menuKonten.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
                                    >
                                        <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <span className="text-xl">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">{item.label}</h3>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                                    Guru Terdaftar
                                </h2>
                                <Link href="/admin/teachers" className="text-emerald-600 hover:text-emerald-700 text-sm">
                                    Lihat Semua →
                                </Link>
                            </div>
                            {teachers.length === 0 ? (
                                <p className="p-6 text-slate-500 text-center">Belum ada data guru</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Nama</th>
                                                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Email</th>
                                                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Jabatan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {teachers.slice(0, 5).map((teacher) => (
                                                <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-slate-800 font-medium">{teacher.name}</td>
                                                    <td className="px-6 py-4 text-slate-600 text-sm">{teacher.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                                                            {teacher.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
                                Aksi Cepat
                            </h2>
                            <div className="space-y-3">
                                {menuAkun.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all"
                                    >
                                        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                                            <span className="text-lg">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-800 text-sm">{item.label}</h3>
                                            <p className="text-slate-500 text-xs">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-2">Tips Admin</h3>
                            <p className="text-emerald-100 text-sm mb-4">
                                Pastikan untuk selalu memperbarui konten website secara berkala agar informasi tetap akurat dan terkini.
                            </p>
                            <Link href="/admin/berita" className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors">
                                Tambah Berita Baru →
                            </Link>
                        </div>

                        {/* System Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-bold text-slate-800 mb-3">Informasi Sistem</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Waktu Server</span>
                                    <span className="text-slate-800 font-mono">
                                        {currentTime.toLocaleTimeString("id-ID")}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Status</span>
                                    <span className="text-emerald-600 font-medium">● Online</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">User</span>
                                    <span className="text-slate-800">{user?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
