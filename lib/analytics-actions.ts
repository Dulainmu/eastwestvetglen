
"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { startOfDay, endOfDay, subDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

export type DateRange = "7d" | "30d" | "thisMonth" | "lastMonth"

function getDateRange(range: DateRange) {
    const now = new Date()
    let start: Date
    let end: Date = endOfDay(now)

    switch (range) {
        case "7d":
            start = startOfDay(subDays(now, 7))
            break
        case "30d":
            start = startOfDay(subDays(now, 30))
            break
        case "thisMonth":
            start = startOfMonth(now)
            break
        case "lastMonth":
            start = startOfMonth(subDays(startOfMonth(now), 1))
            end = endOfMonth(subDays(startOfMonth(now), 1))
            break
        default:
            start = startOfDay(subDays(now, 7))
    }

    return { start, end }
}

export async function getAppointmentTrends(range: DateRange) {
    const session = await auth()
    if (!session?.user?.clinicId) return []

    const { start, end } = getDateRange(range)

    const appointments = await prisma.appointment.findMany({
        where: {
            clinicId: session.user.clinicId,
            appointmentDate: {
                gte: start,
                lte: end,
            },
        },
        select: {
            appointmentDate: true,
            status: true,
        },
    })

    // Aggregate by day
    const days = eachDayOfInterval({ start, end })
    const data = days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd")
        const dayAppts = appointments.filter(
            (a) => format(a.appointmentDate, "yyyy-MM-dd") === dateStr
        )

        return {
            date: format(day, "MMM dd"),
            total: dayAppts.length,
            completed: dayAppts.filter((a) => a.status === "COMPLETED").length,
            canceled: dayAppts.filter((a) => a.status === "CANCELED" || a.status === "NO_SHOW").length,
        }
    })

    return data
}

export async function getRevenueMetrics(range: DateRange) {
    const session = await auth()
    if (!session?.user?.clinicId) return { totalRevenue: 0, byService: [] }

    const { start, end } = getDateRange(range)

    // Get completed appointments with service details
    const appointments = await prisma.appointment.findMany({
        where: {
            clinicId: session.user.clinicId,
            appointmentDate: {
                gte: start,
                lte: end,
            },
            status: "COMPLETED", // Only count completed for revenue
        },
        include: {
            service: true,
        },
    })

    const totalRevenue = appointments.reduce((sum, appt) => sum + (appt.service.price || 0), 0)

    // Group by service
    const serviceMap = new Map<string, number>()
    appointments.forEach((appt) => {
        const serviceName = appt.service.name
        const price = appt.service.price || 0
        serviceMap.set(serviceName, (serviceMap.get(serviceName) || 0) + price)
    })

    const byService = Array.from(serviceMap.entries()).map(([name, value]) => ({
        name,
        value,
    })).sort((a, b) => b.value - a.value)

    return { totalRevenue, byService }
}

export async function getVetPerformance(range: DateRange) {
    const session = await auth()
    if (!session?.user?.clinicId) return []

    const { start, end } = getDateRange(range)

    const appointments = await prisma.appointment.findMany({
        where: {
            clinicId: session.user.clinicId,
            appointmentDate: {
                gte: start,
                lte: end,
            },
            status: "COMPLETED",
            vetId: { not: null },
        },
        include: {
            vet: true,
            service: true,
        },
    })

    const vetMap = new Map<string, { name: string; appointments: number; revenue: number }>()

    appointments.forEach((appt) => {
        if (!appt.vet) return
        const vetId = appt.vet.id
        const vetName = `${appt.vet.firstName} ${appt.vet.lastName}`
        const price = appt.service.price || 0

        if (!vetMap.has(vetId)) {
            vetMap.set(vetId, { name: vetName, appointments: 0, revenue: 0 })
        }

        const stats = vetMap.get(vetId)!
        stats.appointments += 1
        stats.revenue += price
    })

    return Array.from(vetMap.values()).sort((a, b) => b.revenue - a.revenue)
}
