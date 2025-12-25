"use client"

import { motion } from "framer-motion"

export default function NaturalFoodPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Food is Medicine</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We believe nutrition is the foundation of health. Discover the power of a fresh, raw diet.
                    </p>
                </motion.div>

                <div className="prose prose-lg prose-emerald mx-auto">
                    <h3>The Raw Diet Philosophy</h3>
                    <p>
                        Dogs and cats are obligate carnivores. Their bodies are designed to thrive on fresh meat, bones, and organs—not processed kibble.
                    </p>

                    <h3>Why Switch from Dry Food?</h3>
                    <ul>
                        <li>Improved digestion and smaller stool volume</li>
                        <li>Healthier skin and shinier coats</li>
                        <li>Cleaner teeth and fresh breath</li>
                        <li>Increased energy and vitality</li>
                    </ul>

                    <h3>Our Fresh Food Combinations</h3>
                    <p>
                        We offer our own special blends including "8 fruits & veg, 6 herbs" to ensure your pet gets a balanced, nutrient-rich meal every time.
                    </p>
                </div>
            </div>
        </div>
    )
}
