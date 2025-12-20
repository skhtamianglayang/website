import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: { teacher: true },
        });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({
            ...product,
            teacherName: product.teacher.name,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: body.name,
                price: body.price !== undefined ? Number(body.price) : undefined,
                description: body.description,
                image: body.image,
                category: body.category,
                shopeeLink: body.shopeeLink,
                whatsappLink: body.whatsappLink,
                isFeatured: body.isFeatured,
            },
            include: { teacher: true },
        });
        return NextResponse.json({
            ...product,
            teacherName: product.teacher.name,
        });
    } catch (error) {
        console.error("Failed to update product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}

