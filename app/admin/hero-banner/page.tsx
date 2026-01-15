"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeroBanner {
    id: string;
    page: string;
    order: number;
    image: string;
    title: string;
    subtitle: string;
    isActive: boolean;
}

const PAGES = [
    { value: "home", label: "Homepage (Carousel)" },
    { value: "berita", label: "Berita" },
    { value: "gallery", label: "Galeri" },
    { value: "ppdb", label: "PPDB" },
    { value: "profile", label: "Profil" },
    { value: "unduhan", label: "Unduhan" },
];

export default function HeroBannerAdmin() {
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState("home");
    const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Form state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        page: "home",
        order: 0,
        image: "",
        title: "",
        subtitle: "",
        isActive: true,
    });
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchHeroBanners();
    }, []);

    const fetchHeroBanners = async () => {
        try {
            const res = await fetch("/api/hero-banners");
            const data = await res.json();
            setHeroBanners(data);
        } catch (error) {
            console.error("Error fetching hero banners:", error);
            setMessage("❌ Gagal memuat data");
        } finally {
            setLoading(false);
        }
    };

    const filteredBanners = heroBanners.filter((b) => b.page === selectedPage);

    const handleEdit = (banner: HeroBanner) => {
        setEditingId(banner.id);
        setFormData({
            page: banner.page,
            order: banner.order,
            image: banner.image,
            title: banner.title,
            subtitle: banner.subtitle,
            isActive: banner.isActive,
        });
        setSelectedFile(null);
    };

    const handleFileUpload = async (file: File) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, image: data.url })); // Use data.url from Vercel Blob
                setMessage('✅ Gambar berhasil diupload!');
                setTimeout(() => setMessage(''), 2000);
            } else {
                const error = await res.json();
                setMessage(`❌ ${error.error || 'Gagal upload gambar'}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('❌ Terjadi kesalahan saat upload');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            handleFileUpload(file);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const url = editingId
                ? `/api/hero-banners/${editingId}`
                : "/api/hero-banners";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("✅ Hero banner berhasil disimpan!");
                await fetchHeroBanners();
                resetForm();
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("❌ Gagal menyimpan hero banner");
            }
        } catch (error) {
            console.error("Error saving hero banner:", error);
            setMessage("❌ Terjadi kesalahan");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus hero banner ini?")) return;

        try {
            const res = await fetch(`/api/hero-banners/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setMessage("✅ Hero banner berhasil dihapus!");
                await fetchHeroBanners();
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("❌ Gagal menghapus hero banner");
            }
        } catch (error) {
            console.error("Error deleting hero banner:", error);
            setMessage("❌ Terjadi kesalahan");
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            page: selectedPage,
            order: selectedPage === "home" ? filteredBanners.length : 0,
            image: "",
            title: "",
            subtitle: "",
            isActive: true,
        });
        setSelectedFile(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-40 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Kelola Hero Banner
                    </h1>
                    <p className="text-slate-600">
                        Ubah gambar dan teks hero banner untuk setiap halaman
                    </p>
                </div>

                {/* Message */}
                {message && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg">
                        {message}
                    </div>
                )}

                {/* Page Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-1 flex flex-wrap gap-2">
                    {PAGES.map((page) => (
                        <button
                            key={page.value}
                            onClick={() => {
                                setSelectedPage(page.value);
                                resetForm();
                            }}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${selectedPage === page.value
                                ? "bg-emerald-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {page.label}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Form Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">
                            {editingId ? "Edit Hero Banner" : "Tambah Hero Banner"}
                        </h2>

                        <div className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Upload Gambar
                                </label>
                                <div className="flex gap-2">
                                    <label className="flex-1 cursor-pointer">
                                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
                                            {uploading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                                                    <span className="text-slate-600">Uploading...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="text-sm text-slate-600">
                                                        {selectedFile ? selectedFile.name : "Klik untuk upload gambar"}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        JPEG, PNG, WebP (max 5MB)
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Or separator */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-slate-500">atau</span>
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    URL Gambar
                                </label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.value })
                                    }
                                    placeholder="/hero/hero.jpg"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Atau masukkan URL gambar manual
                                </p>
                            </div>

                            {/* Image Preview */}
                            {formData.image && (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="Selamat Datang di SKH Tamiang Layang"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Subtitle
                                </label>
                                <textarea
                                    value={formData.subtitle}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subtitle: e.target.value })
                                    }
                                    placeholder="Mendidik dengan Kasih, Membangun dengan Harapan"
                                    rows={3}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>

                            {/* Order (for homepage only) */}
                            {selectedPage === "home" && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Urutan Slide (0, 1, 2, ...)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                order: parseInt(e.target.value) || 0,
                                            })
                                        }
                                        min="0"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            )}

                            {/* Active Toggle */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) =>
                                        setFormData({ ...formData, isActive: e.target.checked })
                                    }
                                    className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                                />
                                <label htmlFor="isActive" className="ml-2 text-sm text-slate-700">
                                    Aktif
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4">
                                <button
                                    onClick={handleSave}
                                    disabled={saving || !formData.image || !formData.title}
                                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? "Menyimpan..." : editingId ? "Update" : "Tambah"}
                                </button>
                                {editingId && (
                                    <button
                                        onClick={resetForm}
                                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">
                            Hero Banner - {PAGES.find((p) => p.value === selectedPage)?.label}
                        </h2>

                        {filteredBanners.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <p>Belum ada hero banner</p>
                                <p className="text-sm mt-2">Tambah hero banner baru di form sebelah kiri</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBanners
                                    .sort((a, b) => a.order - b.order)
                                    .map((banner) => (
                                        <div
                                            key={banner.id}
                                            className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors"
                                        >
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-24 h-16 rounded overflow-hidden bg-slate-100">
                                                    <img
                                                        src={banner.image}
                                                        alt={banner.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-slate-800 truncate">
                                                        {banner.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 line-clamp-2">
                                                        {banner.subtitle}
                                                    </p>
                                                    {selectedPage === "home" && (
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            Slide #{banner.order}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded ${banner.isActive
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : "bg-slate-100 text-slate-600"
                                                                }`}
                                                        >
                                                            {banner.isActive ? "Aktif" : "Nonaktif"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                                                <button
                                                    onClick={() => handleEdit(banner)}
                                                    className="flex-1 text-sm py-2 px-3 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="flex-1 text-sm py-2 px-3 bg-red-50 text-red-600 rounded hover:bg-red-100"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
