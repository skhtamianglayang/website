import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split(".").pop();
        const filename = `${timestamp}.${extension}`;

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return NextResponse.json({ url: blob.url, filename });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
