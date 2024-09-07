"use client";

import React, { useState, useRef } from 'react';
import { Camera, XCircle, CheckCircle, UploadCloud, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CameraPage() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const savePhoto = () => {
        // Here you would typically send the image to a server or save it locally
        console.log("Saving photo:", capturedImage);
        // For now, we'll just log it and reset the state
        setCapturedImage(null);
    };

    return (
        <div className="min-h-screen bg-green-50 p-4 space-y-4">
            <Link href="/" className="flex items-center text-green-700 hover:text-green-900">
                <ArrowLeft className="mr-2" /> Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-center text-green-800">Wildlife Camera</h1>

            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
                {!capturedImage && (
                    <>
                        <button
                            onClick={triggerFileInput}
                            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                        >
                            <Camera className="mr-2" /> Take Photo
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileInput}
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                        />
                    </>
                )}

                {capturedImage && (
                    <div className="space-y-4">
                        <img src={capturedImage} alt="Captured" className="w-full rounded" />
                        <div className="flex justify-between">
                            <button
                                onClick={retakePhoto}
                                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center justify-center"
                            >
                                <XCircle className="mr-2" /> Retake
                            </button>
                            <button
                                onClick={savePhoto}
                                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                            >
                                <CheckCircle className="mr-2" /> Save
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-4">
                <h2 className="text-xl font-semibold mb-2">Recent Sightings</h2>
                <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                        <span>Koala</span>
                        <button className="text-blue-500 hover:text-blue-700">
                            <UploadCloud size={20} />
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>Kangaroo</span>
                        <button className="text-blue-500 hover:text-blue-700">
                            <UploadCloud size={20} />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}