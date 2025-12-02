"use server"

import { prisma } from "@/lib/prisma"
import { ResourceType } from "@prisma/client"
import { revalidatePath } from "next/cache"

// ==========================================
// RESOURCES
// ==========================================

export async function getResources(clinicSlug: string) {
    const clinic = await prisma.clinic.findUnique({
        where: { slug: clinicSlug },
        include: { resources: true }
    })
    return clinic?.resources || []
}

export async function createResource(clinicSlug: string, data: { name: string, type: ResourceType }) {
    const clinic = await prisma.clinic.findUnique({ where: { slug: clinicSlug } })
    if (!clinic) throw new Error("Clinic not found")

    await prisma.resource.create({
        data: {
            clinicId: clinic.id,
            name: data.name,
            type: data.type,
        }
    })
    revalidatePath(`/dashboard/settings/resources`)
}

export async function deleteResource(resourceId: string) {
    await prisma.resource.delete({ where: { id: resourceId } })
    revalidatePath(`/dashboard/settings/resources`)
}

// ==========================================
// PUBLIC HOLIDAYS
// ==========================================

export async function getPublicHolidays(clinicSlug: string) {
    const clinic = await prisma.clinic.findUnique({
        where: { slug: clinicSlug },
        include: { publicHolidays: { orderBy: { date: 'asc' } } }
    })
    return clinic?.publicHolidays || []
}

export async function createPublicHoliday(clinicSlug: string, data: { name: string, date: Date }) {
    const clinic = await prisma.clinic.findUnique({ where: { slug: clinicSlug } })
    if (!clinic) throw new Error("Clinic not found")

    await prisma.publicHoliday.create({
        data: {
            clinicId: clinic.id,
            name: data.name,
            date: data.date,
        }
    })
    revalidatePath(`/dashboard/settings/holidays`)
}

export async function deletePublicHoliday(holidayId: string) {
    await prisma.publicHoliday.delete({ where: { id: holidayId } })
    revalidatePath(`/dashboard/settings/holidays`)
}
