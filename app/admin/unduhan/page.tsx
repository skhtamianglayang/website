"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

interface Download {
    id: string;
    title: string;
    driveLink: string;
    category: string;
    createdAt: string;
}

export default function AdminDownloadPage() {
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Download | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        driveLink: "",
        category: "Umum",
    });

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const res = await fetch("/api/downloads");
            const data = await res.json();
            // Ensure data is an array before setting state
            setDownloads(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching downloads:", error);
            setDownloads([]); // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (item?: Download) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                driveLink: item.driveLink,
                category: item.category,
            });
        } else {
            setEditingItem(null);
            setFormData({ title: "", driveLink: "", category: "Umum" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ title: "", driveLink: "", category: "Umum" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem) {
                await fetch(`/api/downloads/${editingItem.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch("/api/downloads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }
            fetchDownloads();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus file ini?")) return;

        try {
            await fetch(`/api/downloads/${id}`, { method: "DELETE" });
            fetchDownloads();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const categories = ["Umum", "Formulir", "Kurikulum", "Laporan", "Lainnya"];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white pt-36 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/admin" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold">Kelola Unduhan</h1>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-emerald-700">
                            + Tambah File
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                ) : downloads.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl">
                        <p className="text-slate-500">Belum ada file unduhan</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Judul</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Kategori</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Link</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {downloads.map((item) => (
                                    <tr key={item.id} className="border-b last:border-0 hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-800 font-medium">{item.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={item.driveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-600 hover:underline text-sm truncate block max-w-[200px]"
                                            >
                                                {item.driveLink}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleOpenModal(item)}
                                                className="text-blue-600 hover:text-blue-800 text-sm mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <div className="bg-white rounded-2xl p-8 w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        {editingItem ? "Edit File Unduhan" : "Tambah File Unduhan"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Judul File</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="Contoh: Formulir Pendaftaran PPDB"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Link Google Drive</label>
                            <input
                                type="url"
                                value={formData.driveLink}
                                onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="https://drive.google.com/..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" onClick={handleCloseModal} className="!bg-slate-200 !text-slate-700">
                                Batal
                            </Button>
                            <Button type="submit">
                                {editingItem ? "Simpan" : "Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
