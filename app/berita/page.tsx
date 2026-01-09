"use client";

import Link from "next/link";
import Section from "../components/Section";
import NewsCard from "../components/NewsCard";
import { useData } from "../context/DataContext";

export default function BeritaPage() {
    const { news } = useData();

    return (
        <>
            {/* Hero */}
            <section className="relative min-h-screen pt-[60px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/hero/hero05.jpg')",
                        backgroundSize: "100%", // BESARKAN GAMBAR
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                {/* Overlay transparan (tanpa warna hijau) */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center
                    px-4 sm:px-6 lg:px-8 text-center text-white mt-24">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Berita & Kegiatan
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Informasi terbaru seputar kegiatan dan berita dari SKH Tamiang Layang
                    </p>
                </div>
            </section>


            {/* News List */}
            <Section title="Berita Terkini" className="bg-white">
                {news.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">Belum ada berita</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}
