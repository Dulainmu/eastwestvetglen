"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type BookingDetails = {
    ownerName: string
    ownerEmail: string
    ownerPhone: string
    petName: string
    petSpecies: string
    petBreed: string
    petAge: string
    petGender: string
}

interface DetailsFormProps {
    defaultValues?: Partial<BookingDetails>
    onChange: (details: BookingDetails) => void
}

export default function DetailsForm({ defaultValues, onChange }: DetailsFormProps) {
    const [details, setDetails] = useState<BookingDetails>({
        ownerName: defaultValues?.ownerName || "",
        ownerEmail: defaultValues?.ownerEmail || "",
        ownerPhone: defaultValues?.ownerPhone || "",
        petName: defaultValues?.petName || "",
        petSpecies: defaultValues?.petSpecies || "",
        petBreed: defaultValues?.petBreed || "",
        petAge: defaultValues?.petAge || "",
        petGender: defaultValues?.petGender || "",
    })

    const handleChange = (field: keyof BookingDetails, value: string) => {
        const newDetails = { ...details, [field]: value }
        setDetails(newDetails)
        onChange(newDetails)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Owner Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Owner Information</h3>

                <div className="space-y-2">
                    <Label htmlFor="ownerName">Full Name</Label>
                    <Input
                        id="ownerName"
                        placeholder="John Doe"
                        value={details.ownerName}
                        onChange={(e) => handleChange("ownerName", e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Email Address</Label>
                    <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="john@example.com"
                        value={details.ownerEmail}
                        onChange={(e) => handleChange("ownerEmail", e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Phone Number</Label>
                    <Input
                        id="ownerPhone"
                        type="tel"
                        placeholder="0400 000 000"
                        value={details.ownerPhone}
                        onChange={(e) => handleChange("ownerPhone", e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Pet Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Pet Information</h3>

                <div className="space-y-2">
                    <Label htmlFor="petName">Pet's Name</Label>
                    <Input
                        id="petName"
                        placeholder="Bella"
                        value={details.petName}
                        onChange={(e) => handleChange("petName", e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="petSpecies">Species</Label>
                        <Select
                            value={details.petSpecies}
                            onValueChange={(value: string) => handleChange("petSpecies", value)}
                        >
                            <SelectTrigger id="petSpecies">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dog">Dog</SelectItem>
                                <SelectItem value="Cat">Cat</SelectItem>
                                <SelectItem value="Bird">Bird</SelectItem>
                                <SelectItem value="Rabbit">Rabbit</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="petGender">Gender</Label>
                        <Select
                            value={details.petGender}
                            onValueChange={(value: string) => handleChange("petGender", value)}
                        >
                            <SelectTrigger id="petGender">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="petBreed">Breed</Label>
                        <Input
                            id="petBreed"
                            placeholder="Golden Retriever"
                            value={details.petBreed}
                            onChange={(e) => handleChange("petBreed", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="petAge">Age (Years)</Label>
                        <Input
                            id="petAge"
                            type="number"
                            placeholder="3"
                            value={details.petAge}
                            onChange={(e) => handleChange("petAge", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
