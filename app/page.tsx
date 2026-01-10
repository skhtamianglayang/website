"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroCarousel from "./components/HeroCarousel";
import Section from "./components/Section";
import NewsCard, { NewsItem } from "./components/NewsCard";
import Button from "./components/Button";
import { useData } from "./context/DataContext";

const carouselSlides = [
  {
    image: "/hero/hero.jpg",
    title: "Selamat Datang di SKH Tamiang Layang",
    subtitle: "Mendidik dengan Kasih, Membangun dengan Harapan",
  },
  {
    image: "/hero/hero01.jpg",
    title: "Pendidikan Berkualitas untuk Semua",
    subtitle: "Kami berkomitmen memberikan pendidikan terbaik bagi anak berkebutuhan khusus",
  },
  {
    image: "/hero/hero02.jpg",
    title: "Fasilitas Modern & Lengkap",
    subtitle: "Lingkungan belajar yang nyaman dan mendukung perkembangan siswa",
  },
  {
    image: "/hero/hero.jpg",
    title: "Fasilitas Modern & Lengkap",
    subtitle: "Lingkungan belajar yang nyaman dan mendukung perkembangan siswa",
  }
];

const newsItems: NewsItem[] = [
  {
    id: "news-1",
    title: "MPLS SKH Tamiang Layang",
    date: "10 Des 2024",
    excerpt: "Pada awal tahun ajaran baru 2024/2025, SKH mengadakan kegiatan Masa Pengenalan Lingkungan Sekolah...",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    slug: "mpls-2024",
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Gantungan Kunci Manik",
    price: 15000,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Keset Rajut Handmade",
    price: 45000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Bros Kain Perca",
    price: 20000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Taplak Meja Sulam",
    price: 75000,
    image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=300&h=300&fit=crop",
  },
];

