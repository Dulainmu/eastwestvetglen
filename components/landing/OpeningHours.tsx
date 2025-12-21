import { Clock, Calendar } from "lucide-react";

export function OpeningHours() {
    return (
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <span>Opening Hours</span>
            </h3>
            <div className="space-y-4">
                {[
                    { day: "Monday – Friday", hours: "9:00am – 6:00pm" },
                    { day: "Saturday", hours: "9:00am – 4:00pm" },
                    { day: "Sunday", hours: "Closed" },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-primary/5 pb-3 last:border-0 last:pb-0">
                        <span className="font-medium text-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            {item.day}
                        </span>
                        <span className="text-muted-foreground font-mono">{item.hours}</span>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-primary/10 text-center">
                <p className="text-xs text-primary font-medium tracking-wide uppercase">Walk-ins Welcome</p>
            </div>
        </div>
    );
}

