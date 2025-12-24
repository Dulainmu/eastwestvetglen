"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function ContactForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="space-y-2"
                >
                    <label htmlFor="name" className="text-xs font-medium text-white/80 uppercase tracking-wider">Name</label>
                    <Input
                        id="name"
                        placeholder="Your Name"
                        className="bg-white/80 border-white/20 focus:border-accent focus:ring-accent/50 text-primary placeholder:text-primary/40 rounded-xl transition-all duration-300 shadow-sm"
                    />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="space-y-2"
                >
                    <label htmlFor="email" className="text-xs font-medium text-white/80 uppercase tracking-wider">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        className="bg-white/80 border-white/20 focus:border-accent focus:ring-accent/50 text-primary placeholder:text-primary/40 rounded-xl transition-all duration-300 shadow-sm"
                    />
                </motion.div>
            </div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="space-y-2"
            >
                <label htmlFor="phone" className="text-xs font-medium text-white/80 uppercase tracking-wider">Phone</label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="(04) 0000 0000"
                    className="bg-white/80 border-white/20 focus:border-accent focus:ring-accent/50 text-primary placeholder:text-primary/40 rounded-xl transition-all duration-300 shadow-sm"
                />
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="space-y-2"
            >
                <label htmlFor="message" className="text-xs font-medium text-white/80 uppercase tracking-wider">Message</label>
                <Textarea
                    id="message"
                    placeholder="How can we help?"
                    className="min-h-[120px] bg-white/80 border-white/20 focus:border-accent focus:ring-accent/50 text-primary placeholder:text-primary/40 rounded-xl transition-all duration-300 shadow-sm resize-none"
                />
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.03, z: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Button className="w-full bg-accent text-primary font-bold text-lg py-6 rounded-xl hover:bg-white hover:text-accent shadow-lg shadow-accent/20 transition-all duration-300">
                    Send Message <Send className="w-4 h-4 ml-2" />
                </Button>
            </motion.div>

            <p className="text-xs text-center text-white/40 mt-4">
                We'll get back to you within 24 hours.
            </p>
        </form>
    )
}
