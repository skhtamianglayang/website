import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const comment = await prisma.comment.create({
            data: {
                name: body.name,
                text: body.text,
            },
        });
        return NextResponse.json(comment);
    } catch (error) {
        console.error("Failed to create comment:", error);
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
}
