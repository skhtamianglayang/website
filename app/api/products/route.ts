import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const teacherId = searchParams.get("teacherId");
        const featured = searchParams.get("featured");

        const where: any = {};
        if (teacherId) where.teacherId = teacherId;
        if (featured === "true") where.isFeatured = true;

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: { teacher: true },
        });

        // Transform to match DataContext interface if needed, 
        // but better to align DataContext with DB structure.
        // DataContext Product interface has teacherName. 
        // We can map it here or in the frontend.
        const mappedProducts = products.map((p) => ({
            ...p,
            teacherName: p.teacher.name,
        }));

        return NextResponse.json(mappedProducts);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const product = await prisma.product.create({
            data: {
                name: body.name,
                price: Number(body.price),
                description: body.description,
                image: body.image,
                category: body.category,
                shopeeLink: body.shopeeLink,
                whatsappLink: body.whatsappLink,
                teacherId: body.teacherId, // Must be provided
                isFeatured: body.isFeatured || false,
            },
            include: { teacher: true },
        });

        return NextResponse.json({
            ...product,
            teacherName: product.teacher.name,
        });
    } catch (error) {
        console.error("Failed to create product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
