import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import RoomDetails from "@/components/rooms/RoomDetails"

type Props = {
  params: { id: string }
}

export default function RoomDetailPage({ params }: Props) {
  return (
    <AuthGuard requiredRole="guard">
      <DashboardLayout>
        <RoomDetails roomId={params.id} />
      </DashboardLayout>
    </AuthGuard>
  )
}
