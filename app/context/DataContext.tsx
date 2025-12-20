"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Teacher {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    password?: string;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    shopeeLink?: string;
    whatsappLink?: string;
    teacherId: string;
    teacherName: string;
    isFeatured?: boolean;
    createdAt: string;
}

export interface TeacherProfile {
    id: string;
    name: string;
    role: string;
    image: string;
    bio: string;
}

export interface News {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    slug: string;
}



export interface PrincipalInfo {
    name: string;
    title: string;
    image: string;
    greeting: string;
    message: string;
}

export interface GalleryItem {
    id: string;
    src: string;
    title: string;
    category: string;
}

export interface Comment {
    id: string;
    name: string;
    text: string;
    createdAt: string;
}

export interface SiteStats {
    totalStudents: number;
    totalTeachers: number;
    yearFounded: number;
    totalPrograms: number;
}

interface DataContextType {
    teachers: Teacher[];
    products: Product[];
    addTeacher: (teacher: Omit<Teacher, "id" | "createdAt">) => void;
    updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
    deleteTeacher: (id: string) => void;
    addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProductsByTeacher: (teacherId: string) => Product[];
    // Homepage content
    teacherProfiles: TeacherProfile[];
    news: News[];
    featuredProducts: Product[];
    addTeacherProfile: (profile: Omit<TeacherProfile, "id">) => void;
    updateTeacherProfile: (id: string, profile: Partial<TeacherProfile>) => void;
    deleteTeacherProfile: (id: string) => void;
    addNews: (news: Omit<News, "id">) => void;
    updateNews: (id: string, news: Partial<News>) => void;
    deleteNews: (id: string) => void;
    // Featured products are just products with isFeatured=true
    toggleFeaturedProduct: (id: string, isFeatured: boolean) => void;
    // Principal info
    principalInfo: PrincipalInfo;
    updatePrincipalInfo: (info: Partial<PrincipalInfo>) => void;
    // Gallery
    gallery: GalleryItem[];
    addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
    updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
    deleteGalleryItem: (id: string) => void;
    // Comments
    comments: Comment[];
    addComment: (comment: Omit<Comment, "id" | "createdAt">) => void;
    deleteComment: (id: string) => void;
    // Site Stats
    siteStats: SiteStats;
    updateSiteStats: (stats: Partial<SiteStats>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_PRINCIPAL_INFO: PrincipalInfo = {
    name: "Dr. Ahmad Wijaya, M.Pd.",
    title: "Kepala Sekolah",
    image: "",
    greeting: "",
    message: "",
};

const INITIAL_SITE_STATS: SiteStats = {
    totalStudents: 0,
    totalTeachers: 0,
    yearFounded: 0,
    totalPrograms: 0,
};

export function DataProvider({ children }: { children: ReactNode }) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [teacherProfiles, setTeacherProfiles] = useState<TeacherProfile[]>([]);
    const [news, setNews] = useState<News[]>([]);
    // featuredProducts is derived from products
    const featuredProducts = products.filter(p => p.isFeatured);

    const [principalInfo, setPrincipalInfo] = useState<PrincipalInfo>(INITIAL_PRINCIPAL_INFO);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [siteStats, setSiteStats] = useState<SiteStats>(INITIAL_SITE_STATS);

    // Fetch all data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    teachersRes,
                    productsRes,
                    teacherProfilesRes,
                    newsRes,
                    featuredRes, // Placeholder to match tuple length if needed, or remove
                    principalRes,
                    galleryRes,
                    commentsRes,
                    statsRes
                ] = await Promise.all([
                    fetch("/api/teachers"),
                    fetch("/api/products"),
                    fetch("/api/teacher-profiles"),
                    fetch("/api/news"),
                    Promise.resolve(new Response(null)), // Placeholder for removed featured-products
                    fetch("/api/principal"),
                    fetch("/api/gallery"),
                    fetch("/api/comments"),
                    fetch("/api/site-stats")
                ]);

