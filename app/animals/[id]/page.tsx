import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Camera } from 'lucide-react';
import { getEntryById } from '@/lib/entries';

export default function AnimalPage({ params }: { params: { id: string } }) {
    const entry = getEntryById(params.id);

    if (!entry) {
        return <div>Entry not found</div>;
    }

    return (
        <>
            <Link href="/flora-and-fauna" className="flex items-center text-green-700 hover:text-green-900">
                <ArrowLeft className="mr-2" /> Back to Flora and Fauna
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative aspect-video">
                    <Image
                        src={entry.mainImage}
                        alt={entry.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-2">{entry.name}</h1>
                    <p className="text-gray-600 mb-4">{entry.description}</p>
                    <div className="flex justify-between items-center mb-4">
                        <span className="px-2 py-1 rounded-full text-white text-sm bg-blue-500">
                            {entry.category}
                        </span>
                        <span className="flex items-center text-yellow-500">
                            <Star className="mr-1" size={16} />
                            {entry.points} points
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold mb-2">User Captures</h2>
                    {entry.captures.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {entry.captures.map((capture, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={capture}
                                        alt={`${entry.name} capture ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No user captures yet. Be the first to capture this {entry.category}!</p>
                    )}

                    <Link href={`/camera?target=${entry.id}`} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <Camera className="mr-2" size={16} />
                        Add Your Capture
                    </Link>
                </div>
            </div>
        </>
    );
}