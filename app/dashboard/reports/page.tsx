
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/reports/date-range-picker"
import { OverviewChart, RevenuePieChart } from "@/components/reports/charts"
import { getAppointmentTrends, getRevenueMetrics, getVetPerformance, DateRange } from "@/lib/analytics-actions"
import { Loader2, DollarSign, Users, Calendar } from "lucide-react"

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState<DateRange>("7d")
    const [loading, setLoading] = useState(true)
    const [trends, setTrends] = useState<any[]>([])
    const [revenue, setRevenue] = useState<{ totalRevenue: number; byService: any[] }>({ totalRevenue: 0, byService: [] })
    const [vetPerformance, setVetPerformance] = useState<any[]>([])

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            try {
                const [trendsData, revenueData, vetData] = await Promise.all([
                    getAppointmentTrends(dateRange),
                    getRevenueMetrics(dateRange),
                    getVetPerformance(dateRange),
                ])
                setTrends(trendsData)
                setRevenue(revenueData)
                setVetPerformance(vetData)
            } catch (error) {
                console.error("Failed to load analytics:", error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [dateRange])

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
                <div className="flex items-center space-x-2">
                    <DateRangePicker value={dateRange} onValueChange={setDateRange} />
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="revenue">Revenue</TabsTrigger>
                        <TabsTrigger value="performance">Vet Performance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {trends.reduce((acc, curr) => acc + curr.total, 0)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        In selected period
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">${revenue.totalRevenue.toFixed(2)}</div>
                                    <p className="text-xs text-muted-foreground">
                                        In selected period
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Appointment Trends</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <OverviewChart data={trends} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="revenue" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Revenue by Service</CardTitle>
                                    <CardDescription>
                                        Distribution of revenue across different service types.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <RevenuePieChart data={revenue.byService} />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Top Services</CardTitle>
                                    <CardDescription>
                                        Highest earning services in this period.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {revenue.byService.slice(0, 5).map((service, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm font-medium leading-none">{service.name}</p>
                                                </div>
                                                <div className="ml-auto font-medium">
                                                    +${service.value.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Veterinarian Performance</CardTitle>
                                <CardDescription>
                                    Appointments completed and revenue generated per vet.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {vetPerformance.map((vet, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {vet.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{vet.name}</p>
                                                    <p className="text-sm text-muted-foreground">{vet.appointments} appointments</p>
                                                </div>
                                            </div>
                                            <div className="font-bold">
                                                ${vet.revenue.toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}
