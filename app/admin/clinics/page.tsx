import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
    title: "Clinics | Super Admin",
    description: "Manage registered clinics.",
}

const clinics = [
    {
        id: "1",
        name: "Happy Paws Veterinary Clinic",
        slug: "happy-paws",
        plan: "Pro",
        status: "Active",
        users: 12,
    },
    {
        id: "2",
        name: "City Vet Hospital",
        slug: "city-vet",
        plan: "Starter",
        status: "Active",
        users: 5,
    },
    {
        id: "3",
        name: "Coastal Pet Care",
        slug: "coastal-pet",
        plan: "Enterprise",
        status: "Trial",
        users: 25,
    },
]

export default function ClinicsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Clinics</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Clinic
                </Button>
            </div>
            <div className="border rounded-md bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Users</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clinics.map((clinic) => (
                            <TableRow key={clinic.id}>
                                <TableCell className="font-medium">{clinic.name}</TableCell>
                                <TableCell>{clinic.slug}</TableCell>
                                <TableCell>{clinic.plan}</TableCell>
                                <TableCell>{clinic.users}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${clinic.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {clinic.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Manage</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
