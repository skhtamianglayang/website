"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../../components/Button";

interface PPDBInfo {
    id: string;
    title: string;
    subtitle: string;
    schedule: string;
    requirements: string;
    location: string;
    contact: string;
    infoNote: string;
}

export default function AdminPPDBPage() {
    const [ppdbInfo, setPpdbInfo] = useState<PPDBInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPPDBInfo();
    }, []);

    const fetchPPDBInfo = async () => {
        try {
            const res = await fetch("/api/ppdb");
            const data = await res.json();
            setPpdbInfo(data);
        } catch (error) {
            console.error("Error fetching PPDB info:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ppdbInfo) return;

        setIsSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/ppdb", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ppdbInfo),
            });

            if (res.ok) {
                setMessage("Data berhasil disimpan!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Gagal menyimpan data");
            }
        } catch (error) {
            console.error("Error saving:", error);
            setMessage("Gagal menyimpan data");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 pt-36 pb-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white pt-36 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/admin" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">
                        ← Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Kelola PPDB</h1>
                    <p className="text-emerald-100 text-sm mt-1">Edit informasi pendaftaran peserta didik baru</p>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {message && (
                    <div className={`mb-6 p-4 rounded-xl ${message.includes("berhasil") ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    {/* Title & Subtitle */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Judul</label>
                            <input
                                type="text"
                                value={ppdbInfo?.title || ""}
                                onChange={(e) => setPpdbInfo({ ...ppdbInfo!, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Subjudul</label>
                            <input
                                type="text"
                                value={ppdbInfo?.subtitle || ""}
                                onChange={(e) => setPpdbInfo({ ...ppdbInfo!, subtitle: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                    </div>

                    {/* Schedule */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">📅 Jadwal Pendaftaran</label>
                        <textarea
                            value={ppdbInfo?.schedule || ""}
                            onChange={(e) => setPpdbInfo({ ...ppdbInfo!, schedule: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            placeholder="Contoh:&#10;• Gelombang 1: 2 Januari - 28 Februari 2025&#10;• Gelombang 2: 1 Maret - 30 April 2025"
                        />
                        <p className="text-xs text-slate-500 mt-1">Gunakan baris baru untuk setiap item</p>
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">📋 Persyaratan</label>
                        <textarea
                            value={ppdbInfo?.requirements || ""}
                            onChange={(e) => setPpdbInfo({ ...ppdbInfo!, requirements: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            placeholder="Contoh:&#10;• Fotokopi Akta Kelahiran&#10;• Fotokopi Kartu Keluarga"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">📍 Tempat Pendaftaran</label>
                        <textarea
                            value={ppdbInfo?.location || ""}
                            onChange={(e) => setPpdbInfo({ ...ppdbInfo!, location: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            placeholder="Alamat dan jam operasional"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">📞 Kontak</label>
                        <textarea
                            value={ppdbInfo?.contact || ""}
                            onChange={(e) => setPpdbInfo({ ...ppdbInfo!, contact: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            placeholder="Telepon, WhatsApp, Email"
                        />
                    </div>

                    {/* Info Note */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">ℹ️ Catatan Informasi</label>
                        <textarea
                            value={ppdbInfo?.infoNote || ""}
                            onChange={(e) => setPpdbInfo({ ...ppdbInfo!, infoNote: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            placeholder="Catatan tambahan untuk calon pendaftar"
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/ppdb" target="_blank">
                            <Button type="button" className="!bg-slate-200 !text-slate-700">
                                Lihat Halaman PPDB
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
