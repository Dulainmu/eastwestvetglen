"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Philosophy", href: "#philosophy" },
        { name: "Services", href: "#services-list" },
        { name: "Location", href: "#location" },
    ]

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    scrolled 
                        ? "bg-white/70 backdrop-blur-xl border-primary/10 shadow-lg py-3" 
                        : "bg-transparent py-6"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="relative z-50 flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                            EW
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "font-serif font-bold text-lg leading-none transition-colors",
                                scrolled ? "text-primary" : "text-primary"
                            )}>
                                East West Vets
                            </span>
                            <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground font-medium">
                                Glen Waverley
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-primary/80 hover:text-primary hover:font-bold transition-all relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link 
                            href="tel:0390000000"
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105",
                                scrolled ? "bg-primary/5 text-primary hover:bg-primary/10" : "bg-white/40 text-primary hover:bg-white/60 backdrop-blur-sm"
                            )}
                        >
                            <Phone className="w-4 h-4" />
                            <span>(03) 9000 0000</span>
                        </Link>
                        <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden relative z-50 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col pt-28 px-6"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-2xl font-serif font-medium text-primary py-2 active:scale-95 transition-transform"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="pt-8 flex flex-col gap-4 max-w-xs mx-auto w-full"
                            >
                                <button className="w-full bg-primary text-white py-4 rounded-xl text-lg font-medium shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Book Appointment
                                </button>
                                <Link 
                                    href="tel:0390000000"
                                    className="w-full bg-secondary text-primary py-4 rounded-xl text-lg font-medium border border-primary/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Clinic
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
