import { Card, CardContent } from "@/components/ui/card"
import { Calendar, PawPrint, FileText, Clock } from "lucide-react"

interface StatsOverviewProps {
    totalPets: number
    upcomingAppointments: number
    pendingInvoices?: number
}

export function StatsOverview({ totalPets, upcomingAppointments, pendingInvoices = 0 }: StatsOverviewProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard
                title="My Pets"
                value={totalPets.toString()}
                icon={PawPrint}
                color="text-blue-600"
                bgColor="bg-blue-50"
            />
            <StatsCard
                title="Upcoming Visits"
                value={upcomingAppointments.toString()}
                icon={Calendar}
                color="text-purple-600"
                bgColor="bg-purple-50"
            />
            <StatsCard
                title="Pending Invoices"
                value={pendingInvoices.toString()}
                icon={FileText}
                color="text-orange-600"
                bgColor="bg-orange-50"
            />
        </div>
    )
}

function StatsCard({ title, value, icon: Icon, color, bgColor }: { title: string, value: string, icon: any, color: string, bgColor: string }) {
    return (
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
            </CardContent>
        </Card>
    )
}
