"use client"

import { useState } from "react"
import { registerOwner } from "@/lib/auth-actions"
import { useRouter } from "next/navigation"
import { Loader2, Mail, Lock, User, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)

        try {
            const result = await registerOwner(formData)
            if (result.success) {
                router.push("/login?registered=true")
            } else {
                setError(result.error || "Registration failed")
                setIsLoading(false)
            }
        } catch (e) {
            console.error(e)
            setError("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                        First Name
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 sm:text-sm"
                            placeholder="John"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                        Last Name
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 sm:text-sm"
                            placeholder="Doe"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                    Email Address
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 sm:text-sm"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                    Phone Number
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 sm:text-sm"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5 ml-1">
                    Password
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>
                <p className="mt-1 text-xs text-gray-500 ml-1">Must be at least 8 characters</p>
            </div>

            {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-400">Registration Failed</h3>
                            <div className="mt-1 text-sm text-red-300/80">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Creating Account...
                    </>
                ) : (
                    <>
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5 opacity-80" />
                    </>
                )}
            </button>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login/owner" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    )
}
