import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock data - replace with actual database query
    const organizations = [
      {
        id: "1",
        name: "TechCorp Solutions",
        logo: "/placeholder.svg",
        status: "active",
        employeeCount: 156,
        adminCount: 3,
        createdAt: "2024-01-15",
        lastActivity: "2 hours ago",
        totalAccesses: 2456,
      },
      {
        id: "2",
        name: "Global Industries",
        status: "active",
        employeeCount: 89,
        adminCount: 2,
        createdAt: "2024-01-10",
        lastActivity: "30 minutes ago",
        totalAccesses: 1234,
      },
    ]

    return NextResponse.json({ organizations })
  } catch (error) {
    console.error("Failed to fetch organizations:", error)
    return NextResponse.json(
      { message: "Failed to fetch organizations" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, logo } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Organization name is required" },
        { status: 400 }
      )
    }

    // Mock creation - replace with actual database insertion
    const newOrganization = {
      id: Date.now().toString(),
      name: name.trim(),
      logo: logo || null,
      status: "active",
      employeeCount: 0,
      adminCount: 0,
      createdAt: new Date().toISOString(),
      lastActivity: "Never",
      totalAccesses: 0,
    }

    return NextResponse.json(
      { 
        message: "Organization created successfully",
        organization: newOrganization 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to create organization:", error)
    return NextResponse.json(
      { message: "Failed to create organization" },
      { status: 500 }
    )
  }
}