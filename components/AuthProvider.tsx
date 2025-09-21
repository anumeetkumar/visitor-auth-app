"use client"

import type React from "react"
import { useAuthSync } from "@/hooks/useAuthSync"

type AuthProviderProps = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  useAuthSync()
  return <>{children}</>
}