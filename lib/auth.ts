export type UserRole = "super-admin" | "org-admin" | "guard" | "employee"

export interface User {
  id: string
  email: string
  role: UserRole
  orgId?: string
  name: string
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  user: User
}

// Mock authentication functions - replace with real implementation
export async function authenticateUser(email: string, password: string): Promise<AuthToken | null> {
  // Mock authentication logic
  if (email === "admin@secureaccess.com" && password === "admin123") {
    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      user: {
        id: "1",
        email: "admin@secureaccess.com",
        role: "super-admin",
        name: "Super Admin",
      },
    }
  }
  return null
}

export async function refreshToken(token: string): Promise<string | null> {
  // Mock token refresh
  return "new-mock-access-token"
}

export function verifyToken(token: string): User | null {
  // Mock token verification
  if (token === "mock-access-token" || token === "new-mock-access-token") {
    return {
      id: "1",
      email: "admin@secureaccess.com",
      role: "super-admin",
      name: "Super Admin",
    }
  }
  return null
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    employee: 1,
    guard: 2,
    "org-admin": 3,
    "super-admin": 4,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
