"use client";

import { useState, useEffect } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { useData } from "../context/DataContext";

const staffMembers = [
    {
        name: "Dr. Ahmad Wijaya, M.Pd.",
        role: "Kepala Sekolah",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Siti Nurhaliza, S.Pd.",
        role: "Wakil Kepala Sekolah",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Budi Santoso, S.Pd.",
        role: "Guru Kelas",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Dewi Lestari, S.Pd.",
        role: "Guru Keterampilan",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Rizky Pratama, S.Pd.",
        role: "Guru Olahraga",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Maya Sari, S.Pd.",
        role: "Guru Seni",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    },
];

const stats = [
    { label: "Tahun Berdiri", value: "2006" },
    { label: "Total Siswa", value: "150+" },
    { label: "Guru & Staff", value: "30+" },
];

// Component for displaying teachers with dynamic data
function GuruSection() {
    const { teacherProfiles } = useData();

    // Use dynamic profiles if available, otherwise fallback to hardcoded staff
    const displayTeachers = teacherProfiles.length > 0 ? teacherProfiles : null;

    return (
        <Section title="Tenaga Pendidik" subtitle="Tim pengajar profesional dan berdedikasi" className="bg-white" id="guru">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayTeachers ? (
                    displayTeachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={teacher.image}
                                alt={teacher.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-emerald-100"
                            />
                            <h3 className="font-semibold text-lg text-slate-800">{teacher.name}</h3>
                            <p className="text-emerald-600 text-sm">{teacher.role}</p>
                            {teacher.bio && (
                                <p className="text-slate-500 text-sm mt-2 line-clamp-2">{teacher.bio}</p>
                            )}
                        </div>
                    ))
                ) : (
                    staffMembers.map((member) => (
                        <div
                            key={member.name}
                            className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-emerald-100"
                            />
                            <h3 className="font-semibold text-lg text-slate-800">{member.name}</h3>
                            <p className="text-emerald-600 text-sm">{member.role}</p>
                        </div>
                    ))
                )}
            </div>
        </Section>
    );
}

