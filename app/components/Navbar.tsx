import React from 'react';
import { Camera, CircleUserRound, Search } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="p-4 flex justify-between items-center gap-4">
            <CircleUserRound className="flex-shrink-0"/>
            <div className="rounded-full w-full bg-neutral-100 h-10 border-black border flex items-center px-4">
                <Search className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full"
                />
            </div>
            <Camera className="flex-shrink-0"/>
        </nav>
    );
};