"use client"

import { createContext, useContext } from "react"

export type User = {
    id: string
    name: string
    slug: string
}

type AuthContextType = {
    user: User | null
    loading: boolean
    fetchUser: (token?: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return ctx
}