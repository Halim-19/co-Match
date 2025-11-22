// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const errorDescription = requestUrl.searchParams.get('error_description')

    // Handle OAuth errors
    if (error) {
        console.error('OAuth error:', error, errorDescription)
        return NextResponse.redirect(
            new URL(`/login?error=${error}`, requestUrl.origin)
        )
    }

    // Handle missing code
    if (!code) {
        console.error('No code provided in auth callback')
        return NextResponse.redirect(
            new URL('/login?error=no_code', requestUrl.origin)
        )
    }

    const supabase = createClient()

    try {
        // Exchange the authorization code for a session
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
            console.error('Code exchange error:', exchangeError)
            return NextResponse.redirect(
                new URL(`/login?error=exchange_failed&message=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
            )
        }

        console.log('Auth callback successful for user:', data.user?.email)

        // Successful authentication - redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))

    } catch (catchError) {
        console.error('Unexpected error in auth callback:', catchError)
        return NextResponse.redirect(
            new URL('/login?error=unexpected_error', requestUrl.origin)
        )
    }
}