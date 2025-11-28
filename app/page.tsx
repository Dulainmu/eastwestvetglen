"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, Heart, Shield, Clock, MapPin, Phone, Star, ArrowRight, Stethoscope, Syringe, Scissors } from "lucide-react"

export default function LandingPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="bg-primary-600 p-2 rounded-lg">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Happy Paws</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#services" className="text-gray-600 hover:text-primary-600 transition-colors">Services</Link>
                        <Link href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
                        <Link href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
                        <Link href="/book/happy-paws">
                            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                                Book Appointment
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block px-4 py-2 bg-blue-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                                ✨ Voted #1 Vet Clinic in Sydney
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Expert Care for Your <span className="text-primary-600">Best Friend</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                We provide compassionate, state-of-the-art veterinary care. From routine check-ups to emergency surgery, your pet is in safe hands.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/book/happy-paws">
                                    <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/20">
                                        Book Online Now
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                                    <Phone className="mr-2 w-5 h-5" />
                                    (02) 1234 5678
                                </Button>
                            </div>
                            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                                    ))}
                                </div>
                                <p>Trusted by 2,000+ local pet owners</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                            <img
                                src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Happy dog with vet"
                                className="relative rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                            {/* Floating Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs"
                            >
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Clock className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Open 7 Days</p>
                                    <p className="text-sm text-gray-500">8:00 AM - 8:00 PM</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Veterinary Services</h2>
                        <p className="text-lg text-gray-600">Everything your pet needs for a long, happy, and healthy life.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
                                title: "Wellness Exams",
                                desc: "Comprehensive nose-to-tail checkups to keep your pet in peak condition."
                            },
                            {
                                icon: <Syringe className="w-8 h-8 text-green-600" />,
                                title: "Vaccinations",
                                desc: "Essential protection against common diseases tailored to your pet's lifestyle."
                            },
                            {
                                icon: <Scissors className="w-8 h-8 text-purple-600" />,
                                title: "Surgery & Dental",
                                desc: "Advanced surgical suite and dental care facilities for complete health."
                            }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.desc}</p>
                                <Link href="/book/happy-paws" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center">
                                    Book Service <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features / Why Choose Us */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary-100 rounded-3xl transform -rotate-3" />
                            <img
                                src="https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Vet examining cat"
                                className="relative rounded-2xl shadow-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Pet Owners Trust Us</h2>
                            <div className="space-y-8">
                                {[
                                    {
                                        title: "Experienced Team",
                                        desc: "Our vets have over 20 years of combined experience in small animal medicine."
                                    },
                                    {
                                        title: "Modern Facilities",
                                        desc: "Equipped with digital X-ray, ultrasound, and in-house laboratory for fast results."
                                    },
                                    {
                                        title: "Stress-Free Environment",
                                        desc: "We use Fear Free handling techniques to make visits positive for your pet."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1 bg-primary-100 p-2 rounded-lg h-fit">
                                            <CheckIcon className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block px-4 py-2 bg-blue-50 text-primary-700 rounded-full text-sm font-medium mb-6">
                                Our Story
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">More Than Just a Clinic</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Founded in 2010, Happy Paws began with a simple mission: to treat every pet as if they were our own. Over the last decade, we've grown from a small single-vet practice to Sydney's premier veterinary hospital.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                We believe in a holistic approach to veterinary care, combining cutting-edge medical technology with old-fashioned compassion. Our state-of-the-art facility is designed to be calming for pets and welcoming for owners.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-4xl font-bold text-primary-600 mb-2">15k+</div>
                                    <div className="text-gray-600">Happy Pets Healed</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
                                    <div className="text-gray-600">Emergency Support</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                                    <div className="text-gray-600">Veterinary Experts</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary-600 mb-2">12</div>
                                    <div className="text-gray-600">Awards Won</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50" />
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />

                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    alt="Clinic interior"
                                    className="rounded-2xl shadow-lg mt-12"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    alt="Happy dog"
                                    className="rounded-2xl shadow-lg"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-6">
                            Our Experts
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Dedicated Team</h2>
                        <p className="text-lg text-gray-600">
                            Passionate professionals committed to your pet's health and happiness.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Dr. Sarah Wilson",
                                role: "Medical Director",
                                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                specialty: "Surgery & Orthopedics"
                            },
                            {
                                name: "Dr. Michael Chen",
                                role: "Senior Veterinarian",
                                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                specialty: "Internal Medicine"
                            },
                            {
                                name: "Emily Parker",
                                role: "Head Vet Nurse",
                                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                specialty: "Patient Care"
                            },
                            {
                                name: "James Wilson",
                                role: "Practice Manager",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                specialty: "Client Relations"
                            }
                        ].map((member, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors z-10" />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                                    <p className="text-sm text-gray-500">{member.specialty}</p>

                                    <div className="mt-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        <button className="p-2 bg-gray-100 rounded-full hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-colors">
                                            <LinkedinIcon className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-gray-100 rounded-full hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-colors">
                                            <MailIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to schedule a visit?</h2>
                    <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                        Book your appointment online in less than 2 minutes. We can't wait to meet you and your pet!
                    </p>
                    <Link href="/book/happy-paws">
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 h-14 px-8 text-lg font-bold">
                            Book Appointment Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-6">
                                <Heart className="w-6 h-6 text-primary-500 fill-current" />
                                <span className="text-xl font-bold text-white">Happy Paws</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                Providing exceptional veterinary care to the community since 2010.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 123 Pet Street, Sydney</li>
                                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> (02) 1234 5678</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Hours</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Mon - Fri: 8am - 8pm</li>
                                <li>Sat: 9am - 5pm</li>
                                <li>Sun: 10am - 4pm</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/book/happy-paws" className="hover:text-white">Book Appointment</Link></li>
                                <li><Link href="/login" className="hover:text-white">Staff Login</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        © 2025 Happy Paws Veterinary Clinic. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    )
}

function LinkedinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    )
}

function MailIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    )
}
