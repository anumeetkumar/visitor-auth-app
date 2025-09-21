import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    const authResult = await authenticateUser(email, password)

    if (!authResult) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Set HTTP-only cookie with the access token
    const cookieStore = cookies()
    cookieStore.set("auth-token", authResult.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    // Also set refresh token if available
    if (authResult.refreshToken) {
      cookieStore.set("refresh-token", authResult.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })
    }

    // Return user data and token (for client-side store)
    return NextResponse.json({
      user: authResult.user,
      accessToken: authResult.accessToken,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}