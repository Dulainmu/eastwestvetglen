import { getPetDetails, updatePetDetails } from "@/lib/portal-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Download, Save } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PetProfilePage({ params }: { params: { id: string } }) {
    const pet = await getPetDetails(params.id)

    if (!pet) return notFound()

    async function updatePet(formData: FormData) {
        "use server"
        const weight = parseFloat(formData.get("weight") as string)
        const dietaryNeeds = formData.get("dietaryNeeds") as string
        const medicalNotes = formData.get("medicalNotes") as string

        await updatePetDetails(params.id, {
            weight: isNaN(weight) ? undefined : weight,
            dietaryNeeds,
            medicalNotes
        })
    }

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                {pet.photoUrl ? (
                    <img src={pet.photoUrl} alt={pet.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold">
                        {pet.name[0]}
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold">{pet.name}</h1>
                    <div className="flex gap-2 text-gray-500">
                        <span>{pet.species}</span>
                        <span>•</span>
                        <span>{pet.breed}</span>
                        <span>•</span>
                        <span>{pet.gender}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Details Form */}
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Health Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={updatePet} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Weight (kg)</label>
                                        <Input
                                            name="weight"
                                            type="number"
                                            step="0.1"
                                            defaultValue={pet.weight || ""}
                                            placeholder="e.g. 12.5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Microchip No.</label>
                                        <Input
                                            disabled
                                            value={pet.microchipNo || "Not registered"}
                                            className="bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Dietary Needs</label>
                                    <Textarea
                                        name="dietaryNeeds"
                                        defaultValue={pet.dietaryNeeds || ""}
                                        placeholder="Any special diet or allergies?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">My Notes</label>
                                    <Textarea
                                        name="medicalNotes"
                                        defaultValue={pet.medicalNotes || ""}
                                        placeholder="Notes about behavior, habits, etc."
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Vaccination History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pet.vaccinations.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No vaccination records found.</p>
                                ) : (
                                    pet.vaccinations.map((vax) => (
                                        <div key={vax.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{vax.vaccineName}</h4>
                                                <p className="text-sm text-gray-500">
                                                    Given on {format(new Date(vax.dateGiven), 'MMM d, yyyy')}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {vax.nextDueDate && (
                                                    <Badge variant="outline" className="text-xs">
                                                        Due: {format(new Date(vax.nextDueDate), 'MMM d, yyyy')}
                                                    </Badge>
                                                )}
                                                <Link href={`/portal/certificates/${vax.id}`} target="_blank">
                                                    <Button variant="outline" size="sm">
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Certificate
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Quick Stats / Reminders */}
                <div className="space-y-6">
                    <Card className="bg-primary-50 border-primary-100">
                        <CardHeader>
                            <CardTitle className="text-primary-900">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Age</span>
                                <span className="font-semibold">
                                    {pet.dateOfBirth ?
                                        `${new Date().getFullYear() - new Date(pet.dateOfBirth).getFullYear()} years`
                                        : 'Unknown'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status</span>
                                <Badge className="bg-green-100 text-green-700">Active Patient</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
