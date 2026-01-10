"use client"

import { motion } from "framer-motion"

export default function FAQPage() {
    const faqs = [
        {
            q: "What is the difference between Western and Chinese medicine?",
            a: "Western medicine excels at acute trauma, surgery, and diagnostics. Chinese medicine focuses on the root cause, chronic conditions, and energy balance. We combine both for the best results."
        },
        {
            q: "Do you offer vaccination titre testing?",
            a: "Yes! We encourage titre testing to avoid over-vaccination. We can test to see if your pet still has immunity before giving a booster."
        },
        {
            q: "How long does an acupuncture session take?",
            a: "Initial consultations are usually 45-60 minutes to take a full history. Follow-up acupuncture sessions typically last 20-30 minutes."
        },
        {
            q: "Can I switch my pet to a raw diet immediately?",
            a: "It depends. For some pets, a cold turkey switch is fine. For others, especially those with sensitive stomachs, a slow transition over 7-10 days is recommended."
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-3xl mx-auto space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Frequently Asked Questions</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Answers to common questions about our holistic approach and services.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-white/60 p-6 rounded-2xl border border-white/40 shadow-sm">
                            <h3 className="text-lg font-serif font-bold text-primary mb-2">{item.q}</h3>
                            <p className="text-muted-foreground">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
