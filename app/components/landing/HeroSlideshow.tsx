"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const images = [
    "/login-hero.png",
    "/images/clinic_placeholder.png",
    "/images/team_placeholder.png",
]

export function HeroSlideshow() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="absolute inset-0 z-[-1] overflow-hidden bg-background">
            <AnimatePresence initial={false}>
                <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 1.5, ease: "easeInOut" },
                        scale: { duration: 8, ease: "linear" }
                    }}
                >
                    <Image
                        src={images[index]}
                        alt="Hero background"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />

                    {/* Gradient Overlays for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