export default function ProfilePage() {
    // Hero banner state
    const [heroBanner, setHeroBanner] = useState({
        image: "/hero/hero03.jpg",
        title: "Profil Sekolah",
        subtitle: "Mengenal lebih dekat SKH Tamiang Layang",
    });

    // Fetch hero banner
    useEffect(() => {
        fetch("/api/hero-banners?page=profile")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setHeroBanner(data[0]);
                }
            })
            .catch((err) => console.error("Error fetching hero banner:", err));
    }, []);

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
                    px-4 sm:px-6 lg:px-8 text-center text-white mt-40">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        {heroBanner.title}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        {heroBanner.subtitle}
                    </p>
                </div>
            </section>



            {/* Stats */}
            {/* <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="text-3xl sm:text-4xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm opacity-90">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* History */}
            <Section title="Sejarah Sekolah" className="bg-white">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                SKH Negeri 1 Tamiang Layang yang awalnya bernama SLB Negeri Tamiang Layang didirikan pada tahun 2006 dan berubah nomenklatur menjadi SKH N 1 Tamiang Layang pada Januari tahun 2025 sebagai bentuk perhatian dan tanggung jawab pemerintah dalam menyediakan layanan pendidikan khusus bagi Anak Berkebutuhan Khusus (ABK) di wilayah Kabupaten Barito Timur. Pendirian sekolah ini dilatarbelakangi oleh kebutuhan masyarakat yang semakin meningkat terhadap lembaga pendidikan yang mampu memberikan layanan pembelajaran sesuai dengan karakteristik, kemampuan, dan kebutuhan khusus peserta didik.
                            </p>
                            <p>
                                Secara geografis, SKH Negeri 1 Tamiang Layang berlokasi di Jl. Ahmad Yani Desa Matabu Rt.07, Kecamatan Dusun Timur, Kabupaten Barito Timur, Provinsi Kalimantan Tengah. Lokasi ini dipilih karena strategis dan mudah dijangkau, sehingga dapat melayani peserta didik dari berbagai kecamatan di Kabupaten Barito Timur maupun daerah sekitarnya.
                            </p>
                            <p>
                                Sejak awal berdirinya, SKH Negeri 1 Tamiang Layang berkomitmen untuk memberikan pendidikan yang bermutu, berkeadilan, dan berorientasi pada pengembangan potensi peserta didik secara menyeluruh. Proses pendidikan tidak hanya menitikberatkan pada aspek akademik, tetapi juga pada pembinaan keterampilan, kemandirian, sikap sosial, serta kesiapan peserta didik untuk hidup bermasyarakat.
                            </p>
                            <p>
                                Dalam perjalanan waktu, SKH Negeri 1 Tamiang Layang terus mengalami perkembangan baik dari segi kelembagaan, sarana dan prasarana, maupun kualitas sumber daya manusia. Berbagai program pembelajaran dan pelatihan keterampilan vokasional dikembangkan sebagai upaya membekali peserta didik dengan keterampilan hidup yang relevan. Dukungan dari pemerintah, masyarakat, serta berbagai pemangku kepentingan menjadi faktor penting dalam mendorong kemajuan sekolah hingga saat ini.
                            </p>
                            <p>
                                Dengan semangat pengabdian dan komitmen terhadap pendidikan inklusif, SKH Negeri 1 Tamiang Layang diharapkan terus menjadi pusat layanan pendidikan khusus yang unggul dan mampu mencetak lulusan yang mandiri, berkarakter, dan memiliki keterampilan sesuai dengan potensi masing-masing peserta didik.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-20" />
                        <img
                            src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"
                            alt="Gedung Sekolah"
                            className="relative rounded-2xl shadow-2xl w-full object-cover"
                        />
                    </div>
                </div>
            </Section>

            {/* Vision & Mission */}
            <Section title="Visi & Misi" className="bg-slate-50">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Visi</h3>
                        <p className="text-white/90 leading-relaxed">
                            Terwujudnya Peserta Didik yang Beriman, Berkarakter, Terampil, dan Memiliki Kecakapan Hidup
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Misi</h3>
                        <ul className="text-white/90 leading-relaxed space-y-2 text-sm">
                            <li>• Membimbing dan Mengarahkan Peserta Didik untuk Melaksanakan Ibadah sesuai Perintah Agama</li>
                            <li>• Melaksanakan Kegiatan Pembelajaran yang Inovatif melalui Pengembangan Dimensi Profil Pelajar Pancasila</li>
                            <li>• Meningkatkan Prestasi Peserta Didik dalam Bidang Potensi Akademik maupun Non Akademik</li>
                            <li>• Mengasah Potensi Peserta Didik dalam Bidang Teknologi melalui Inovasi dan Kolaborasi</li>
                            <li>• Memfasilitasi SLBN Tamiang Layang sebagai Pusat Talenta, Bahasa, dan Komunikasi Bagi Anak</li>
                            <li>• Memupuk Minat dan Bakat Peserta Didik sesuai dengan Kompetensi yang dimilikinya</li>
                            <li>• Mendorong dan Melatih Peserta Didik melalui Kegiatan Keterampilan Kecakapan Hidup dan Kewirausahaan</li>
                            <li>• Membiasakan Budaya Peduli dan Rasa Empati Terhadap Lingkungan Sekolah yang Ramah, Sehat, dan Tertib</li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Staff */}
            <GuruSection />

            {/* Contact */}
            <Section title="Hubungi Kami" className="bg-slate-50">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Address */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800 mb-2">Alamat</h3>
                        <p className="text-slate-600">Jl Ahmad Yani No.07<br />Kabupaten Barito Timur</p>
                    </div>

                    {/* Email */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800 mb-2">Email</h3>
                        <p className="text-slate-600">info@skhn1tamianglayang.sch.id</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800 mb-2">Telepon</h3>
                        <p className="text-slate-600">(031) 1234-5678</p>
                    </div>
                </div>
            </Section>
        </>
    );
}
