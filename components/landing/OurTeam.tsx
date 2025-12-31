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

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

export function OurTeam() {
    return (
        <section className="py-12 lg:py-12 xl:py-24 px-6 md:px-12 lg:px-16 xl:px-20 bg-emerald-50/50 dark:bg-slate-800/30 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-10 lg:mb-12 xl:mb-16 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-wider uppercase text-[10px] lg:text-xs mb-2 block">Meet the Owners</span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-navy-custom dark:text-white mb-4 lg:mb-6">Experienced Hands & Warm Hearts</h2>
                    <p className="max-w-2xl mx-auto text-base lg:text-base xl:text-lg text-navy-custom/70 dark:text-slate-300 font-medium leading-relaxed">
                        Led by a husband and wife team with over 20 years of combined experience in small animal medicine and surgery.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Dr. Sarah Jenkins */}
                    <motion.div
                        className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-navy-custom/5 dark:border-slate-700"
                        variants={cardVariant}
                    >
                        <div className="relative h-64 lg:h-56 xl:h-96 overflow-hidden">
                            <img
                                alt="Dr. Sarah Jenkins examining a patient"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-navy-custom dark:text-white mb-1">Dr. Sarah Jenkins</h3>
                                    <p className="text-primary font-bold tracking-wide uppercase text-xs">Veterinary Director & Co-Owner</p>
                                </div>
                                <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Since 2012</span>
                            </div>
                            <div className="space-y-4 flex-grow">
                                <p className="text-navy-custom/70 dark:text-gray-300 leading-relaxed font-medium">
                                    Sarah believes that every pet deserves a tailored approach to healthcare. With over a decade of experience in internal medicine, she ensures your furry family members receive the most precise diagnostics available.
                                </p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3">Special Interests</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-gray-200">
                                        <span className="material-icons-outlined text-base mr-1 text-primary">biotech</span> Internal Medicine
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-gray-200">
                                        <span className="material-icons-outlined text-base mr-1 text-primary">pets</span> Geriatric Care
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dr. Michael Chang */}
                    <motion.div
                        className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-navy-custom/5 dark:border-slate-700"
                        variants={cardVariant}
                    >
                        <div className="relative h-64 lg:h-56 xl:h-96 overflow-hidden">
                            <img
                                alt="Dr. Michael Chang smiling with a dog"
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-navy-custom dark:text-white mb-1">Dr. Michael Chang</h3>
                                    <p className="text-primary font-bold tracking-wide uppercase text-xs">Head Surgeon & Co-Owner</p>
                                </div>
                                <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Since 2015</span>
                            </div>
                            <div className="space-y-4 flex-grow">
                                <p className="text-navy-custom/70 dark:text-gray-300 leading-relaxed font-medium">
                                    Michael brings a gentle touch to complex surgical procedures. He is passionate about making advanced surgical care accessible and less stressful for both pets and their owners in the Glen Waverley community.
                                </p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <p className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3">Special Interests</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-gray-200">
                                        <span className="material-icons-outlined text-base mr-1 text-primary">content_cut</span> Soft Tissue Surgery
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-gray-200">
                                        <span className="material-icons-outlined text-base mr-1 text-primary">healing</span> Orthopedics
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-primary hover:bg-green-700 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Book an Appointment
                        <span className="material-icons-outlined ml-2">arrow_forward</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
