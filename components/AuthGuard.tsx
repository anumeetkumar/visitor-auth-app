"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/store/useAuthStore"
import { verifyToken, type UserRole } from "@/lib/auth"

type AuthGuardProps = {
  children: React.ReactNode
  requiredRole?: UserRole
  redirectTo?: string
}

export default function AuthGuard({ children, requiredRole = "employee", redirectTo = "/login" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { token, user, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // if (!token) {
      //   router.push(redirectTo)
      //   return
      // }

      // const verifiedUser = verifyToken(token)
      // if (!verifiedUser) {
      //   logout()
      //   router.push(redirectTo)
      //   return
      // }

      // Check role permissions
      if (requiredRole && user) {
        const roleHierarchy: Record<UserRole, number> = {
          employee: 1,
          guard: 2,
          "org-admin": 3,
          "super-admin": 4,
        }

        if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
          router.push("/unauthorized")
          return
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [token, user, requiredRole, redirectTo, router, logout])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
