import { getOwnerAppointments } from "@/lib/portal-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AppointmentsPage() {
    const { upcoming, past } = await getOwnerAppointments()

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Appointments</h1>
                    <p className="text-gray-500">Manage your upcoming visits and view history.</p>
                </div>
                <Link href="/book/vetflow-demo">
                    <Button>Book New Appointment</Button>
                </Link>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
                    <TabsTrigger value="past">Past History</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {upcoming.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                            <p className="text-gray-500 mb-4">No upcoming appointments scheduled.</p>
                            <Link href="/book/vetflow-demo">
                                <Button variant="outline">Book Now</Button>
                            </Link>
                        </div>
                    ) : (
                        upcoming.map((appt) => (
                            <AppointmentCard key={appt.id} appointment={appt} isUpcoming={true} />
                        ))
                    )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                    {past.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                            <p className="text-gray-500">No past appointment history found.</p>
                        </div>
                    ) : (
                        past.map((appt) => (
                            <AppointmentCard key={appt.id} appointment={appt} isUpcoming={false} />
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

function AppointmentCard({ appointment, isUpcoming }: { appointment: any, isUpcoming: boolean }) {
    const statusColors: any = {
        CONFIRMED: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-blue-100 text-blue-700",
        CANCELED: "bg-red-100 text-red-700",
        NO_SHOW: "bg-gray-100 text-gray-700",
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge className={statusColors[appointment.status] || "bg-gray-100"}>
                                {appointment.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                ID: {appointment.id.slice(-6).toUpperCase()}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-primary-900">
                                {appointment.service.name}
                            </h3>
                            <p className="text-gray-600">for {appointment.pet.name}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                                {format(new Date(appointment.appointmentDate), "EEEE, MMMM d, yyyy")}
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary-500" />
                                {format(new Date(appointment.appointmentDate), "h:mm a")} ({appointment.duration} mins)
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-end gap-4">
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            Dr. {appointment.vet ? `${appointment.vet.firstName} ${appointment.vet.lastName}` : "Assigned Vet"}
                        </div>

                        {isUpcoming && (
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Reschedule</Button>
                                <Button variant="destructive" size="sm">Cancel</Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
