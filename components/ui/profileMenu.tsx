// components/ui/ProfileMenu.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "./button"
import Link from "next/link"
import { User2, LayoutDashboard, Settings, LogOut } from 'lucide-react'

interface ProfileMenuProps {
    user: User | null
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()
    const router = useRouter()

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Don't render if no user
    if (!user) {
        return null
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push("/")
    }

    const getUserEmail = () => {
        return user?.email || "User"
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Trigger Button */}
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 w-8 p-0 border-2 border-gray-900 dark:border-gray-900 bg-white dark:bg-white text-gray-900 dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 font-bold transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.5)]"
            >
                <User2 className="h-4 w-4 text-gray-900 dark:text-black" />
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 border-2 border-gray-900 dark:border-gray-900 bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] z-50">
                    {/* User Info Section */}
                    <div className="p-4 border-b-2 border-gray-900 dark:border-gray-900">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {getUserEmail()}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Welcome back!
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                        <Link
                            href="/dashboard"
                            className="flex items-center px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>

                        <Link
                            href="/profile"
                            className="flex items-center px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <User2 className="h-4 w-4 mr-2" />
                            Profile
                        </Link>

                        <Link
                            href="/settings"
                            className="flex items-center px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Link>
                    </div>

                    {/* Sign Out Section */}
                    <div className="p-2 border-t-2 border-gray-900 dark:border-gray-900">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium border-2 border-red-500 dark:border-red-500 hover:border-red-600 dark:hover:border-red-400"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}