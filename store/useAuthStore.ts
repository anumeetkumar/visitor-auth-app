import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  id: string
  email: string
  role: "super-admin" | "org-admin" | "guard" | "employee"
  orgId?: string
  name: string
}

type AuthState = {
  token?: string
  user?: User
  isAuthenticated: boolean
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
  login: (token: string, user: User) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      user: undefined,
      isAuthenticated: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: undefined, user: undefined, isAuthenticated: false }),
      login: (token, user) => set({ token, user, isAuthenticated: true }),
    }),
    {
      name: "auth-storage",
    },
  ),
)

export default useAuthStore
