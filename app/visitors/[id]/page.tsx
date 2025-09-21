import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import VisitorDetails from "@/components/visitors/VisitorDetails"

type Props = {
  params: { id: string }
}

export default function VisitorDetailPage({ params }: Props) {
  return (
    <AuthGuard requiredRole="guard">
      <DashboardLayout>
        <VisitorDetails visitorId={params.id} />
      </DashboardLayout>
    </AuthGuard>
  )
}
