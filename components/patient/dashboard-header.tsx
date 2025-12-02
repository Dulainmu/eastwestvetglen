import { Button } from "@/components/ui/button"
import { Plus, Calendar, FileText } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
    userName: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {userName}! 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Here's what's happening with your pets today.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button asChild variant="outline" className="bg-white">
                    <Link href="/patient/pets">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Pet
                    </Link>
                </Button>
                <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20">
                    <Link href="/">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                    </Link>
                </Button>
            </div>
        </div>
    )
}
