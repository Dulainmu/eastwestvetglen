"use client"

import { motion } from "framer-motion"
import { TeamSection } from "@/components/landing/TeamSection"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-5xl mx-auto space-y-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">About East West Vets</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Combining the best of Western Medicine with Traditional Chinese Veterinary Medicine.
                    </p>
                </motion.div>

                {/* History/Philosophy Content */}
                <section className="prose prose-lg prose-emerald mx-auto">
                    <p>
                        At East West Vets Glen Waverley, we believe in a holistic approach to veterinary care. Our new clinic brings the same trusted philosophy from our Bentleigh location to the Glen Waverley community.
                    </p>
                    <p>
                        We understand that every pet is unique. By integrating modern diagnostics and surgery with ancient healing practices like acupuncture and herbal medicine, we aim to provide the most comprehensive care possible for your beloved companions.
                    </p>
                </section>

                {/* Team Section */}
                <section>
                    <h2 className="text-3xl font-serif font-bold text-center text-primary mb-8">Meet Our Team</h2>
                    <TeamSection />
                </section>
            </div>
        </div>
    )
}
