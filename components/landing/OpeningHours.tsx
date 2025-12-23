import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

export function OpeningHours() {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="glass h-full p-8 rounded-3xl shadow-xl shadow-primary/10 border border-white/40"
        >
            <motion.h3 variants={fadeInUp} className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <span>Opening Hours</span>
            </motion.h3>
            <div className="space-y-4">
                {[
                    { day: "Monday – Friday", hours: "9:00am – 6:00pm" },
                    { day: "Saturday", hours: "9:00am – 4:00pm" },
                    { day: "Sunday", hours: "Closed" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="flex justify-between items-center text-sm border-b border-primary/5 pb-3 last:border-0 last:pb-0 hover:bg-primary/5 p-2 rounded-lg transition-colors"
                    >
                        <span className="font-medium text-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            {item.day}
                        </span>
                        <span className="text-muted-foreground font-mono">{item.hours}</span>
                    </motion.div>
                ))}
            </div>
            <motion.div variants={scaleIn} className="mt-6 pt-4 border-t border-primary/10 text-center">
                <p className="text-xs text-primary font-medium tracking-wide uppercase">Walk-ins Welcome</p>
            </motion.div>
        </motion.div>
    );
}

