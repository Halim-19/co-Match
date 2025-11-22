'use client'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

function page() {
    const supabase = createClient()
    const logout = async () => {
        await supabase.auth.signOut()
        redirect('/login')
    }
    return (
        <div>
            dashboard
            <button onClick={logout} className='p-4 bg-amber-200'>logout</button>
        </div>
    )
}

export default page