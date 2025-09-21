import { type NextRequest, NextResponse } from "next/server"
import { enrollFaceModel } from "@/lib/hardware"

export async function POST(request: NextRequest) {
  try {
    const { employeeId, imageData } = await request.json()

    if (!employeeId || !imageData) {
      return NextResponse.json({ success: false, error: "Employee ID and image data are required" }, { status: 400 })
    }

    const result = await enrollFaceModel(employeeId, imageData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Face enrollment error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Face enrollment failed",
      },
      { status: 500 },
    )
  }
}
