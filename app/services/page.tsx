"use client"

import { motion } from "framer-motion"
import { ServiceCard } from "@/components/services/ServiceCard"
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
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto space-y-20">

                    {/* Header */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block"
                        >
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Integrative Veterinary Medicine</h2>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                                All Services
                            </h1>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-muted-foreground leading-relaxed"
                        >
                            Browse our comprehensive list of treatments. From western medicine to holistic therapies, find the right care for your pet.
                        </motion.p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ServiceCard {...service} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Animals Treated Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary/5 rounded-3xl p-12 text-center space-y-8"
                    >
                        <PawPrint className="w-16 h-16 text-primary mx-auto opacity-50" />
                        <h2 className="text-3xl font-serif font-bold text-foreground">Animals We Treat</h2>
                        <div className="flex flex-wrap justify-center gap-4 text-lg text-muted-foreground max-w-4xl mx-auto">
                            {["Cats", "Dogs", "Birds", "Reptiles", "Ferrets", "Rabbits", "Guinea Pigs", "Other Pocket Pets"].map((animal) => (
                                <span key={animal} className="px-4 py-2 bg-white/50 dark:bg-black/20 rounded-full border border-primary/10">
                                    {animal}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center space-y-8"
                    >
                        <div className="inline-block p-1 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-white/50 dark:border-slate-700">
                            <span className="px-4 py-1 text-sm font-medium text-muted-foreground">Need something else?</span>
                        </div>
                        <h3 className="text-4xl font-serif text-foreground">Can't find the service you need?</h3>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                            Contact our reception team. We offer many specialized procedures and can refer to specialists if needed.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                        >
                            Contact Us
                        </a>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
