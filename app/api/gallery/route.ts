import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const gallery = await prisma.gallery.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(gallery);
    } catch (error) {
        console.error("Failed to fetch gallery:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const item = await prisma.gallery.create({
            data: {
                src: body.src,
                title: body.title,
                category: body.category,
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error("Failed to create gallery item:", error);
        return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
    }
}
