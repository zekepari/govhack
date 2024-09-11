import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HikeAware",
  description: "HikeAware is an innovative web-based dashboard that transforms IoT sensor data into actionable insights for proactive urban management. Designed for the Sunshine Coast Council, it integrates real-time monitoring, predictive maintenance, and resource optimization for parks and recreational areas. SmartTrack empowers data-driven decision-making, enhancing visitor experiences while optimizing operational efficiency and environmental stewardship. From trail maintenance to budget allocation, SmartTrack paves the way for sustainable and responsive urban spaces.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-green-50`}
      >
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen space-y-4 mb-4">
        {children}
      </main>
      </body>
      </html>
  );
}