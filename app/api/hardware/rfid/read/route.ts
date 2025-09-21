import { type NextRequest, NextResponse } from "next/server"
import { readRFIDCard } from "@/lib/hardware"

export async function POST(request: NextRequest) {
  try {
    const { timeout } = await request.json()

    const result = await readRFIDCard(timeout || 5000)

    return NextResponse.json(result)
  } catch (error) {
    console.error("RFID read error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "RFID read failed",
      },
      { status: 500 },
    )
  }
}
