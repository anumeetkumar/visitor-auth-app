import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import OrganizationDetails from "@/components/organizations/OrganizationDetails"

type Props = {
  params: { id: string }
}

export default function OrganizationDetailPage({ params }: Props) {
  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout>
        <OrganizationDetails organizationId={params.id} />
      </DashboardLayout>
    </AuthGuard>
  )
}