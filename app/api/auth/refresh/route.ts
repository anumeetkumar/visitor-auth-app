import { type NextRequest, NextResponse } from "next/server"
import { refreshToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { refreshToken: token } = await request.json()

    if (!token) {
      return NextResponse.json({ message: "Refresh token is required" }, { status: 400 })
    }

    const newAccessToken = await refreshToken(token)

    if (!newAccessToken) {
      return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 })
    }

    return NextResponse.json({ accessToken: newAccessToken })
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
