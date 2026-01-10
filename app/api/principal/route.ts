import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let info = await prisma.principalInfo.findFirst();

        if (!info) {
            info = await prisma.principalInfo.create({
                data: {
                    id: "principal-1",
                    name: "Dr. Ahmad Wijaya, M.Pd.",
                    title: "Kepala Sekolah",
                    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
                    greeting: "Assalamu'alaikum Wr. Wb. Selamat datang di website resmi SKH Tamiang Layang.",
                    message: "Sebagai kepala sekolah, saya merasa bangga dapat memimpin sekolah yang penuh kasih sayang ini. Kami berkomitmen memberikan pendidikan terbaik bagi anak-anak berkebutuhan khusus agar mereka dapat tumbuh mandiri dan berkontribusi di masyarakat. Dengan dukungan orang tua, masyarakat, dan seluruh stakeholder pendidikan, kami yakin anak-anak kami akan terus berkembang dan meraih prestasi.",
                },
            });
        }

        return NextResponse.json(info);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch principal info" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const existing = await prisma.principalInfo.findFirst();

        let info;
        if (existing) {
            info = await prisma.principalInfo.update({
                where: { id: existing.id },
                data: body,
            });
        } else {
            info = await prisma.principalInfo.create({
                data: {
                    id: "principal-1",
                    ...body
                },
            });
        }

        return NextResponse.json(info);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update principal info" }, { status: 500 });
    }
}
