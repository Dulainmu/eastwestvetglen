
"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DateRange } from "@/lib/analytics-actions"

interface DateRangePickerProps {
    value: DateRange
    onValueChange: (value: DateRange) => void
}

export function DateRangePicker({ value, onValueChange }: DateRangePickerProps) {
    return (
        <Select value={value} onValueChange={(v) => onValueChange(v as DateRange)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
            </SelectContent>
        </Select>
    )
}
