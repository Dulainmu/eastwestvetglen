
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { InviteForm } from "@/components/auth/invite-form"

export default async function InvitePage({ params }: { params: { token: string } }) {
    const invitation = await prisma.invitation.findUnique({
        where: { token: params.token },
        include: { clinic: true },
    })

    if (!invitation) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Invalid Invitation</h1>
                    <p className="text-gray-500 mt-2">This invitation link is invalid or has expired.</p>
                </div>
            </div>
        )
    }

    if (invitation.status !== "PENDING") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Invitation No Longer Valid</h1>
                    <p className="text-gray-500 mt-2">This invitation has already been accepted or expired.</p>
                </div>
            </div>
        )
    }

    if (new Date() > invitation.expiresAt) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Invitation Expired</h1>
                    <p className="text-gray-500 mt-2">This invitation link has expired.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Join {invitation.clinic.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        You've been invited to join as a {invitation.role.toLowerCase().replace("_", " ")}.
                        <br />
                        Please set up your account below.
                    </p>
                </div>

                <InviteForm invitation={invitation} />
            </div>
        </div>
    )
}
