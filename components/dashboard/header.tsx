"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signOut } from "next-auth/react"

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center gap-4 lg:hidden">
                <Button variant="ghost" size="icon" className="-ml-2">
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            <div className="flex flex-1 items-center gap-4 md:gap-8">
                <div className="relative hidden md:block max-w-md w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search patients, appointments..."
                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                </Button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <form action={async () => await signOut()}>
                    <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-red-600">
                        Sign Out
                    </Button>
                </form>
            </div>
        </header>
    )
}
