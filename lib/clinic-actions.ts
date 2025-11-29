"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const businessHoursSchema = z.record(
    z.object({
        open: z.string(),
        close: z.string(),
        closed: z.boolean(),
    })
)

const updateClinicSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postcode: z.string().min(1, "Postcode is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email"),
    website: z.string().optional(),
    businessHours: businessHoursSchema,
})

export async function getClinicProfile(clinicId: string) {
    const session = await auth()
    if (!session?.user || session.user.clinicId !== clinicId) {
        throw new Error("Unauthorized")
    }

    const clinic = await prisma.clinic.findUnique({
        where: { id: clinicId },
    })

    return clinic
}

export async function updateClinicProfile(data: z.infer<typeof updateClinicSchema>) {
    const session = await auth()
    if (!session?.user?.clinicId) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        // Validate data
        const validated = updateClinicSchema.parse(data)

        await prisma.clinic.update({
            where: { id: session.user.clinicId },
            data: {
                name: validated.name,
                phone: validated.phone,
                address: validated.address,
                city: validated.city,
                state: validated.state,
                postcode: validated.postcode,
                country: validated.country,
                email: validated.email,
                website: validated.website,
                businessHours: validated.businessHours,
            },
        })

        revalidatePath("/dashboard/settings")
        return { success: true }
    } catch (error) {
        console.error("Failed to update clinic profile:", error)
        return { success: false, error: "Failed to update profile" }
    }
}
