"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AppointmentWithDetails } from "@/lib/appointment-actions"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { AppointmentActions } from "./appointment-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const columns: ColumnDef<AppointmentWithDetails>[] = [
    {
        accessorKey: "appointmentDate",
        header: "Time",
        cell: ({ row }) => {
            return format(new Date(row.getValue("appointmentDate")), "h:mm a")
        },
    },
    {
        accessorKey: "pet",
        header: "Patient",
        cell: ({ row }) => {
            const pet = row.original.pet
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={pet.photoUrl || ""} alt={pet.name} />
                        <AvatarFallback>{pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{pet.name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => {
            const owner = row.original.pet.owner
            return (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{owner.firstName} {owner.lastName}</span>
                    <span className="text-xs text-muted-foreground">{owner.mobile || owner.email}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => {
            const service = row.original.service
            return (
                <Badge variant="outline" style={{ borderColor: service.color || undefined }}>
                    {service.name}
                </Badge>
            )
        },
    },
    {
        accessorKey: "vet",
        header: "Vet",
        cell: ({ row }) => {
            const vet = row.original.vet

            if (!vet) {
                return <span className="text-sm text-muted-foreground">Unassigned</span>
            }

            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={vet.avatarUrl || ""} />
                        <AvatarFallback>{vet.firstName[0]}{vet.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{vet.firstName} {vet.lastName}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const colorMap: Record<string, string> = {
                PENDING: "bg-yellow-100 text-yellow-800",
                CONFIRMED: "bg-blue-100 text-blue-800",
                CHECKED_IN: "bg-green-100 text-green-800",
                IN_PROGRESS: "bg-purple-100 text-purple-800",
                COMPLETED: "bg-gray-100 text-gray-800",
                CANCELED: "bg-red-100 text-red-800",
                NO_SHOW: "bg-orange-100 text-orange-800",
            }

            return (
                <Badge className={colorMap[status] || "bg-gray-100"} variant="secondary">
                    {status.replace("_", " ")}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <AppointmentActions id={row.original.id} currentStatus={row.original.status} />,
    },
]
