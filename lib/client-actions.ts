"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const createClientSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    address: z.string().optional(),
})

export async function createClient(data: z.infer<typeof createClientSchema>) {
    const session = await auth()
    if (!session?.user?.clinicId) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        const validated = createClientSchema.parse(data)

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validated.email }
        })

        if (existingUser) {
            return { success: false, error: "Email already registered" }
        }

        // Create client with default password (they can reset it later)
        const hashedPassword = await bcrypt.hash("vetflow123", 10)

        await prisma.user.create({
            data: {
                ...validated,
                clinicId: session.user.clinicId,
                role: "PET_OWNER",
                password: hashedPassword,
            }
        })

        revalidatePath("/dashboard/clients")
        return { success: true }
    } catch (error) {
        console.error("Failed to create client:", error)
        return { success: false, error: "Failed to create client" }
    }
}
