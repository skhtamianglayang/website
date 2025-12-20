"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData, TeacherProfile } from "../../context/DataContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";

export default function TeacherProfileManagementPage() {
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();
    const { teacherProfiles, addTeacherProfile, updateTeacherProfile, deleteTeacherProfile } = useData();

    const [showModal, setShowModal] = useState(false);
    const [editingProfile, setEditingProfile] = useState<TeacherProfile | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        image: "",
        bio: "",
    });

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return null;

    const handleOpenModal = (profile?: TeacherProfile) => {
        if (profile) {
            setEditingProfile(profile);
            setFormData({
                name: profile.name,
                role: profile.role,
                image: profile.image,
                bio: profile.bio,
            });
        } else {
            setEditingProfile(null);
            setFormData({ name: "", role: "", image: "", bio: "" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProfile(null);
        setFormData({ name: "", role: "", image: "", bio: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProfile) {
            updateTeacherProfile(editingProfile.id, formData);
        } else {
            addTeacherProfile(formData);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm("Yakin ingin menghapus profil guru ini?")) {
            deleteTeacherProfile(id);
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
                            <h1 className="text-2xl font-bold">Kelola Profil Guru</h1>
                            <p className="text-emerald-100 text-sm mt-1">Guru yang ditampilkan di website</p>
                        </div>
                        <Button onClick={() => handleOpenModal()} className="!bg-white !text-emerald-700">
                            + Tambah Profil
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Cards Grid */}
                {teacherProfiles.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-slate-500">Belum ada profil guru</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teacherProfiles.map((profile) => (
                            <div key={profile.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-slate-800">{profile.name}</h3>
                                    <p className="text-emerald-600 text-sm">{profile.role}</p>
                                    <p className="text-slate-600 text-sm mt-2 line-clamp-2">{profile.bio}</p>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleOpenModal(profile)}
                                            className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(profile.id)}
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
                        {editingProfile ? "Edit Profil Guru" : "Tambah Profil Guru"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                placeholder="Contoh: Guru Keterampilan"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Foto</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                rows={3}
                                required
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                                Batal
                            </Button>
                            <Button type="submit" className="flex-1">
                                {editingProfile ? "Simpan" : "Tambah"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
