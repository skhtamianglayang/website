import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const teacher = await prisma.user.findUnique({
            where: { id },
        });
        if (!teacher) {
            return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
        }
        return NextResponse.json(teacher);
    } catch (error) {
        console.error("Failed to fetch teacher:", error);
        return NextResponse.json({ error: "Failed to fetch teacher" }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const teacher = await prisma.user.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(teacher);
    } catch (error) {
        console.error("Failed to update teacher:", error);
        return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // First delete all products belonging to this teacher
        await prisma.product.deleteMany({
            where: { teacherId: id },
        });

        // Then delete the teacher
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Teacher deleted" });
    } catch (error) {
        console.error("Failed to delete teacher:", error);
        return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 });
    }
}

