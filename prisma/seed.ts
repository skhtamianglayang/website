import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data first
    await prisma.comment.deleteMany();
    await prisma.product.deleteMany();
    await prisma.gallery.deleteMany();
    await prisma.news.deleteMany();
    await prisma.teacherProfile.deleteMany();
    await prisma.user.deleteMany();

    // ========================
    // 2 ADMIN ACCOUNTS
    // ========================
    const admin1 = await prisma.user.create({
        data: {
            email: "admin@skh.sch.id",
            name: "admin",
            password: "admin123",
            role: "admin",
        },
    });

    const admin2 = await prisma.user.create({
        data: {
            email: "kepsek@skh.sch.id",
            name: "kepsek",
            password: "kepsek123",
            role: "admin",
        },
    });

    // ========================
    // 6 TEACHER ACCOUNTS
    // ========================
    const teacher1 = await prisma.user.create({
        data: {
            email: "budi@skh.sch.id",
            name: "budi",
            password: "guru123",
            role: "teacher",
            phone: "081234567890",
        },
    });

    const teacher2 = await prisma.user.create({
        data: {
            email: "siti@skh.sch.id",
            name: "siti",
            password: "guru123",
            role: "teacher",
            phone: "081234567891",
        },
    });

    const teacher3 = await prisma.user.create({
        data: {
            email: "andi@skh.sch.id",
            name: "andi",
            password: "guru123",
            role: "teacher",
            phone: "081234567892",
        },
    });

    const teacher4 = await prisma.user.create({
        data: {
            email: "dewi@skh.sch.id",
            name: "dewi",
            password: "guru123",
            role: "teacher",
            phone: "081234567893",
        },
    });

    const teacher5 = await prisma.user.create({
        data: {
            email: "rudi@skh.sch.id",
            name: "rudi",
            password: "guru123",
            role: "teacher",
            phone: "081234567894",
        },
    });

    const teacher6 = await prisma.user.create({
        data: {
            email: "maya@skh.sch.id",
            name: "maya",
            password: "guru123",
            role: "teacher",
            phone: "081234567895",
        },
    });

    console.log("✓ Created 2 admins and 6 teachers");

    // ========================
    // 6 TEACHER PROFILES (for homepage display)
    // ========================
    await prisma.teacherProfile.createMany({
        data: [
            {
                name: "Dr. Ahmad Wijaya, M.Pd.",
                role: "Kepala Sekolah",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
                bio: "Memimpin SKHN 1 dengan dedikasi tinggi selama 15 tahun.",
            },
            {
                name: "Siti Nurhaliza, S.Pd.",
                role: "Wakil Kepala Sekolah",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
                bio: "Berpengalaman 12 tahun dalam pendidikan anak berkebutuhan khusus.",
            },
            {
                name: "Budi Santoso, S.Pd.",
                role: "Guru Kelas",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
                bio: "Guru kelas dengan spesialisasi pendidikan anak tunagrahita.",
            },
            {
                name: "Andi Pratama, S.Pd.",
                role: "Guru Olahraga",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
                bio: "Mengembangkan program olahraga adaptif untuk siswa berkebutuhan khusus.",
            },
            {
                name: "Dewi Lestari, S.Pd.",
                role: "Guru Seni",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
                bio: "Membimbing siswa mengekspresikan kreativitas melalui seni rupa dan musik.",
            },
            {
                name: "Maya Sari, S.Pd.",
                role: "Guru Vokasi",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
                bio: "Mengajarkan keterampilan vokasi untuk kemandirian siswa.",
            },
        ],
    });

    console.log("✓ Created 6 teacher profiles");

    // ========================
    // 3 NEWS/BERITA
    // ========================
    await prisma.news.createMany({
        data: [
            {
                title: "MPLS Tahun Ajaran 2024/2025",
                date: "10 Des 2024",
                excerpt: "Pada awal tahun ajaran baru 2024/2025, SKHN 1 mengadakan kegiatan Masa Pengenalan Lingkungan Sekolah (MPLS) yang diikuti oleh seluruh siswa baru dengan penuh antusias.",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
                slug: "mpls-2024",
            },
            {
                title: "Perkemahan Kamis-Jum'at SKHN 1",
                date: "5 Des 2024",
                excerpt: "SKHN 1 menyelenggarakan kegiatan Perkemahan Kamis-Jum'at untuk membangun kemandirian dan kerjasama antar siswa dalam suasana yang menyenangkan.",
                image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop",
                slug: "perkemahan-2024",
            },
            {
                title: "Workshop Keterampilan Vokasi untuk Siswa",
                date: "1 Des 2024",
                excerpt: "Siswa kelas besar mengikuti workshop keterampilan vokasi yang meliputi menjahit, memasak, dan kerajinan tangan sebagai bekal keterampilan hidup.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
                slug: "workshop-vokasi",
            },
        ],
    });

    console.log("✓ Created 3 news items");

    // ========================
    // 3 PRODUCTS (linked to teachers)
    // ========================
    await prisma.product.createMany({
        data: [
            {
                name: "Gantungan Kunci Manik",
                price: 15000,
                description: "Gantungan kunci cantik dari manik-manik buatan tangan siswa SKHN 1. Setiap produk dibuat dengan penuh ketelitian dan kasih sayang.",
                image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop",
                category: "Aksesoris",
                teacherId: teacher1.id,
                isFeatured: true,
            },
            {
                name: "Keset Rajut Handmade",
                price: 45000,
                description: "Keset rajut berkualitas tinggi dari siswa program vokasi. Terbuat dari bahan-bahan pilihan yang awet dan mudah dibersihkan.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
                category: "Kerajinan",
                teacherId: teacher6.id,
                isFeatured: true,
            },
            {
                name: "Roti Manis Aneka Rasa",
                price: 5000,
                description: "Roti manis lezat buatan siswa tata boga dengan berbagai varian rasa. Fresh from the oven setiap hari!",
                image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
                category: "Kuliner",
                teacherId: teacher4.id,
                isFeatured: true,
            },
        ],
    });

    console.log("✓ Created 3 products");

    // ========================
    // 6 GALLERY ITEMS
    // ========================
    await prisma.gallery.createMany({
        data: [
            {
                src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
                title: "Upacara Bendera",
                category: "Kegiatan",
            },
            {
                src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
                title: "Kegiatan Belajar Mengajar",
                category: "Kegiatan",
            },
            {
                src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
                title: "Gedung Utama Sekolah",
                category: "Fasilitas",
            },
            {
                src: "https://images.unsplash.com/photo-1546410531-2c13c97c4750?w=600&h=400&fit=crop",
                title: "Koleksi Piala Prestasi",
                category: "Prestasi",
            },
            {
                src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop",
                title: "Ekskul Seni Tari",
                category: "Ekstrakurikuler",
            },
            {
                src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
                title: "Belajar Membaca Bersama",
                category: "Kegiatan",
            },
        ],
    });

    console.log("✓ Created 6 gallery items");

    // ========================
    // PRINCIPAL INFO
    // ========================
    await prisma.principalInfo.upsert({
        where: { id: "principal-1" },
        update: {},
        create: {
            id: "principal-1",
            name: "Dr. Ahmad Wijaya, M.Pd.",
            title: "Kepala Sekolah",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
            greeting: "Assalamu'alaikum Wr. Wb. Selamat datang di website resmi SKHN 1.",
            message: "Sebagai kepala sekolah, saya merasa bangga dapat memimpin sekolah yang penuh kasih sayang ini. Kami berkomitmen memberikan pendidikan terbaik bagi anak-anak berkebutuhan khusus.",
        },
    });

    console.log("✓ Created principal info");

    // ========================
    // SITE STATS
    // ========================
    await prisma.siteStats.upsert({
        where: { id: "site-stats-1" },
        update: {},
        create: {
            id: "site-stats-1",
            totalStudents: 150,
            totalTeachers: 25,
            yearFounded: 1995,
            totalPrograms: 8,
        },
    });

    console.log("✓ Created site stats");

    console.log("\n🎉 Database seeded successfully!");
    console.log("================================");
    console.log("Summary:");
    console.log("- Admin: username 'admin' / password 'admin123'");
    console.log("- Kepsek: username 'kepsek' / password 'kepsek123'");
    console.log("- 6 Teacher accounts (budi, siti, andi, dewi, rudi, maya / password: guru123)");
    console.log("- 6 Teacher profiles for homepage");
    console.log("- 3 News items");
    console.log("- 3 Products");
    console.log("- 6 Gallery items");
    console.log("- Principal info");
    console.log("- Site statistics");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
