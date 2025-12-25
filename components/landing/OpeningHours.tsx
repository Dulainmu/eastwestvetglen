import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

export function OpeningHours() {
    // Define the schedule data, similar to the original structure but with the new "Closed" handling
    const schedule = [
        { day: "Monday – Friday", hours: "9:00am – 6:00pm" },
        { day: "Saturday", hours: "9:00am – 4:00pm" },
        { day: "Sunday", hours: "Closed" },
    ];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="glass h-full p-8 rounded-3xl shadow-xl shadow-primary/10 border border-white/40"
        >
            {/* Combined H3 title and new "Open Now" badge */}
            <div className="flex items-center justify-between mb-8">
                <motion.h3 variants={fadeInUp} className="font-serif text-2xl font-bold text-foreground dark:text-white flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <span>Opening Hours</span>
                </motion.h3>
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Open Now
                </span>
            </div>

            <div className="space-y-4">
                {schedule.map((slot, i) => (
                    <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="flex justify-between items-center text-sm border-b border-primary/5 pb-3 last:border-0 last:pb-0 hover:bg-primary/5 p-2 rounded-lg transition-colors"
                    >
                        <span className="font-medium text-foreground dark:text-gray-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            {slot.day}
                        </span>
                        {slot.hours === "Closed" ? (
                            <span className="text-red-500 dark:text-red-300 font-medium text-sm bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">Closed</span>
                        ) : (
                            <span className="font-bold text-primary dark:text-white">{slot.hours}</span>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* New section for location and vet profile */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-center text-muted-foreground dark:text-gray-300 mb-6">
                    Looking for us? We're located just opposite <br /> <span className="font-medium text-primary dark:text-white">The Glen Shopping Centre</span>.
                </p>

                {/* Lead Vet Profile Mini */}
                <div className="flex items-center gap-4 bg-muted/30 dark:bg-white/5 p-4 rounded-xl border border-primary/5 dark:border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-xl">👩‍⚕️</div>
                    </div>
                    <div>
                        <p className="font-serif font-bold text-primary dark:text-white text-sm">Dr. Sarah Chen</p>
                        <p className="text-xs text-accent uppercase tracking-wider font-medium dark:text-accent">Head Veterinarian</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-300 mt-1 italic">"We treat your pets like family."</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
