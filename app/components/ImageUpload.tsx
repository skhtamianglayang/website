"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
}

export default function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onChange(data.url);
                setPreview(data.url);
            } else {
                alert("Gagal mengupload gambar");
                setPreview(value);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Gagal mengupload gambar");
            setPreview(value);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={className}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
            >
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
                            </div>
                        )}
                        <p className="text-sm text-slate-500 mt-2">Klik untuk ganti gambar</p>
                    </div>
                ) : (
                    <div className="py-8">
                        <svg className="w-12 h-12 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-600 font-medium">Klik untuk upload gambar</p>
                        <p className="text-slate-400 text-sm">PNG, JPG, GIF</p>
                    </div>
                )}
            </div>
        </div>
    );
}
