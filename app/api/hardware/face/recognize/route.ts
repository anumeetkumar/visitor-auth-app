import { type NextRequest, NextResponse } from "next/server"
import { recognizeFace } from "@/lib/hardware"

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    const result = await recognizeFace(imageData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Face recognition error:", error)
    return NextResponse.json(
      {
        success: false,
        match: false,
        confidence: 0,
        error: error instanceof Error ? error.message : "Face recognition failed",
      },
      { status: 500 },
    )
  }
}
