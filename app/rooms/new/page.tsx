import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import CreateRoomForm from "@/components/rooms/CreateRoomForm"

export default function NewRoomPage() {
  return (
    <AuthGuard requiredRole="org-admin">
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Room</h1>
            <p className="text-muted-foreground">Add a new secure access point to the system</p>
          </div>

          <CreateRoomForm />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
