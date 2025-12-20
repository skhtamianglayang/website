import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const images = await prisma.newsImage.findMany({
            where: { newsId: id },
            orderBy: { order: "asc" },
        });
        return NextResponse.json(images);
    } catch (error) {
        console.error("Failed to fetch news images:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const image = await prisma.newsImage.create({
            data: {
                newsId: id,
                src: body.src,
                caption: body.caption || null,
                order: body.order || 0,
            },
        });
        return NextResponse.json(image);
    } catch (error) {
        console.error("Failed to add news image:", error);
        return NextResponse.json({ error: "Failed to add news image" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const imageId = searchParams.get("imageId");

        if (imageId) {
            // Delete specific image
            await prisma.newsImage.delete({
                where: { id: imageId },
            });
        } else {
            // Delete all images for this news
            await prisma.newsImage.deleteMany({
                where: { newsId: id },
            });
        }
        return NextResponse.json({ message: "Image deleted" });
    } catch (error) {
        console.error("Failed to delete news image:", error);
        return NextResponse.json({ error: "Failed to delete news image" }, { status: 500 });
    }
}
