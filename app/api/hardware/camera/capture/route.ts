import { type NextRequest, NextResponse } from "next/server"
import { captureImage } from "@/lib/hardware"

export async function POST(request: NextRequest) {
  try {
    const imageData = await captureImage()

    return NextResponse.json({
      success: true,
      imageData,
    })
  } catch (error) {
    console.error("Camera capture error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Camera capture failed",
      },
      { status: 500 },
    )
  }
}
