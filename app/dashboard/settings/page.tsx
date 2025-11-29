import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getClinicProfile } from "@/lib/clinic-actions"
import { BusinessHoursForm } from "@/components/settings/business-hours-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { getServices } from "@/lib/service-actions"
import { ServicesList } from "@/components/settings/services-list"

export default async function SettingsPage() {
    const session = await auth()
    if (!session?.user?.clinicId) {
        redirect("/login")
    }

    const [clinic, services] = await Promise.all([
        getClinicProfile(session.user.clinicId),
        getServices(session.user.clinicId),
    ])

    if (!clinic) {
        return <div>Clinic not found</div>
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Clinic Profile</TabsTrigger>
                    <TabsTrigger value="staff">Staff Management</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                    <BusinessHoursForm clinic={clinic} />
                </TabsContent>

                <TabsContent value="staff" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Staff Management</CardTitle>
                            <CardDescription>
                                Manage veterinarians, receptionists, and other staff members.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Go to the dedicated Staff Management page to add, remove, or update staff accounts.
                            </p>
                            <Button asChild>
                                <Link href="/dashboard/settings/staff">
                                    <Users className="mr-2 h-4 w-4" /> Manage Staff
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                    <ServicesList services={services} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
