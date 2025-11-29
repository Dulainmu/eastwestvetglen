"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateAppointmentStatus } from "@/lib/appointment-actions"
import { AppointmentStatus } from "@prisma/client"
import { MoreHorizontal, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface AppointmentActionsProps {
    id: string
    currentStatus: AppointmentStatus
}

export function AppointmentActions({ id, currentStatus }: AppointmentActionsProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    async function handleStatusUpdate(status: AppointmentStatus) {
        setIsLoading(true)
        const result = await updateAppointmentStatus(id, status)
        setIsLoading(false)

        if (result.success) {
            toast({
                title: "Status updated",
                description: `Appointment marked as ${status.toLowerCase().replace("_", " ")}.`,
            })
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <MoreHorizontal className="h-4 w-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(id)}
                >
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {currentStatus !== AppointmentStatus.CHECKED_IN && (
                    <DropdownMenuItem onClick={() => handleStatusUpdate(AppointmentStatus.CHECKED_IN)}>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        Check In
                    </DropdownMenuItem>
                )}
                {currentStatus !== AppointmentStatus.CANCELED && (
                    <DropdownMenuItem onClick={() => handleStatusUpdate(AppointmentStatus.CANCELED)}>
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        Cancel
                    </DropdownMenuItem>
                )}
                {currentStatus !== AppointmentStatus.NO_SHOW && (
                    <DropdownMenuItem onClick={() => handleStatusUpdate(AppointmentStatus.NO_SHOW)}>
                        <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                        Mark No-Show
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
