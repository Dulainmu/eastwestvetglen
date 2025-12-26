"use client"

import { TeamSection } from "@/components/landing/TeamSection"
import { OpeningHours } from "@/components/landing/OpeningHours"
import { MapEmbed } from "@/components/landing/MapEmbed"
import { PhilosophySection } from "@/components/landing/PhilosophySection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ContactForm } from "@/components/landing/contact-form"
import { HeroSlideshow } from "@/components/landing/HeroSlideshow"
import { motion } from "framer-motion"

import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">



            {/* Inline Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden perspective-1000 pt-32">
                <HeroSlideshow />

                <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 text-center w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-3xl 2xl:max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-6 sm:px-8 md:px-10 lg:px-6 2xl:px-10 transform-style-3d"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="inline-block px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary dark:text-accent text-sm font-medium tracking-widest uppercase mb-4 sm:mb-6 dark:border-accent/20 dark:bg-accent/10"
                        >
                            Glen Waverley Clinic
                        </motion.div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl 2xl:text-8xl font-serif font-bold text-primary dark:text-white tracking-tight leading-tight">
                            East West <span className="italic text-accent">Vets</span> <br className="hidden md:block" /> Glen Waverley
                        </h1>
                        <p className="text-lg md:text-xl font-medium text-primary/80 dark:text-gray-200 max-w-xl md:max-w-3xl mx-auto tracking-wide">
                            Holistic Veterinary Care – Combining Western & Natural Medicine
                        </p>
                    </div>

                    <p className="text-lg sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl text-muted-foreground dark:text-gray-300 max-w-lg md:max-w-2xl mx-auto leading-relaxed font-light">
                        A new branch of East West Vets, bringing integrative veterinary care to Glen Waverley.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-6 sm:pt-8"
                    >
                        <button className="px-8 sm:px-10 py-3 sm:py-4 bg-primary text-white text-base sm:text-lg rounded-full font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-primary/20 hover:scale-105 active:scale-95">
                            Book Appointment
                        </button>
                        <Link
                            href="#location"
                            className="px-8 sm:px-10 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-primary text-base sm:text-lg border border-primary/10 rounded-full font-medium hover:bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 inline-block hover:scale-105 active:scale-95"
                        >
                            Get Directions
                        </Link>
                    </motion.div>
                    <p className="text-xs text-muted-foreground pt-2 opacity-80">
                        Online booking coming soon
                    </p>
                </motion.div>
            </section>

            {/* Main Content Container */}
            <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                {/* About / Intro Section */}
                <section id="about" className="grid md:grid-cols-2 gap-12 items-center perspective-1000">
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-serif font-bold text-foreground dark:text-white"
                        >
                            Our Philosophy
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4 text-muted-foreground dark:text-gray-300 leading-relaxed text-lg"
                        >
                            <p className="font-medium text-primary/80 italic text-xl border-l-4 border-accent pl-6 py-2">
                                "At East West Vets we practice modern Western medicine along with Chinese medicine to achieve the best outcome for your pet."
                            </p>
                            <p>
                                East West Vets Glen Waverley is a newly opening clinic, proudly part of the East West Veterinary Group. We are dedicated to providing comprehensive care that addresses the root cause of illness, not just the symptoms.
                            </p>
                        </motion.div>
                        {/* Trust Badge - Animated */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-4 flex items-center gap-3"
                        >
                            <div className="h-px w-12 bg-primary/20"></div>
                            <motion.div
                                animate={{
                                    textShadow: [
                                        "0 0 0px rgba(212, 175, 55, 0)",
                                        "0 0 10px rgba(212, 175, 55, 0.5)",
                                        "0 0 0px rgba(212, 175, 55, 0)"
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="text-sm font-medium text-primary/80 uppercase tracking-widest border border-primary/20 px-3 py-1 rounded-full bg-primary/5 backdrop-blur-sm dark:text-accent dark:border-accent/40 dark:bg-accent/10"
                            >
                                Backed by East West Vets Bentleigh
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* 3D Image Frame */}
                    <div className="relative perspective-1000 group">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform rotate-6 scale-90 group-hover:scale-100 transition-transform duration-700"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            whileHover={{
                                rotateY: -5,
                                rotateX: 5,
                                scale: 1.02,
                                boxShadow: "20px 20px 60px -15px rgba(0,0,0,0.3)"
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="bg-muted/50 dark:bg-gray-800/50 rounded-[2rem] h-[400px] w-full flex items-center justify-center text-muted-foreground border border-white/50 backdrop-blur-sm shadow-xl relative overflow-hidden transform-style-3d cursor-pointer"
                        >
                            {/* Decorative Shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 group-hover:translate-x-0 group-hover:translate-y-0" />

                            {/* Placeholder for an image */}
                            <div className="text-center p-6 transform-style-3d group-hover:translate-z-10 transition-transform duration-300">
                                <span className="block text-4xl mb-4 transform group-hover:scale-110 transition-transform">🏥</span>
                                <span className="font-serif italic text-xl text-primary/70 block">Glen Waverley Clinic</span>
                                <span className="text-xs uppercase tracking-widest text-primary/40 mt-2 block">Opening Soon</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <PhilosophySection />

                {/* Core Services Section */}
                <ServicesSection />

                {/* Team Section */}
                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Meet Our Team</h2>
                        <p className="text-muted-foreground">Experienced professionals dedicated to your pet's holistic health.</p>
                    </div>
                    <TeamSection />
                </section>

                {/* Info Grid (Opening Hours & Map) */}
                <section id="location" className="grid md:grid-cols-2 gap-8">
                    <OpeningHours />
                    <div className="min-h-[400px] rounded-3xl overflow-hidden shadow-lg border border-border/50 relative">
                        <MapEmbed />
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-primary text-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    {/* Decorative background circles */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get in Touch</h2>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    Online booking will be available soon. For now, please contact us directly to enquire or make an appointment.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <Link href="tel:0390000000" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                                        📞
                                    </div>
                                    <span className="text-xl group-hover:text-accent transition-colors">(03) 9000 0000</span>
                                </Link>
                                <Link href="mailto:info@eastwestvets.com.au" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                                        📧
                                    </div>
                                    <span className="text-xl group-hover:text-accent transition-colors">info@eastwestvets.com.au</span>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md border border-white/10 shadow-inner">
                            <ContactForm />
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-white/50 backdrop-blur-md border-t border-primary/5 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
                    <p className="font-serif text-primary text-lg font-bold">East West Vets – Glen Waverley</p>
                    <p className="text-muted-foreground text-sm">
                        Part of the <span className="font-medium text-primary">East West Veterinary Group</span>
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} East West Vets. All rights reserved. <br />
                        Online booking powered by <span className="font-medium">VetFlow</span> — coming soon
                    </p>
                </div>
            </footer>
        </div>
    )
}
