import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "@/auth" // We'll need a client component for sign out or use server action
import { LogOut, LayoutDashboard, Calendar, PawPrint, User } from "lucide-react"

export default async function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    if (session.user.role !== "PET_OWNER") {
        redirect("/dashboard")
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-slate-900 text-white p-4 flex flex-col">
                <div className="mb-8 px-2">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <PawPrint className="h-6 w-6 text-primary" />
                        VetFlow
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Patient Portal</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link
                        href="/patient/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/patient/appointments"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                        <Calendar className="h-5 w-5" />
                        My Appointments
                    </Link>
                    <Link
                        href="/patient/pets"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                        <PawPrint className="h-5 w-5" />
                        My Pets
                    </Link>
                    <Link
                        href="/patient/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                        <User className="h-5 w-5" />
                        Profile
                    </Link>
                </nav>

                <div className="mt-auto pt-4 border-t border-slate-800">
                    <div className="px-3 py-2 mb-2">
                        <p className="text-sm font-medium">{(session.user as any).firstName}</p>
                        <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
                    </div>
                    <form action={async () => {
                        "use server"
                        await signOut()
                    }}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/10"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            <main className="flex-1 bg-slate-50">
                {children}
            </main>
        </div>
    )
}
