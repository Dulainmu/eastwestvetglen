import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, PawPrint, Plus, Clock } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function PatientDashboard() {
    const session = await auth()
    if (!session?.user) return null

    const [pets, appointments] = await Promise.all([
        prisma.pet.findMany({
            where: { ownerId: session.user.id },
        }),
        prisma.appointment.findMany({
            where: {
                pet: { ownerId: session.user.id },
                appointmentDate: { gte: new Date() }
            },
            include: {
                pet: true,
                service: true,
                vet: true,
            },
            orderBy: { appointmentDate: "asc" },
            take: 3,
        })
    ])

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome back, {(session.user as any).firstName}!
                </h1>
                <p className="text-slate-500 mt-2">
                    Here's what's happening with your furry friends.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Upcoming Appointments Card */}
                <Card className="col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>Your scheduled visits</CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/patient/appointments">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {appointments.length > 0 ? (
                            <div className="space-y-4">
                                {appointments.map((apt) => (
                                    <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{apt.service.name} for {apt.pet.name}</p>
                                                <p className="text-sm text-slate-500">
                                                    {format(apt.appointmentDate, "PPP")} at {format(apt.appointmentDate, "p")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right text-sm">
                                            <p className="font-medium">Dr. {apt.vet?.lastName || "Unknown"}</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {apt.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                <Clock className="mx-auto h-12 w-12 text-slate-300" />
                                <h3 className="mt-2 text-sm font-medium text-slate-900">No upcoming appointments</h3>
                                <p className="mt-1 text-sm text-slate-500">Book a visit for your pet today.</p>
                                <div className="mt-6">
                                    <Button asChild>
                                        <Link href="/">Book Now</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* My Pets Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>My Pets</CardTitle>
                            <CardDescription>{pets.length} registered</CardDescription>
                        </div>
                        <Button asChild size="icon" variant="ghost">
                            <Link href="/patient/pets">
                                <Plus className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pets.map((pet) => (
                                <div key={pet.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                        <PawPrint className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{pet.name}</p>
                                        <p className="text-xs text-slate-500">
                                            {pet.species} • {pet.dateOfBirth ? new Date().getFullYear() - new Date(pet.dateOfBirth).getFullYear() : "?"} yrs
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {pets.length === 0 && (
                                <p className="text-sm text-slate-500 text-center py-4">
                                    No pets added yet.
                                </p>
                            )}
                            <Button asChild className="w-full mt-4" variant="outline">
                                <Link href="/patient/pets">Manage Pets</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
