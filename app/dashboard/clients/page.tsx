import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Eye, UserPlus } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default async function ClientsPage({
    searchParams,
}: {
    searchParams: { query?: string; page?: string }
}) {
    const session = await auth()
    if (!session?.user?.clinicId) redirect("/login")

    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1
    const itemsPerPage = 10

    const where = {
        clinicId: session.user.clinicId,
        role: "PET_OWNER" as const,
        OR: query
            ? [
                { firstName: { contains: query, mode: "insensitive" as const } },
                { lastName: { contains: query, mode: "insensitive" as const } },
                { email: { contains: query, mode: "insensitive" as const } },
                { pets: { some: { name: { contains: query, mode: "insensitive" as const } } } },
            ]
            : undefined,
    }

    const [clients, totalClients] = await Promise.all([
        prisma.user.findMany({
            where,
            include: {
                pets: true,
                _count: {
                    select: { appointments: true },
                },
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            orderBy: { createdAt: "desc" },
        }),
        prisma.user.count({ where }),
    ])

    const totalPages = Math.ceil(totalClients / itemsPerPage)

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/dashboard/clients/new">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Client
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search clients or pets..."
                        className="pl-8"
                        defaultValue={query}
                    // Note: In a real app, we'd use a client component for search debouncing
                    // For now, we'll rely on form submission or simple navigation if we add it
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Pets</TableHead>
                            <TableHead>Appointments</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No clients found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={client.avatarUrl || ""} />
                                                <AvatarFallback>
                                                    {client.firstName[0]}
                                                    {client.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">
                                                    {client.firstName} {client.lastName}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Member since {new Date(client.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{client.email}</span>
                                            <span className="text-muted-foreground">{client.phone || "-"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {client.pets.map((pet) => (
                                                <Badge key={pet.id} variant="secondary">
                                                    {pet.name} ({pet.species})
                                                </Badge>
                                            ))}
                                            {client.pets.length === 0 && (
                                                <span className="text-muted-foreground text-sm">-</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {client._count.appointments} visits
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/dashboard/clients/${client.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Simple Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    asChild={currentPage > 1}
                >
                    {currentPage > 1 ? (
                        <Link href={`/dashboard/clients?page=${currentPage - 1}&query=${query}`}>
                            Previous
                        </Link>
                    ) : (
                        <span>Previous</span>
                    )}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    asChild={currentPage < totalPages}
                >
                    {currentPage < totalPages ? (
                        <Link href={`/dashboard/clients?page=${currentPage + 1}&query=${query}`}>
                            Next
                        </Link>
                    ) : (
                        <span>Next</span>
                    )}
                </Button>
            </div>
        </div>
    )
}
