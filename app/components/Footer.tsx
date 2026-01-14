import Link from "next/link";
import Image from "next/image";

const footerLinks = {
    navigasi: [
        { href: "/", label: "Home" },
        { href: "/profile", label: "Profil" },
        { href: "/berita", label: "Berita" },
        { href: "/gallery", label: "Galeri" },
        { href: "/shop", label: "Produk" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/img/logo_skh.png" alt="Logo" width={100} height={100} />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Sekolah Luar Biasa yang berkomitmen untuk memberikan pendidikan berkualitas
                            bagi anak-anak berkebutuhan khusus.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Navigasi</h3>
                        <ul className="space-y-2">
                            {footerLinks.navigasi.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + Maps */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Kontak & Lokasi</h3>

                        <ul className="space-y-3 text-slate-400 text-sm mb-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-emerald-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                {/* Link ke Google Maps */}
                                <a
                                    href="https://maps.google.com/?q=-2.11587,115.16886"
                                    target="_blank"
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    Jl Ahmad Yani NO.07 KABUPATEN BARITO TIMUR.
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <span>Email:</span>
                                <span>info@skhn1tamianglayang.sch.id</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <span>Telp:</span>
                                <span>(031) 1234-5678</span>
                            </li>
                        </ul>

                        {/* Embedded Google Maps */}
                        <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-700">
                            <iframe
                                title="Lokasi Sekolah"
                                src="https://www.google.com/maps?q=-2.11587,115.16886&output=embed"
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} SKH Tamiang Layang. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
