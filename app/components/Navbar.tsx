"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const navLinks = [
    { href: "/", label: "HOME" },
    {
        href: "/profile",
        label: "PROFIL",
        submenu: [
            { href: "/profile", label: "Sekolah" },
            { href: "/profile#guru", label: "Guru" },
            { href: "/profile#siswa", label: "Siswa" },
        ],
    },
    { href: "/berita", label: "BERITA" },
    { href: "/gallery", label: "GALERI" },
    { href: "/shop", label: "VOKASI" },
    { href: "/unduhan", label: "UNDUHAN" },
    { href: "/ppdb", label: "PPDB" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { isAuthenticated, isAdmin, isTeacher, user, logout } = useAuth();

    const dashboardLink = isAdmin ? "/admin" : isTeacher ? "/teacher" : null;

    // Hide navbar on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past 100px
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            {/* Top Row: Logos */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex items-center justify-between py-2 sm:py-3">
                    {/* Logo Kiri */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-14 md:w-16 sm:h-14 md:h-16 flex items-center justify-center">
                            <Image src="/img/logo_skh.png" alt="Logo SKH" width={60} height={60} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="block text-emerald-800 font-bold text-sm md:text-lg leading-tight">
                                SKH Tamiang Layang
                            </span>
                            <span className="block text-emerald-600 text-xs">Kalimantan Tengah</span>
                        </div>
                    </Link>

                    {/* Logo Kanan + Mobile Menu */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-14 md:w-16 sm:h-14 md:h-16 flex items-center justify-center">
                            <Image src="/img/bulls2.png" alt="Logo 2" width={60} height={60} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-emerald-50 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Navigation Menu (Desktop) */}
            <div className="hidden lg:block bg-gradient-to-r from-emerald-600 to-teal-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-1 py-2">
                        {navLinks.map((link) => (
                            <div
                                key={link.href}
                                className="relative group"
                                onMouseEnter={() => link.submenu && setOpenSubmenu(link.label)}
                                onMouseLeave={() => setOpenSubmenu(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="px-5 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-200 font-medium text-sm flex items-center gap-1"
                                >
                                    {link.label}
                                    {link.submenu && (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </Link>
                                {link.submenu && openSubmenu === link.label && (
                                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-emerald-100 py-2 min-w-[160px] animate-fade-in z-50">
                                        {link.submenu.map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                className="block px-4 py-2 text-sm text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Auth Links - Only show when authenticated */}
                        {isAuthenticated && (
                            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/30">
                                {dashboardLink && (
                                    <Link
                                        href={dashboardLink}
                                        className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all duration-200 font-medium text-sm"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 font-medium text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="px-4 py-2 space-y-1 bg-white border-t border-emerald-100">
                    {navLinks.map((link) => (
                        <div key={link.href}>
                            <Link
                                href={link.href}
                                onClick={() => !link.submenu && setIsOpen(false)}
                                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 font-medium"
                            >
                                {link.label}
                            </Link>
                            {link.submenu && (
                                <div className="pl-6">
                                    {link.submenu.map((sub) => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mobile Auth - Only show when authenticated */}
                    {isAuthenticated && (
                        <div className="border-t border-slate-100 pt-2 mt-2">
                            {dashboardLink && (
                                <Link
                                    href={dashboardLink}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-lg text-emerald-700 bg-emerald-50 font-medium"
                                >
                                    Dashboard ({user?.name})
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
