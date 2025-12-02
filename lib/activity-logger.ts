
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function logActivity(
    userId: string,
    clinicId: string,
    action: string,
    details?: string
) {
    try {
        const headersList = headers()
        const ipAddress = headersList.get("x-forwarded-for") || "unknown"

        await prisma.activityLog.create({
            data: {
                userId,
                clinicId,
                action,
                details,
                ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
            },
        })
    } catch (error) {
        console.error("Failed to log activity:", error)
        // Don't throw error to prevent blocking the main action
    }
}
