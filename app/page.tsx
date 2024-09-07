"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Thermometer, Cloud, Clock, Camera, Leaf, Bird, AlertTriangle } from 'lucide-react';
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
        <>
            <h1 className="text-3xl font-bold text-center text-green-800">Hike Aware</h1>

            <div className="bg-white p-4 rounded-lg shadow">
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

            <div ref={mapRef} className="w-full aspect-square rounded-lg shadow-lg"/>

            <div className="bg-white p-4 rounded-lg shadow">
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

            <div className="grid grid-cols-2 gap-4">
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

            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow" role="alert">
                <div className="flex items-center">
                    <AlertTriangle className="mr-2" />
                    <p className="font-bold">Alert</p>
                </div>
                <p>High fire danger today. Please be cautious and follow all safety guidelines.</p>
            </div>
        </>
    );
}