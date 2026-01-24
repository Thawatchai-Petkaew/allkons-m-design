import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * Local Upload API Route
 * This is for development purposes to simulate media uploads.
 * Files are saved to public/uploads/
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as Blob | null;
        const type = formData.get("type") as string || "avatars"; // Default to avatars

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Convert Blob to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Generate unique filename
        const originalName = (file as any).name || "unnamed";
        const extension = originalName.split(".").pop();
        const fileName = `${uuidv4()}.${extension}`;

        // Ensure directory exists (redundant but safe)
        const uploadDir = join(process.cwd(), "public", "uploads", type);
        await mkdir(uploadDir, { recursive: true });

        // Absolute path for writing
        const filePath = join(uploadDir, fileName);

        // Write the file
        await writeFile(filePath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/${type}/${fileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: fileName,
            originalName: originalName,
            size: file.size,
        });

    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { error: "Fail to upload file", details: error.message },
            { status: 500 }
        );
    }
}
