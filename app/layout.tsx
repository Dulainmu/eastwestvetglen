import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "VetFlow - Modern Veterinary Clinic Management",
    description: "Cloud-based veterinary clinic management and online booking system for Australian vet practices",
    keywords: ["veterinary", "clinic management", "online booking", "pet care", "Australia"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
