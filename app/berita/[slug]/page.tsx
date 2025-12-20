"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useData } from "../../context/DataContext";
import Button from "../../components/Button";

interface NewsImage {
    id: string;
    src: string;
    caption?: string;
}

interface NewsComment {
    id: string;
    name: string;
    text: string;
    createdAt: string;
}

export default function BeritaDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { news } = useData();

    const [images, setImages] = useState<NewsImage[]>([]);
    const [comments, setComments] = useState<NewsComment[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [commentName, setCommentName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const article = news.find((n) => n.slug === slug);

    // Fetch images and comments
    useEffect(() => {
        if (article) {
            // Fetch images
            fetch(`/api/news/${article.id}/images`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setImages(data);
                })
                .catch(console.error);

            // Fetch comments
            fetch(`/api/news/${article.id}/comments`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setComments(data);
                })
                .catch(console.error);
        }
    }, [article]);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article || !commentName.trim() || !commentText.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/news/${article.id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: commentName, text: commentText }),
            });
            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setCommentName("");
                setCommentText("");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
        setIsSubmitting(false);
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Berita Tidak Ditemukan</h1>
                    <p className="text-slate-600 mb-6">Maaf, berita yang Anda cari tidak tersedia.</p>
                    <Link href="/berita">
                        <Button>Kembali ke Berita</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Article Header */}
            <div className="pt-[150px] pb-8 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/berita" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Berita
                    </Link>
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                            {article.date}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{article.title}</h1>
                    <div className="aspect-video rounded-xl overflow-hidden">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <article className="prose prose-lg max-w-none">
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {article.excerpt}
                    </p>
                </article>

                {/* Image Gallery Carousel */}
                {images.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-slate-800 mb-4"></h3>
                        <div className="relative">
                            {/* Main Image */}
                            <div
                                className="aspect-video rounded-xl overflow-hidden cursor-pointer bg-slate-100"
                                onClick={() => setSelectedImage(images[currentImageIndex]?.src)}
                            >
                                <img
                                    src={images[currentImageIndex]?.src}
                                    alt={images[currentImageIndex]?.caption || "Foto berita"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + Math.min(images.length, 5)) % Math.min(images.length, 5))}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % Math.min(images.length, 5))}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Dot Indicators */}
                            {images.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {images.slice(0, 5).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-3 h-3 rounded-full transition-all ${idx === currentImageIndex ? 'bg-emerald-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                    {images.slice(0, 5).map((img, idx) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-emerald-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.caption || `Foto ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Lightbox */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white text-3xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                )}

                {/* Comments Section */}
                <div className="mt-12 pt-8 border-t">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">💬 Komentar ({comments.length})</h3>

                    {/* Comment Form */}
                    <form onSubmit={handleSubmitComment} className="bg-slate-50 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-slate-700 mb-4">Tulis Komentar</h4>

                        {showSuccess && (
                            <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded-lg text-sm">
                                ✓ Komentar berhasil dikirim!
                            </div>
                        )}

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nama Anda"
                                value={commentName}
                                onChange={(e) => setCommentName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                required
                            />
                            <textarea
                                placeholder="Tulis komentar..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
                                required
                            />
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
                            </Button>
                        </div>
                    </form>

                    {/* Comments List */}
                    {comments.length === 0 ? (
                        <p className="text-slate-500 text-center py-8">Belum ada komentar. Jadilah yang pertama!</p>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-slate-800">{comment.name}</span>
                                        <span className="text-xs text-slate-500">
                                            {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-slate-600">{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-12 pt-8 border-t">
                    <Link href="/berita">
                        <Button variant="outline">
                            ← Kembali ke Daftar Berita
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
