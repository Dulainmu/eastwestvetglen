import { Phone } from "lucide-react";

export function StickyCallButton() {
    return (
        <a
            href="tel:+61412345678"
            className="fixed bottom-6 right-6 md:hidden z-50 flex items-center gap-3 bg-primary text-white rounded-full pl-5 pr-6 py-4 shadow-xl shadow-primary/30 border border-white/20 backdrop-blur-md hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
                <Phone className="w-5 h-5 relative z-10 fill-current" />
            </div>
            <span className="font-serif font-bold tracking-wide">Call Clinic</span>
        </a>
    );
}
