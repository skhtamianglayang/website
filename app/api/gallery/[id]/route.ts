import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const item = await prisma.gallery.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.gallery.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Gallery item deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
    }
}
