import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedHeroBanners() {
    console.log('🌱 Seeding hero banners...');

    // Homepage carousel slides (4 slides)
    const homeSlides = [
        {
            page: 'home',
            order: 0,
            image: '/hero/hero.jpg',
            title: 'Selamat Datang di SKH Tamiang Layang',
            subtitle: 'Mendidik dengan Kasih, Membangun dengan Harapan',
            isActive: true,
        },
        {
            page: 'home',
            order: 1,
            image: '/hero/hero01.jpg',
            title: 'Pendidikan Berkualitas untuk Semua',
            subtitle: 'Kami berkomitmen memberikan pendidikan terbaik bagi anak berkebutuhan khusus',
            isActive: true,
        },
        {
            page: 'home',
            order: 2,
            image: '/hero/hero02.jpg',
            title: 'Fasilitas Modern & Lengkap',
            subtitle: 'Lingkungan belajar yang nyaman dan mendukung perkembangan siswa',
            isActive: true,
        },
        {
            page: 'home',
            order: 3,
            image: '/hero/hero.jpg',
            title: 'Fasilitas Modern & Lengkap',
            subtitle: 'Lingkungan belajar yang nyaman dan mendukung perkembangan siswa',
            isActive: true,
        },
    ];

    // Other pages hero banners
    const otherPages = [
        {
            page: 'berita',
            order: 0,
            image: '/hero/hero05.jpg',
            title: 'Berita & Kegiatan',
            subtitle: 'Informasi terbaru seputar kegiatan dan berita dari SKH Tamiang Layang',
            isActive: true,
        },
        {
            page: 'gallery',
            order: 0,
            image: '/hero/hero02.jpg',
            title: 'Galeri Kegiatan',
            subtitle: 'Dokumentasi kegiatan dan momen berharga di SKH Tamiang Layang',
            isActive: true,
        },
        {
            page: 'ppdb',
            order: 0,
            image: '/hero/hero01.jpg',
            title: 'Pendaftaran Peserta Didik Baru',
            subtitle: 'Bergabunglah bersama keluarga besar SKH Tamiang Layang',
            isActive: true,
        },
        {
            page: 'profile',
            order: 0,
            image: '/hero/hero.jpg',
            title: 'Profil Sekolah',
            subtitle: 'Mengenal lebih dekat SKH Tamiang Layang',
            isActive: true,
        },
        {
            page: 'unduhan',
            order: 0,
            image: '/hero/hero02.jpg',
            title: 'Unduhan',
            subtitle: 'Download berkas dan dokumen penting sekolah',
            isActive: true,
        },
    ];

    // Seed all hero banners
    const allBanners = [...homeSlides, ...otherPages];

    for (const banner of allBanners) {
        await prisma.heroBanner.upsert({
            where: {
                page_order: {
                    page: banner.page,
                    order: banner.order,
                },
            },
            update: banner,
            create: banner,
        });
    }

    console.log('✅ Hero banners seeded successfully!');
}

seedHeroBanners()
    .catch((e) => {
        console.error('❌ Error seeding hero banners:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
