
"use client"

import { Invitation } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { revokeInvitation } from "@/lib/invitation-actions"
import { Loader2, Trash2, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface InvitationsListProps {
    invitations: Invitation[]
}

export function InvitationsList({ invitations }: InvitationsListProps) {
    const { toast } = useToast()
    const [revokingId, setRevokingId] = useState<string | null>(null)

    if (invitations.length === 0) return null

    async function handleRevoke(id: string) {
        setRevokingId(id)
        try {
            const result = await revokeInvitation(id)
            if (result.success) {
                toast({
                    title: "Invitation revoked",
                    description: "The invitation has been cancelled.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error || "Failed to revoke invitation.",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong.",
            })
        } finally {
            setRevokingId(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Pending Invitations</CardTitle>
                <CardDescription>
                    Invitations sent to staff members who haven't joined yet.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {invitations.map((invite) => (
                        <div
                            key={invite.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{invite.email}</span>
                                    <Badge variant="outline" className="text-xs">
                                        {invite.role}
                                    </Badge>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Sent {formatDistanceToNow(new Date(invite.createdAt))} ago
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleRevoke(invite.id)}
                                disabled={revokingId === invite.id}
                            >
                                {revokingId === invite.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                                <span className="sr-only">Revoke</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
