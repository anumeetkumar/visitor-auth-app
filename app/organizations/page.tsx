import Link from "next/link"
import { Building2 } from "lucide-react"
import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import OrganizationsList from "@/components/organizations/OrganizationsList"

export default function OrganizationsPage() {
  return (
    <AuthGuard requiredRole="super-admin">
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Organizations</h1>
              <p className="text-muted-foreground">Manage organizations and their access permissions</p>
            </div>
            <Link href="/organizations/new">
              <Button>
                <Building2 className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </Link>
          </div>

          <OrganizationsList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}