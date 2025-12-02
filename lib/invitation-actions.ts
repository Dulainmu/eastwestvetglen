
"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { randomBytes } from "crypto"
import { Resend } from "resend"
import { revalidatePath } from "next/cache"
import { logActivity } from "./activity-logger"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function inviteStaff(email: string, role: Role) {
    const session = await auth()
    if (!session?.user?.clinicId || session.user.role !== "CLINIC_ADMIN") {
        return { success: false, error: "Unauthorized" }
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { success: false, error: "User with this email already exists." }
        }

        // Check if invitation already exists
        const existingInvite = await prisma.invitation.findFirst({
            where: { email, status: "PENDING" },
        })

        if (existingInvite) {
            return { success: false, error: "Pending invitation already sent to this email." }
        }

        // Generate token
        const token = randomBytes(32).toString("hex")
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        // Create invitation
        await prisma.invitation.create({
            data: {
                email,
                role,
                clinicId: session.user.clinicId,
                token,
                expiresAt,
            },
        })

        // Send email
        if (resend) {
            const inviteUrl = `${process.env.NEXTAUTH_URL}/invite/${token}`

            await resend.emails.send({
                from: process.env.FROM_EMAIL || "onboarding@resend.dev",
                to: email,
                subject: "You've been invited to join VetFlow",
                html: `
                    <p>You have been invited to join VetFlow as a ${role.toLowerCase()}.</p>
                    <p>Click the link below to accept the invitation and set up your account:</p>
                    <a href="${inviteUrl}">${inviteUrl}</a>
                    <p>This link expires in 7 days.</p>
                `,
            })
        } else {
            console.warn("Resend client not initialized. Invitation email not sent.")
            // In dev, we might want to log the link
            console.log(`[DEV] Invite Link: ${process.env.NEXTAUTH_URL}/invite/${token}`)
        }

        await logActivity(session.user.id, session.user.clinicId, "INVITE_STAFF", `Invited ${email} as ${role}`)

        revalidatePath("/dashboard/settings/staff")
        return { success: true }
    } catch (error) {
        console.error("Failed to invite staff:", error)
        return { success: false, error: "Failed to send invitation" }
    }
}

export async function revokeInvitation(id: string) {
    const session = await auth()
    if (!session?.user?.clinicId || session.user.role !== "CLINIC_ADMIN") {
        return { success: false, error: "Unauthorized" }
    }

    try {
        await prisma.invitation.delete({
            where: { id, clinicId: session.user.clinicId },
        })

        await logActivity(session.user.id, session.user.clinicId, "REVOKE_INVITATION", `Revoked invitation ${id}`)

        revalidatePath("/dashboard/settings/staff")
        return { success: true }
    } catch (error) {
        console.error("Failed to revoke invitation:", error)
        return { success: false, error: "Failed to revoke invitation" }
    }
}

export async function getInvitations() {
    const session = await auth()
    if (!session?.user?.clinicId) return []

    try {
        return await prisma.invitation.findMany({
            where: {
                clinicId: session.user.clinicId,
                status: "PENDING",
            },
            orderBy: { createdAt: "desc" },
        })
    } catch (error) {
        console.error("Failed to fetch invitations:", error)
        return []
    }
}
