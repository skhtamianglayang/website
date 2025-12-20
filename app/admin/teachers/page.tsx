"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData, Teacher } from "../../context/DataContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

export default function TeachersPage() {
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();
    const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();

    const [showModal, setShowModal] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return null;

    const handleOpenModal = (teacher?: Teacher) => {
        if (teacher) {
            setEditingTeacher(teacher);
            setFormData({
                name: teacher.name,
                email: teacher.email,
                phone: teacher.phone,
                password: "",
            });
        } else {
            setEditingTeacher(null);
            setFormData({ name: "", email: "", phone: "", password: "" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingTeacher(null);
        setFormData({ name: "", email: "", phone: "", password: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTeacher) {
            updateTeacher(editingTeacher.id, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                ...(formData.password && { password: formData.password }),
            });
        } else {
            addTeacher({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: "teacher",
                password: formData.password,
            });
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm("Yakin ingin menghapus guru ini? Semua produk guru juga akan dihapus.")) {
            deleteTeacher(id);
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
                            <h1 className="text-2xl font-bold">Kelola Guru</h1>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-emerald-700">
                            + Tambah Guru
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {teachers.length === 0 ? (
                        <p className="p-8 text-slate-500 text-center">Belum ada data guru</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Username</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Telepon</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Role</th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map((teacher) => (
                                        <tr key={teacher.id} className="border-b last:border-0 hover:bg-slate-50">
                                            <td className="px-6 py-4 text-slate-800 font-medium">{teacher.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{teacher.email}</td>
                                            <td className="px-6 py-4 text-slate-600">{teacher.phone}</td>
                                            <td className="px-6 py-4 text-slate-600">{teacher.role}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleOpenModal(teacher)}
                                                    className="text-emerald-600 hover:text-emerald-800 font-medium mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(teacher.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
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
            </div>

            {/* Modal */}
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <div className="bg-white rounded-2xl p-8 w-[900px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        {editingTeacher ? "Edit Guru" : "Tambah Guru Baru"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Username (untuk login)</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email (untuk login)</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Password {editingTeacher && "(kosongkan jika tidak ingin mengubah)"}
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required={!editingTeacher}
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                                Batal
                            </Button>
                            <Button type="submit" className="flex-1">
                                {editingTeacher ? "Simpan" : "Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
