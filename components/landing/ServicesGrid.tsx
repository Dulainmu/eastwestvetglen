"use client"

import Link from "next/link"
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

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

export function ServicesGrid() {
    return (
        <section className="py-16 xl:py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-800/50 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-12 xl:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-xs font-bold tracking-widest text-navy-custom/70 dark:text-slate-300 uppercase mb-4 opacity-70">Compassionate & Comprehensive</h2>
                    <h1 className="font-display text-4xl md:text-4xl xl:text-6xl text-navy-custom dark:text-white mb-6">
                        Complete Care for Your Companion
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-navy-custom/80 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        From routine wellness checks to advanced surgical procedures, we provide a full spectrum of veterinary services tailored to your pet's unique needs.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Wellness & Prevention - Large Card */}
                    <motion.div
                        className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
                        variants={cardVariant}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/90 via-navy-custom/20 to-transparent z-10"></div>
                        <img
                            alt="Veterinarian examining a dog"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            src="https://images.unsplash.com/photo-1623366302587-bca24d36098d?q=80&w=2574&auto=format&fit=crop"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 text-white shadow-lg shadow-primary/30">
                                <span className="material-icons-outlined">health_and_safety</span>
                            </div>
                            <h3 className="font-display text-3xl text-white mb-2">Wellness & Prevention</h3>
                            <p className="text-slate-200 text-lg mb-6 max-w-md">Comprehensive health checks, vaccinations, and preventative care plans designed to keep your pet happy and healthy.</p>
                            <Link href="/services/wellness" className="inline-flex items-center text-white font-bold hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
                                Learn more <span className="material-icons-outlined text-sm ml-2">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Advanced Surgery */}
                    <motion.div
                        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between border border-navy-custom/5 dark:border-slate-700"
                        variants={cardVariant}
                    >
                        <div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                <span className="material-icons-outlined">medical_services</span>
                            </div>
                            <h3 className="font-display text-2xl text-navy-custom dark:text-white mb-3">Advanced Surgery</h3>
                            <p className="text-navy-custom/70 dark:text-slate-400 leading-relaxed font-medium">State-of-the-art surgical suite for soft tissue and orthopedic procedures.</p>
                        </div>
                    </motion.div>

                    {/* Dental Care */}
                    <motion.div
                        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between border border-navy-custom/5 dark:border-slate-700"
                        variants={cardVariant}
                    >
                        <div>
                            <div className="w-12 h-12 bg-teal-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                                <span className="material-icons-outlined">clean_hands</span>
                            </div>
                            <h3 className="font-display text-2xl text-navy-custom dark:text-white mb-3">Dental Care</h3>
                            <p className="text-navy-custom/70 dark:text-slate-400 leading-relaxed font-medium">Professional cleaning, polishing, and oral surgery to maintain dental health.</p>
                        </div>
                    </motion.div>

                    {/* In-House Diagnostics - Tall Dark Card */}
                    <motion.div
                        className="lg:col-span-1 lg:row-span-2 bg-navy-custom dark:bg-slate-900 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                        variants={cardVariant}
                    >
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                                <span className="material-icons-outlined text-primary text-3xl">biotech</span>
                            </div>
                            <h3 className="font-display text-3xl mb-4">In-House Diagnostics</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed font-medium">Our fully equipped laboratory allows for rapid results when time matters most.</p>
                            <ul className="space-y-4 text-slate-200 font-medium">
                                <li className="flex items-center"><span className="material-icons-outlined text-primary text-sm mr-3">check_circle</span> Digital X-Ray</li>
                                <li className="flex items-center"><span className="material-icons-outlined text-primary text-sm mr-3">check_circle</span> Ultrasound</li>
                                <li className="flex items-center"><span className="material-icons-outlined text-primary text-sm mr-3">check_circle</span> Blood Analysis</li>
                                <li className="flex items-center"><span className="material-icons-outlined text-primary text-sm mr-3">check_circle</span> Urinalysis</li>
                            </ul>
                        </div>
                        <div className="relative z-10 mt-8">
                            <Link href="/facilities" className="block w-full py-3 px-4 bg-primary hover:bg-green-600 text-white text-center rounded-xl font-bold transition-colors shadow-lg shadow-primary/20">
                                View Facilities
                            </Link>
                        </div>
                    </motion.div>

                    {/* Emergency Triage - Wide Card */}
                    <motion.div
                        className="md:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col md:flex-row items-center gap-8 border border-navy-custom/5 dark:border-slate-700"
                        variants={cardVariant}
                    >
                        <div className="flex-1">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 text-red-500">
                                    <span className="material-icons-outlined text-xl">emergency</span>
                                </div>
                                <h3 className="font-display text-2xl text-navy-custom dark:text-white">Emergency Triage</h3>
                            </div>
                            <p className="text-navy-custom/70 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                                We are equipped to handle urgent cases during opening hours. For after-hours emergencies, we partner with trusted 24/7 hospitals.
                            </p>
                            <Link href="/contact" className="text-primary font-bold hover:text-green-700 underline decoration-2 underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">
                                Emergency Contacts
                            </Link>
                        </div>
                        <div className="w-full md:w-1/3 h-48 md:h-full rounded-2xl overflow-hidden relative shadow-inner">
                            <img
                                alt="Vet caring for animal"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2670&auto=format&fit=crop"
                            />
                        </div>
                    </motion.div>

                    {/* Nutrition Advice */}
                    <motion.div
                        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between border border-navy-custom/5 dark:border-slate-700"
                        variants={cardVariant}
                    >
                        <div>
                            <div className="w-12 h-12 bg-orange-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                                <span className="material-icons-outlined">restaurant</span>
                            </div>
                            <h3 className="font-display text-2xl text-navy-custom dark:text-white mb-3">Nutrition Advice</h3>
                            <p className="text-navy-custom/70 dark:text-slate-400 leading-relaxed font-medium">Tailored dietary plans for weight management and specific health conditions.</p>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-navy-custom/70 dark:text-slate-300 mb-6 font-medium">Looking for something specific?</p>
                    <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-navy-custom hover:bg-navy-custom/90 md:text-lg md:px-10 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                        View All Services
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
