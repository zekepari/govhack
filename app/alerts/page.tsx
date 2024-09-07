"use client";

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Alert {
    id: number;
    title: string;
    description: string;
    type: 'wildlife' | 'environmental';
    severity: 'low' | 'medium' | 'high';
    coordinates: {
        lat: number;
        lng: number;
    };
}

const alerts: Alert[] = [
    {
        id: 1,
        title: "Koala Crossing",
        description: "High koala activity observed. Drive carefully.",
        type: "wildlife",
        severity: "medium",
        coordinates: { lat: -26.6500, lng: 153.0666 }
    },
    {
        id: 2,
        title: "Beach Erosion",
        description: "Significant erosion at Mooloolaba Beach. Caution advised.",
        type: "environmental",
        severity: "high",
        coordinates: { lat: -26.6800, lng: 153.1186 }
    },
    {
        id: 3,
        title: "Kangaroo Mob Sighting",
        description: "Large group of kangaroos spotted near hiking trails.",
        type: "wildlife",
        severity: "low",
        coordinates: { lat: -26.7827, lng: 152.9481 }
    },
    {
        id: 4,
        title: "Bushfire Risk",
        description: "Elevated fire danger in Glasshouse Mountains area.",
        type: "environmental",
        severity: "high",
        coordinates: { lat: -26.9125, lng: 152.9456 }
    },
    {
        id: 5,
        title: "Rare Bird Sighting",
        description: "Endangered Black-breasted Button-quail spotted.",
        type: "wildlife",
        severity: "low",
        coordinates: { lat: -26.3894, lng: 152.8980 }
    }
];

export default function AlertsPage() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            version: 'weekly',
        });

        loader.load().then(() => {
            if (!mapRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: -26.65, lng: 153.066 }, // Centered on Sunshine Coast
                zoom: 10,
            });

            alerts.forEach(alert => {
                const marker = new google.maps.Marker({
                    position: alert.coordinates,
                    map: map,
                    title: alert.title,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: getSeverityColor(alert.severity),
                        fillOpacity: 1,
                        strokeWeight: 0,
                        scale: 8
                    }
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<h3>${alert.title}</h3><p>${alert.description}</p>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        });
    }, []);

    const getSeverityColor = (severity: Alert['severity']) => {
        switch (severity) {
            case 'high': return '#FF0000';
            case 'medium': return '#FFA500';
            case 'low': return '#FFFF00';
            default: return '#808080';
        }
    };

    return (
        <>
            <Link href="/" className="flex items-center text-green-700 hover:text-green-900 mb-4">
                <ArrowLeft className="mr-2" /> Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Sunshine Coast Alerts</h1>

            <div ref={mapRef} className="w-full aspect-square rounded-lg shadow-lg mb-8"/>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Current Alerts</h2>
                <div className="space-y-6">
                    {alerts.map(alert => (
                        <div key={alert.id} className="border-l-4 border-yellow-500 pl-4 py-3">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-semibold">{alert.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-white text-sm ${getSeverityColorClass(alert.severity)}`}>
                                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-2">{alert.description}</p>
                            <p className="text-sm text-gray-500">
                                Type: {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function getSeverityColorClass(severity: Alert['severity']) {
    switch (severity) {
        case 'high': return 'bg-red-500';
        case 'medium': return 'bg-orange-500';
        case 'low': return 'bg-yellow-500';
        default: return 'bg-gray-500';
    }
}