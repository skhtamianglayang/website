"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData, Product } from "../../context/DataContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";

const CATEGORIES = ["Aksesoris", "Kerajinan", "Makanan", "Lainnya"];

export default function AdminProductsPage() {
    const router = useRouter();
    const { user, isAdmin, isLoading } = useAuth();
    const { products, addProduct, updateProduct, deleteProduct, teachers } = useData();

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "Aksesoris",
        shopeeLink: "",
        whatsappLink: "",
        teacherId: "",
        teacherName: "",
    });

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return null;

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price.toString(),
                description: product.description,
                image: product.image,
                category: product.category,
                shopeeLink: product.shopeeLink || "",
                whatsappLink: product.whatsappLink || "",
                teacherId: product.teacherId,
                teacherName: product.teacherName,
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                price: "",
                description: "",
                image: "",
                category: "Aksesoris",
                shopeeLink: "",
                whatsappLink: "",
                teacherId: "",
                teacherName: "",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            name: "",
            price: "",
            description: "",
            image: "",
            category: "Aksesoris",
            shopeeLink: "",
            whatsappLink: "",
            teacherId: "",
            teacherName: "",
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedTeacher = teachers.find(t => t.id === formData.teacherId);

        const productData = {
            name: formData.name,
            price: parseInt(formData.price),
            description: formData.description,
            image: formData.image || "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop",
            category: formData.category,
            shopeeLink: formData.shopeeLink || undefined,
            whatsappLink: formData.whatsappLink || undefined,
            teacherId: formData.teacherId,
            teacherName: selectedTeacher?.name || formData.teacherName,
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            deleteProduct(id);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white pt-36 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/admin" className="text-emerald-200 hover:text-white text-sm mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold">Kelola Semua Produk</h1>
                            <p className="text-emerald-100 text-sm mt-1">Tambah, edit, atau hapus produk dari semua guru</p>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-emerald-700">
                            + Tambah Produk
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-slate-600 mb-1">Total Produk</p>
                        <p className="text-3xl font-bold text-slate-800">{products.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-slate-600 mb-1">Produk Unggulan</p>
                        <p className="text-3xl font-bold text-orange-600">{products.filter(p => p.isFeatured).length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-slate-600 mb-1">Total Guru</p>
                        <p className="text-3xl font-bold text-emerald-600">{teachers.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <p className="text-sm text-slate-600 mb-1">Kategori</p>
                        <p className="text-3xl font-bold text-purple-600">{CATEGORIES.length}</p>
                    </div>
                </div>

                {/* Products Grid/Table */}
                {products.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Belum Ada Produk</h3>
                        <p className="text-slate-600 mb-6">Mulai tambahkan produk karya siswa</p>
                        <Button onClick={() => handleOpenModal()}>+ Tambah Produk Pertama</Button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Produk</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Guru</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Harga</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-14 h-14 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-slate-800">{product.name}</p>
                                                        <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700">
                                                {product.teacherName}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                                Rp {product.price.toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.isFeatured ? (
                                                    <span className="px-2 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-full">
                                                        ⭐ Unggulan
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                                                        Regular
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(product)}
                                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <div className="bg-white rounded-2xl p-8 w-[900px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Foto Produk</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Guru Pengampu *</label>
                            <select
                                value={formData.teacherId}
                                onChange={(e) => {
                                    const selectedTeacher = teachers.find(t => t.id === e.target.value);
                                    setFormData({
                                        ...formData,
                                        teacherId: e.target.value,
                                        teacherName: selectedTeacher?.name || ""
                                    });
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            >
                                <option value="">-- Pilih Guru --</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Produk *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="Contoh: Gantungan Kunci Manik"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp) *</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    placeholder="15000"
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
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
                                rows={3}
                                placeholder="Deskripsi singkat produk..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Link Shopee (Opsional)</label>
                            <input
                                type="url"
                                value={formData.shopeeLink}
                                onChange={(e) => setFormData({ ...formData, shopeeLink: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="https://shopee.co.id/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Link WhatsApp (Opsional)</label>
                            <input
                                type="url"
                                value={formData.whatsappLink}
                                onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="https://wa.me/628..."
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                                Batal
                            </Button>
                            <Button type="submit" className="flex-1">
                                {editingProduct ? "Simpan" : "Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
