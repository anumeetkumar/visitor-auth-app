import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import CreateOrganizationForm from "@/components/organizations/CreateOrganizationForm"

export default function NewOrganizationPage() {
  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Organization</h1>
            <p className="text-muted-foreground">Add a new organization to the security management system</p>
          </div>

          <CreateOrganizationForm />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}