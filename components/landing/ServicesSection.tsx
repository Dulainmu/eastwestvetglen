"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

export function ServicesSection() {
    const services = [
        "General Health Checks",
        "Vaccinations & Microchipping",
        "Acupuncture & TCM",
        "Herbal Therapy",
        "Behaviour Consultations",
        "Senior & Geriatric Care",
        "Palliative Care",
        "End-of-Life Support"
    ]

    return (
        <section id="services-list" className="py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Comprehensive Care</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We offer a wide range of services designed to support every stage of your pet's life, from routine check-ups to specialized holistic treatments.
                </p>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="glass px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow border border-white/40"
                    >
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                        </div>
                        <span className="font-medium text-foreground text-sm">{service}</span>
                    </motion.div>
                ))}
            </motion.div>

            <p className="text-center text-xs text-muted-foreground mt-8 italic">
                * Additional specialised services will be introduced as our clinic expands.
            </p>
        </section>
    )
}
