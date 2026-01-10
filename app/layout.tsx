import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Providers } from "@/components/providers";
import SchemaHead from "@/components/landing/SchemaHead";
import { Header } from "@/components/layout/Header";

// Clean, modern sans-serif
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
});

// Elegant serif for headings
const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
    // Include the specific axes if needed, defaults are usually fine
    axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
    title: "East Vets Glen - Modern Veterinary Care",
    description: "Independent, family-owned veterinary care in Glen Waverley.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <SchemaHead />
                {/* Material Icons required for the design */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
            </head>
            <body className={`${jakarta.variable} ${fraunces.variable} font-sans antialiased text-navy-custom dark:text-slate-100 bg-background-light dark:bg-background-dark transition-colors duration-300 relative min-h-screen flex flex-col`} suppressHydrationWarning>
                {/* Noise texture overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-10 bg-noise mix-blend-overlay fixed"></div>

                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
