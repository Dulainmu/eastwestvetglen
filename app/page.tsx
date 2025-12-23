"use client"

import { TeamSection } from "@/components/landing/TeamSection"
import { OpeningHours } from "@/components/landing/OpeningHours"
import { MapEmbed } from "@/components/landing/MapEmbed"
import { PhilosophySection } from "@/components/landing/PhilosophySection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { ContactForm } from "@/components/landing/contact-form"

import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">

            {/* Organic Background Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-50" />
                <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[100px] opacity-60" />
                <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
            </div>

            {/* Inline Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Subtle gradient background for Hero */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 px-6 animate-fade-in">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-white/40 backdrop-blur-sm text-primary text-sm font-medium tracking-wider uppercase mb-2 animate-slide-down">
                            Glen Waverley Clinic
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary tracking-tight leading-tight">
                            East West <span className="italic text-accent">Vets</span> <br className="hidden md:block" /> Glen Waverley
                        </h1>
                        <p className="text-lg md:text-xl font-medium text-primary/80 max-w-3xl mx-auto tracking-wide">
                            Holistic Veterinary Care – Combining Western & Natural Medicine
                        </p>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        A new branch of East West Vets, bringing integrative veterinary care to Glen Waverley.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up">
                        <button className="px-10 py-4 bg-primary text-white text-lg rounded-full font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-primary/20">
                            Book Appointment
                        </button>
                        <Link
                            href="#location"
                            className="px-10 py-4 bg-white/80 backdrop-blur-sm text-primary text-lg border border-primary/10 rounded-full font-medium hover:bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 inline-block"
                        >
                            Get Directions
                        </Link>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2 animate-slide-up opacity-80">
                        Online booking coming soon
                    </p>
                </div>
            </section>

            {/* Main Content Container */}
            <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                {/* About / Intro Section */}
                <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-serif font-bold text-foreground">Welcome to Our New Clinic</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                            <p>
                                East West Vets Glen Waverley is a newly opening clinic, proudly part of the East West Veterinary Group.
                            </p>
                            <p>
                                We combine modern Western veterinary medicine with natural and holistic therapies to support the long-term health and wellbeing of your pets.
                            </p>
                        </div>
                        {/* Trust Badge */}
                        <div className="pt-4 flex items-center gap-3">
                            <div className="h-px w-12 bg-primary/20"></div>
                            <span className="text-sm font-medium text-primary/60 uppercase tracking-widest">Backed by East West Vets Bentleigh</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform rotate-6"></div>
                        <div className="bg-muted/50 rounded-[2rem] h-[400px] w-full flex items-center justify-center text-muted-foreground border border-white/50 backdrop-blur-sm shadow-xl relative overflow-hidden">
                            {/* Placeholder for an image */}
                            <div className="text-center p-6">
                                <span className="block text-4xl mb-2">🏥</span>
                                <span className="font-serif italic text-xl">Glen Waverley Clinic</span>
                            </div>
                        </div>
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
                <section className="grid md:grid-cols-2 gap-8">
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
