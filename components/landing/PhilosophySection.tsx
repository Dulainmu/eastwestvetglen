"use client"

import { useState } from "react"
import { Stethoscope, Leaf, Heart, Syringe, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

export function PhilosophySection() {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

    const pillars = [
        {
            icon: Stethoscope,
            title: "Western Medicine",
            desc: "Advanced diagnostics and evidence-based veterinary care.",
            detail: "We utilize state-of-the-art diagnostic tools including digital radiology and ultrasound to ensure accurate diagnosis and effective treatment plans."
        },
        {
            icon: Syringe,
            title: "Acupuncture",
            desc: "Traditional techniques to relieve pain and promote healing.",
            detail: "Our certified veterinary acupuncturists use fine needles to stimulate specific points, promoting natural healing and pain relief for various conditions."
        },
        {
            icon: Leaf,
            title: "Natural Therapies",
            desc: "Holistic approaches including herbal medicine and nutrition.",
            detail: "We integrate Chinese herbal medicine and tailored nutritional advice to support your pet's immune system and overall vitality."
        },
        {
            icon: Heart,
            title: "Wellbeing",
            desc: "Prioritizing the emotional and physical health of your pet.",
            detail: "We focus on low-stress handling and behavioral support to ensure your pet feels safe, comfortable, and emotionally secure during every visit."
        }
    ]

    return (
        <section className="py-12 perspective-1000">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {pillars.map((pillar, i) => (
                    <div
                        key={i}
                        className="relative h-[280px] group cursor-pointer"
                        onMouseEnter={() => setFlippedIndex(i)}
                        onMouseLeave={() => setFlippedIndex(null)}
                        onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
                    >
                        <motion.div
                            variants={fadeInUp}
                            initial={false}
                            animate={{ rotateY: flippedIndex === i ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                            className="w-full h-full transform-style-3d relative"
                        >
                            {/* Front Face */}
                            <div className="absolute inset-0 backface-hidden glass p-6 rounded-3xl border border-white/40 shadow-lg flex flex-col items-center text-center justify-between">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <pillar.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-serif font-bold text-xl mb-3 text-primary">{pillar.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                                <div className="text-xs text-primary/50 font-medium uppercase tracking-widest mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Info className="w-3 h-3" /> More Info
                                </div>
                            </div>

                            {/* Back Face */}
                            <div
                                className="absolute inset-0 backface-hidden glass p-6 rounded-3xl border border-primary/20 shadow-xl bg-primary/5 flex flex-col items-center text-center justify-center rotate-y-180"
                            >
                                <h3 className="font-serif font-bold text-lg mb-4 text-primary">{pillar.title}</h3>
                                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                    {pillar.detail}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}