export default function Home() {
  const { news: dynamicNews, featuredProducts: dynamicProducts, teacherProfiles, principalInfo, comments: dynamicComments, addComment, siteStats } = useData();

  // Comment form state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showCommentSuccess, setShowCommentSuccess] = useState(false);

  const handleSubmitComment = () => {
    if (commentName.trim() && commentText.trim()) {
      addComment({ name: commentName.trim(), text: commentText.trim() });
      setCommentName("");
      setCommentText("");
      setShowCommentSuccess(true);
      setTimeout(() => setShowCommentSuccess(false), 3000);
    }
  };

  // Use dynamic data if available, otherwise fall back to defaults
  const displayNews: NewsItem[] = dynamicNews.length > 0
    ? dynamicNews
    : newsItems;

  const displayProducts = dynamicProducts.length > 0 ? dynamicProducts : featuredProducts;

  // Auto-slide for produk unggulan
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Auto-slide for comments (3 at a time)
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    if (dynamicComments.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentCommentIndex((prev) => (prev + 1) % dynamicComments.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [dynamicComments.length]);

  // Get 3 comments starting from current index (wrap around)
  const displayedComments = dynamicComments.length <= 3
    ? dynamicComments
    : Array.from({ length: 3 }, (_, i) => dynamicComments[(currentCommentIndex + i) % dynamicComments.length]);

  // Gallery auto-slide (4 items at a time)
  const { gallery } = useData();
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    if (gallery.length <= 4) return;
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [gallery.length]);

  const displayedGallery = gallery.length <= 4
    ? gallery
    : Array.from({ length: 4 }, (_, i) => gallery[(currentGalleryIndex + i) % gallery.length]);

  useEffect(() => {
    if (displayProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % displayProducts.length);
    }, 3500); // Produk unggulan 3.5s
    return () => clearInterval(interval);
  }, [displayProducts.length]);

  const currentProduct = displayProducts[currentProductIndex] || displayProducts[0];

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel slides={carouselSlides} />

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">👨‍🎓</span>
              <span className="text-2xl md:text-3xl font-bold">{siteStats.totalStudents}</span>
              <span className="text-sm opacity-90">Siswa Aktif</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">👩‍🏫</span>
              <span className="text-2xl md:text-3xl font-bold">{siteStats.totalTeachers}</span>
              <span className="text-sm opacity-90">Tenaga Pendidik</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">🏫</span>
              <span className="text-2xl md:text-3xl font-bold">{siteStats.yearFounded}</span>
              <span className="text-sm opacity-90">Tahun Berdiri</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1">🎯</span>
              <span className="text-2xl md:text-3xl font-bold">{siteStats.totalPrograms}</span>
              <span className="text-sm opacity-90">Program Keahlian</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout with Sidebar */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left - Main Content (3 columns) */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {/* Sambutan Kepala Sekolah */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                  Sambutan Kepala Sekolah
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={principalInfo.image}
                      alt={principalInfo.name}
                      className="w-36 h-48 object-cover rounded-xl mx-auto md:mx-0"
                    />
                    <div className="text-center md:text-left mt-3">
                      <p className="font-semibold text-slate-800">{principalInfo.name}</p>
                      <p className="text-emerald-600 text-sm">{principalInfo.title}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600 leading-relaxed mb-3 italic">
                      "{principalInfo.greeting}"
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {principalInfo.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-100 mb-10" />

              {/* Tenaga Pendidik */}
              {teacherProfiles.length > 0 && (
                <>
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                        Tenaga Pendidik
                      </h2>
                      <Link href="/profile#guru" className="text-emerald-600 hover:text-emerald-700 text-sm">Lihat Semua →</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {teacherProfiles.slice(0, 4).map((teacher) => (
                        <div key={teacher.id} className="text-center">
                          <img
                            src={teacher.image}
                            alt={teacher.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-2 ring-2 ring-slate-100"
                          />
                          <h3 className="font-medium text-sm text-slate-800">{teacher.name}</h3>
                          <p className="text-emerald-600 text-xs">{teacher.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="border-slate-100 mb-10" />
                </>
              )}

              {/* Berita Terkini */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                    Berita Terkini
                  </h2>
                  <Link href="/berita" className="text-emerald-600 hover:text-emerald-700 text-sm">Lihat Semua →</Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {displayNews.slice(0, 4).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-100 mb-10" />

              {/* Video Section */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                  Video Kegiatan
                </h2>
                <a
                  href="https://www.youtube.com/watch?v=Xf_iMlq9-Fs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-video rounded-xl overflow-hidden group"
                >
                  <img
                    src="https://img.youtube.com/vi/Xf_iMlq9-Fs/maxresdefault.jpg"
                    alt="Video Kegiatan SKH"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              {/* Divider */}
              <hr className="border-slate-100 mb-10" />

              {/* Galeri Preview */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                    Galeri
                  </h2>
                  <Link href="/gallery" className="text-emerald-600 hover:text-emerald-700 text-sm">Lihat Semua →</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {displayedGallery.slice(0, 4).map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-100 mb-10" />

              {/* Komentar */}
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                  Komentar Pengunjung
                </h2>
                {/* Comment Form */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm bg-white"
                    />
                    <textarea
                      placeholder="Tulis komentar..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none text-sm bg-white"
                    />
                    <button
                      onClick={handleSubmitComment}
                      disabled={!commentName.trim() || !commentText.trim()}
                      className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    >
                      Kirim Komentar
                    </button>
                  </div>
                </div>
                {showCommentSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm text-center">
                    ✓ Komentar berhasil dikirim!
                  </div>
                )}
                {/* Comments List */}
                <div className="space-y-4">
                  {displayedComments.slice(0, 3).map((comment, idx) => (
                    <div key={`${comment.id}-${idx}`} className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm italic mb-2">"{comment.text}"</p>
                      <p className="text-emerald-600 text-xs font-medium">— {comment.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar (1 column) */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Audio Player */}
                {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                      Mars Sekolah
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Pandanglah Aku</p>
                    <audio controls className="w-full h-10" preload="metadata">
                      <source src="/lagu-pandanglah-aku.ogg" type="audio/ogg" />
                    </audio>
                  </div>
                </div> */}

                {/* YouTube Preview */}
                <a href="https://www.youtube.com/watch?v=Xf_iMlq9-Fs" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative aspect-video bg-slate-200">
                    <img
                      src="https://img.youtube.com/vi/Xf_iMlq9-Fs/maxresdefault.jpg"
                      alt="YouTube Video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-xs group-hover:text-red-600 transition-colors">YouTube</p>
                      <p className="text-xs text-slate-500">Video Kegiatan Sekolah</p>
                    </div>
                  </div>
                </a>

                {/* Instagram Preview */}
                <a href="https://www.instagram.com/p/DJ_t4FtzSjd/?igsh=MWxuazM3amhvdzBoeg==" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square">
                    <img
                      src="/img/ig-preview.jpg"
                      alt="Instagram SKH"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-xs group-hover:text-pink-600 transition-colors">Instagram</p>
                      <p className="text-xs text-slate-500">@skhn1tamianglayang</p>
                    </div>
                  </div>
                </a>

                {/* Produk Unggulan - Auto Slide */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Produk Unggulan</h3>
                    <Link href="/shop" className="text-xs text-white/80 hover:text-white">Semua →</Link>
                  </div>
                  <div className="p-4">
                    {currentProduct && (
                      <Link href="/shop" className="block group">
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                          <img
                            src={currentProduct.image}
                            alt={currentProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <p className="font-bold text-lg">{currentProduct.name}</p>
                            <p className="text-emerald-300 font-bold">Rp {currentProduct.price.toLocaleString("id-ID")}</p>
                          </div>
                        </div>
                        {/* Dots indicator */}
                        <div className="flex justify-center gap-1.5">
                          {displayProducts.slice(0, 4).map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full transition-colors ${idx === currentProductIndex % Math.min(displayProducts.length, 4)
                                ? "bg-emerald-600"
                                : "bg-slate-300"
                                }`}
                            />
                          ))}
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pendaftaran Siswa Baru</h2>
          <p className="text-lg opacity-90 mb-8">
            Daftarkan putra-putri Anda sekarang dan bergabung bersama keluarga besar SLB Tunas Kasih.
          </p>
          <Link href="/ppdb">
            <Button
              size="lg"
              className="!bg-white !text-emerald-700 hover:!bg-slate-100"
            >
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
