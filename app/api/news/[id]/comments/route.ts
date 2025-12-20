import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const comments = await prisma.newsComment.findMany({
            where: { newsId: id },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error("Failed to fetch news comments:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.name || !body.text) {
            return NextResponse.json({ error: "Name and text are required" }, { status: 400 });
        }

        const comment = await prisma.newsComment.create({
            data: {
                newsId: id,
                name: body.name,
                text: body.text,
            },
        });
        return NextResponse.json(comment);
    } catch (error) {
        console.error("Failed to add news comment:", error);
        return NextResponse.json({ error: "Failed to add news comment" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { searchParams } = new URL(request.url);
        const commentId = searchParams.get("commentId");

        if (!commentId) {
            return NextResponse.json({ error: "Comment ID required" }, { status: 400 });
        }

        await prisma.newsComment.delete({
            where: { id: commentId },
        });
        return NextResponse.json({ message: "Comment deleted" });
    } catch (error) {
        console.error("Failed to delete news comment:", error);
        return NextResponse.json({ error: "Failed to delete news comment" }, { status: 500 });
    }
}
