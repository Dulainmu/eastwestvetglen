import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, MapPin, PawPrint, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function ClientDetailsPage({ params }: { params: { id: string } }) {
    const session = await auth()
    if (!session?.user?.clinicId) redirect("/login")

    const client = await prisma.user.findUnique({
        where: {
            id: params.id,
            clinicId: session.user.clinicId,
        },
        include: {
            pets: true,
            appointments: {
                include: {
                    pet: true,
                    vet: true,
                    service: true,
                },
                orderBy: { appointmentDate: "desc" },
            },
        },
    })

    if (!client) notFound()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/clients">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Client Details</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={client.avatarUrl || ""} />
                            <AvatarFallback className="text-2xl">
                                {client.firstName[0]}
                                {client.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{client.firstName} {client.lastName}</h3>
                            <p className="text-sm text-muted-foreground">Pet Owner</p>
                        </div>
                        <div className="w-full space-y-2 pt-4">
                            <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                {client.email}
                            </div>
                            <div className="flex items-center text-sm">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                {client.phone || "No phone"}
                            </div>
                            <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                {client.address || "No address"}
                            </div>
                            <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                Joined {format(client.createdAt, "MMM d, yyyy")}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="col-span-5">
                    <Tabs defaultValue="pets" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="pets">Pets</TabsTrigger>
                            <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pets" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {client.pets.map((pet) => (
                                    <Card key={pet.id}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {pet.name}
                                            </CardTitle>
                                            <PawPrint className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{pet.species}</div>
                                            <p className="text-xs text-muted-foreground">
                                                {pet.breed || "Unknown Breed"} • {pet.gender}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-1">
                                                <Badge variant="outline">{pet.dateOfBirth ? new Date().getFullYear() - new Date(pet.dateOfBirth).getFullYear() : "?"} years</Badge>
                                                <Badge variant="outline">{pet.weight} kg</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {client.pets.length === 0 && (
                                    <div className="col-span-full text-center py-8 text-muted-foreground">
                                        No pets registered.
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="appointments" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appointment History</CardTitle>
                                    <CardDescription>
                                        Past and upcoming appointments for this client.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {client.appointments.map((apt) => (
                                            <div key={apt.id} className="flex items-center">
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {apt.service.name} for {apt.pet.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {format(apt.appointmentDate, "PPP")} at {format(apt.appointmentDate, "p")}
                                                    </p>
                                                </div>
                                                <div className="ml-auto font-medium">
                                                    <Badge variant={
                                                        apt.status === "CONFIRMED" ? "default" :
                                                            apt.status === "COMPLETED" ? "secondary" :
                                                                apt.status === "CANCELED" ? "destructive" : "outline"
                                                    }>
                                                        {apt.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                        {client.appointments.length === 0 && (
                                            <div className="text-center py-4 text-muted-foreground">
                                                No appointments found.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
