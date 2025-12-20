import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch PPDB info
export async function GET() {
    try {
        let ppdbInfo = await prisma.pPDBInfo.findUnique({
            where: { id: "ppdb-info-1" },
        });

        // Create default if not exists
        if (!ppdbInfo) {
            ppdbInfo = await prisma.pPDBInfo.create({
                data: {
                    id: "ppdb-info-1",
                    title: "Pendaftaran Tahun Ajaran 2025/2026",
                    subtitle: "Dibuka mulai Januari 2025",
                    schedule: "• Gelombang 1: 2 Januari - 28 Februari 2025\n• Gelombang 2: 1 Maret - 30 April 2025\n• Gelombang 3: 1 Mei - 30 Juni 2025",
                    requirements: "• Fotokopi Akta Kelahiran\n• Fotokopi Kartu Keluarga\n• Pas Foto 3x4 (4 lembar)\n• Surat Keterangan dari Dokter/Psikolog\n• Fotokopi rapor terakhir (jika ada)",
                    location: "Sekretariat SKH Tamiang Layang\nJl. Ahmad Yani No. 07, Kabupaten Barito Timur\nSenin - Jumat: 08.00 - 14.00 WITA",
                    contact: "Telp: (0526) 123-456\nWhatsApp: 0812-3456-7890\nEmail: ppdb@skhn1tamianglayang.sch.id",
                    infoNote: "Untuk informasi lebih lanjut, silakan hubungi panitia PPDB atau datang langsung ke sekolah pada jam kerja.",
                },
            });
        }

        return NextResponse.json(ppdbInfo);
    } catch (error) {
        console.error("Error fetching PPDB info:", error);
        return NextResponse.json({ error: "Failed to fetch PPDB info" }, { status: 500 });
    }
}

// PATCH - Update PPDB info
export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        const ppdbInfo = await prisma.pPDBInfo.upsert({
            where: { id: "ppdb-info-1" },
            update: body,
            create: {
                id: "ppdb-info-1",
                title: body.title || "Pendaftaran Tahun Ajaran 2025/2026",
                subtitle: body.subtitle || "Dibuka mulai Januari 2025",
                schedule: body.schedule || "",
                requirements: body.requirements || "",
                location: body.location || "",
                contact: body.contact || "",
                infoNote: body.infoNote || "",
            },
        });

        return NextResponse.json(ppdbInfo);
    } catch (error) {
        console.error("Error updating PPDB info:", error);
        return NextResponse.json({ error: "Failed to update PPDB info" }, { status: 500 });
    }
}
