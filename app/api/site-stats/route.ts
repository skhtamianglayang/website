import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let stats = await prisma.siteStats.findFirst();

        if (!stats) {
            stats = await prisma.siteStats.create({
                data: {
                    id: "site-stats-1",
                    totalStudents: 150,
                    totalTeachers: 25,
                    yearFounded: 1995,
                    totalPrograms: 8,
                },
            });
        }

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        // Ensure record exists
        const existing = await prisma.siteStats.findFirst();

        let stats;
        if (existing) {
            stats = await prisma.siteStats.update({
                where: { id: existing.id },
                data: body,
            });
        } else {
            stats = await prisma.siteStats.create({
                data: {
                    id: "site-stats-1",
                    ...body
                },
            });
        }

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update stats" }, { status: 500 });
    }
}
