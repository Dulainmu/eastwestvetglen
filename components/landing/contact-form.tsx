"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function ContactForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-medium text-white/80 uppercase tracking-wider">Name</label>
                    <Input
                        id="name"
                        placeholder="Your name"
                        className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/20 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium text-white/80 uppercase tracking-wider">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/20 h-12"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-medium text-white/80 uppercase tracking-wider">Phone</label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="(04) 0000 0000"
                    className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/20 h-12"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium text-white/80 uppercase tracking-wider">Message</label>
                <Textarea
                    id="message"
                    placeholder="How can we help you and your pet?"
                    className="min-h-[120px] rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/20 resize-none"
                />
            </div>
            <Button className="w-full h-14 bg-white text-primary hover:bg-white/90 rounded-xl font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 mt-2">
                Send Message <Send className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-[10px] text-center text-white/30 uppercase tracking-widest pt-2">
                Enquiries only. Online booking coming soon.
            </p>
        </form>
    )
}
