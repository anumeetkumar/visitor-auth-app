import Link from "next/link"
import { UserCheck } from "lucide-react"
import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import VisitorsList from "@/components/visitors/VisitorsList"

export default function VisitorsPage() {
  return (
    <AuthGuard requiredRole="guard">
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Visitors</h1>
              <p className="text-muted-foreground">Manage visitor requests and access verification</p>
            </div>
            <Link href="/visitors/request">
              <Button>
                <UserCheck className="mr-2 h-4 w-4" />
                New Visitor Request
              </Button>
            </Link>
          </div>

          <VisitorsList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
