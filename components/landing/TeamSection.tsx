import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { hover3D } from "@/lib/animations";

export function TeamSection() {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            variants={hover3D}
            className="glass rounded-3xl p-8 border border-white/40 shadow-xl shadow-primary/10 relative overflow-hidden group perspective-1000"
        >
            {/* Decorative background element */}
            <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0"
                variants={{
                    hover: { scale: 1.2, opacity: 0.8 }
                }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center transform-style-3d">
                <motion.div
                    className="relative shrink-0"
                    variants={{
                        hover: { z: 30 }
                    }}
                >
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl transform translate-y-2" />
                    <Image
                        src="/images/team_placeholder.png"
                        alt="Lead Veterinarian"
                        width={140}
                        height={140}
                        className="rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                    />
                    <motion.div
                        className="absolute -bottom-2 -right-2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white z-20"
                        variants={{
                            hover: { scale: 1.1, y: -5 }
                        }}
                    >
                        Lead Vet
                    </motion.div>
                </motion.div>
                <div className="text-center sm:text-left space-y-3">
                    <motion.div variants={{ hover: { z: 10 } }}>
                        <h3 className="text-2xl font-serif font-bold text-foreground dark:text-white">Dr. Sarah Chen</h3>
                        <p className="text-primary dark:text-accent font-medium tracking-wide text-sm uppercase">Lead Veterinarian & Acupuncturist</p>
                    </motion.div>
                    <p className="text-muted-foreground dark:text-gray-200 text-sm leading-relaxed">
                        "I believe in treating the whole pet, not just the symptoms. Combining Western medicine with acupuncture allows us to achieve the best possible outcomes."
                    </p>
                    <div className="pt-2">
                        <motion.span
                            className="inline-block w-12 h-1 bg-primary/20 rounded-full"
                            variants={{
                                hover: { width: "100%", backgroundColor: "var(--primary)" }
                            }}
                            transition={{ duration: 0.3 }}
                        ></motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

