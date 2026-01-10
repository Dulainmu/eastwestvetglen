"use client"

import { motion } from "framer-motion"

export default function CaseStudiesPage() {
    const cases = [
        {
            title: "Vinnie: The Adrenal Tumour Survivor",
            description: "How holistic support helped Vinnie defy the odds and live a happy life.",
            tag: "Cancer Support"
        },
        {
            title: "Gracie: Beating IMHA Naturally",
            description: "A journey of recovery from Immune-Mediated Hemolytic Anemia using natural therapies.",
            tag: "Autoimmune"
        },
        {
            title: "Jaeger: Overcoming Chronic Itch",
            description: "Solving severe skin allergies through diet change and herbal medicine.",
            tag: "Dermatology"
        },
        {
            title: "Henri: Palliative Care",
            description: "Ensuring comfort and dignity in the final stages of life.",
            tag: "Palliative Care"
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Success Stories</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Real stories of healing and hope from our patients.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {cases.map((story, i) => (
                        <div key={i} className="bg-white/60 p-8 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-bold uppercase tracking-wider mb-4">
                                {story.tag}
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-3">{story.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {story.description}
                            </p>
                            <button className="mt-6 text-primary font-medium hover:underline decoration-accent underline-offset-4">
                                Read Full Story
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
