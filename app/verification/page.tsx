import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import VerificationConsole from "@/components/verification/VerificationConsole"

export default function VerificationPage() {
  return (
    <AuthGuard requiredRole="guard">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Verification Console</h1>
            <p className="text-muted-foreground">Verify visitor access and employee authentication</p>
          </div>

          <VerificationConsole />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
