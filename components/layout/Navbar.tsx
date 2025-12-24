"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Active section tracking via IntersectionObserver
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -50% 0px", // Trigger when section is near top-center
            threshold: 0.1
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        const sections = ["about", "philosophy", "services-list", "location"]

        sections.forEach(id => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const navLinks = [
        { name: "About", href: "#about", id: "about" },
        { name: "Philosophy", href: "#philosophy", id: "philosophy" },
        { name: "Services", href: "#services-list", id: "services-list" },
        { name: "Location", href: "#location", id: "location" },
    ]

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                    scrolled
                        ? "bg-white/80 backdrop-blur-md border-primary/5 shadow-sm py-3"
                        : "bg-transparent border-transparent py-5 lg:py-6"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="relative z-50 flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg ring-4 ring-primary/5 group-hover:scale-105 group-hover:bg-primary/90 transition-all duration-300">
                            EW
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "font-serif font-bold text-xl leading-none transition-colors duration-300",
                                scrolled ? "text-primary" : "text-primary dark:text-white"
                            )}>
                                East West Vets
                            </span>
                            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                                Glen Waverley
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/20 shadow-inner">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                                        isActive
                                            ? "text-primary bg-white shadow-sm"
                                            : "text-muted-foreground hover:text-primary hover:bg-white/50"
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="tel:0390000000"
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95",
                                scrolled ? "bg-secondary text-primary hover:bg-secondary/80" : "bg-white/50 backdrop-blur-md text-primary hover:bg-white/80"
                            )}
                        >
                            <Phone className="w-4 h-4" />
                        </Link>
                        <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group">
                            <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90"
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden"
                    >
                        {/* Background Shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="flex flex-col h-full pt-28 px-6 pb-10">
                            <nav className="flex-1 flex flex-col gap-2">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.05), type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "block text-3xl font-serif font-medium py-3 px-4 rounded-xl active:scale-98 transition-all flex items-center justify-between group",
                                                activeSection === link.id
                                                    ? "bg-primary/5 text-primary"
                                                    : "text-foreground hover:bg-secondary/50"
                                            )}
                                        >
                                            {link.name}
                                            <span className={cn(
                                                "w-2 h-2 rounded-full",
                                                activeSection === link.id ? "bg-accent" : "bg-transparent group-hover:bg-primary/20"
                                            )} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4"
                            >
                                <button className="w-full bg-primary text-white py-4 rounded-2xl text-lg font-medium shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <Calendar className="w-5 h-5" />
                                    Book Appointment
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        href="tel:0390000000"
                                        className="w-full bg-secondary text-primary py-4 rounded-2xl text-lg font-medium border border-primary/10 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-white"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Call
                                    </Link>
                                    <Link
                                        href="#location"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full bg-white text-primary py-4 rounded-2xl text-lg font-medium border border-border active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-secondary/50"
                                    >
                                        <MapPin className="w-5 h-5" />
                                        Map
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
