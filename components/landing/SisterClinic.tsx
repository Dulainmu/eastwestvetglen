"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"

// Animation Variants
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
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

const imageRevealRight: Variants = {
    hidden: { opacity: 0, x: 50, rotate: 0 },
    visible: {
        opacity: 1,
        x: 0,
        rotate: 2,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.2,
        },
    },
}

const imageRevealLeft: Variants = {
    hidden: { opacity: 0, x: -50, rotate: 0 },
    visible: {
        opacity: 1,
        x: 0,
        rotate: -3,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
        },
    },
}

const statsVariant: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "backOut",
        },
    },
}

export function SisterClinic() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-white dark:bg-slate-900" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="uppercase tracking-widest text-xs font-bold text-navy-custom/60 dark:text-slate-400 mb-4">
                        Growing Our Community
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-custom dark:text-white mb-6">
                        Part of the East Vets Family.
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Text Content */}
                    <motion.div
                        className="lg:col-span-5 order-2 lg:order-1 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl transition-all hover:shadow-2xl border border-navy-custom/5 dark:border-slate-700"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center mb-6 text-primary">
                            <span className="material-icons-outlined text-4xl">pets</span>
                            <div className="ml-4 h-px bg-slate-200 dark:bg-slate-600 flex-grow"></div>
                        </motion.div>
                        <motion.h3 variants={fadeInUp} className="font-display text-2xl md:text-3xl text-navy-custom dark:text-white mb-6 leading-tight">
                            Expanding our tradition of excellence from Bentleigh to Glen Waverley.
                        </motion.h3>
                        <motion.p variants={fadeInUp} className="text-navy-custom/70 dark:text-slate-300 text-lg leading-relaxed mb-8 font-medium">
                            We are proud to expand our family from Bentleigh to Glen Waverley. Our clients know that the <strong className="text-navy-custom dark:text-white">East Vets</strong> name means compassionate, high-quality care. Whether you visit us at our original home or our new location, you're meeting the same dedicated owners and philosophy.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/about" className="inline-flex items-center justify-center px-6 py-4 bg-primary text-white font-bold rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg group">
                                Our Story
                                <span className="material-icons-outlined ml-2 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                            </Link>
                            <Link href="/locations" className="inline-flex items-center justify-center px-6 py-4 border-2 border-slate-200 dark:border-slate-600 text-navy-custom dark:text-slate-200 font-bold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                View Locations
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Overlapping Images */}
                    <div className="lg:col-span-7 order-1 lg:order-2 relative h-[500px] lg:h-[600px] w-full">
                        {/* Image 1: Bentleigh (Back/Right) */}
                        <motion.div
                            className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white dark:border-slate-700"
                            variants={imageRevealRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.5 } }}
                        >
                            <img
                                alt="Veterinarian examining a dog at the Bentleigh clinic"
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop"
                            />
                            <div className="absolute bottom-0 left-0 bg-black/60 backdrop-blur-md text-white px-6 py-3 text-sm font-bold rounded-tr-xl tracking-wide">
                                Bentleigh Clinic
                            </div>
                        </motion.div>

                        {/* Image 2: Glen Waverley (Front/Left) */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white dark:border-slate-700"
                            variants={imageRevealLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.5 } }}
                        >
                            <img
                                alt="Modern reception area at the new Glen Waverley clinic"
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2670&auto=format&fit=crop"
                            />
                            <div className="absolute bottom-0 right-0 bg-primary/90 backdrop-blur-md text-white px-6 py-3 text-sm font-bold rounded-tl-xl tracking-wide">
                                New: Glen Waverley
                            </div>
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white dark:bg-slate-800 rounded-full p-4 shadow-xl border border-slate-100 dark:border-slate-600 w-28 h-28 flex flex-col items-center justify-center text-center"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, type: "spring" }}
                        >
                            <div className="animate-pulse-slow flex flex-col items-center justify-center h-full w-full">
                                <span className="material-icons-outlined text-primary text-4xl">verified</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-navy-custom dark:text-slate-200 leading-tight">Trusted<br />Standard</span>
                            </div>
                        </motion.div>

                        {/* Decorative Blobs */}
                        <div className="absolute -top-4 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-60 blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob"></div>
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary rounded-full opacity-40 blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-2000"></div>
                    </div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <motion.div variants={statsVariant} className="flex flex-col items-center group">
                        <span className="font-display text-4xl md:text-5xl font-bold mb-2 text-navy-custom dark:text-white group-hover:text-primary transition-colors">20+</span>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-navy-custom/60 dark:text-slate-400">Years Experience</span>
                    </motion.div>
                    <motion.div variants={statsVariant} className="flex flex-col items-center group">
                        <span className="font-display text-4xl md:text-5xl font-bold mb-2 text-navy-custom dark:text-white group-hover:text-primary transition-colors">5k+</span>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-navy-custom/60 dark:text-slate-400">Happy Pets</span>
                    </motion.div>
                    <motion.div variants={statsVariant} className="flex flex-col items-center group">
                        <span className="font-display text-4xl md:text-5xl font-bold mb-2 text-navy-custom dark:text-white group-hover:text-primary transition-colors">2</span>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-navy-custom/60 dark:text-slate-400">Local Clinics</span>
                    </motion.div>
                    <motion.div variants={statsVariant} className="flex flex-col items-center group">
                        <span className="font-display text-4xl md:text-5xl font-bold mb-2 text-navy-custom dark:text-white group-hover:text-primary transition-colors">1</span>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-navy-custom/60 dark:text-slate-400">Standard of Care</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
