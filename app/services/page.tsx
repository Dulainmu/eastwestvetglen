"use client"

import { motion } from "framer-motion"
import { ServiceCard } from "@/components/services/ServiceCard"
import { LandingFooter } from "@/components/landing/LandingFooter"
import {
    Syringe,
    Leaf,
    Activity,
    Zap,
    HeartPulse,
    Brain,
    ScanLine,
    Bone,
    Scissors,
    QrCode,
    Clock,
    Sunset,
    HeartHandshake,
    FlaskConical,
    Stethoscope,
    Microscope,
    Utensils,
    Carrot,
    Bird,
    Hotel,
    Pill,
    GraduationCap,
    PawPrint
} from "lucide-react"

const services = [
    {
        title: "Acupuncture",
        description: "This ancient therapy is excellent for arthritis and many chronic diseases. We use it to balance animals’ bodies to aid in the treatment of joint disease, inflammation, behavioural issues, and in the management of pain. It is excellent for arthritis and many chronic diseases. We take a holistic approach combining acupuncture, herbs and training.",
        image: "/images/services/acupuncture_dog_1767818213150.png",
        href: "/services/acupuncture"
    },
    {
        title: "Chinese Medicine and Herbs",
        description: "Chinese medicine and herbs have been used and fine-tuned for thousands of years. We use herbs to calm, invigorate, cleanse, nourish and stabilize the body. Our herbs have been successful in supporting immune system repair, behavioural issues, cancer, Cushing’s disease, liver and kidney issues, and many other health problems.",
        image: "/images/services/chinese_herbs_pets_1767818228946.png",
        href: "/services/chinese-medicine"
    },
    {
        title: "Osteopathy",
        description: "Osteopathy is a form of manual medicine - a hands-on treatment which can potentially help your dog or cat with their mobility problems, rehabilitation following injuries or just to improve their overall health. Osteopathic techniques are gentle and generally very well tolerated.",
        image: "/images/services/osteopathy_dog_1767818263880.png",
        href: "/services/osteopathy"
    },
    {
        title: "Laser Therapy",
        description: "Our high power multi-wavelength therapeutic laser is a very effective non-invasive therapy. It promotes rapid healing and is very useful after surgery or for treating injuries and joint problems.",
        image: "/images/services/laser_therapy_cat_1767818243530.png",
        href: "/services/laser-therapy"
    },
    {
        title: "Complete Companion Animal Care",
        description: "We care for robust healthy animals as well as the sick ones. We look at balancing diets, coping with parasites, approaching issues with sensible careful investigation and avoiding drugs where possible. All of the standard veterinary surgical and medical procedures are available.",
        image: "/images/services/general_care_puppies_1767818280812.png",
        href: "/services/general-care"
    },
    {
        title: "Behaviour Consultations",
        description: "Behavioural issues are the most common reason for an unhappy human-animal bond. We look at mental issues from a broad perspective. Most pets will be happier with a good diet and perhaps the addition of herbal remedies.",
        icon: <Brain className="w-6 h-6" />,
        href: "/services/behaviour"
    },
    {
        title: "Diagnostic Ultrasound",
        description: "Ultrasound is a non-invasive, invaluable tool for investigating hidden problems and searching for the cause of perceived problems. We can also perform endoscopic or ultrasound guided biopsies and cardiac assessments.",
        image: "/images/services/ultrasound_vet_1767818296918.png",
        href: "/services/ultrasound"
    },
    {
        title: "Digital X-rays",
        description: "We have an excellent digital radiography system which gives instant results with less radiation exposure. Information is critical to diagnosis as our pets usually do not tell us where it really hurts!",
        icon: <Bone className="w-6 h-6" />,
        href: "/services/radiology"
    },
    {
        title: "De-sexing",
        description: "We support neutering as a practical option for dogs, cats, and pocket pets. Procedures are performed under a full general anaesthetic in our modern surgery with full safety monitoring.",
        icon: <Scissors className="w-6 h-6" />,
        href: "/services/desexing"
    },
    {
        title: "Microchipping",
        description: "As required by local councils, and a good idea anyway in case your pet becomes lost. The service includes registration in the National Pet Registry so you can be contacted no matter where your pet is found.",
        icon: <QrCode className="w-6 h-6" />,
        href: "/services/microchipping"
    },
    {
        title: "Vaccinations",
        description: "We believe our every 3rd year vaccination is better for your dog or cat. We also offer titre testing to evaluate individual immunity in some patients where vaccination may be contraindicated.",
        icon: <Syringe className="w-6 h-6" />,
        href: "/services/vaccinations"
    },
    {
        title: "Geriatric Care",
        description: "A majority of our patients are seniors. We deal with the painful, chronic or other serious problems of older age animals with compassion and expertise.",
        icon: <Clock className="w-6 h-6" />,
        href: "/services/senior-care"
    },
    {
        title: "Palliative Care",
        description: "Compassionate care for patients suffering from terminal cancer, mobility disorders, and chronic diseases. A combination of therapies to improve quality of life during the final phases.",
        icon: <Sunset className="w-6 h-6" />,
        href: "/services/palliative-care"
    },
    {
        title: "Bereavement Support",
        description: "We believe that the issue of life and death has a spiritual foundation, and can help you and your family deal with the loss of your pet.",
        icon: <HeartHandshake className="w-6 h-6" />,
        href: "/services/bereavement"
    },
    {
        title: "Intravenous Vitamin C",
        description: "We are able to administer intravenous vitamin C treatments for cancer or other inflammatory diseases. A very useful therapy for immune support.",
        icon: <FlaskConical className="w-6 h-6" />,
        href: "/services/vitamin-c"
    },
    {
        title: "Dentistry",
        description: "80% of pets over 18 months of age have dental disease. Research has shown that bad teeth are tied to heart disease, renal infections, and other health problems.",
        icon: <Stethoscope className="w-6 h-6" />,
        href: "/services/dentistry"
    },
    {
        title: "Diagnostic Services",
        description: "On-site pathology machines giving blood results within the hour. Also endoscopes, microscopy and an at-call consultant ultrasonographer.",
        icon: <Microscope className="w-6 h-6" />,
        href: "/services/diagnostics"
    },
    {
        title: "Nutritional Counselling",
        description: "We examine the diet with respect to your animal’s metabolism. We can assess nutritional adequacy, check for dietary allergies, and recommend substantial raw food components.",
        icon: <Utensils className="w-6 h-6" />,
        href: "/services/nutrition"
    },
    {
        title: "Natural Raw Food Diets",
        description: "We stock our own hand made raw diets sourced locally from high quality fresh produce, combined with seasonal vegetables, fruit, fresh herbs, and therapeutic spices.",
        icon: <Carrot className="w-6 h-6" />,
        href: "/services/diet"
    },
    {
        title: "Exotic Pet & Bird Medicine",
        description: "Specialized care for exotic pets and birds. We treat Cats, Dogs, Birds, Reptiles, Ferrets, Rabbits, Guinea Pigs, and other Pocket Pets.",
        icon: <Bird className="w-6 h-6" />,
        href: "/services/exotics"
    },
    {
        title: "Pet Hotels",
        description: "Pet pickup and drop off service operates to and from our clinic. We partner with Hanrob Pet Hotels, Australia’s leading pet boarding specialist.",
        icon: <Hotel className="w-6 h-6" />,
        href: "/services/boarding"
    },
    {
        title: "Puppy School",
        description: "Puppy training and socialization in association with a neighbouring vet. Start your puppy off on the right paw.",
        icon: <GraduationCap className="w-6 h-6" />,
        href: "/services/puppy-school"
    },
    {
        title: "Surgical Procedures",
        description: "In our well-equipped facility we offer all the normal surgeries and have developed some advanced techniques of our own with outstanding success rates.",
        icon: <Activity className="w-6 h-6" />,
        href: "/services/surgery"
    },
    {
        title: "General Pharmacy",
        description: "Full range of pharmacy products available on-site if appropriate for your pet's treatment plan.",
        icon: <Pill className="w-6 h-6" />,
        href: "/services/pharmacy"
    }
]

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background-light/30 relative overflow-hidden">
            {/* Background Texture & Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/40 rounded-full blur-[120px] mix-blend-overlay animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
            </div>

            <div className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto space-y-24">

                    {/* Hero Section */}
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative inline-block"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/40 text-xs font-bold tracking-widest text-primary uppercase mb-6 shadow-sm">
                                Integrative Veterinary Medicine
                            </span>
                            <h1 className="text-6xl md:text-7xl font-serif font-black text-navy-custom mb-6 tracking-tight drop-shadow-sm">
                                World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">Care</span>
                                <br />For Your Best Friend
                            </h1>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full shadow-lg" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-2xl text-navy-custom/70 leading-relaxed font-medium max-w-2xl mx-auto"
                        >
                            From advanced surgery to holistic acupuncture, we offer a complete spectrum of loving care tailored to your pet's unique needs.
                        </motion.p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                            >
                                <ServiceCard {...service} className="h-full bg-white/70 hover:bg-white/90 border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-md" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Animals Treated Section - Feature Block */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl p-12 md:p-16 text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                        <div className="relative z-10 space-y-10">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg transform rotate-3">
                                <PawPrint className="w-10 h-10" />
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-custom mb-4">All Creatures Great & Small</h2>
                                <p className="text-xl text-navy-custom/60 max-w-2xl mx-auto">
                                    We welcome every member of your furry (or scaled, or feathered) family with open arms and expert care.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                                {["Cats", "Dogs", "Birds", "Reptiles", "Ferrets", "Rabbits", "Guinea Pigs", "Other Pocket Pets"].map((animal, i) => (
                                    <motion.span
                                        key={animal}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
                                        className="px-6 py-3 bg-white/60 rounded-xl border border-white/60 text-lg font-bold text-navy-custom shadow-sm cursor-default transition-colors"
                                    >
                                        {animal}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center space-y-10 pb-12"
                    >
                        <h3 className="text-4xl md:text-5xl font-serif text-navy-custom font-medium">
                            Can't find what you're looking for?
                        </h3>
                        <p className="text-xl text-navy-custom/70 max-w-xl mx-auto font-medium">
                            Our reception team is here to help. We offer many specialized procedures and can refer to specialists if needed.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-primary to-teal-600 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Contact Our Team
                        </a>
                    </motion.div>

                </div>
            </div>

            <LandingFooter />
        </div>
    )
}
