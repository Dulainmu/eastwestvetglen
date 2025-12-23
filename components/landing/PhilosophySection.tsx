"use client"

import { Stethoscope, Leaf, Heart, Syringe } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

export function PhilosophySection() {
    const pillars = [
        {
            icon: Stethoscope,
            title: "Western Medicine",
            desc: "Advanced diagnostics and evidence-based veterinary care."
        },
        {
            icon: Syringe, // Representing Acupuncture/Treatment
            title: "Acupuncture",
            desc: "Traditional techniques to relieve pain and promote healing."
        },
        {
            icon: Leaf,
            title: "Natural Therapies",
            desc: "Holistic approaches including herbal medicine and nutrition."
        },
        {
            icon: Heart,
            title: "Wellbeing",
            desc: "Prioritizing the emotional and physical health of your pet."
        }
    ]

    return (
        <section className="py-12">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {pillars.map((pillar, i) => (
                    <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="glass p-6 rounded-3xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center group"
                    >
                        <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <pillar.icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-2 text-primary">{pillar.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {pillar.desc}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
