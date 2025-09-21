import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const authToken = cookieStore.get("auth-token")?.value

    if (!authToken) {
      return NextResponse.json(
        { message: "No authentication token found" },
        { status: 401 }
      )
    }

    const user = verifyToken(authToken)
    if (!user) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user,
      accessToken: authToken,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}