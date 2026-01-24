"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Animation Variants (Reused from Hero)
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

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
};

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
};

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
            delay: 1.2,
        },
    },
};

export default function ComingSoonPage() {
    const container = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [petType, setPetType] = useState("dog");

    useGSAP(() => {
        // Hero Text Stagger
        const tl = gsap.timeline();
        
        tl.from(".hero-text-char", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            delay: 0.2
        })
        .from(".hero-fade-in", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5");

        // Scroll Triggers for Sections
        gsap.utils.toArray<HTMLElement>(".reveal-on-scroll").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

    }, { scope: container });

    return (
        <div ref={container} className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans text-navy-custom dark:text-white overflow-x-hidden selection:bg-primary selection:text-white">

            {/* Header (Simplified for Coming Soon) */}
            <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-6">
                 <div className="flex items-center gap-2">
                    {/* Placeholder Logo */}
                    <span className="material-icons-outlined text-primary text-3xl">pets</span>
                    <span className="font-display font-bold text-xl tracking-tight">East Vets Glen</span>
                </div>
                <div className="hidden sm:block">
                     <span className="text-sm font-medium text-navy-custom/60 dark:text-slate-400">Opening Late 2026</span>
                </div>
            </header>

            <main className="relative z-10 flex-grow flex flex-col justify-center">
                 {/* Hero Section */}
                <section className="flex items-center justify-center px-6 lg:px-6 2xl:px-12 py-20 lg:py-0 min-h-screen">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 2xl:gap-24 items-center">
                        
                        {/* Left Column: Content */}
                        <motion.div
                            className="flex flex-col gap-6 lg:gap-6 2xl:gap-8 text-center lg:text-left order-2 lg:order-1"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="space-y-4 lg:space-y-4 2xl:space-y-6">
                                <div className="hero-fade-in inline-flex items-center justify-center lg:justify-start gap-2 text-primary font-bold tracking-widest text-[10px] lg:text-[10px] 2xl:text-xs uppercase mb-2">
                                     <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span className="w-8 h-[1px] bg-primary/40 hidden lg:block"></span>
                                    Something New is Coming
                                </div>
                                <h1 className="font-display text-4xl lg:text-5xl 2xl:text-7xl font-bold leading-[1.1] text-navy-custom dark:text-white overflow-hidden">
                                    <span className="inline-block">
                                        {"Reimagining Veterinary Care".split("").map((char, i) => (
                                            <span key={i} className="hero-text-char inline-block">{char === " " ? "\u00A0" : char}</span>
                                        ))}
                                    </span>
                                    <br />
                                    <span className="text-primary inline-block">
                                         {"in Glen Waverley.".split("").map((char, i) => (
                                            <span key={i} className="hero-text-char inline-block">{char === " " ? "\u00A0" : char}</span>
                                        ))}
                                    </span>
                                </h1>
                                <p className="hero-fade-in font-sans text-lg lg:text-base 2xl:text-xl text-navy-custom/70 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                                    We are building a modern, independent clinic where your pet is treated like family. Join the priority waitlist for exclusive opening offers.
                                </p>
                            </div>

                            {/* Waitlist Form (Replacing Buttons) */}
                            <div className="hero-fade-in w-full max-w-md mx-auto lg:mx-0 mt-4 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-1 rounded-2xl border border-navy-custom/5 dark:border-white/10 shadow-xl">
                                <form className="flex flex-col gap-3 p-4">
                                     <div className="grid grid-cols-2 gap-3 mb-1">
                                        <label className={`cursor-pointer relative flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${petType === 'dog' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-500'}`} onClick={() => setPetType('dog')}>
                                            <input type="radio" name="pet_type" value="dog" className="sr-only" defaultChecked />
                                            <span className="material-icons-outlined text-lg">pets</span>
                                            <span className="font-bold text-sm">Dog</span>
                                        </label>
                                        <label className={`cursor-pointer relative flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${petType === 'cat' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-500'}`} onClick={() => setPetType('cat')}>
                                            <input type="radio" name="pet_type" value="cat" className="sr-only" />
                                            <span className="material-icons-outlined text-lg">cruelty_free</span>
                                            <span className="font-bold text-sm">Cat</span>
                                        </label>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button type="button" className="bg-primary hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                                            <span>Join</span>
                                            <span className="material-icons-outlined text-sm">arrow_forward</span>
                                        </button>
                                    </div>
                                     <p className="text-center text-[10px] text-slate-400 mt-1">No spam, just updates on our launch.</p>
                                </form>
                            </div>

                            <div className="hero-fade-in pt-4 lg:pt-2 flex items-center justify-center lg:justify-start gap-4 opacity-80">
                                <div className="flex -space-x-3">
                                    <img alt="Vet Avatar" className="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                                    <img alt="Vet Avatar" className="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                                    <div className="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        +50
                                    </div>
                                </div>
                                <div className="text-[10px] lg:text-[10px] uppercase tracking-wide text-navy-custom/60 dark:text-slate-400 font-semibold">
                                    Glen Waverley Locals waiting
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Image (The "Hero" Arch) */}
                        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end h-full min-h-[350px] lg:min-h-[500px] 2xl:min-h-[700px]">
                            <div className="absolute top-10 right-10 w-full h-full bg-white/20 dark:bg-white/5 rounded-t-full rounded-b-[200px] transform rotate-3 scale-95 blur-sm z-0 animate-pulse-slow"></div>
                            <motion.div
                                className="relative z-10 w-full max-w-md lg:max-w-[320px] 2xl:max-w-lg aspect-[3/4] overflow-hidden rounded-t-[8rem] lg:rounded-t-[8rem] 2xl:rounded-t-[12rem] rounded-b-3xl shadow-2xl shadow-navy-custom/20 dark:shadow-black/50 border-4 border-white/30 dark:border-slate-700/30 backdrop-blur-sm"
                                variants={imageReveal}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.img
                                    alt="Clinic Atmosphere"
                                    className="w-full h-full object-cover object-center"
                                    src="/login-hero.png" // Reusing the hero image
                                    initial={{ scale: 1.15 }}
                                    animate={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/60 to-transparent pointer-events-none"></div>

                                {/* Floating Card 1 */}
                                <motion.div
                                    className="absolute bottom-6 right-6 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border border-white/20"
                                    variants={floatCard}
                                >
                                    <div className="bg-primary/20 p-2 rounded-full text-primary">
                                        <span className="material-icons-outlined text-xl">medical_services</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Advanced</p>
                                        <p className="text-xs font-bold text-navy-custom dark:text-white">Surgical Suite</p>
                                    </div>
                                </motion.div>

                                 {/* Floating Card 2 (Top Left) */}
                                 <motion.div
                                    className="absolute top-24 left-4 bg-white dark:bg-slate-800 p-2 pr-4 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border border-white/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <div className="bg-yellow-100 dark:bg-yellow-900/50 p-1.5 rounded-full text-yellow-600 dark:text-yellow-400">
                                        <span className="material-icons-outlined text-sm">star</span>
                                    </div>
                                    <span className="text-[10px] font-bold">Coming Soon</span>
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
            </main>

            {/* Trusted Experience (Vet Bio) */}
            <section className="py-24 bg-white dark:bg-[#11221a]/50 relative z-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div 
                        className="reveal-on-scroll mb-12 flex flex-col items-start gap-3"
                    >
                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-custom dark:text-white">Trusted Experience</h2>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-24 rounded-full bg-primary"></div>
                            <span className="text-xs font-bold text-navy-custom/40 dark:text-slate-500 uppercase tracking-wider">
                                part of East West Vet Group
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Vet 1: Dr. Ayesha */}
                        <div 
                             className="reveal-on-scroll rounded-3xl overflow-hidden border border-navy-custom/5 dark:border-white/10 shadow-2xl bg-white dark:bg-[#162921] flex flex-col"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img 
                                    src="/images/dr-ayesha.png" 
                                    alt="Dr. Ayesha" 
                                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                                        Principal Veterinarian
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-white">Dr. Ayesha</h3>
                                </div>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col gap-6">
                                <div className="space-y-4 text-navy-custom/80 dark:text-slate-300 leading-relaxed text-base">
                                    <p>
                                        Dr. Ayesha bridges cultural divides with fluency in English and Sinhala. With a Master's in Food Science & Nutrition, she brings a unique perspective to pet well-being.
                                    </p>
                                    <p>
                                        A visionary leader who established two state-of-the-art clinics, she specializes in complex medical cases and surgery, treating every patient like her own Jack Russell, Danny.
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-navy-custom/5 dark:border-white/5 flex flex-wrap gap-x-4 gap-y-2">
                                    <span className="text-sm font-semibold text-navy-custom/60 dark:text-slate-400">• BVSc (Hons)</span>
                                    <span className="text-sm font-semibold text-navy-custom/60 dark:text-slate-400">• MSc (Nutrition)</span>
                                    <span className="text-sm font-semibold text-navy-custom/60 dark:text-slate-400">• 23+ Years Exp</span>
                                </div>
                            </div>
                        </div>

                        {/* Vet 2: Dr. Kamani Dissanayake */}
                        <div 
                             className="reveal-on-scroll rounded-3xl overflow-hidden border border-navy-custom/5 dark:border-white/10 shadow-2xl bg-white dark:bg-[#162921] flex flex-col"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img 
                                    src="/images/dr-kamani.jpg" 
                                    alt="Dr. Kamani Dissanayake" 
                                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                                        Senior Veterinarian
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-white">Dr. Kamani Dissanayake</h3>
                                </div>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col gap-6">
                                <div className="space-y-4 text-navy-custom/80 dark:text-slate-300 leading-relaxed text-base">
                                    <p>
                                        Dr. Kamani joins us with 15 years of international and local experience. Her calm and loving approach is complemented by qualification in Acupuncture and herbal medicine.
                                    </p>
                                    <p>
                                        An excellent surgeon and gentle practitioner, she combines modern veterinary science with natural alternatives to provide holistic care for your pets.
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-navy-custom/5 dark:border-white/5 flex flex-wrap gap-x-4 gap-y-2">
                                    <span className="text-sm font-semibold text-navy-custom/60 dark:text-slate-400">• B.V.Sc</span>
                                    <span className="text-sm font-semibold text-navy-custom/60 dark:text-slate-400">• Acupuncture Cert.</span>
                                    <span className="text-sm font-semibold text-navy-custom/60 dark:text-slate-400">• Holistic Care</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Our Legacy Section */}
             <section className="py-20 bg-background-light dark:bg-background-dark relative z-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="reveal-on-scroll relative rounded-3xl overflow-hidden bg-navy-custom shadow-2xl border border-white/10">
                        <div className="absolute inset-0 bg-[#162921]"></div>
                        <div className="absolute inset-0 bg-[url('/images/map-placeholder.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-custom via-navy-custom/95 to-transparent"></div>
                        
                        <div className="relative z-10 p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                    <span className="material-icons-outlined text-sm">verified</span>
                                    Established 1994
                                </div>
                                
                                <div className="space-y-4">
                                    <h2 className="font-display text-3xl lg:text-5xl font-bold text-white leading-tight">
                                        A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Excellence</span>
                                    </h2>
                                    <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                                        For over <strong className="text-white font-semibold">30 years</strong>, the East West Veterinary Group has set the standard for compassionate pet care in Melbourne. 
                                    </p>
                                    <p className="text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                        East Vets Glen continues this proud tradition, bringing decades of veterinary expertise and trusted community service to Glen Waverley.
                                    </p>
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a 
                                        href="http://www.eastwestvet.com.au" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-white text-navy-custom font-bold py-3 px-8 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5"
                                    >
                                        Visit Our Bentleigh Clinic
                                        <span className="material-icons-outlined text-sm">open_in_new</span>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Visual/Statistic Badge */}
                            <div className="hidden lg:flex items-center gap-8 opacity-90">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center gap-1 min-w-[140px]">
                                        <span className="text-4xl font-display font-bold text-white">30+</span>
                                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Years</span>
                                    </div>
                                </div>
                                <div className="relative group">
                                     <div className="relative border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center gap-1 min-w-[140px]">
                                        <span className="text-4xl font-display font-bold text-white">15k+</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Happy Pets</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Services */}
            {/* Coming Soon & Timeline */}
            <section className="py-24 bg-background-light dark:bg-background-dark relative z-20 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>

                <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                    <div 
                        className="reveal-on-scroll mb-16 flex flex-col items-center text-center gap-4"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Opening Late 2026
                        </div>
                        <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-custom dark:text-white">
                            What to Expect
                        </h2>
                        <p className="text-lg text-navy-custom/60 dark:text-slate-400 max-w-2xl">
                            We are crafting a sanctuary for healing. Here is a glimpse into the future state-of-the-art facility coming to Glen Waverley.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="reveal-on-scroll mb-20">
                        <div className="relative">
                            {/* Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 hidden md:block"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                {[
                                    { title: "Planning & Design", status: "completed", date: "Jan 2025" },
                                    { title: "Construction", status: "active", date: "Mid 2025" },
                                    { title: "Fitout & Equipment", status: "upcoming", date: "Late 2025" },
                                    { title: "Grand Opening", status: "upcoming", date: "2026" }
                                ].map((phase, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 text-center group">
                                        <div className={`relative z-10 w-4 h-4 rounded-full border-4 transition-all duration-500
                                            ${phase.status === 'completed' ? 'bg-primary border-primary' : 
                                              phase.status === 'active' ? 'bg-white border-primary scale-125 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]' : 
                                              'bg-gray-200 dark:bg-gray-800 border-gray-200 dark:border-gray-800'}`}>
                                            {phase.status === 'completed' && (
                                                <span className="material-icons-outlined text-[10px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">check</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold uppercase tracking-wider mb-1
                                                ${phase.status === 'active' ? 'text-primary' : 
                                                  phase.status === 'completed' ? 'text-navy-custom/80 dark:text-slate-300' : 
                                                  'text-gray-400'}`}>
                                                {phase.title}
                                            </p>
                                            <p className="text-xs text-gray-500 font-medium">{phase.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 h-auto lg:h-[600px]">
                        {/* Panel 1: Diagnostics (Large) */}
                         <div 
                            className="reveal-on-scroll group relative overflow-hidden rounded-3xl bg-navy-custom lg:col-span-2 lg:row-span-2 shadow-2xl border border-white/10"
                        >
                            <img 
                                src="/login-hero.png" 
                                alt="Diagnostics" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-custom via-navy-custom/50 to-transparent"></div>
                            
                            {/* Hover Reveal Content */}
                            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                                <div className="transform transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-green-600 text-white shadow-lg shadow-green-900/20">
                                        <span className="material-icons-outlined text-3xl">radiology</span>
                                    </div>
                                    <h3 className="mb-4 font-display text-3xl lg:text-4xl font-bold text-white">Full Diagnostics Suite</h3>
                                    <div className="space-y-4 max-w-lg">
                                        <p className="text-slate-300 text-lg leading-relaxed">
                                            Rapid, accurate results are crucial. Our in-house laboratory, digital radiology, and ultrasound suite will provide immediate answers for your pet's care.
                                        </p>
                                        <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Digital X-Ray</li>
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Ultrasound</li>
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Pathology</li>
                                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Dental Imaging</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Holistic Care */}
                        <div 
                            className="reveal-on-scroll group relative overflow-hidden rounded-3xl bg-[#1c3329] shadow-xl border border-white/10 min-h-[300px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-primary border border-white/10">
                                    <span className="material-icons-outlined text-xl">spa</span>
                                </div>
                                <h3 className="mb-2 font-display text-2xl font-bold text-white">Holistic Wellness</h3>
                                <p className="text-sm text-slate-400 line-clamp-2 group-hover:line-clamp-none transition-all">
                                    Integrating Acupuncture, Chinese Herbal Medicine, and nutritional therapy for balanced healing.
                                </p>
                            </div>
                        </div>

                        {/* Panel 3: Surgery */}
                        <div 
                            className="reveal-on-scroll group relative overflow-hidden rounded-3xl bg-[#0f172a] shadow-xl border border-white/10 min-h-[300px]"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 backdrop-blur-md text-blue-400 border border-blue-500/20">
                                    <span className="material-icons-outlined text-xl">medical_services</span>
                                </div>
                                <h3 className="mb-2 font-display text-2xl font-bold text-white">Advanced Surgery</h3>
                                <p className="text-sm text-slate-400 line-clamp-2 group-hover:line-clamp-none transition-all">
                                    A sterile, hospital-grade surgical theatre equipped for soft-tissue and orthopaedic procedures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Visit Us Soon (Map Section) */}
             <section className="relative h-[600px] w-full bg-[#0f1915] overflow-hidden">
                {/* Map Background */}
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale contrast-125 brightness-50" 
                    style={{ backgroundImage: "url('/images/map-placeholder.png')" }}
                ></div>
                
                 {/* Floating Overlay Card */}
                <div className="absolute bottom-8 left-6 right-6 sm:top-1/2 sm:left-12 sm:right-auto sm:bottom-auto sm:-translate-y-1/2 max-w-sm">
                    <div 
                        className="reveal-on-scroll bg-white/90 dark:bg-[#11221a]/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl"
                    >
                        <div className="flex items-start gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                                <span className="material-icons-outlined text-2xl">location_on</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="font-display text-xl font-bold text-navy-custom dark:text-white">Visit Us Soon</h3>
                                <p className="text-navy-custom/70 dark:text-slate-300 leading-relaxed">
                                    45 Kingsway,<br />
                                    Glen Waverley VIC 3150
                                </p>
                                <div className="mt-2 h-px w-full bg-navy-custom/5 dark:bg-white/10"></div>
                                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide">
                                    <span className="material-icons-outlined text-sm">local_parking</span>
                                    <span>Ample parking at rear</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             <footer className="border-t border-navy-custom/5 dark:border-white/5 bg-white dark:bg-[#0d1a14] py-12 relative z-20">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:px-12 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                             <span className="material-icons-outlined text-xl">pets</span>
                        </div>
                        <span className="text-lg font-display font-bold text-navy-custom dark:text-white tracking-tight">East Vets Glen</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="http://www.eastwestvet.com.au" target="_blank" rel="noopener noreferrer">
                            <span className="flex items-center gap-2">
                                <span className="material-icons-outlined text-sm">open_in_new</span>
                                Sister Clinic (Bentleigh)
                            </span>
                        </a>
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="#">Instagram</a>
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="#">Facebook</a>
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="mailto:hello@eastvetsglen.com.au">hello@eastvetsglen.com.au</a>
                    </div>
                    <p className="text-xs text-navy-custom/40 dark:text-slate-600 font-medium">
                        © 2026 East Vets Glen. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
