"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Button from "../../components/Button";
import ImageUpload from "../../components/ImageUpload";

export default function KepalaSekolahPage() {
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();
    const { principalInfo, updatePrincipalInfo } = useData();

    const [formData, setFormData] = useState({
        name: "",
        title: "",
        image: "",
        greeting: "",
        message: "",
    });

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    useEffect(() => {
        if (principalInfo) {
            setFormData({
                name: principalInfo.name,
                title: principalInfo.title,
                image: principalInfo.image,
                greeting: principalInfo.greeting,
                message: principalInfo.message,
            });
        }
    }, [principalInfo]);

    if (isLoading || !isAdmin) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePrincipalInfo(formData);
        alert("Data kepala sekolah berhasil disimpan!");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white pt-36 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/admin" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">
                        ← Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Sambutan Kepala Sekolah</h1>
                    <p className="text-emerald-100 text-sm mt-1">Kelola informasi yang ditampilkan di halaman utama</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    {/* Preview */}
                    <div className="mb-8 p-6 bg-slate-50 rounded-xl">
                        <h3 className="text-sm font-medium text-slate-500 mb-4">Preview</h3>
                        <div className="flex gap-6 items-start">
                            <img
                                src={formData.image || "https://via.placeholder.com/150"}
                                alt="Preview"
                                className="w-32 h-40 object-cover rounded-xl shadow-lg"
                            />
                            <div>
                                <p className="text-slate-800 font-bold text-lg">{formData.name || "Nama Kepala Sekolah"}</p>
                                <p className="text-emerald-600 text-sm">{formData.title || "Jabatan"}</p>
                                <p className="text-slate-600 text-sm mt-2 italic">"{formData.greeting || "Kata pembuka..."}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="Dr. Ahmad Wijaya, M.Pd."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="Kepala Sekolah"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
                        <ImageUpload
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Kata Pembuka</label>
                        <input
                            type="text"
                            value={formData.greeting}
                            onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            placeholder="Assalamu'alaikum Wr. Wb..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Pesan / Sambutan</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            rows={6}
                            placeholder="Isi pesan sambutan kepala sekolah..."
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Link href="/admin" className="flex-1">
                            <Button type="button" variant="outline" className="w-full">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" className="flex-1">
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
