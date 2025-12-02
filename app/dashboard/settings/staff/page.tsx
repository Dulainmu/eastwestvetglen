import { Metadata } from "next"
import { auth } from "@/auth"
import { getStaffUsers } from "@/lib/staff-actions"
import { StaffList } from "@/components/staff/staff-list"
import { AddStaffDialog } from "@/components/staff/add-staff-dialog"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Staff Management",
    description: "Manage clinic staff members.",
}

import { getInvitations } from "@/lib/invitation-actions"
import { InvitationsList } from "@/components/staff/invitations-list"
import { InviteStaffDialog } from "@/components/staff/invite-staff-dialog"

export default async function StaffPage() {
    const session = await auth()

    if (!session?.user?.clinicId) {
        redirect("/login")
    }

    const [staff, invitations] = await Promise.all([
        getStaffUsers(session.user.clinicId),
        getInvitations(),
    ])

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
                    <p className="text-muted-foreground">
                        Manage your clinic's veterinarians and receptionists.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <InviteStaffDialog />
                    <AddStaffDialog />
                </div>
            </div>

            <InvitationsList invitations={invitations} />

            <StaffList staff={staff} currentUserId={session.user.id} />
        </div>
    )
}
