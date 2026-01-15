"use client";

import { useState, useEffect } from "react";
import Section from "../components/Section";

interface Download {
    id: string;
    title: string;
    driveLink: string;
    category: string;
    createdAt: string;
}

export default function UnduhPage() {
    const [downloads, setDownloads] = useState<Download[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    // Hero banner state
    const [heroBanner, setHeroBanner] = useState({
        image: "/hero/hero06.jpg",
        title: "Unduhan",
        subtitle: "Download berkas dan dokumen resmi SKH Tamiang Layang",
    });

    useEffect(() => {
        fetchDownloads();
        // Fetch hero banner
        fetch("/api/hero-banners?page=unduhan")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setHeroBanner(data[0]);
                }
            })
            .catch((err) => console.error("Error fetching hero banner:", err));
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

    const categories = ["Semua", ...Array.from(new Set(downloads.map((d) => d.category)))];

    const filteredDownloads = selectedCategory === "Semua"
        ? downloads
        : downloads.filter((d) => d.category === selectedCategory);

    return (
        <>
            {/* Hero */}
            <section className="relative min-h-screen pt-[60px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('${heroBanner.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white mt-24">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        {heroBanner.title}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        {heroBanner.subtitle}
                    </p>
                </div>
            </section>

            {/* Downloads */}
            <Section title="Berkas Unduhan" className="bg-white">
                {/* Category Filter */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                ) : filteredDownloads.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-slate-500">Belum ada berkas unduhan</p>
                    </div>
                ) : (
                    <div className="grid gap-4 max-w-3xl mx-auto">
                        {filteredDownloads.map((item) => (
                            <a
                                key={item.id}
                                href={item.driveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-6 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all group"
                            >
                                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                    <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        <span className="inline-block px-2 py-0.5 bg-slate-200 rounded text-slate-600">
                                            {item.category}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-emerald-600 group-hover:text-emerald-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}
