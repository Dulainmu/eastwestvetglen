"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function PuppySchoolPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-serif font-bold text-primary">Puppy School</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Give your puppy the best start in life with our comprehensive socialization and training program.
                    </p>
                    <Button size="lg" className="bg-primary text-white text-lg px-8 py-6 rounded-full hover:bg-primary/90">
                        Enroll Today – 9555 1899
                    </Button>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold text-primary">Why Attend?</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Critical early socialization</li>
                            <li>Basic obedience commands</li>
                            <li>Problem prevention (biting, jumping)</li>
                            <li>Building a bond with your puppy</li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold text-primary">Details</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><span className="font-bold">Duration:</span> 4-week course</li>
                            <li><span className="font-bold">Cost:</span> $70 for 4 sessions</li>
                            <li><span className="font-bold">Location:</span> Glen Waverley Clinic</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
