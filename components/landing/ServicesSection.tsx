"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"

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
        <section id="services-list" className="py-12 perspective-1000">
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
                        variants={{
                            hidden: { opacity: 0, scale: 0.9, y: 20 },
                            visible: { opacity: 1, scale: 1, y: 0 }
                        }}
                        whileHover={{
                            scale: 1.05,
                            z: 50,
                            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass px-6 py-6 rounded-2xl flex items-center gap-4 shadow-sm border border-white/40 cursor-default transform-style-3d bg-white/60 hover:bg-white/90"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 shadow-inner">
                            <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                        </div>
                        <span className="font-medium text-foreground text-sm tracking-wide">{service}</span>
                    </motion.div>
                ))}
            </motion.div>

            <p className="text-center text-xs text-muted-foreground mt-8 italic">
                * Additional specialised services will be introduced as our clinic expands.
            </p>
        </section>
    )
}
