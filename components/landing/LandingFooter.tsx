"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function LandingFooter() {
    return (
        <footer className="bg-navy-custom dark:bg-slate-900 text-white dark:text-gray-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {/* Column 1: Brand & Sister Clinic */}
                    <motion.div
                        className="flex flex-col justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="material-icons-outlined text-white dark:text-primary text-4xl">pets</span>
                                <span className="font-display text-3xl font-bold tracking-wide">East Vets Glen</span>
                            </div>
                            <p className="text-white/70 dark:text-gray-400 mb-8 max-w-xs leading-relaxed font-medium">
                                Caring for your family members with the highest standard of veterinary medicine since 2003.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <h4 className="font-bold text-lg mb-4 font-display">Our Family</h4>
                            <Link href="/sister-clinic" className="group flex items-center bg-white/5 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 border border-white/10">
                                <div className="bg-white text-navy-custom dark:text-primary dark:bg-slate-800 rounded-full p-2 mr-3">
                                    <span className="material-icons-outlined text-xl">storefront</span>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider opacity-75 font-semibold">Sister Clinic</p>
                                    <p className="font-bold text-lg group-hover:underline decoration-primary underline-offset-4 decoration-2">East Vets Bentleigh</p>
                                </div>
                                <span className="material-icons-outlined ml-auto transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Column 2: Hours & Emergency */}
                    <motion.div
                        className="bg-white/5 dark:bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="font-display text-2xl font-bold mb-6 flex items-center">
                            <span className="material-icons-outlined mr-2">schedule</span>
                            Opening Hours
                        </h3>
                        <ul className="space-y-4 font-medium">
                            <li className="flex justify-between items-center border-b border-white/10 pb-3">
                                <span className="text-white/90">Monday - Friday</span>
                                <span className="font-bold">8:00 am - 7:00 pm</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-3">
                                <span className="text-white/90">Saturday</span>
                                <span className="font-bold">9:00 am - 4:00 pm</span>
                            </li>
                            <li className="flex justify-between items-center text-white/50">
                                <span>Sunday</span>
                                <span className="italic">Closed</span>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-start space-x-3">
                                <span className="material-icons-outlined text-red-400 mt-1">emergency</span>
                                <div>
                                    <p className="font-bold text-lg">Emergency?</p>
                                    <p className="text-sm text-white/70 mb-2 font-medium">For after-hours care, please contact:</p>
                                    <a href="tel:0312345678" className="inline-block font-bold text-xl hover:text-white/90 underline decoration-white/30 hover:decoration-white/80 underline-offset-4 transition-all">
                                        (03) 1234 5678
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 3: Find Us & Map */}
                    <motion.div
                        className="flex flex-col h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="font-display text-2xl font-bold mb-6">Find Us</h3>
                        <div className="mb-6 space-y-4 text-white/90 font-medium">
                            <div className="flex items-start">
                                <span className="material-icons-outlined mr-3 text-primary">location_on</span>
                                <p>123 High Street Road,<br />Glen Waverley VIC 3150</p>
                            </div>
                            <div className="flex items-center">
                                <span className="material-icons-outlined mr-3 text-primary">email</span>
                                <a href="mailto:hello@eastvetsglen.com.au" className="hover:text-primary transition-colors">hello@eastvetsglen.com.au</a>
                            </div>
                        </div>
                        <div className="flex-grow rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 relative group min-h-[200px]">
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <img
                                    alt="Map location of East Vets Glen"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 filter grayscale group-hover:grayscale-0"
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                                />
                                <div className="absolute inset-0 bg-navy-custom/20 flex flex-col items-center justify-center text-navy-custom font-bold group-hover:opacity-0 transition-opacity duration-300">
                                </div>
                            </div>
                            <a href="#" className="absolute bottom-3 right-3 bg-white dark:bg-slate-800 text-navy-custom dark:text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md hover:bg-white/90 transition-colors flex items-center gap-2">
                                <span className="material-icons-outlined text-sm">map</span>
                                Open in Maps
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex space-x-8 mb-4 md:mb-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                    </div>
                    <div className="text-center md:text-right">
                        <p>© 2024 East Vets Glen. All rights reserved.</p>
                        <p className="mt-1 text-xs opacity-70">Powered by <span className="font-bold text-white">VetFlow</span></p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
