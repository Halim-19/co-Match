import { Handshake } from 'lucide-react'
import Link from 'next/link'

function Logo({ className }: { className?: string }) {
    return (
        <Link href='/'>
            <Handshake
                className={`w-10 h-10 rounded-[3px] opacity-80 border-2 border-black dark:border-gray-300 bg-white dark:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] shadow-gray-900 dark:shadow-gray-300 transition-all duration-200 hover:scale-105 ${className}`}
            />
        </Link>
    )
}

export default Logo