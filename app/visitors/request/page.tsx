import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import VisitorRequestForm from "@/components/visitors/VisitorRequestForm"

export default function VisitorRequestPage() {
  return (
    <AuthGuard requiredRole="employee">
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Visitor Request</h1>
            <p className="text-muted-foreground">Submit a request for visitor access</p>
          </div>

          <VisitorRequestForm />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
