import Link from "next/link"
import { User, Stethoscope, ArrowRight } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[100px] animate-pulse delay-2000" />
            </div>

            <div className="w-full max-w-4xl z-10 px-4">
                <div className="text-center mb-12">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                        <span className="text-white text-3xl font-bold">V</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
                        Welcome to VetFlow
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        The modern veterinary practice management solution. Please select your login type to continue.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Pet Owner Card */}
                    <Link
                        href="/login/owner"
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-purple-500/30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <User className="h-6 w-6 text-purple-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                Pet Owner
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                Access your pet's medical records, view upcoming appointments, and manage your profile.
                            </p>

                            <div className="flex items-center text-purple-400 text-sm font-medium">
                                Continue as Owner
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Clinic Staff Card */}
                    <Link
                        href="/login/clinic"
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-teal-500/30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Stethoscope className="h-6 w-6 text-teal-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                                Clinic Staff
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                Access the practice dashboard, manage appointments, patients, and daily operations.
                            </p>

                            <div className="flex items-center text-teal-400 text-sm font-medium">
                                Continue as Staff
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} VetFlow. Secure Veterinary Management.
                    </p>
                </div>
            </div>
        </div>
    )
}
