"use server"

import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function getStaffUsers(clinicId: string) {
    try {
        const staff = await prisma.user.findMany({
            where: {
                clinicId,
                role: {
                    in: [Role.VET, Role.RECEPTIONIST, Role.CLINIC_ADMIN]
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                mobile: true,
                isActive: true,
                avatarUrl: true,
                veterinaryLicenseNo: true,
                specialization: true
            }
        })
        return staff
    } catch (error) {
        console.error("Failed to fetch staff:", error)
        return []
    }
}

export async function createStaffUser(data: {
    clinicId: string
    firstName: string
    lastName: string
    email: string
    role: Role
    mobile?: string
    veterinaryLicenseNo?: string
    specialization?: string
}) {
    try {
        // Check if email exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (existingUser) {
            return { success: false, error: "Email already in use" }
        }

        // Hash password (default: password123)
        const hashedPassword = await bcrypt.hash("password123", 12)

        await prisma.user.create({
            data: {
                clinicId: data.clinicId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                mobile: data.mobile,
                password: hashedPassword,
                // Vet specific fields
                veterinaryLicenseNo: data.role === Role.VET ? data.veterinaryLicenseNo : undefined,
                specialization: data.role === Role.VET ? data.specialization : undefined,
                // Default settings
                availableForBooking: data.role === Role.VET,
            }
        })

        revalidatePath("/dashboard/settings/staff")
        return { success: true }
    } catch (error) {
        console.error("Failed to create staff:", error)
        return { success: false, error: "Failed to create staff member" }
    }
}

export async function deleteStaffUser(userId: string) {
    try {
        await prisma.user.delete({
            where: { id: userId }
        })
        revalidatePath("/dashboard/settings/staff")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete staff:", error)
        return { success: false, error: "Failed to delete staff member" }
    }
}
