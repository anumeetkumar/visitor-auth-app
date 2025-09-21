"use client"

import { useEffect } from "react"
import useAuthStore from "@/store/useAuthStore"

export function useAuthSync() {
  const { login, logout, token } = useAuthStore()

  useEffect(() => {
    // Only sync if we don't already have a token in the store
    if (token) return

    const syncAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          login(data.accessToken, data.user)
        }
      } catch (error) {
        console.error("Auth sync error:", error)
        // If there's an error, ensure we're logged out
        logout()
      }
    }

    syncAuth()
  }, [login, logout, token])
}