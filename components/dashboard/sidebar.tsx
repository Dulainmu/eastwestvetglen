"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Calendar,
    Users,
    Stethoscope,
    Settings,
    LogOut,
    PawPrint,
    FileText,
    Bell
} from "lucide-react"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Patients", href: "/dashboard/patients", icon: PawPrint },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Services", href: "/dashboard/services", icon: Stethoscope },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <span className="text-xl font-bold">VetFlow</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3">
                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary-600 text-white"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0",
                                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                    )}
                                />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="font-medium text-sm">DA</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Dr. Admin</p>
                        <p className="text-xs text-slate-400 truncate">admin@vetflow.dev</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
