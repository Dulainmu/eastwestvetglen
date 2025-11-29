"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createPetSchema = z.object({
    name: z.string().min(1, "Name is required"),
    species: z.enum(["DOG", "CAT", "BIRD", "RABBIT", "OTHER"]),
    breed: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]),
    dateOfBirth: z.string().optional(), // YYYY-MM-DD
    weight: z.coerce.number().optional(),
    color: z.string().optional(),
    ownerId: z.string().min(1, "Owner is required"),
})

export async function createPet(data: z.infer<typeof createPetSchema>) {
    const session = await auth()
    if (!session?.user?.clinicId) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        const validated = createPetSchema.parse(data)

        await prisma.pet.create({
            data: {
                name: validated.name,
                species: validated.species,
                breed: validated.breed,
                gender: validated.gender,
                dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : undefined,
                weight: validated.weight,
                color: validated.color,
                ownerId: validated.ownerId,
                clinicId: session.user.clinicId,
                isActive: true,
            }
        })

        revalidatePath("/dashboard/pets")
        revalidatePath(`/dashboard/clients/${validated.ownerId}`)
        return { success: true }
    } catch (error) {
        console.error("Failed to create pet:", error)
        return { success: false, error: "Failed to create pet" }
    }
}

export async function getClients(query?: string) {
    const session = await auth()
    if (!session?.user?.clinicId) return []

    return await prisma.user.findMany({
        where: {
            clinicId: session.user.clinicId,
            role: "PET_OWNER",
            OR: query ? [
                { firstName: { contains: query, mode: "insensitive" } },
                { lastName: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
            ] : undefined
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
        take: 10,
    })
}
