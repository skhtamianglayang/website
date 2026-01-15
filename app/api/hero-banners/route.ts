import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/hero-banners - Fetch hero banners (optionally filtered by page)
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get('page');

        const where = page
            ? { page, isActive: true }
            : { isActive: true };

        const heroBanners = await prisma.heroBanner.findMany({
            where,
            orderBy: [
                { page: 'asc' },
                { order: 'asc' },
            ],
        });

        return NextResponse.json(heroBanners);
    } catch (error) {
        console.error('Error fetching hero banners:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hero banners' },
            { status: 500 }
        );
    }
}

// POST /api/hero-banners - Create new hero banner (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page, order, image, title, subtitle, isActive } = body;

        // Basic validation
        if (!page || !image || !title || !subtitle) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const heroBanner = await prisma.heroBanner.create({
            data: {
                page,
                order: order || 0,
                image,
                title,
                subtitle,
                isActive: isActive !== undefined ? isActive : true,
            },
        });

        return NextResponse.json(heroBanner, { status: 201 });
    } catch (error) {
        console.error('Error creating hero banner:', error);
        return NextResponse.json(
            { error: 'Failed to create hero banner' },
            { status: 500 }
        );
    }
}
