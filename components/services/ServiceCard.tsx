"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
    title: string
    description: string
    image?: string
    icon?: React.ReactNode
    href?: string
    className?: string
}

export function ServiceCard({
    title,
    description,
    image,
    icon,
    href = "#",
    className,
}: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group relative flex flex-col h-full bg-white/60 dark:bg-card/40 backdrop-blur-md border border-white/40 dark:border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300",
                className
            )}
        >
            {image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                    {icon && (
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                            {icon}
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                <div className="pt-4 border-t border-border/50">
                    <Link
                        href={href}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        Read full article
                        <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
