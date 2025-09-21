import Link from "next/link"
import { Plus } from "lucide-react"
import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import RoomsList from "@/components/rooms/RoomsList"

export default function RoomsPage() {
  return (
    <AuthGuard requiredRole="org-admin">
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Rooms</h1>
              <p className="text-muted-foreground">Manage secure access points and rooms</p>
            </div>
            <Link href="/rooms/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Room
              </Button>
            </Link>
          </div>

          <RoomsList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
