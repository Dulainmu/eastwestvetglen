"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const HERO_IMAGES = [
    "/login-hero.png",
    "/images/clinic_placeholder.png",
    "/images/team_placeholder.png"
]

export function HeroSlideshow() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden -z-20">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Ken Burns Effect Wrapper */}
                    <motion.div
                        className="relative w-full h-full"
                        animate={{
                            scale: [1, 1.05],
                            // Pan slightly horizontally or vertically randomly
                            x: [0, index % 2 === 0 ? 20 : -20],
                        }}
                        transition={{
                            duration: 8, // Longer than slide duration for continuous movement
                            ease: "linear",
                            repeat: 0 // Only play once per slide instance
                        }}
                    >
                        <Image
                            src={HERO_IMAGES[index]}
                            alt="Clinic Atmosphere"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
        </div>
    )
}
