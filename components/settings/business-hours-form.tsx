"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Save } from "lucide-react"
import { Clinic } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { updateClinicProfile } from "@/lib/clinic-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postcode: z.string().min(1, "Postcode is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email"),
    website: z.string().optional(),
    businessHours: z.record(
        z.object({
            open: z.string(),
            close: z.string(),
            closed: z.boolean(),
        })
    ),
})

interface BusinessHoursFormProps {
    clinic: Clinic
}

export function BusinessHoursForm({ clinic }: BusinessHoursFormProps) {
    const { toast } = useToast()

    // Parse business hours safely
    const defaultHours = typeof clinic.businessHours === 'object' && clinic.businessHours
        ? clinic.businessHours as Record<string, { open: string; close: string; closed: boolean }>
        : daysOfWeek.reduce((acc, day) => ({
            ...acc,
            [day]: { open: "09:00", close: "17:00", closed: day === "sunday" }
        }), {})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: clinic.name,
            phone: clinic.phone,
            address: clinic.address,
            city: clinic.city,
            state: clinic.state,
            postcode: clinic.postcode,
            country: clinic.country,
            email: clinic.email,
            website: clinic.website || "",
            businessHours: defaultHours,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await updateClinicProfile(values)

        if (result.success) {
            toast({
                title: "Profile updated",
                description: "Clinic details and business hours have been saved.",
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Clinic Details</CardTitle>
                        <CardDescription>
                            Basic information about your clinic.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Clinic Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="postcode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postcode</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Business Hours</CardTitle>
                        <CardDescription>
                            Set your standard opening hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                                <div className="w-32 font-medium capitalize">{day}</div>

                                <FormField
                                    control={form.control}
                                    name={`businessHours.${day}.closed`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-muted-foreground">
                                                Closed
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`businessHours.${day}.open`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        className="w-32"
                                                        {...field}
                                                        disabled={form.watch(`businessHours.${day}.closed`)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <span className="text-muted-foreground">-</span>
                                    <FormField
                                        control={form.control}
                                        name={`businessHours.${day}.close`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        className="w-32"
                                                        {...field}
                                                        disabled={form.watch(`businessHours.${day}.closed`)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    )
}
