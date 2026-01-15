"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/app/context/DataContext";
import { useAuth } from "@/app/context/AuthContext";

export default function StatsManagement() {
    const { user } = useAuth();
    const { siteStats, updateSiteStats, comments, deleteComment } = useData();

    const [stats, setStats] = useState({
        totalStudents: siteStats.totalStudents,
        totalTeachers: siteStats.totalTeachers,
        yearFounded: siteStats.yearFounded,
    });
    const [saved, setSaved] = useState(false);

    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Akses Ditolak</h1>
                    <p className="text-slate-600 mb-4">Anda harus login sebagai admin untuk mengakses halaman ini.</p>
                    <Link href="/login" className="text-emerald-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    const handleSaveStats = () => {
        updateSiteStats(stats);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDeleteComment = (id: string) => {
        if (confirm("Yakin ingin menghapus komentar ini?")) {
            deleteComment(id);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 pt-40 pb-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6">
                    <Link href="/admin" className="text-emerald-600 hover:underline flex items-center gap-2">
                        ← Kembali ke Dashboard
                    </Link>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-6">Statistik Website</h1>

                    {saved && (
                        <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded-lg">
                            ✓ Statistik berhasil disimpan!
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Jumlah Siswa Aktif
                            </label>
                            <input
                                type="number"
                                value={stats.totalStudents}
                                onChange={(e) => setStats({ ...stats, totalStudents: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Jumlah Tenaga Pendidik
                            </label>
                            <input
                                type="number"
                                value={stats.totalTeachers}
                                onChange={(e) => setStats({ ...stats, totalTeachers: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Tahun Berdiri
                            </label>
                            <input
                                type="number"
                                value={stats.yearFounded}
                                onChange={(e) => setStats({ ...stats, yearFounded: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSaveStats}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transition-all"
                    >
                        Simpan Statistik
                    </button>
                </div>

                {/* Comments Management */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Kelola Komentar Pengunjung</h2>

                    {comments.length === 0 ? (
                        <p className="text-slate-500 text-center py-8">Belum ada komentar.</p>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="font-semibold text-slate-700">{comment.name}</p>
                                        <p className="text-slate-600 text-sm mt-1">{comment.text}</p>
                                        <p className="text-slate-400 text-xs mt-2">
                                            {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
