import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import Logo from "@/components/ui/logo"
import { ModeToggle } from "@/components/theme/themeToggler"

export default async function LandingPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <main className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-100 dark:from-black dark:via-black dark:to-gray-900">
            {/* Navigation */}
            <nav className="w-full border-b-2 border-gray-900 dark:border-gray-800 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="font-bold text-xl">
                            <Logo />
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Only show Sign In if user is NOT signed in */}
                            {!user && (
                                <Link
                                    href="/login"
                                    className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm transition-colors"
                                >
                                    Sign In
                                </Link>
                            )}

                            {/* Always show Get Started button */}
                            <Link href={user ? "/dashboard" : "/signup"}>
                                <Button className="border-2 border-gray-900 dark:border-gray-900 bg-white dark:bg-white text-gray-900 dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black font-bold transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.5)]">
                                    {user ? "Dashboard" : "Get Started"}
                                </Button>
                            </Link>

                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Welcome to{" "}
                        <span className="bg-linear-to-r from-sky-600 to-blue-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            CO-Match
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Connect, collaborate, and find your perfect match.
                        The modern platform for meaningful connections and partnerships.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link href={user ? "/dashboard" : "/signup"} className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full border-2 border-gray-900 dark:border-gray-900 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:border-gray-800 dark:hover:border-gray-800 font-bold text-lg px-8 py-6 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]"
                            >
                                {user ? "Go to Dashboard" : "Get Started Free"}
                            </Button>
                        </Link>
                        <Link href="/about" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full border-2 border-gray-900 dark:border-gray-900 bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-bold text-lg px-8 py-6 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { title: "Smart Matching", desc: "AI-powered connections" },
                            { title: "Secure & Private", desc: "Your data is protected" },
                            { title: "Easy to Use", desc: "Simple and intuitive" }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="border-2 border-gray-900 dark:border-gray-900 bg-white dark:bg-black p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200"
                            >
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t-2 border-gray-900 dark:border-gray-800 bg-white dark:bg-black py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        © 2024 CO-Match. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    )
}