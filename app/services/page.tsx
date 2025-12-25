"use client"

import { ServicesSection } from "@/components/landing/ServicesSection"
import { motion } from "framer-motion"

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-7xl mx-auto space-y-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Our Services</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive veterinary care tailored to your pet's individual needs.
                    </p>
                </motion.div>

                {/* Use the existing Services Grid for now, will expand later */}
                <ServicesSection />

                {/* Placeholder for detailed service breakdown */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Will be populated with detailed feature cards */}
                </div>
            </div>
        </div>
    )
}
