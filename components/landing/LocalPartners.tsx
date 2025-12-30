"use client"

import Link from "next/link"

export function LocalPartners() {
    return (
        <section className="relative py-20 px-6 lg:px-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="inline-block uppercase tracking-[0.2em] text-xs font-bold text-navy-custom/80 dark:text-slate-300 opacity-80">
                        Local Partners, Trusted Standard
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-custom dark:text-white leading-tight">
                        The East Vets Standard, Now in Glen Waverley.
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full opacity-80"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Card 1 */}
                    <div className="group bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center border border-navy-custom/5 dark:border-slate-700">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-icons-outlined text-4xl">medical_services</span>
                            </div>
                        </div>
                        <h3 className="font-display text-2xl text-navy-custom dark:text-white mb-4 font-semibold">
                            Owner-Operated Care
                        </h3>
                        <p className="text-navy-custom/70 dark:text-slate-300 leading-relaxed text-lg">
                            Led by Dr. [Friend's Name] and Dr. [Aunt's Name]. When you visit, you’re seeing the owners, not just employees.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center border border-navy-custom/5 dark:border-slate-700">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-icons-outlined text-4xl">verified</span>
                            </div>
                        </div>
                        <h3 className="font-display text-2xl text-navy-custom dark:text-white mb-4 font-semibold">
                            Proven Excellence
                        </h3>
                        <p className="text-navy-custom/70 dark:text-slate-300 leading-relaxed text-lg">
                            Bringing the same 5-star care and philosophy from our beloved Bentleigh clinic to the Glen Waverley community.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center border border-navy-custom/5 dark:border-slate-700">
                        <div className="mb-6 relative">
                            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-icons-outlined text-4xl">biotech</span>
                            </div>
                        </div>
                        <h3 className="font-display text-2xl text-navy-custom dark:text-white mb-4 font-semibold">
                            Modern Medicine
                        </h3>
                        <p className="text-navy-custom/70 dark:text-slate-300 leading-relaxed text-lg">
                            Equipped with the latest technology and backed by the expertise of the East Vets group.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-green-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Meet the Team
                        <span className="material-icons-outlined ml-2 text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
