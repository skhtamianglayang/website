"use client";

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
    { label: "Tahun Berdiri", value: "1995" },
    { label: "Total Siswa", value: "150+" },
    { label: "Tenaga Pendidik", value: "25" },
    { label: "Program Keahlian", value: "5" },
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
    return (
        <>
            {/* Hero */}
            <section className="relative h-[calc(100vh-120px)] mt-[120px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/hero/hero03.jpg')",
                        backgroundSize: "100%", // BESARKAN GAMBAR
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                {/* Overlay transparan (tanpa warna hijau) */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center
                    px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Profil Sekolah
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Mengenal lebih dekat SLB Tunas Kasih Surabaya
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
                                SLB Tunas Kasih berdiri pada tahun 1995 atas prakarsa sekelompok pendidik dan
                                aktivis sosial yang peduli terhadap pendidikan anak berkebutuhan khusus di
                                Surabaya. Berawal dari sebuah ruangan kecil dengan beberapa siswa, sekolah ini
                                terus berkembang berkat dukungan masyarakat.
                            </p>
                            <p>
                                Pada tahun 2005, SLB Tunas Kasih mendapatkan akreditasi resmi dan mulai
                                mengembangkan program vokasi untuk membekali siswa dengan keterampilan hidup.
                                Hingga saat ini, kami telah meluluskan ratusan siswa yang mampu mandiri dan
                                berkontribusi di masyarakat.
                            </p>
                            <p>
                                Dengan motto &ldquo;Mendidik dengan Kasih, Membangun dengan Harapan&rdquo;, kami
                                terus berkomitmen memberikan pendidikan terbaik bagi anak-anak berkebutuhan khusus.
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
                            Menjadi lembaga pendidikan khusus terdepan yang menghasilkan peserta didik
                            berkebutuhan khusus yang mandiri, berkarakter, dan bermanfaat bagi masyarakat.
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
                        <ul className="text-white/90 leading-relaxed space-y-2">
                            <li>• Memberikan layanan pendidikan sesuai kebutuhan individu</li>
                            <li>• Mengembangkan potensi dan bakat setiap peserta didik</li>
                            <li>• Membekali keterampilan vokasi untuk kemandirian</li>
                            <li>• Membangun karakter dan soft skills</li>
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
