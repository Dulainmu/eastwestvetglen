"use client"

import { Service } from "@prisma/client"
import { Edit, Trash2, Clock, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ServiceDialog } from "@/components/settings/service-dialog"
import { deleteService } from "@/lib/service-actions"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ServicesListProps {
    services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {
    const { toast } = useToast()

    async function handleDelete(id: string) {
        const result = await deleteService(id)
        if (result.success) {
            toast({
                title: "Service deleted",
                description: "The service has been removed successfully.",
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
        <div className="space-y-4">
            <div className="flex justify-end">
                <ServiceDialog />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Card key={service.id} className="relative overflow-hidden">
                        <div
                            className="absolute left-0 top-0 bottom-0 w-1"
                            style={{ backgroundColor: service.color }}
                        />
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                                <div className="flex gap-1">
                                    <ServiceDialog
                                        service={service}
                                        trigger={
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will remove the service "{service.name}" from your clinic. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(service.id)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                                {service.description || "No description provided."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {service.duration} min
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {service.price?.toFixed(2)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {services.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        <p>No services found. Add your first service to get started.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
