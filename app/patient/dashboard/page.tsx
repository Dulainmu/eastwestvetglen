import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/patient/dashboard-header"
import { StatsOverview } from "@/components/patient/stats-overview"
import { UpcomingAppointments } from "@/components/patient/upcoming-appointments"
import { PetOverview } from "@/components/patient/pet-overview"

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
        <div className="max-w-7xl mx-auto">
            <DashboardHeader userName={(session.user as any).firstName} />

            <StatsOverview
                totalPets={pets.length}
                upcomingAppointments={appointments.length}
                pendingInvoices={0} // Placeholder for now
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <UpcomingAppointments appointments={appointments} />
                <div className="lg:col-span-1">
                    <PetOverview pets={pets} />
                </div>
            </div>
        </div>
    )
}
