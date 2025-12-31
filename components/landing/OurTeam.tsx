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
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-emerald-50/50 dark:bg-slate-800/30 relative">
            {/* Top Convex Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg className="relative block w-full h-12 md:h-20 text-white dark:text-slate-900" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-navy-custom/70 dark:text-gray-300 text-sm font-bold tracking-widest uppercase mb-3 opacity-90">Growing Our Community</h3>
                    <h2 className="text-4xl md:text-6xl font-display text-navy-custom dark:text-white mb-6">Locally Owned, Personally Operated.</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-navy-custom/80 dark:text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-95">Meet the vets who own the business and treat your pets.</p>
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
                        <div className="relative h-96 overflow-hidden">
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
                        <div className="relative h-96 overflow-hidden">
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
