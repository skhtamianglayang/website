import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const profile = await prisma.teacherProfile.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update teacher profile" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.teacherProfile.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Teacher profile deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete teacher profile" }, { status: 500 });
    }
}
