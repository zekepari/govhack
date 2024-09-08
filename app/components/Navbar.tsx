import React from 'react';
import { Camera, CircleUserRound, Search } from "lucide-react";
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="p-4 flex justify-between items-center gap-4">
            <Link href="http://203.101.226.242:8050"><CircleUserRound className="flex-shrink-0 hover:stroke-blue-500"/></Link>
            <div className="rounded-full w-full bg-neutral-100 h-10 border-black border flex items-center px-4">
                <Search className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full"
                />
            </div>
            <Link href="/camera"><Camera className="flex-shrink-0 hover:stroke-blue-500"/></Link>
        </nav>
    );
};