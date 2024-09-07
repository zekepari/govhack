import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Camera, Star } from 'lucide-react';
import { entries, Entry } from '@/lib/entries';

const getRarityColor = (rarity: Entry['rarity']) => {
    switch (rarity) {
        case 'common': return 'bg-green-500';
        case 'uncommon': return 'bg-blue-500';
        case 'rare': return 'bg-purple-500';
        case 'very rare': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};

const getCategoryIcon = (category: Entry['category']) => {
    switch (category) {
        case 'animal': return '🐾';
        case 'bird': return '🦜';
        case 'fruit': return '🍎';
        case 'flower': return '🌺';
        default: return '❓';
    }
};

export default function FloraAndFaunaPage() {
    return (
        <>
            <Link href="/" className="flex items-center text-green-700 hover:text-green-900">
                <ArrowLeft className="mr-2" /> Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-center text-green-800">Scenic Reserve Guide</h1>

            <p className="text-center text-gray-600">
                Discover and photograph these species to earn points!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entries.map((entry) => (
                    <div key={entry.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <Link href={`/animals/${entry.id}`}>
                            <div className="relative aspect-square cursor-pointer">
                                <Image
                                    src={entry.mainImage}
                                    alt={entry.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">{entry.name}</h2>
                                <span className={`px-2 py-1 rounded-full text-white text-sm ${getRarityColor(entry.rarity)}`}>
                                    {entry.rarity}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2">
                                {getCategoryIcon(entry.category)} {entry.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center text-yellow-500">
                                    <Star className="mr-1" size={16} />
                                    {entry.points} points
                                </span>
                                <Link href={`/camera?target=${entry.id}`} className="flex items-center text-blue-500 hover:text-blue-700">
                                    <Camera className="mr-1" size={16} />
                                    Capture
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}