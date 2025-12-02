"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const RegisterSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function checkEmailExists(email: string) {
    if (!email) return { exists: false, hasPassword: false }

    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true, password: true }
    })

    return {
        exists: !!user,
        hasPassword: !!user?.password
    }
}

export async function registerOwner(formData: FormData) {
    try {
        const rawData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            password: formData.get("password"),
        }

        const validatedFields = RegisterSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { success: false, error: validatedFields.error.errors[0].message }
        }

        const { firstName, lastName, email, phone, password } = validatedFields.data

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        })

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        if (existingUser) {
            // If user exists but has no password, it's an unclaimed account (from booking)
            if (!existingUser.password) {
                // Update the existing user
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        firstName,
                        lastName,
                        phone,
                        password: hashedPassword,
                        // Ensure role is correct, though it should be PET_OWNER from booking
                        role: 'PET_OWNER',
                        // We keep the existing clinicId
                    }
                })
                return { success: true }
            } else {
                // User exists and has a password - truly a duplicate
                return { success: false, error: "An account with this email already exists." }
            }
        }

        // Get default clinic (for MVP, just pick the first one)
        const clinic = await prisma.clinic.findFirst()
        if (!clinic) {
            return { success: false, error: "System configuration error: No clinic found." }
        }

        // Create user
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email: email.toLowerCase(),
                phone,
                password: hashedPassword,
                role: 'PET_OWNER',
                clinicId: clinic.id,
            }
        })

        return { success: true }
    } catch (error) {
        console.error("Registration failed:", error)
        return { success: false, error: "Failed to create account. Please try again." }
    }
}

export async function registerUserFromInvite(data: {
    token: string
    firstName: string
    lastName: string
    password: string
}) {
    try {
        // Find invitation
        const invitation = await prisma.invitation.findUnique({
            where: { token: data.token },
            include: { clinic: true }
        })

        if (!invitation) {
            return { success: false, error: "Invalid invitation token." }
        }

        if (invitation.status !== 'PENDING') {
            return { success: false, error: "This invitation has already been used or expired." }
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: invitation.email.toLowerCase() }
        })

        if (existingUser) {
            return { success: false, error: "An account with this email already exists." }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10)

        // Create user
        await prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: invitation.email.toLowerCase(),
                password: hashedPassword,
                role: invitation.role,
                clinicId: invitation.clinicId,
                phone: "", // Optional or prompt later
            }
        })

        // Update invitation status
        await prisma.invitation.update({
            where: { id: invitation.id },
            data: { status: 'ACCEPTED' }
        })

        return { success: true }
    } catch (error) {
        console.error("Invite registration failed:", error)
        return { success: false, error: "Failed to create account from invitation." }
    }
}
