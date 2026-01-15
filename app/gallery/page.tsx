"use client";

import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Section from "../components/Section";
import { useData } from "../context/DataContext";

const categories = ["Semua", "Kegiatan", "Prestasi", "Fasilitas"];

const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
        title: "Upacara Bendera",
        category: "Kegiatan",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
        title: "Kegiatan Belajar",
        category: "Kegiatan",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
        title: "Gedung Utama",
        category: "Fasilitas",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
        title: "Ruang Kelas",
        category: "Fasilitas",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
        title: "Kelas Praktikum",
        category: "Kegiatan",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1546410531-2c13c97c4750?w=600&h=400&fit=crop",
        title: "Piala Lomba",
        category: "Prestasi",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop",
        title: "Perpustakaan",
        category: "Fasilitas",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
        title: "Kunjungan Industri",
        category: "Kegiatan",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
        title: "Workshop",
        category: "Kegiatan",
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=600&h=400&fit=crop",
        title: "Penghargaan",
        category: "Prestasi",
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
        title: "Lab Komputer",
        category: "Fasilitas",
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop",
        title: "Ekstrakurikuler",
        category: "Kegiatan",
    },
];

export default function GalleryPage() {
    const { gallery } = useData();
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

    // Hero banner state
    const [heroBanner, setHeroBanner] = useState({
        image: "/hero/hero03.jpg",
        title: "Foto Kegiatan",
        subtitle: "Foto Kegiatan SKH Tamiang Layang",
    });

    // Fetch hero banner
    useEffect(() => {
        fetch("/api/hero-banners?page=gallery")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setHeroBanner(data[0]);
                }
            })
            .catch((err) => console.error("Error fetching hero banner:", err));
    }, []);

    // Use dynamic data if available, otherwise use defaults
    const displayGallery = gallery.length > 0
        ? gallery.map((g, idx) => ({ ...g, id: idx + 1 }))
        : galleryImages;

    const filteredImages =
        activeCategory === "Semua"
            ? displayGallery
            : displayGallery.filter((img) => img.category === activeCategory);

    return (
        <>
            {/* Hero */}
            <section className="relative min-h-screen pt-[60px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('${heroBanner.image}')`,
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
                        {heroBanner.title}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        {heroBanner.subtitle}
                    </p>
                </div>
            </section>




            {/* Gallery */}
            <Section title="Foto Kegiatan" className="bg-white">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Image Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-full mb-2">
                                    {image.category}
                                </span>
                                <h3 className="text-white font-semibold">{image.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Lightbox Modal */}
            <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
                {selectedImage && (
                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="w-full max-h-[70vh] object-contain"
                        />
                        <div className="p-6">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-full mb-2">
                                {selectedImage.category}
                            </span>
                            <h3 className="text-xl font-semibold text-slate-800">{selectedImage.title}</h3>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
