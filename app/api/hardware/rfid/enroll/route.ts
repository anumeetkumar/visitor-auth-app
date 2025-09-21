import { type NextRequest, NextResponse } from "next/server"
import { enrollRFIDCard } from "@/lib/hardware"

export async function POST(request: NextRequest) {
  try {
    const { employeeId, cardId } = await request.json()

    if (!employeeId) {
      return NextResponse.json({ success: false, error: "Employee ID is required" }, { status: 400 })
    }

    const result = await enrollRFIDCard(employeeId, cardId)

    return NextResponse.json(result)
  } catch (error) {
    console.error("RFID enrollment error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "RFID enrollment failed",
      },
      { status: 500 },
    )
  }
}
