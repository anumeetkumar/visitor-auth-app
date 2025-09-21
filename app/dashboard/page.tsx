import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import StatsCards from "@/components/dashboard/StatsCards"
import RecentActivity from "@/components/dashboard/RecentActivity"
import AccessChart from "@/components/dashboard/AccessChart"
import QuickActions from "@/components/dashboard/QuickActions"

export default function DashboardPage() {
  return (
    <AuthGuard requiredRole="employee">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your security system activity</p>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccessChart />
            <QuickActions />
          </div>

          <RecentActivity />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
