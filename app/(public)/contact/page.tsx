"use client"

import { ContactForm } from "@/components/landing/contact-form"
import { OpeningHours } from "@/components/landing/OpeningHours"
import { MapEmbed } from "@/components/landing/MapEmbed"
import { motion } from "framer-motion"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Contact Us</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're here to help. Reach out to book an appointment or ask a question.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info & Form */}
                    <div className="space-y-8">
                        <div className="bg-primary text-white p-8 rounded-3xl shadow-xl">
                            <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
                            <ContactForm />
                        </div>
                    </div>

                    {/* Map & Hours */}
                    <div className="space-y-8">
                        <OpeningHours />
                        <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg border border-border/50 relative">
                            <MapEmbed />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
