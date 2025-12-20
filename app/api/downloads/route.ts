import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all downloads
export async function GET() {
    try {
        const downloads = await prisma.download.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(downloads);
    } catch (error) {
        console.error("Error fetching downloads:", error);
        // Return empty array on error to prevent frontend .map() errors
        return NextResponse.json([]);
    }
}

// POST - Create new download
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const download = await prisma.download.create({
            data: {
                title: body.title,
                driveLink: body.driveLink,
                category: body.category || "Umum",
            },
        });
        return NextResponse.json(download);
    } catch (error) {
        console.error("Error creating download:", error);
        return NextResponse.json({ error: "Failed to create download" }, { status: 500 });
    }
}
