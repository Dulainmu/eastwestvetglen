"use client"

import { AppointmentWithDetails } from "@/lib/appointment-actions"
import { AvailabilityRule, User, Resource } from "@prisma/client"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { updateAppointmentTime } from "@/lib/appointment-actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Truck, User as UserIcon } from "lucide-react"

interface CalendarViewProps {
    date: Date
    appointments: AppointmentWithDetails[]
    availabilityRules: (AvailabilityRule & { vet: User })[]
    vets: User[]
    resources?: Resource[] // NEW: Resources (Vehicles)
}

// Color mappings for appointment status
const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-500",
    CONFIRMED: "bg-green-100 text-green-800 border-green-500",
    CHECKED_IN: "bg-blue-100 text-blue-800 border-blue-500",
    IN_PROGRESS: "bg-purple-100 text-purple-800 border-purple-500",
    COMPLETED: "bg-gray-100 text-gray-500 border-gray-400",
    CANCELED: "bg-red-100 text-red-400 border-red-300 opacity-50",
    NO_SHOW: "bg-red-200 text-red-800 border-red-600",
}

export function CalendarView({ date, appointments, availabilityRules, vets, resources = [] }: CalendarViewProps) {
    const { toast } = useToast()
    const router = useRouter()
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [dragOverSlot, setDragOverSlot] = useState<{ id: string; hour: number } | null>(null)
    const [isConflict, setIsConflict] = useState(false)

    // Generate time slots (8 AM to 6 PM)
    const hours = Array.from({ length: 11 }, (_, i) => i + 8)

    // Filter active vets and vehicle resources
    const activeVets = vets.filter(v => v.isActive)
    const vehicleResources = resources.filter(r => r.type === "VEHICLE" && r.isActive !== false)

    // Combined columns: Vets first, then Vehicles
    const columns = [
        ...activeVets.map(v => ({ type: "vet" as const, id: v.id, name: `Dr. ${v.firstName}`, avatar: v.avatarUrl })),
        ...vehicleResources.map(r => ({ type: "resource" as const, id: r.id, name: r.name })),
    ]

    const handleDragStart = (e: React.DragEvent, aptId: string) => {
        e.dataTransfer.setData("text/plain", aptId)
        setDraggingId(aptId)
    }

    // Check for conflicts when dragging over a slot
    const checkConflict = (columnId: string, columnType: "vet" | "resource", hour: number): boolean => {
        if (!draggingId) return false

        const droppedApt = appointments.find(a => a.id === draggingId)
        if (!droppedApt) return false

        const newStart = new Date(date)
        newStart.setHours(hour, 0, 0, 0)
        const newEnd = new Date(newStart.getTime() + droppedApt.duration * 60000)

        return appointments.some(apt => {
            if (apt.id === draggingId) return false
            if (apt.status === "CANCELED") return false

            // Check based on column type
            if (columnType === "vet" && apt.vetId !== columnId) return false
            if (columnType === "resource" && apt.resource?.id !== columnId) return false

            const aptStart = new Date(apt.appointmentDate)
            const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000)

            return newStart < aptEnd && newEnd > aptStart
        })
    }

    const handleDragOver = (e: React.DragEvent, columnId: string, columnType: "vet" | "resource", hour: number) => {
        e.preventDefault()

        const hasConflict = checkConflict(columnId, columnType, hour)
        setIsConflict(hasConflict)
        setDragOverSlot({ id: columnId, hour })
    }

    const handleDragLeave = () => {
        setDragOverSlot(null)
        setIsConflict(false)
    }

    const handleDrop = async (e: React.DragEvent, columnId: string, columnType: "vet" | "resource", hour: number) => {
        e.preventDefault()
        const aptId = e.dataTransfer.getData("text/plain")
        setDraggingId(null)
        setDragOverSlot(null)
        setIsConflict(false)

        if (!aptId) return

        // Check for conflicts before proceeding
        if (checkConflict(columnId, columnType, hour)) {
            toast({
                title: "Resource Busy",
                description: `This ${columnType === "vet" ? "doctor" : "vehicle"} is already booked at this time.`,
                variant: "destructive",
            })
            return
        }

        const newDate = new Date(date)
        newDate.setHours(hour, 0, 0, 0)

        const result = await updateAppointmentTime(aptId, newDate, columnType === "vet" ? columnId : undefined, columnType === "resource" ? columnId : undefined)

        if (result.success) {
            toast({
                title: "Appointment Rescheduled",
                description: `Moved to ${format(newDate, "h:mm a")}`,
            })
            router.refresh()
        } else {
            toast({
                title: "Error",
                description: result.error || "Failed to move appointment",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex flex-col border rounded-md overflow-hidden bg-background">
            {/* Header: Columns (Vets + Resources) */}
            <div className="flex border-b">
                <div className="w-16 flex-shrink-0 border-r bg-muted/50"></div>
                {columns.map(col => (
                    <div key={col.id} className="flex-1 p-3 text-center border-r last:border-r-0 bg-muted/20">
                        <div className="flex flex-col items-center gap-2">
                            {col.type === "vet" ? (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={col.avatar || ""} />
                                    <AvatarFallback className="bg-primary/10">
                                        <UserIcon className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <Truck className="h-4 w-4 text-orange-600" />
                                </div>
                            )}
                            <span className="text-sm font-medium truncate w-full">
                                {col.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto max-h-[600px]">
                <div className="relative min-w-[600px]">
                    {hours.map(hour => (
                        <div key={hour} className="flex h-20 border-b last:border-b-0">
                            {/* Time Label */}
                            <div className="w-16 flex-shrink-0 border-r p-2 text-xs text-muted-foreground text-right bg-muted/10">
                                {format(new Date().setHours(hour, 0, 0, 0), "h a")}
                            </div>

                            {/* Column Slots */}
                            {columns.map(col => {
                                // Find appointments for this column in this hour
                                const colAppointments = appointments.filter(apt => {
                                    if (col.type === "vet" && apt.vetId !== col.id) return false
                                    if (col.type === "resource" && apt.resource?.id !== col.id) return false
                                    const aptHour = new Date(apt.appointmentDate).getHours()
                                    return aptHour === hour
                                })

                                // Check if this is the current drag-over slot
                                const isDragOver = dragOverSlot?.id === col.id && dragOverSlot?.hour === hour

                                return (
                                    <div
                                        key={`${col.id}-${hour}`}
                                        className={cn(
                                            "flex-1 border-r last:border-r-0 relative p-1 group transition-all",
                                            isDragOver && !isConflict && "bg-green-100/50",
                                            isDragOver && isConflict && "bg-red-200/70"
                                        )}
                                        onDragOver={(e) => handleDragOver(e, col.id, col.type, hour)}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, col.id, col.type, hour)}
                                    >
                                        {/* Conflict Indicator */}
                                        {isDragOver && isConflict && (
                                            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                                    BUSY
                                                </span>
                                            </div>
                                        )}

                                        {/* Render Appointments */}
                                        {colAppointments.map(apt => (
                                            <TooltipProvider key={apt.id}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, apt.id)}
                                                            className={cn(
                                                                "absolute inset-x-1 rounded px-2 py-1 text-xs font-medium cursor-grab active:cursor-grabbing hover:opacity-90 transition-all overflow-hidden shadow-sm border-l-4",
                                                                statusColors[apt.status] || statusColors.CONFIRMED,
                                                                draggingId === apt.id && "opacity-50"
                                                            )}
                                                            style={{
                                                                top: `${(new Date(apt.appointmentDate).getMinutes() / 60) * 100}%`,
                                                                height: `${Math.max((apt.duration / 60) * 100, 30)}%`,
                                                                zIndex: 10
                                                            }}
                                                        >
                                                            <div className="font-bold">{format(new Date(apt.appointmentDate), "h:mm")}</div>
                                                            <div className="truncate">{apt.pet.name}</div>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="font-bold">{apt.pet.name} - {apt.service.name}</p>
                                                        <p className="text-xs">{apt.pet.owner.firstName} {apt.pet.owner.lastName}</p>
                                                        <p className="text-xs">{format(new Date(apt.appointmentDate), "h:mm a")} ({apt.duration} min)</p>
                                                        <p className="text-xs capitalize">{apt.status.replace("_", " ").toLowerCase()}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
