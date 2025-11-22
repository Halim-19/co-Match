'use client'

import { createClient } from "@/utils/supabase/client"
import { Button } from "../ui/button"
import { redirect } from "next/navigation"

function SignOutButton() {
    const supabase = createClient()
    return (
        <Button
            variant='ghost'
            onClick={() => {
                supabase.auth.signOut()
                redirect('/')
            }}
        >
            Logout
        </Button>
    )
}

export default SignOutButton