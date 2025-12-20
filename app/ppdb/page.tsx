"use client";

import { useState, useEffect } from "react";
import Section from "../components/Section";

interface PPDBInfo {
    title: string;
    subtitle: string;
    schedule: string;
    requirements: string;
    location: string;
    contact: string;
    infoNote: string;
}

export default function PPDBPage() {
    const [ppdbInfo, setPpdbInfo] = useState<PPDBInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPPDBInfo();
    }, []);

    const fetchPPDBInfo = async () => {
        try {
            const res = await fetch("/api/ppdb");
            const data = await res.json();
            setPpdbInfo(data);
        } catch (error) {
            console.error("Error fetching PPDB info:", error);
            // Fallback data
            setPpdbInfo({
                title: "Pendaftaran Tahun Ajaran 2025/2026",
                subtitle: "Dibuka mulai Januari 2025",
                schedule: "• Gelombang 1: 2 Januari - 28 Februari 2025\n• Gelombang 2: 1 Maret - 30 April 2025\n• Gelombang 3: 1 Mei - 30 Juni 2025",
                requirements: "• Fotokopi Akta Kelahiran\n• Fotokopi Kartu Keluarga\n• Pas Foto 3x4 (4 lembar)\n• Surat Keterangan dari Dokter/Psikolog\n• Fotokopi rapor terakhir (jika ada)",
                location: "Sekretariat SKH Tamiang Layang\nJl. Ahmad Yani No. 07, Kabupaten Barito Timur\nSenin - Jumat: 08.00 - 14.00 WITA",
                contact: "Telp: (0526) 123-456\nWhatsApp: 0812-3456-7890\nEmail: ppdb@skhn1tamianglayang.sch.id",
                infoNote: "Untuk informasi lebih lanjut, silakan hubungi panitia PPDB atau datang langsung ke sekolah pada jam kerja.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const renderLines = (text: string) => {
        return text.split("\n").map((line, idx) => (
            <li key={idx}>{line}</li>
        ));
    };

    return (
        <>
            {/* Hero */}
            <section className="relative h-[calc(100vh-120px)] mt-[120px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/hero/hero02.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        PPDB
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Penerimaan Peserta Didik Baru SKH Tamiang Layang
                    </p>
                </div>
            </section>

            {/* Pengumuman */}
            <Section title="Pengumuman Pendaftaran" className="bg-white">
                <div className="max-w-4xl mx-auto">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : ppdbInfo ? (
                        <>
                            {/* Announcement Card */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-emerald-800">{ppdbInfo.title}</h3>
                                        <p className="text-emerald-600 text-sm">{ppdbInfo.subtitle}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-slate-700">
                                    <div className="bg-white rounded-xl p-4">
                                        <h4 className="font-semibold text-emerald-700 mb-2">📅 Jadwal Pendaftaran</h4>
                                        <ul className="space-y-1 text-sm">
                                            {renderLines(ppdbInfo.schedule)}
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-xl p-4">
                                        <h4 className="font-semibold text-emerald-700 mb-2">📋 Persyaratan</h4>
                                        <ul className="space-y-1 text-sm">
                                            {renderLines(ppdbInfo.requirements)}
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-xl p-4">
                                        <h4 className="font-semibold text-emerald-700 mb-2">📍 Tempat Pendaftaran</h4>
                                        <p className="text-sm whitespace-pre-line">
                                            {ppdbInfo.location}
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl p-4">
                                        <h4 className="font-semibold text-emerald-700 mb-2">📞 Kontak</h4>
                                        <p className="text-sm whitespace-pre-line">
                                            {ppdbInfo.contact}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                                <div className="flex items-center justify-center gap-2 text-amber-700 mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-semibold">Informasi</span>
                                </div>
                                <p className="text-amber-700 text-sm">
                                    {ppdbInfo.infoNote}
                                </p>
                            </div>
                        </>
                    ) : null}
                </div>
            </Section>
        </>
    );
}
