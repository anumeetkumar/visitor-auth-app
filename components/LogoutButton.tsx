"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/store/useAuthStore"

type LogoutButtonProps = {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function LogoutButton({ variant = "ghost", size = "default", className }: LogoutButtonProps) {
  const { logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call logout API to clear cookies
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear client-side store and redirect
      logout()
      router.push("/login")
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} className={className}>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}
