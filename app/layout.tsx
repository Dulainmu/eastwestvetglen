import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Providers } from "@/components/providers";
import SchemaHead from "@/components/landing/SchemaHead";
import { Navbar } from "@/components/layout/Navbar";

// Modern, clean sans-serif for body text
const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

// Elegant serif for headings
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "East West Vets – Glen Waverley Clinic",
    description: "Integrative veterinary care at the new Glen Waverley clinic – holistic, modern, and trusted.",
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
            </head>
            <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background`} suppressHydrationWarning>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
