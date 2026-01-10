"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ResourcesPage() {
    const resources = [
        {
            title: "Natural Pet Food",
            description: "Learn about our raw diet philosophy and food is medicine approach.",
            link: "/resources/natural-food",
            icon: "🥩"
        },
        {
            title: "Puppy School",
            description: "Start your puppy's journey with socialization and training classes.",
            link: "/resources/puppy-school",
            icon: "🐕"
        },
        {
            title: "Case Studies",
            description: "Read success stories of pets we've helped with holistic care.",
            link: "/resources/case-studies",
            icon: "📖"
        },
        {
            title: "FAQ",
            description: "Common questions about our services and treatments.",
            link: "/resources/faq",
            icon: "❓"
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-7xl mx-auto space-y-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Resources</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Educational materials and guides to help you care for your pet.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {resources.map((res, i) => (
                        <Link href={res.link} key={i} className="group">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/60 backdrop-blur-sm border border-white/40 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all h-full flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-4xl mb-4 block">{res.icon}</span>
                                    <h2 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">{res.title}</h2>
                                    <p className="text-muted-foreground">{res.description}</p>
                                </div>
                                <div className="mt-8 flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
