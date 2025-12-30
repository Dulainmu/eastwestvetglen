"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: "Things we do", href: "/services" },
        { name: "Locations", href: "/contact" },
        { name: "About", href: "/about" },
    ]

    return (
        <nav className="relative z-20 w-full px-6 py-6 lg:px-12 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
                <span className="font-display font-bold text-2xl tracking-tight text-white dark:text-primary uppercase group-hover:opacity-90 transition-opacity">
                    East Vets <span className="font-light opacity-80">Glen</span>
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-semibold text-white/90 hover:text-white dark:text-slate-300 dark:hover:text-primary transition-colors tracking-wide uppercase"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="hidden md:block">
                <Link
                    href="/contact"
                    className="bg-primary hover:bg-green-700 text-white text-sm font-bold py-3 px-6 rounded-full shadow-lg shadow-green-900/10 transition-all transform hover:-translate-y-0.5"
                >
                    Book Appointment
                </Link>
            </div>

            <button
                className="md:hidden text-white dark:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <span className="material-icons-outlined text-3xl">menu</span>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <span className="material-icons-outlined text-3xl">close</span>
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-display font-bold text-white hover:text-primary transition-colors block uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
