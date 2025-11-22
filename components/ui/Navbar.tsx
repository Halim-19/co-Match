// components/ui/Navbar.tsx
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Button } from "./button"
import ProfileMenu from "./profileMenu"
import { ModeToggle } from "../theme/themeToggler"

async function Navbar() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="w-full h-12 border-b-2 border-gray-900 bg-white dark:bg-gray-950 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <Link href={user ? "/dashboard" : "/"} className="flex items-center">
                        <h1 className="text-gray-900 dark:text-white font-bold text-lg tracking-tight">
                            CO-Match
                        </h1>
                    </Link>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggler - Show for ALL users */}
                        <ModeToggle />

                        {user ? (
                            <>
                                {/* Dashboard Link - Visible on larger screens
                                <Link
                                    href="/dashboard"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors hidden sm:block"
                                >
                                    Dashboard
                                </Link> */}

                                {/* Profile Menu Dropdown */}
                                <ProfileMenu user={user} />
                            </>
                        ) : (
                            <>
                                {/* Login Button */}
                                <Link href="/login">
                                    <Button
                                        size="sm"
                                        className="h-8 px-3 border-2 border-gray-900 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white text-xs font-bold transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.5)]"
                                    >
                                        Login
                                    </Button>
                                </Link>

                                {/* Sign Up Button */}
                                <Link href="/signup">
                                    <Button
                                        size="sm"
                                        className="h-8 px-3 border-2 border-gray-900 dark:border-gray-600 bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 hover:border-gray-800 dark:hover:border-gray-500 text-xs font-bold transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.5)]"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar