"use client";

import { useState } from "react";
import { useData } from "../context/DataContext";
import ProductCard from "./ProductCard";
import Section from "../components/Section";

const CATEGORIES = ["Semua", "Aksesoris", "Kerajinan", "Makanan", "Lainnya"];

export default function ShopPage() {
    const { products } = useData();
    const [activeCategory, setActiveCategory] = useState("Semua");

    const filteredProducts =
        activeCategory === "Semua"
            ? products
            : products.filter((p) => p.category === activeCategory);

    return (
        <>
            {/* Hero */}
            <section className="relative h-[calc(100vh-120px)] mt-[120px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/hero/hero03.jpg')",
                        backgroundSize: "100%", // BESARKAN GAMBAR
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                {/* Overlay transparan (tanpa warna hijau) */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center
                    px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Produk Vokasi
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Karya tangan siswa SLB Tunas Kasih berkualitas dan penuh kasih
                    </p>
                </div>
            </section>


            {/* Shop Content */}
            <Section title="Katalog Produk" subtitle="Dukung karya siswa dengan membeli produk handmade kami" className="bg-white">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Belum ada produk</h3>
                        <p className="text-slate-500">Produk dalam kategori ini belum tersedia</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}
