import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock data - replace with actual database query
  const employees = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "employee",
      department: "Engineering",
      status: "active",
      accessLevel: "medium",
      rfidId: "RF001234",
      faceModelId: "FM001234",
      lastAccess: "2 hours ago",
      totalAccesses: 156,
      joinedAt: "2024-01-15",
    },
    // Add more mock employees as needed
  ]

  return NextResponse.json(employees)
}

export async function POST(request: NextRequest) {
  try {
    const employeeData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "role", "department", "accessLevel"]
    for (const field of requiredFields) {
      if (!employeeData[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    // Mock employee creation - replace with actual database insertion
    const newEmployee = {
      id: Date.now().toString(),
      ...employeeData,
      status: "active",
      totalAccesses: 0,
      lastAccess: "Never",
      joinedAt: new Date().toISOString(),
    }

    return NextResponse.json(newEmployee, { status: 201 })
  } catch (error) {
    console.error("Employee creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
