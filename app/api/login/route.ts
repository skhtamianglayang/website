import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const user = await prisma.user.findFirst({
            where: { name: username },
        });

        // Simple password check (should be hashed in production)
        if (user && user.password === password) {
            // Don't return password
            const { password: _, ...userWithoutPassword } = user;
            return NextResponse.json(userWithoutPassword);
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
