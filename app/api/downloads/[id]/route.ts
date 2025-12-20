import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH - Update download
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const download = await prisma.download.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(download);
    } catch (error) {
        console.error("Error updating download:", error);
        return NextResponse.json({ error: "Failed to update download" }, { status: 500 });
    }
}

// DELETE - Delete download
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.download.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting download:", error);
        return NextResponse.json({ error: "Failed to delete download" }, { status: 500 });
    }
}
