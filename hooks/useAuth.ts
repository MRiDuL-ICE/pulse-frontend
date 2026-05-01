"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/api"
import { setTokens, getAccessToken, getRefreshToken, clearTokens } from "@/lib/auth"
import { toast } from "sonner"

export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)



  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const data = await auth.login({ email, password })
      setTokens(data.access_token, data.refresh_token)
      toast.success("// ACCESS_GRANTED")
      router.push("/dashboard")
    } catch (e: any) {
      toast.error(`// ERROR: ${e.message}`)
    } finally { setLoading(false) }
  }, [router])

  const register = useCallback(async (email: string, password: string, tenant_name: string, tenant_slug: string) => {
    setLoading(true)
    try {
      await auth.register({ email, password, tenant_name, tenant_slug })
      const data = await auth.login({ email, password })
      setTokens(data.access_token, data.refresh_token)
      toast.success("// SYSTEM_INITIALIZED")
      router.push("/dashboard")
    } catch (e: any) {
      toast.error(`// ERROR: ${e.message}`)
    } finally { setLoading(false) }
  }, [router])

  const logout = useCallback(async () => {
    const refresh = getRefreshToken()
    const access = getAccessToken()
    if (refresh && access) await auth.logout(refresh, access).catch(() => { })
    clearTokens()
    router.push("/login")
  }, [router])

  const user = useCallback(async () => {
    const access = getAccessToken()
    if (access) {
      const user = await auth.me(access)
      // return user
      console.log("user", user)
    }
  }, [])

  return { loading, login, register, logout, user }
}
