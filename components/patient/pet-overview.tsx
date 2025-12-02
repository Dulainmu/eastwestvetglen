import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, PawPrint, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Pet {
    id: string
    name: string
    species: string
    breed: string | null
    dateOfBirth: Date | null
    imageUrl?: string | null
}

interface PetOverviewProps {
    pets: Pet[]
}

export function PetOverview({ pets }: PetOverviewProps) {
    return (
        <Card className="border-none shadow-sm h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg font-bold text-gray-900">My Pets</CardTitle>
                    <CardDescription>{pets.length} registered</CardDescription>
                </div>
                <Button asChild size="icon" variant="ghost" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                    <Link href="/patient/pets">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4">
                    {pets.map((pet) => (
                        <Link href={`/patient/pets/${pet.id}`} key={pet.id} className="block">
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                                <Avatar className="h-12 w-12 bg-primary-100 text-primary-600">
                                    <AvatarImage src={pet.imageUrl || ""} />
                                    <AvatarFallback>
                                        <PawPrint className="h-6 w-6" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                                        {pet.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {pet.species} • {pet.breed}
                                    </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary-400 transition-colors" />
                            </div>
                        </Link>
                    ))}
                    {pets.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-sm text-gray-500 mb-4">No pets added yet.</p>
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href="/patient/pets">Add Your First Pet</Link>
                            </Button>
                        </div>
                    )}
                </div>
                {pets.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <Button asChild variant="outline" className="w-full text-gray-600 hover:text-primary-700 hover:border-primary-200">
                            <Link href="/patient/pets">Manage All Pets</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
