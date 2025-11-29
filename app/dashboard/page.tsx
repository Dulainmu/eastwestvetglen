import { Metadata } from "next"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { RecentAppointments } from "@/components/dashboard/recent-appointments"
import { StatsCard } from "@/components/dashboard/stats-cards"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value="$45,231.89"
                    icon={DollarSign}
                    description="+20.1% from last month"
                />
                <StatsCard
                    title="Subscriptions"
                    value="+2350"
                    icon={Users}
                    description="+180.1% from last month"
                />
                <StatsCard
                    title="Sales"
                    value="+12,234"
                    icon={CreditCard}
                    description="+19% from last month"
                />
                <StatsCard
                    title="Active Now"
                    value="+573"
                    icon={Activity}
                    description="+201 since last hour"
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <Overview /> */}
                        <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentAppointments />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
