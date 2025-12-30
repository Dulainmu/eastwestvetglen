"use client"

import Link from "next/link"

export default function LandingPage() {
    return (
        <main className="relative z-10 flex-grow flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Left Column: Content */}
                <div className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1">
                    <div className="space-y-6">
                        <div className="hidden lg:flex items-center gap-2 text-white/80 dark:text-primary/80 font-medium tracking-widest text-xs uppercase mb-4">
                            <span className="w-8 h-[1px] bg-current"></span>
                            Established 2024
                        </div>
                        <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] text-navy-custom dark:text-white">
                            Modern Care for Glen Waverley’s Best Friends.
                        </h1>
                        <p className="font-sans text-lg lg:text-xl text-navy-custom/80 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                            Independent, family-owned veterinary care where your pet is treated like one of our own.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-2">
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
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 opacity-80">
                        <div className="flex -space-x-3">
                            <img alt="Vet Avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                            {/* Reusing same placeholder for demo purposes, replicating the triple avatar look */}
                            <img alt="Vet Avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                            <img alt="Vet Avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="/images/team_placeholder.png" />
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-navy-custom/70 dark:text-slate-400">
                            Top Rated Local Clinic
                        </div>
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end h-full min-h-[400px] lg:min-h-[700px]">
                    <div className="absolute top-10 right-10 w-full h-full bg-white/20 dark:bg-white/5 rounded-t-full rounded-b-[200px] transform rotate-3 scale-95 blur-sm z-0"></div>
                    <div className="relative z-10 w-full max-w-md lg:max-w-lg aspect-[3/4] overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-2xl shadow-navy-custom/20 dark:shadow-black/50 border-4 border-white/30 dark:border-slate-700/30 backdrop-blur-sm">

                        {/* Use the login-hero or clinic placeholder as the main image */}
                        <img
                            alt="A happy golden retriever dog looking up and to the right, representing the care at East Vets Glen"
                            className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
                            src="/login-hero.png"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/40 to-transparent pointer-events-none"></div>

                        <div className="absolute bottom-8 right-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[200px] animate-pulse">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                                <span className="material-icons-outlined text-primary text-xl">pets</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Open Today</p>
                                <p className="text-sm font-bold text-navy-custom dark:text-white">Until 7:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Dotted Pattern SVG */}
                    <div className="absolute -bottom-6 -left-6 z-20 hidden lg:block">
                        <svg fill="none" height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                            <pattern height="20" id="dotPattern" patternUnits="userSpaceOnUse" width="20" x="0" y="0">
                                <circle className="fill-white dark:fill-slate-600" cx="2" cy="2" r="2"></circle>
                            </pattern>
                            <rect fill="url(#dotPattern)" height="100" width="100"></rect>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mobile Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95">
                    <span className="material-icons-outlined text-2xl">calendar_month</span>
                </button>
            </div>
        </main>
    )
}
