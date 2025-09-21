import { create } from "zustand"

type UIState = {
  sidebarCollapsed: boolean
  theme: "light" | "dark"
  setSidebarCollapsed: (collapsed: boolean) => void
  setTheme: (theme: "light" | "dark") => void
  toggleTheme: () => void
}

const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  theme: "dark",
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}))

export default useUIStore