                // Add array validation for all responses
                if (teachersRes.ok) {
                    const data = await teachersRes.json();
                    setTeachers(Array.isArray(data) ? data : []);
                }
                if (productsRes.ok) {
                    const data = await productsRes.json();
                    setProducts(Array.isArray(data) ? data : []);
                }
                if (teacherProfilesRes.ok) {
                    const data = await teacherProfilesRes.json();
                    setTeacherProfiles(Array.isArray(data) ? data : []);
                }
                if (newsRes.ok) {
                    const data = await newsRes.json();
                    setNews(Array.isArray(data) ? data : []);
                }
                if (principalRes.ok) {
                    const data = await principalRes.json();
                    setPrincipalInfo(data || INITIAL_PRINCIPAL_INFO);
                }
                if (galleryRes.ok) {
                    const data = await galleryRes.json();
                    setGallery(Array.isArray(data) ? data : []);
                }
                if (commentsRes.ok) {
                    const data = await commentsRes.json();
                    setComments(Array.isArray(data) ? data : []);
                }
                if (statsRes.ok) {
                    const data = await statsRes.json();
                    setSiteStats(data || INITIAL_SITE_STATS);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Set safe defaults on error
                setTeachers([]);
                setProducts([]);
                setTeacherProfiles([]);
                setNews([]);
                setGallery([]);
                setComments([]);
            }
        };

        fetchData();
    }, []);

    // CRUD Functions

    const addTeacher = async (teacher: Omit<Teacher, "id" | "createdAt">) => {
        const res = await fetch("/api/teachers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teacher),
        });
        if (res.ok) {
            const newTeacher = await res.json();
            setTeachers((prev) => [newTeacher, ...prev]);
        }
    };

    const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
        const res = await fetch(`/api/teachers/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (res.ok) {
            const updated = await res.json();
            setTeachers((prev) => prev.map((t) => (t.id === id ? updated : t)));
        }
    };

    const deleteTeacher = async (id: string) => {
        try {
            console.log("Deleting teacher with id:", id);
            const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
            console.log("Delete response status:", res.status);
            if (res.ok) {
                setTeachers((prev) => prev.filter((t) => t.id !== id));
                // Products are cascade deleted in DB, just refresh products or filter local
                setProducts((prev) => prev.filter((p) => p.teacherId !== id));
                console.log("Teacher deleted successfully");
            } else {
                const errorData = await res.json();
                console.error("Failed to delete teacher:", errorData);
            }
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (res.ok) {
            const newProduct = await res.json();
            setProducts((prev) => [newProduct, ...prev]);
        }
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (res.ok) {
            const updated = await res.json();
            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        }
    };

    const deleteProduct = async (id: string) => {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const getProductsByTeacher = (teacherId: string) => {
        return products.filter((p) => p.teacherId === teacherId);
    };

    const addTeacherProfile = async (profile: Omit<TeacherProfile, "id">) => {
        const res = await fetch("/api/teacher-profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        });
        if (res.ok) {
            const newProfile = await res.json();
            setTeacherProfiles((prev) => [...prev, newProfile]);
        }
    };

    const updateTeacherProfile = async (id: string, updates: Partial<TeacherProfile>) => {
        const res = await fetch(`/api/teacher-profiles/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (res.ok) {
            const updated = await res.json();
            setTeacherProfiles((prev) => prev.map((p) => (p.id === id ? updated : p)));
        }
    };

    const deleteTeacherProfile = async (id: string) => {
        const res = await fetch(`/api/teacher-profiles/${id}`, { method: "DELETE" });
        if (res.ok) {
            setTeacherProfiles((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const addNews = async (newsItem: Omit<News, "id">) => {
        const res = await fetch("/api/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newsItem),
        });
        if (res.ok) {
            const newNews = await res.json();
            setNews((prev) => [newNews, ...prev]);
        }
    };

    const updateNews = async (id: string, updates: Partial<News>) => {
        const res = await fetch(`/api/news/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (res.ok) {
            const updated = await res.json();
            setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
        }
    };

    const deleteNews = async (id: string) => {
        const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
        if (res.ok) {
            setNews((prev) => prev.filter((n) => n.id !== id));
        }
    };

    const toggleFeaturedProduct = async (id: string, isFeatured: boolean) => {
        await updateProduct(id, { isFeatured });
    };

    const updatePrincipalInfo = async (info: Partial<PrincipalInfo>) => {
        const res = await fetch("/api/principal", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        });
        if (res.ok) {
            const updated = await res.json();
            setPrincipalInfo(updated);
        }
    };

    const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
        const res = await fetch("/api/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        if (res.ok) {
            const newItem = await res.json();
            setGallery((prev) => [newItem, ...prev]);
        }
    };

    const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
        const res = await fetch(`/api/gallery/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        if (res.ok) {
            const updated = await res.json();
            setGallery((prev) => prev.map((g) => (g.id === id ? updated : g)));
        }
    };

    const deleteGalleryItem = async (id: string) => {
        const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
        if (res.ok) {
            setGallery((prev) => prev.filter((g) => g.id !== id));
        }
    };

    const addComment = async (comment: Omit<Comment, "id" | "createdAt">) => {
        const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),
        });
        if (res.ok) {
            const newComment = await res.json();
            setComments((prev) => [newComment, ...prev]);
        }
    };

    const deleteComment = async (id: string) => {
        const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
        if (res.ok) {
            setComments((prev) => prev.filter((c) => c.id !== id));
        }
    };

    const updateSiteStats = async (stats: Partial<SiteStats>) => {
        const res = await fetch("/api/site-stats", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stats),
        });
        if (res.ok) {
            const updated = await res.json();
            setSiteStats(updated);
        }
    };

    return (
        <DataContext.Provider
            value={{
                teachers,
                products,
                addTeacher,
                updateTeacher,
                deleteTeacher,
                addProduct,
                updateProduct,
                deleteProduct,
                getProductsByTeacher,
                teacherProfiles,
                news,
                featuredProducts,
                addTeacherProfile,
                updateTeacherProfile,
                deleteTeacherProfile,
                addNews,
                updateNews,
                deleteNews,
                toggleFeaturedProduct,
                principalInfo,
                updatePrincipalInfo,
                gallery,
                addGalleryItem,
                updateGalleryItem,
                deleteGalleryItem,
                comments,
                addComment,
                deleteComment,
                siteStats,
                updateSiteStats,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
