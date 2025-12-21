"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { TeamSection } from "@/components/landing/TeamSection"
import { OpeningHours } from "@/components/landing/OpeningHours"
import { MapEmbed } from "@/components/landing/MapEmbed"
import { StickyCallButton } from "@/components/landing/StickyCallButton"
import { Phone, Mail, MapPin, ArrowRight, Heart, Star, Shield, Leaf, Activity } from "lucide-react"
import { ContactForm } from "@/components/landing/contact-form"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/5">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                            <Heart className="w-6 h-6 fill-current text-white" />
                        </div>
                        <span className="font-serif font-bold text-2xl text-primary tracking-tight">East West Vets</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {["About", "Services", "Team", "Contact"].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button className="hidden md:flex rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-0.5">
                            Book Online
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden text-primary">
                            <span className="sr-only">Menu</span>
                            <div className="space-y-1.5 w-6">
                                <span className="block h-0.5 w-full bg-current rounded-full"></span>
                                <span className="block h-0.5 w-full bg-current rounded-full"></span>
                                <span className="block h-0.5 w-full bg-current rounded-full"></span>
                            </div>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
                    {/* Organic Background Shapes */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/40 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 z-0" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 z-0" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/50 border border-primary/10 backdrop-blur-sm shadow-sm w-fit">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                                </span>
                                <span className="tracking-wide uppercase text-xs font-bold text-primary">Now Open in Glen Waverley</span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-medium tracking-tight text-foreground leading-[1.05]">
                                    East West <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent italic">Vets</span>
                                </h1>
                                <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-lg leading-relaxed text-balance">
                                    Holistic veterinary care combining Western excellence with natural therapies.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 pt-4">
                                <Button size="lg" className="rounded-full text-base h-16 px-10 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                                    <Phone className="w-5 h-5 mr-3" /> Call Clinic
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full text-base h-16 px-10 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary transition-all duration-300">
                                    <MapPin className="w-5 h-5 mr-3" /> Directions
                                </Button>
                            </div>
                            <p className="text-xs tracking-widest uppercase text-muted-foreground/60 font-medium pl-2 pt-2">
                                Online booking coming soon via VetFlow
                            </p>
                        </motion.div>

                        <div className="relative order-1 lg:order-2">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[2rem] transform rotate-3 scale-105 blur-2xl -z-10" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 ring-1 ring-primary/5"
                            >
                                <Image src="/images/clinic_placeholder.png" alt="East West Vets Clinic Interior" width={800} height={600} className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-1000" priority />
                                {/* Glass Overlay Card */}
                                <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl hidden md:block">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                                            <Leaf className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-lg font-bold text-foreground">Integrative Medicine</h4>
                                            <p className="text-sm text-muted-foreground font-medium">The best of both worlds for your pet.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About & Trust Section */}
                <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-secondary/10">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6 leading-tight">
                                        Part of the <br /><span className="text-primary italic">East West</span> Family
                                    </h2>
                                    <div className="w-20 h-1.5 bg-accent rounded-full mb-6"></div>
                                </div>

                                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                                    East West Vets Glen Waverley is a newly opening clinic, proudly part of the East West Veterinary Group. We combine modern Western veterinary medicine with natural and holistic therapies to support the long-term health and wellbeing of your pets.
                                </p>

                                <div className="p-8 bg-white rounded-3xl border border-primary/10 shadow-xl shadow-primary/5 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-all duration-500" />
                                    <div className="relative z-10 flex items-start gap-5">
                                        <div className="p-3.5 bg-primary/10 rounded-2xl text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Star className="w-6 h-6 fill-current" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-xl font-bold text-foreground mb-2">Backed by Experience</h4>
                                            <p className="text-muted-foreground leading-relaxed">Supported by the established East West Vets Bentleigh team, known for their integrative and compassionate approach.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {[{ icon: Shield, title: "Western", desc: "Advanced diagnostics & surgery" },
                                    { icon: Leaf, title: "Eastern", desc: "Acupuncture & Herbal Therapy" },
                                    { icon: Heart, title: "Natural", desc: "Holistic healing approach" },
                                    { icon: Activity, title: "Wellbeing", desc: "Emotional & physical health" }].map((item, i) => (
                                        <motion.div key={i} whileHover={{ y: -5 }} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg border border-primary/5 transition-all duration-300">
                                            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-serif font-bold text-lg text-foreground mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="sticky top-24">
                                <TeamSection />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-24 lg:py-32 bg-primary text-white relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6">Our Services</h2>
                            <p className="text-xl text-primary-foreground/80 font-light">Comprehensive care combining the best of both worlds.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {["General Health Checks", "Vaccinations & Microchipping", "Acupuncture", "Chinese Medicine & Herbs", "Behaviour Consultations", "Senior & Geriatric Care", "Palliative & End-of-life Care"].map((service, i) => (
                                <div key={i} className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 cursor-default">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                            <span className="font-serif text-lg font-bold">{i + 1}</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-medium mb-3 text-white group-hover:text-accent transition-colors duration-300">{service}</h3>
                                    <p className="text-white/60 font-light">Professional and compassionate care tailored to your pet's needs.</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-white/40 mt-16 italic text-sm tracking-widest uppercase">* Additional specialised services will be introduced as the clinic expands.</p>
                    </div>
                </section>

                {/* Opening Hours */}
                <div className="py-24 bg-background">
                    <div className="max-w-4xl mx-auto px-4">
                        <OpeningHours />
                    </div>
                </div>

                {/* Location & Contact Section */}
                <section id="contact" className="py-24 lg:py-32 bg-background relative border-t border-primary/5">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm tracking-wider uppercase">Get in Touch</span>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground">Visit Us in <br />Glen Waverley</h2>
                                    <p className="text-xl text-muted-foreground font-light leading-relaxed">
                                        Online booking will be available soon. For now, please contact us directly to enquire or make an appointment.
                                    </p>
                                </div>

                                <div className="grid gap-6">
                                    <div className="group flex items-start gap-5 p-6 bg-secondary/30 rounded-3xl hover:bg-secondary/50 transition-colors duration-300">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-lg text-foreground mb-1">Our Location</h4>
                                            <p className="text-muted-foreground">Glen Waverley, VIC (Address TBC)</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-5 p-6 bg-secondary/30 rounded-3xl hover:bg-secondary/50 transition-colors duration-300">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-lg text-foreground mb-1">Phone</h4>
                                            <p className="text-muted-foreground">+61 412 345 678</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-5 p-6 bg-secondary/30 rounded-3xl hover:bg-secondary/50 transition-colors duration-300">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-lg text-foreground mb-1">Email</h4>
                                            <p className="text-muted-foreground">reception@eastwestvets.com.au</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative p-8 bg-primary rounded-3xl text-white overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative z-10">
                                        <h4 className="font-serif text-2xl mb-4 text-white">Send us a message</h4>
                                        <ContactForm />
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-primary/5">
                                <MapEmbed />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-primary-foreground py-16 lg:py-20 border-t border-primary/5 relative overflow-hidden">
                    <div className="bg-primary w-full py-16 text-white text-center">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                                    <Heart className="w-8 h-8 fill-current text-white" />
                                </div>
                                <h2 className="font-serif text-3xl font-bold">East West Vets</h2>
                                <p className="text-white/60 max-w-md">Bridging the gap between modern diagnostics and holistic healing for your beloved pets.</p>
                                <div className="text-white/40 text-sm font-light mt-8">
                                    © {new Date().getFullYear()} East West Vets. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <StickyCallButton />
            </main>
        </div>
    )
}
