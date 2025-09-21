import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes
  const publicRoutes = ["/login", "/unauthorized"]

  // If current path is public, allow
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value

  // If no token → redirect to login
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If token exists → allow
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
