import { Metadata } from "next"
import { Building2, Users, CreditCard, Activity } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-cards"

export const metadata: Metadata = {
    title: "Super Admin Dashboard",
    description: "Platform management dashboard.",
}

export default function AdminDashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Platform Overview</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Clinics"
                    value="12"
                    icon={Building2}
                    description="+2 this month"
                />
                <StatsCard
                    title="Total Users"
                    value="2,350"
                    icon={Users}
                    description="+180 this month"
                />
                <StatsCard
                    title="MRR"
                    value="$12,234"
                    icon={CreditCard}
                    description="+19% from last month"
                />
                <StatsCard
                    title="System Health"
                    value="99.9%"
                    icon={Activity}
                    description="All systems operational"
                />
            </div>
        </div>
    )
}
