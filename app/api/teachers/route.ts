import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch all users that are teachers (or all users for now?)
        // In DataContext, 'teachers' holds the list of teachers.
        // Let's assume we fetch all users for the teacher management page.
        const teachers = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(teachers);
    } catch (error) {
        console.error("Failed to fetch teachers:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const teacher = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                role: "teacher", // Always set role as teacher for new accounts
                password: body.password || "guru123", // Default password if missing
            },
        });
        return NextResponse.json(teacher);
    } catch (error) {
        console.error("Failed to create teacher:", error);
        return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 });
    }
}
