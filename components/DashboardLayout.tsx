"use client"

import type React from "react"

import Header from "@/components/Header"
import SideNav from "@/components/SideNav"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
