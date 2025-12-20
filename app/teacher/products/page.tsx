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

export default function TeacherProductsPage() {
    const router = useRouter();
    const { user, isTeacher, isLoading } = useAuth();
    const { products, addProduct, updateProduct, deleteProduct, getProductsByTeacher } = useData();

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
    });

    useEffect(() => {
        if (!isLoading && !isTeacher) {
            router.push("/login");
        }
    }, [isLoading, isTeacher, router]);

    if (isLoading || !isTeacher || !user) return null;

    const myProducts = getProductsByTeacher(user.id);

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
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: "", price: "", description: "", image: "", category: "Aksesoris", shopeeLink: "", whatsappLink: "" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ name: "", price: "", description: "", image: "", category: "Aksesoris", shopeeLink: "", whatsappLink: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name: formData.name,
            price: parseInt(formData.price),
            description: formData.description,
            image: formData.image || "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop",
            category: formData.category,
            shopeeLink: formData.shopeeLink || undefined,
            whatsappLink: formData.whatsappLink || undefined,
            teacherId: user.id,
            teacherName: user.name,
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
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white pt-36 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/teacher" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold">Kelola Produk</h1>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-orange-700">
                            + Tambah Produk
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {myProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Belum Ada Produk</h3>
                        <p className="text-slate-600 mb-6">Mulai tambahkan produk karya siswa Anda</p>
                        <Button onClick={() => handleOpenModal()}>+ Tambah Produk Pertama</Button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="aspect-[4/3] relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg text-slate-800 mb-1">{product.name}</h3>
                                    <p className="text-emerald-600 font-bold text-xl mb-3">
                                        Rp {product.price.toLocaleString("id-ID")}
                                    </p>
                                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(product)}
                                            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Produk</label>
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
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
