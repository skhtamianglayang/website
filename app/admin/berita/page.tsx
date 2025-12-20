"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData, News } from "../../context/DataContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";

interface NewsImage {
    id: string;
    src: string;
    caption?: string;
}

export default function NewsManagementPage() {
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();
    const { news, addNews, updateNews, deleteNews } = useData();

    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        excerpt: "",
        image: "",
        slug: "",
    });

    // Gallery images for editing
    const [galleryImages, setGalleryImages] = useState<NewsImage[]>([]);
    const [newGalleryImage, setNewGalleryImage] = useState("");

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return null;

    const fetchGalleryImages = async (newsId: string) => {
        try {
            const res = await fetch(`/api/news/${newsId}/images`);
            if (res.ok) {
                const data = await res.json();
                setGalleryImages(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery images:", error);
        }
    };

    const handleOpenModal = async (newsItem?: News) => {
        if (newsItem) {
            setEditingNews(newsItem);
            setFormData({
                title: newsItem.title,
                date: newsItem.date,
                excerpt: newsItem.excerpt,
                image: newsItem.image,
                slug: newsItem.slug,
            });
            await fetchGalleryImages(newsItem.id);
        } else {
            setEditingNews(null);
            setFormData({ title: "", date: "", excerpt: "", image: "", slug: "" });
            setGalleryImages([]);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingNews(null);
        setFormData({ title: "", date: "", excerpt: "", image: "", slug: "" });
        setGalleryImages([]);
        setNewGalleryImage("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingNews) {
            updateNews(editingNews.id, formData);
        } else {
            addNews(formData);
        }

        handleCloseModal();
    };

    const handleAddGalleryImage = async () => {
        if (!editingNews || !newGalleryImage) return;

        try {
            const res = await fetch(`/api/news/${editingNews.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ src: newGalleryImage }),
            });
            if (res.ok) {
                const newImage = await res.json();
                setGalleryImages([...galleryImages, newImage]);
                setNewGalleryImage("");
            }
        } catch (error) {
            console.error("Failed to add gallery image:", error);
        }
    };

    const handleDeleteGalleryImage = async (imageId: string) => {
        if (!editingNews) return;

        try {
            const res = await fetch(`/api/news/${editingNews.id}/images?imageId=${imageId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setGalleryImages(galleryImages.filter(img => img.id !== imageId));
            }
        } catch (error) {
            console.error("Failed to delete gallery image:", error);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Yakin ingin menghapus berita ini?")) {
            deleteNews(id);
        }
    };

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
                            <h1 className="text-2xl font-bold">Kelola Berita</h1>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-emerald-700">
                            + Tambah Berita
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Cards Grid */}
                {news.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-slate-500">Belum ada berita</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <span className="text-xs text-emerald-600 font-medium">{item.date}</span>
                                    <h3 className="font-semibold text-slate-800 mt-1 line-clamp-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm mt-2 line-clamp-2">{item.excerpt}</p>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
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
                        {editingNews ? "Edit Berita" : "Tambah Berita Baru"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="Contoh: 10 Des 2024"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="contoh-slug-berita"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                rows={3}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gambar Utama</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                            />
                        </div>

                        {/* Gallery Images - Only show when editing */}
                        {editingNews && (
                            <div className="border-t pt-4 mt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">📷 Galeri Foto Tambahan</label>

                                {/* Existing gallery images */}
                                {galleryImages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        {galleryImages.map((img) => (
                                            <div key={img.id} className="relative group">
                                                <img
                                                    src={img.src}
                                                    alt="Gallery"
                                                    className="w-full aspect-square object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteGalleryImage(img.id)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add new gallery image */}
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <ImageUpload
                                            value={newGalleryImage}
                                            onChange={(url) => setNewGalleryImage(url)}
                                        />
                                    </div>
                                    {newGalleryImage && (
                                        <button
                                            type="button"
                                            onClick={handleAddGalleryImage}
                                            className="px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                                Batal
                            </Button>
                            <Button type="submit" className="flex-1">
                                {editingNews ? "Simpan" : "Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
