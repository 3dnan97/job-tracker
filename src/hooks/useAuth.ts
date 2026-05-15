import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import type { AuthSession, AuthUser } from '@supabase/supabase-js'


export default function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [session, setSession] = useState<AuthSession | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getUser() {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                setSession(session)

                if (session) {
                    setUser(session.user)
                }
            } catch {
                setSession(null)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getUser()

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user)
                setSession(session)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                setSession(null)
            }
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    async function signIn(email: string, password: string) {
        return await supabase.auth.signInWithPassword({ email, password })
    }

    async function signOut() {
        return await supabase.auth.signOut()
    }

    async function signUp(name: string, email: string, password: string) {
        return await supabase.auth.signUp({
            email, password, options: {
                data: {
                    name
                }
            }
        })
    }
    return { user, session, loading, signIn, signOut, signUp }
}