import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "@/auth"
import { LogOut, LayoutDashboard, Calendar, PawPrint, User, Bell, Search, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

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
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 fixed inset-y-0 z-50">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/patient/dashboard" className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                            <PawPrint className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">VetFlow</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavItem href="/patient/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <NavItem href="/patient/appointments" icon={Calendar} label="Appointments" />
                    <NavItem href="/patient/pets" icon={PawPrint} label="My Pets" />
                    <NavItem href="/patient/profile" icon={User} label="Profile" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Need Help?</h4>
                        <p className="text-xs text-gray-500 mb-3">Contact our support team for assistance.</p>
                        <Button size="sm" variant="outline" className="w-full bg-white text-xs h-8">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-lg">VetFlow</span>
                    </div>

                    <div className="hidden md:flex items-center max-w-md w-full">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search appointments, pets..."
                                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9 border border-gray-200">
                                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                                        <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/patient/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/patient/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <form action={async () => {
                                    "use server"
                                    await signOut()
                                }}>
                                    <button className="w-full text-left cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground flex items-center text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign out
                                    </button>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 font-medium text-sm"
        >
            <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            {label}
        </Link>
    )
}
