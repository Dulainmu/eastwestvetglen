import { Phone } from "lucide-react";

import { motion } from "framer-motion";

export function StickyCallButton() {
    return (
        <motion.a
            href="tel:+61412345678"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 md:hidden z-50 flex items-center gap-3 bg-primary text-white rounded-full pl-5 pr-6 py-4 shadow-xl shadow-primary/30 border border-white/20 backdrop-blur-md"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
                <Phone className="w-5 h-5 relative z-10 fill-current" />
            </div>
            <span className="font-serif font-bold tracking-wide">Call Clinic</span>
        </motion.a>
    );
}
