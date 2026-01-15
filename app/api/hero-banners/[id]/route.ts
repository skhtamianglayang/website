import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/hero-banners/[id] - Update hero banner (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await params in Next.js 16+
        const body = await request.json();
        const { page, order, image, title, subtitle, isActive } = body;

        const heroBanner = await prisma.heroBanner.update({
            where: { id },
            data: {
                ...(page && { page }),
                ...(order !== undefined && { order }),
                ...(image && { image }),
                ...(title && { title }),
                ...(subtitle && { subtitle }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        return NextResponse.json(heroBanner);
    } catch (error) {
        console.error('Error updating hero banner:', error);
        return NextResponse.json(
            { error: 'Failed to update hero banner' },
            { status: 500 }
        );
    }
}

// DELETE /api/hero-banners/[id] - Delete hero banner (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await params in Next.js 16+

        await prisma.heroBanner.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Hero banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero banner:', error);
        return NextResponse.json(
            { error: 'Failed to delete hero banner' },
            { status: 500 }
        );
    }
}
