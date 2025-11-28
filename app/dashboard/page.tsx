import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Activity, DollarSign, ArrowUpRight } from "lucide-react"

export default async function DashboardPage() {
    const session = await auth()
    const user = session?.user

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">
                        Welcome back, {user?.name || user?.email?.split('@')[0] || 'Doctor'}! Here's what's happening today.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md border shadow-sm">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-primary-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                +2
                            </span>
                            <span className="ml-1">from yesterday</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Patients</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                +12
                            </span>
                            <span className="ml-1">new this month</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Pending Labs</CardTitle>
                        <Activity className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Requires attention
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Revenue (Today)</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,420</div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                +8%
                            </span>
                            <span className="ml-1">vs last week</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: "09:00 AM", patient: "Max", owner: "John Doe", type: "Check-up", status: "Checked In" },
                                { time: "10:30 AM", patient: "Luna", owner: "Emma Wilson", type: "Vaccination", status: "Confirmed" },
                                { time: "11:15 AM", patient: "Bella", owner: "Sarah Smith", type: "Surgery", status: "Confirmed" },
                                { time: "02:00 PM", patient: "Charlie", owner: "Mike Brown", type: "Dental", status: "Pending" },
                            ].map((apt, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="font-semibold text-gray-900 w-20">{apt.time}</div>
                                        <div>
                                            <div className="font-medium text-gray-900">{apt.patient} <span className="text-gray-500 font-normal">({apt.owner})</span></div>
                                            <div className="text-sm text-gray-500">{apt.type}</div>
                                        </div>
                                    </div>
                                    <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${apt.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                                            apt.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {apt.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <button className="flex items-center p-3 w-full rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary-200 transition-all group">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                <Calendar className="h-5 w-5 text-primary-600" />
                            </div>
                            <div className="ml-4 text-left">
                                <div className="font-medium text-gray-900">New Appointment</div>
                                <div className="text-sm text-gray-500">Schedule a visit</div>
                            </div>
                        </button>

                        <button className="flex items-center p-3 w-full rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-blue-200 transition-all group">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4 text-left">
                                <div className="font-medium text-gray-900">Register Patient</div>
                                <div className="text-sm text-gray-500">Add new pet record</div>
                            </div>
                        </button>

                        <button className="flex items-center p-3 w-full rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-orange-200 transition-all group">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                <Activity className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="ml-4 text-left">
                                <div className="font-medium text-gray-900">Create Invoice</div>
                                <div className="text-sm text-gray-500">Billing & payments</div>
                            </div>
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
