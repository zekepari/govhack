"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Thermometer, Cloud, Clock, Camera, Leaf, AlertTriangle, Newspaper } from 'lucide-react';
import Link from "next/link"

interface Location {
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    weather: {
        temp: number;
        condition: string;
    };
}

const locations: Location[] = [
    {
        name: "Mary Cairncross Park",
        coordinates: {
            lat: -26.7811,
            lng: 152.8816
        },
        weather: {
            temp: 25,
            condition: 'Sunny'
        }
    },
    {
        name: "Sugar Bag Road",
        coordinates: {
            lat: -26.7864,
            lng: 153.1132
        },
        weather: {
            temp: 23,
            condition: 'Partly Cloudy'
        }
    },
];

interface NewsItem {
    title: string;
    summary: string;
    date: string;
}

const news: NewsItem[] = [
    {
        title: "New Koala Conservation Efforts Launched",
        summary: "Sunshine Coast Council announces a new initiative to protect and expand koala habitats in the region.",
        date: "2024-09-05"
    },
    {
        title: "Rare Bird Species Spotted in Glasshouse Mountains",
        summary: "Birdwatchers excitement as the endangered Black-breasted Button-quail is sighted in the national park.",
        date: "2024-09-03"
    },
    {
        title: "Local Community Leads Beach Clean-up Drive",
        summary: "Volunteers remove over 500kg of plastic waste from Mooloolaba Beach in a weekend-long environmental event.",
        date: "2024-09-01"
    }
];

export default function Home() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            version: 'weekly',
        });

        loader.load().then(() => {
            if (!mapRef.current) return;

            const mapOptions: google.maps.MapOptions = {
                center: { lat: selectedLocation.coordinates.lat, lng: selectedLocation.coordinates.lng },
                zoom: 16,
            };

            const newMap = new google.maps.Map(mapRef.current, mapOptions);
            setMap(newMap);
        });

        // Update time every minute
        const updateTime = () => {
            const now = new Date().toLocaleString("en-AU", {
                timeZone: "Australia/Brisbane",
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setCurrentTime(now);
        };

        updateTime(); // Initial time set
        const timer = setInterval(updateTime, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (map) {
            map.setCenter(selectedLocation.coordinates);
        }
    }, [selectedLocation, map]);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocation = locations.find(loc => loc.name === e.target.value);
        if (newLocation) {
            setSelectedLocation(newLocation);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Hike Aware</h1>

            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                    <MapPin className="mr-2" /> Select Location
                </h2>
                <select
                    value={selectedLocation.name}
                    onChange={handleLocationChange}
                    className="w-full p-2 bg-white border border-gray-300 rounded-md"
                >
                    {locations.map((location) => (
                        <option key={location.name} value={location.name}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>

            <div ref={mapRef} className="w-full aspect-video rounded-lg shadow-lg mb-4"/>

            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                    <Cloud className="mr-2"/> Current Conditions
                </h2>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Thermometer className="mr-2"/>
                        {selectedLocation.weather.temp}°C
                    </div>
                    <div className="flex items-center">
                        <Cloud className="mr-2"/>
                        {selectedLocation.weather.condition}
                    </div>
                    <div className="flex items-center">
                        <Clock className="mr-2"/>
                        {currentTime}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <Link href="/flora-and-fauna"
                      className="p-4 bg-blue-100 rounded-lg shadow hover:bg-blue-200 flex items-center justify-center">
                    <Leaf className="mr-2"/> Flora & Fauna
                </Link>
                <Link href="/alerts"
                      className="p-4 bg-orange-100 rounded-lg shadow hover:bg-orange-200 flex items-center justify-center">
                    <AlertTriangle className="mr-2" /> View Alerts
                </Link>
                <Link href="/camera"
                      className="p-4 col-span-full bg-purple-100 rounded-lg shadow hover:bg-purple-200 flex items-center justify-center">
                    <Camera className="mr-2" /> Take Photo
                </Link>
            </div>

            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow mb-4" role="alert">
                <div className="flex items-center">
                    <AlertTriangle className="mr-2" />
                    <p className="font-bold">Alert</p>
                </div>
                <p>High fire danger today. Please be cautious and follow all safety guidelines.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Newspaper className="mr-2"/> Local Environmental News
                </h2>
                <div className="space-y-4">
                    {news.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-600 mb-1">{item.summary}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}