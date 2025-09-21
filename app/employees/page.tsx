import Link from "next/link"
import { UserPlus } from "lucide-react"
import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import EmployeesList from "@/components/employees/EmployeesList"

export default function EmployeesPage() {
  return (
    <AuthGuard requiredRole="org-admin">
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employees</h1>
              <p className="text-muted-foreground">Manage employee access and security credentials</p>
            </div>
            <Link href="/employees/new">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </Link>
          </div>

          <EmployeesList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
