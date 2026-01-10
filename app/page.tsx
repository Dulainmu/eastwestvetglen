"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [petType, setPetType] = useState("dog");

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans text-navy-custom dark:text-white overflow-x-hidden selection:bg-primary selection:text-white">

            {/* Header (Simplified for Coming Soon) */}
            <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-6">
                 <div className="flex items-center gap-2">
                    {/* Placeholder Logo */}
                    <span className="material-icons-outlined text-primary text-3xl">pets</span>
                    <span className="font-display font-bold text-xl tracking-tight">East Vets Glen</span>
                </div>
                <div className="hidden sm:block">
                     <span className="text-sm font-medium text-navy-custom/60 dark:text-slate-400">Opening Late 2024</span>
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
                                <motion.div variants={fadeInUp} className="inline-flex items-center justify-center lg:justify-start gap-2 text-primary font-bold tracking-widest text-[10px] lg:text-[10px] 2xl:text-xs uppercase mb-2">
                                     <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span className="w-8 h-[1px] bg-primary/40 hidden lg:block"></span>
                                    Something New is Coming
                                </motion.div>
                                <motion.h1 variants={fadeInUp} className="font-display text-4xl lg:text-5xl 2xl:text-7xl font-bold leading-[1.1] text-navy-custom dark:text-white">
                                    Reimagining Veterinary Care in <span className="text-primary">Glen Waverley.</span>
                                </motion.h1>
                                <motion.p variants={fadeInUp} className="font-sans text-lg lg:text-base 2xl:text-xl text-navy-custom/70 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                                    We are building a modern, independent clinic where your pet is treated like family. Join the priority waitlist for exclusive opening offers.
                                </motion.p>
                            </div>

                            {/* Waitlist Form (Replacing Buttons) */}
                            <motion.div variants={fadeInUp} className="w-full max-w-md mx-auto lg:mx-0 mt-4 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-1 rounded-2xl border border-navy-custom/5 dark:border-white/10 shadow-xl">
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
                            </motion.div>

                            <motion.div variants={fadeInUp} className="pt-4 lg:pt-2 flex items-center justify-center lg:justify-start gap-4 opacity-80">
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
                            </motion.div>
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
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 flex flex-col items-start gap-3"
                    >
                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-custom dark:text-white">Trusted Experience</h2>
                        <div className="h-1.5 w-24 rounded-full bg-primary"></div>
                    </motion.div>

                    <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                         className="rounded-3xl overflow-hidden border border-navy-custom/5 dark:border-white/10 shadow-2xl bg-white dark:bg-[#162921]"
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Image Side */}
                            <div className="relative h-96 md:h-auto md:w-2/5 lg:w-1/3 overflow-hidden">
                                <img 
                                    src="/images/team_placeholder.png" 
                                    alt="Dr. Sarah Jenkins" 
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
                            </div>
                            
                            {/* Content Side */}
                            <div className="flex flex-1 flex-col justify-center gap-8 p-8 lg:p-12 relative">
                                <div>
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                                        Lead Veterinarian
                                    </div>
                                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy-custom dark:text-white mb-2">Meet Dr. Sarah Jenkins</h3>
                                    <p className="text-navy-custom/60 dark:text-slate-400 font-medium">B.V.Sc (Hons) • Surgery Certified</p>
                                </div>
                                <div className="space-y-6 text-navy-custom/80 dark:text-slate-300 leading-relaxed text-lg">
                                    <p>
                                        With over 15 years of compassion-led experience, Dr. Jenkins brings a wealth of knowledge in internal medicine and soft tissue surgery. Her philosophy is simple: <span className="text-primary font-bold">treat every pet as if they were her own family member.</span>
                                    </p>
                                    <p>
                                        Previously the Senior Vet at Melbourne Central Animal Hospital, she is now bringing her expertise to Glen Waverley to set a new benchmark in personalized pet healthcare.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-4 border-t border-navy-custom/5 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-navy-custom/70 dark:text-slate-400">
                                        <span className="material-icons-outlined text-primary">school</span>
                                        <span>Melbourne Univ. Alumni</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-navy-custom/70 dark:text-slate-400">
                                        <span className="material-icons-outlined text-primary">verified</span>
                                        <span>Fear Free Certified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Services */}
            <section className="py-24 bg-background-light dark:bg-background-dark relative z-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 flex flex-col items-start gap-3"
                    >
                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-custom dark:text-white">Coming Soon</h2>
                        <div className="h-1.5 w-24 rounded-full bg-primary"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 h-auto lg:h-[600px]">
                        {/* Panel 1: Diagnostics (Large) */}
                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative overflow-hidden rounded-3xl bg-navy-custom lg:col-span-2 lg:row-span-2 shadow-xl border border-white/10"
                        >
                            <img 
                                src="/login-hero.png" 
                                alt="Diagnostics" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-md text-primary">
                                    <span className="material-icons-outlined text-2xl">radiology</span>
                                </div>
                                <h3 className="mb-3 font-display text-3xl font-bold text-white">State-of-the-art Diagnostics</h3>
                                <p className="max-w-md text-slate-300 text-lg leading-relaxed">
                                    Our clinic will feature a full in-house laboratory, digital radiology, and ultrasound capabilities, ensuring rapid results for peace of mind.
                                </p>
                            </div>
                        </motion.div>

                        {/* Panel 2: Holistic Care */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative overflow-hidden rounded-3xl bg-navy-custom shadow-xl border border-white/10 min-h-[300px]"
                        >
                             <div className="absolute inset-0 bg-[#1c3329]"></div> {/* Placeholder Color */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-md text-primary">
                                    <span className="material-icons-outlined text-xl">spa</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-white">Holistic &amp; Wellness Care</h3>
                            </div>
                        </motion.div>

                        {/* Panel 3: Surgery */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative overflow-hidden rounded-3xl bg-navy-custom shadow-xl border border-white/10 min-h-[300px]"
                        >
                             <div className="absolute inset-0 bg-[#0f172a]"></div> {/* Placeholder Color */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-md text-primary">
                                    <span className="material-icons-outlined text-xl">medical_services</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-white">Advanced Surgical Suite</h3>
                            </div>
                        </motion.div>
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
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/90 dark:bg-[#11221a]/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl"
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
                    </motion.div>
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
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="#">Instagram</a>
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="#">Facebook</a>
                        <a className="text-sm font-medium text-navy-custom/60 dark:text-slate-400 hover:text-primary transition-colors" href="mailto:hello@eastvetsglen.com.au">hello@eastvetsglen.com.au</a>
                    </div>
                    <p className="text-xs text-navy-custom/40 dark:text-slate-600 font-medium">
                        © 2024 East Vets Glen. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
