import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Appointment {
    id: string
    appointmentDate: Date
    status: string
    service: { name: string }
    pet: { name: string, species: string }
    vet: { firstName: string, lastName: string, avatarUrl: string | null } | null
}

interface UpcomingAppointmentsProps {
    appointments: Appointment[]
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
    return (
        <Card className="col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg font-bold text-gray-900">Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled visits</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                    <Link href="/patient/appointments">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {appointments.length > 0 ? (
                    <div className="space-y-4">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-100 hover:bg-primary-50/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 flex flex-col items-center justify-center min-w-[3rem]">
                                        <span className="text-xs font-bold uppercase">{format(apt.appointmentDate, "MMM")}</span>
                                        <span className="text-lg font-bold leading-none">{format(apt.appointmentDate, "d")}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                                            {apt.service.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                {format(apt.appointmentDate, "h:mm a")}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" />
                                                VetFlow Clinic
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 pl-[4rem] sm:pl-0">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8 border border-white shadow-sm">
                                            <AvatarImage src={apt.vet?.avatarUrl || ""} />
                                            <AvatarFallback className="bg-gray-100 text-xs">
                                                Dr
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900">Dr. {apt.vet?.lastName || "Assigned"}</p>
                                            <p className="text-xs text-gray-500">Veterinarian</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {apt.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-sm font-medium text-gray-900">No upcoming appointments</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">Book a visit for your pet today.</p>
                        <Button asChild variant="outline">
                            <Link href="/">Book Now</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
