"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

// ==========================================
// APPOINTMENTS
// ==========================================

export async function getOwnerAppointments() {
    const session = await auth()
    if (!session?.user?.email) return { upcoming: [], past: [] }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
    })

    if (!user) return { upcoming: [], past: [] }

    const appointments = await prisma.appointment.findMany({
        where: {
            bookedById: user.id,
            status: { not: 'CANCELED' } // Optionally show canceled?
        },
        include: {
            pet: true,
            service: true,
            vet: true,
        },
        orderBy: {
            appointmentDate: 'desc'
        }
    })

    const now = new Date()
    const upcoming = appointments.filter(a => a.appointmentDate >= now).reverse() // Closest first
    const past = appointments.filter(a => a.appointmentDate < now)

    return { upcoming, past }
}

// ==========================================
// PETS
// ==========================================

export async function getPetDetails(petId: string) {
    const session = await auth()
    if (!session?.user?.email) return null

    const pet = await prisma.pet.findUnique({
        where: { id: petId },
        include: {
            vaccinations: {
                orderBy: { dateGiven: 'desc' }
            },
            medicalRecords: {
                orderBy: { visitDate: 'desc' },
                take: 5 // Limit history
            }
        }
    })

    // Security check: Ensure owner owns this pet
    // In a real app, we'd check session.user.id against pet.ownerId
    // For now, assuming the email lookup in auth() is sufficient context, 
    // but strictly we should verify ownership.
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!pet || pet.ownerId !== user?.id) return null

    return pet
}

export async function updatePetDetails(petId: string, data: {
    weight?: number,
    dietaryNeeds?: string,
    medicalNotes?: string
}) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("Unauthorized")

    // Verify ownership
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    const pet = await prisma.pet.findUnique({ where: { id: petId } })

    if (!pet || pet.ownerId !== user?.id) throw new Error("Unauthorized")

    await prisma.pet.update({
        where: { id: petId },
        data: {
            weight: data.weight,
            dietaryNeeds: data.dietaryNeeds,
            medicalNotes: data.medicalNotes, // Owner adding notes? Maybe "Owner Notes" field is better, but reusing for now.
        }
    })

    revalidatePath(`/portal/pets/${petId}`)
}

// ==========================================
// VACCINATIONS
// ==========================================

export async function getVaccinationCertificate(vaccinationId: string) {
    const session = await auth()
    if (!session?.user?.email) return null

    const vaccination = await prisma.vaccination.findUnique({
        where: { id: vaccinationId },
        include: {
            pet: {
                include: {
                    owner: true,
                    clinic: true
                }
            }
        }
    })

    // Verify ownership
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!vaccination || vaccination.pet.ownerId !== user?.id) return null

    return vaccination
}
