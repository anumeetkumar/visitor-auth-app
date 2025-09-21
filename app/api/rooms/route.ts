import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock data - replace with actual database query
  const rooms = [
    {
      id: "1",
      name: "Conference Room A",
      code: "CR-A-101",
      description: "Main conference room with video conferencing",
      capacity: 12,
      status: "active",
      accessLevel: "medium",
      location: "Building A, Floor 1",
      lastAccessed: "2 hours ago",
      totalAccesses: 45,
      createdAt: "2024-01-15",
    },
    // Add more mock rooms as needed
  ]

  return NextResponse.json(rooms)
}

export async function POST(request: NextRequest) {
  try {
    const roomData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "code", "capacity", "accessLevel"]
    for (const field of requiredFields) {
      if (!roomData[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    // Mock room creation - replace with actual database insertion
    const newRoom = {
      id: Date.now().toString(),
      ...roomData,
      status: "active",
      totalAccesses: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newRoom, { status: 201 })
  } catch (error) {
    console.error("Room creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
