import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const news = await prisma.news.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.news.delete({
            where: { id },
        });
        return NextResponse.json({ message: "News deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}

