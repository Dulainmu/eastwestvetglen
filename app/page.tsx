
"use client"

import Link from "next/link"
import { LocalPartners } from "@/components/landing/LocalPartners"
import { ServicesGrid } from "@/components/landing/ServicesGrid"
import { SisterClinic } from "@/components/landing/SisterClinic"
import { motion, Variants } from "framer-motion"

// Animation Variants
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
}

const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
        },
    },
}

const floatCard: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 1.2, // Pop in after everything else
        },
    },
}

export default function LandingPage() {
    return (
        <main className="relative z-10 flex-grow flex flex-col">
            {/* Hero Section */}
            <section className="flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0 min-h-screen lg:min-h-[800px]">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="space-y-6">
                            <motion.div variants={fadeInUp} className="hidden lg:flex items-center gap-2 text-white/80 dark:text-primary/80 font-medium tracking-widest text-xs uppercase mb-4">
                                <span className="w-8 h-[1px] bg-current"></span>
                                Established 2024
                            </motion.div>
                            <motion.h1 variants={fadeInUp} className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] text-navy-custom dark:text-white">
                                Modern Care for Glen Waverley’s Best Friends.
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="font-sans text-lg lg:text-xl text-navy-custom/80 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                                Independent, family-owned veterinary care where your pet is treated like one of our own.
                            </motion.p>
                        </div>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-2">
                            <Link
                                href="/contact"
                                className="bg-primary hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-primary/20 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                            >
                                <span>Book an Appointment</span>
                                <span className="material-icons-outlined text-sm">calendar_month</span>
                            </Link>
                            <Link
                                href="/about"
                                className="group flex items-center gap-2 text-navy-custom dark:text-white font-semibold hover:text-white dark:hover:text-primary transition-colors"
                            >
                                <span className="underline decoration-2 underline-offset-4 decoration-primary/50 group-hover:decoration-primary">Meet the Team</span>
                                <span className="material-icons-outlined text-lg transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="pt-8 flex items-center justify-center lg:justify-start gap-6 opacity-80">
                            <div className="flex -space-x-3">
                                <img alt="Vet Avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                                {/* Reusing same placeholder for demo purposes */}
                                <img alt="Vet Avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                                <img alt="Vet Avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                            </div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-navy-custom/70 dark:text-slate-400">
                                Top Rated Local Clinic
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end h-full min-h-[400px] lg:min-h-[700px]">
                        <div className="absolute top-10 right-10 w-full h-full bg-white/20 dark:bg-white/5 rounded-t-full rounded-b-[200px] transform rotate-3 scale-95 blur-sm z-0 animate-pulse-slow"></div>
                        <motion.div
                            className="relative z-10 w-full max-w-md lg:max-w-lg aspect-[3/4] overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-2xl shadow-navy-custom/20 dark:shadow-black/50 border-4 border-white/30 dark:border-slate-700/30 backdrop-blur-sm"
                            variants={imageReveal}
                            initial="hidden"
                            animate="visible"
                        >

                            {/* Use the login-hero or clinic placeholder as the main image */}
                            <motion.img
                                alt="A happy golden retriever dog looking up and to the right, representing the care at East Vets Glen"
                                className="w-full h-full object-cover object-center"
                                src="/login-hero.png"
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1.05 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                whileHover={{ scale: 1.1, transition: { duration: 0.7 } }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/40 to-transparent pointer-events-none"></div>

                            <motion.div
                                className="absolute bottom-8 right-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[200px]"
                                variants={floatCard}
                            >
                                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                                    <span className="material-icons-outlined text-primary text-xl">pets</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Open Today</p>
                                    <p className="text-sm font-bold text-navy-custom dark:text-white">Until 7:00 PM</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Dotted Pattern SVG */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 z-20 hidden lg:block"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            <svg fill="none" height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                                <pattern height="20" id="dotPattern" patternUnits="userSpaceOnUse" width="20" x="0" y="0">
                                    <circle className="fill-white dark:fill-slate-600" cx="2" cy="2" r="2"></circle>
                                </pattern>
                                <rect fill="url(#dotPattern)" height="100" width="100"></rect>
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Local Partners Section */}
            <LocalPartners />

            {/* Services Section */}
            <ServicesGrid />

            {/* Sister Clinic Section */}
            <SisterClinic />

            {/* Mobile Floating Action Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50 lg:hidden"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
            >
                <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95">
                    <span className="material-icons-outlined text-2xl">calendar_month</span>
                </button>
            </motion.div>
        </main>
    )
}
