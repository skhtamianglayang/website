"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData, GalleryItem } from "../../context/DataContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";

const categories = ["Kegiatan", "Prestasi", "Fasilitas"];

export default function GalleryManagementPage() {
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();
    const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData();

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [formData, setFormData] = useState({
        src: "",
        title: "",
        category: "Kegiatan",
    });

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return null;

    const handleOpenModal = (item?: GalleryItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                src: item.src,
                title: item.title,
                category: item.category,
            });
        } else {
            setEditingItem(null);
            setFormData({ src: "", title: "", category: "Kegiatan" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ src: "", title: "", category: "Kegiatan" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            updateGalleryItem(editingItem.id, formData);
        } else {
            addGalleryItem(formData);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm("Yakin ingin menghapus gambar ini?")) {
            deleteGalleryItem(id);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white pt-36 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/admin" className="text-purple-200 hover:text-white text-sm mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold">Kelola Galeri</h1>
                            <p className="text-purple-100 text-sm mt-1">Foto yang ditampilkan di halaman galeri</p>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-purple-700">
                            + Tambah Foto
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Cards Grid */}
                {gallery.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-slate-500">Belum ada foto galeri</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {gallery.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-purple-600 text-white rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <div className="bg-white rounded-2xl p-8 w-[900px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        {editingItem ? "Edit Foto" : "Tambah Foto Baru"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
                            <ImageUpload
                                value={formData.src}
                                onChange={(url) => setFormData({ ...formData, src: url })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                                placeholder="Contoh: Upacara Bendera"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                                Batal
                            </Button>
                            <Button type="submit" className="flex-1">
                                {editingItem ? "Simpan" : "Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
