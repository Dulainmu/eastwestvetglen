"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash, UserCog } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { deleteStaffUser } from "@/lib/staff-actions"
import { useToast } from "@/hooks/use-toast"
import { Role } from "@prisma/client"

interface StaffUser {
    id: string
    firstName: string
    lastName: string
    email: string
    role: Role
    mobile: string | null
    isActive: boolean
    avatarUrl: string | null
}

interface StaffListProps {
    staff: StaffUser[]
    currentUserId: string
}

export function StaffList({ staff, currentUserId }: StaffListProps) {
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleDelete = async (userId: string) => {
        if (confirm("Are you sure you want to delete this staff member?")) {
            setIsDeleting(userId)
            const result = await deleteStaffUser(userId)
            setIsDeleting(null)

            if (result.success) {
                toast({
                    title: "Staff member deleted",
                    description: "The user has been removed successfully.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error,
                })
            }
        }
    }

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staff.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatarUrl || ""} alt={`${user.firstName} ${user.lastName}`} />
                                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span>{user.firstName} {user.lastName}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={user.role === 'VET' ? 'default' : 'secondary'}>
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm text-muted-foreground">
                                    {user.mobile || '-'}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>
                                            Copy Email
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <UserCog className="mr-2 h-4 w-4" /> Edit Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => handleDelete(user.id)}
                                            disabled={user.id === currentUserId || isDeleting === user.id}
                                        >
                                            <Trash className="mr-2 h-4 w-4" /> Delete User
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
