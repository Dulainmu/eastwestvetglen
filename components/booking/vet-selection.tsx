"use client"

import { useEffect, useState } from "react"
import { getVets } from "@/lib/booking-actions"
import { Check, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Vet = {
    id: string
    name: string | null
    image: string | null
    role: string
}

interface VetSelectionProps {
    clinicSlug: string
    selectedVetId?: string
    onSelect: (vet: Vet | null) => void // null means "Any Vet"
}

export default function VetSelection({ clinicSlug, selectedVetId, onSelect }: VetSelectionProps) {
    const [vets, setVets] = useState<Vet[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadVets() {
            try {
                const data = await getVets(clinicSlug)
                setVets(data)
            } catch (error) {
                console.error("Error loading vets:", error)
            } finally {
                setLoading(false)
            }
        }
        loadVets()
    }, [clinicSlug])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Option: Any Vet */}
            <div
                onClick={() => onSelect(null)}
                className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center text-center gap-2",
                    selectedVetId === undefined // undefined means "Any Vet" is selected (or nothing yet, but we'll treat "Any" as default/null)
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-100 bg-white hover:border-primary-200"
                )}
            >
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                    <User className="h-6 w-6" />
                </div>
                <span className="font-medium text-gray-900">Any Available Vet</span>
                <span className="text-xs text-gray-500">Earliest availability</span>

                {selectedVetId === undefined && (
                    <div className="absolute top-2 right-2 h-5 w-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                    </div>
                )}
            </div>

            {/* Specific Vets */}
            {vets.map((vet) => {
                const isSelected = selectedVetId === vet.id
                return (
                    <div
                        key={vet.id}
                        onClick={() => onSelect(vet)}
                        className={cn(
                            "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center text-center gap-2",
                            isSelected
                                ? "border-primary-600 bg-primary-50"
                                : "border-gray-100 bg-white hover:border-primary-200"
                        )}
                    >
                        {vet.image ? (
                            <img src={vet.image} alt={vet.name || "Vet"} className="h-12 w-12 rounded-full object-cover" />
                        ) : (
                            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                <span className="text-lg font-semibold">{(vet.name || "V")[0]}</span>
                            </div>
                        )}

                        <span className="font-medium text-gray-900">{vet.name || "Veterinarian"}</span>
                        <span className="text-xs text-gray-500">General Practitioner</span>

                        {isSelected && (
                            <div className="absolute top-2 right-2 h-5 w-5 bg-primary-600 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
