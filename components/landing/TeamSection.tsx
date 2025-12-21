import React from "react";
import Image from "next/image";

export function TeamSection() {
    return (
        <div className="bg-white rounded-3xl p-8 border border-primary/10 shadow-xl shadow-primary/5 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0 transition-all duration-500 group-hover:bg-primary/10" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center">
                <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl transform translate-y-2" />
                    <Image
                        src="/images/team_placeholder.png"
                        alt="Lead Veterinarian"
                        width={140}
                        height={140}
                        className="rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white z-20">
                        Lead Vet
                    </div>
                </div>
                <div className="text-center sm:text-left space-y-3">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-foreground">Dr. Sarah Chen</h3>
                        <p className="text-primary font-medium tracking-wide text-sm uppercase">Lead Veterinarian & Acupuncturist</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        "I believe in treating the whole pet, not just the symptoms. Combining Western medicine with acupuncture allows us to achieve the best possible outcomes."
                    </p>
                    <div className="pt-2">
                        <span className="inline-block w-12 h-1 bg-primary/20 rounded-full"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

