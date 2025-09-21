import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import EditOrganizationForm from "@/components/organizations/EditOrganizationForm"

type Props = {
  params: { id: string }
}

export default function EditOrganizationPage({ params }: Props) {
  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Organization</h1>
            <p className="text-muted-foreground">Update organization information and settings</p>
          </div>

          <EditOrganizationForm organizationId={params.id} />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}