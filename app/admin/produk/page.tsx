"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useData, Product } from "../../context/DataContext";
import Button from "../../components/Button";

export default function FeaturedProductManagementPage() {
    const router = useRouter();
    const { isAdmin, isLoading } = useAuth();
    const { products, toggleFeaturedProduct } = useData();

    // Derived state for display
    const featuredProducts = products.filter(p => p.isFeatured);
    const nonFeaturedProducts = products.filter(p => !p.isFeatured);

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push("/login");
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading || !isAdmin) return null;

    const handleToggle = (id: string, currentStatus: boolean | undefined) => {
        toggleFeaturedProduct(id, !currentStatus);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white pt-36 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/admin" className="text-orange-200 hover:text-white text-sm mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold">Kelola Produk Unggulan</h1>
                            <p className="text-orange-100 text-sm mt-1">Pilih produk dari guru untuk ditampilkan di homepage</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Section: Produk Unggulan Aktif */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="text-2xl">🌟</span> Produk Unggulan Aktif
                    </h2>

                    {featuredProducts.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border-2 border-dashed border-slate-200">
                            <p className="text-slate-500">Belum ada produk unggulan dipilih.</p>
                            <p className="text-sm text-slate-400 mt-1">Pilih dari daftar produk di bawah.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
                                    <div className="aspect-square relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-slate-800 line-clamp-1">{product.name}</h3>
                                        <p className="text-orange-600 font-bold text-sm mt-1">
                                            Rp {product.price.toLocaleString("id-ID")}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">Oleh: {product.teacherName}</p>
                                        <button
                                            onClick={() => handleToggle(product.id, true)}
                                            className="mt-3 w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                        >
                                            Hapus dari Unggulan
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Section: Semua Produk */}
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="text-2xl">📦</span> Pilih Produk Lainnya
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Guru</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Harga</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {nonFeaturedProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <span className="font-medium text-slate-800">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {product.teacherName}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                                Rp {product.price.toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleToggle(product.id, false)}
                                                    className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                                                >
                                                    Jadikan Unggulan
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {nonFeaturedProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-500 text-sm">
                                                Semua produk sudah menjadi produk unggulan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
