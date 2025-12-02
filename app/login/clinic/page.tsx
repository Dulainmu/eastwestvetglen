import LoginForm from "@/components/auth/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ClinicLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
            {/* Background Gradients - Professional/Clinical */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/20 blur-[100px] animate-pulse delay-2000" />
            </div>

            <div className="w-full max-w-md z-10 px-4">
                <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to selection
                </Link>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-8 pt-12 pb-8 text-center">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <span className="text-white text-3xl font-bold">C</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Clinic Staff Login
                        </h2>
                        <p className="mt-3 text-gray-300 text-sm">
                            Access the VetFlow practice management dashboard
                        </p>
                    </div>

                    <div className="px-8 pb-12">
                        <LoginForm />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} VetFlow. Secure Veterinary Management.
                    </p>
                </div>
            </div>
        </div>
    )
}
