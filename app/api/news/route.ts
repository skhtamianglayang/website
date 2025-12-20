import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const news = await prisma.news.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(news);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const news = await prisma.news.create({
            data: {
                title: body.title,
                date: body.date,
                excerpt: body.excerpt,
                image: body.image,
                slug: body.slug,
            },
        });
        return NextResponse.json(news);
    } catch (error) {
        console.error("Failed to create news:", error);
        return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
    }
}

