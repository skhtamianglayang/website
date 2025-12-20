import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const profiles = await prisma.teacherProfile.findMany({
            orderBy: { createdAt: "asc" },
        });
        return NextResponse.json(profiles);
    } catch (error) {
        console.error("Failed to fetch teacher profiles:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const profile = await prisma.teacherProfile.create({
            data: {
                name: body.name,
                role: body.role,
                image: body.image,
                bio: body.bio,
            },
        });
        return NextResponse.json(profile);
    } catch (error) {
        console.error("Failed to create teacher profile:", error);
        return NextResponse.json({ error: "Failed to create teacher profile" }, { status: 500 });
    }
}
