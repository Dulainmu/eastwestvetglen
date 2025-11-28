"use client"

import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import { getAvailableSlots } from "@/lib/booking-actions"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Loader2, Calendar as CalendarIcon, Clock } from "lucide-react"
import "react-day-picker/dist/style.css"

interface TimeSelectionProps {
    clinicSlug: string
    serviceId: string
    vetId?: string
    selectedDate?: Date
    selectedTime?: string
    onSelect: (date: Date, time: string) => void
}

export default function TimeSelection({
    clinicSlug,
    serviceId,
    vetId,
    selectedDate,
    selectedTime,
    onSelect
}: TimeSelectionProps) {
    const [date, setDate] = useState<Date | undefined>(selectedDate)
    const [slots, setSlots] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    // Handle date change
    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate)
        // Reset time when date changes
        if (newDate && selectedTime) {
            // We don't call onSelect here because time is reset
        }
    }

    // Fetch slots when date changes
    useEffect(() => {
        async function fetchSlots() {
            if (!date) return

            setLoading(true)
            try {
                const availableSlots = await getAvailableSlots(date, clinicSlug, serviceId, vetId)
                setSlots(availableSlots)
            } catch (error) {
                console.error("Error fetching slots:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSlots()
    }, [date, clinicSlug, serviceId, vetId])

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Calendar */}
            <div className="flex-1 flex justify-center md:justify-start">
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={{ before: new Date() }}
                        showOutsideDays
                        className="!m-0"
                        classNames={{
                            day_selected: "bg-primary-600 text-white hover:bg-primary-600 focus:bg-primary-600",
                            day_today: "font-bold text-primary-600",
                        }}
                    />
                </div>
            </div>

            {/* Time Slots */}
            <div className="flex-1">
                <div className="mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="font-medium text-gray-900">
                        {date ? format(date, "EEEE, MMMM do") : "Select a date"}
                    </h3>
                </div>

                {!date ? (
                    <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                        Please select a date first
                    </div>
                ) : loading ? (
                    <div className="h-48 flex items-center justify-center text-primary-600">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : slots.length === 0 ? (
                    <div className="h-48 flex items-center justify-center text-gray-500 bg-gray-50 rounded-xl">
                        No slots available for this date
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
                        {slots.map((time) => (
                            <button
                                key={time}
                                onClick={() => onSelect(date, time)}
                                className={cn(
                                    "py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border",
                                    selectedTime === time && selectedDate?.getTime() === date.getTime()
                                        ? "bg-primary-600 text-white border-primary-600 shadow-md"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                                )}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
