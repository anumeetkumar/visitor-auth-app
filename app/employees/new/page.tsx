import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import CreateEmployeeForm from "@/components/employees/CreateEmployeeForm"

export default function NewEmployeePage() {
  return (
    <AuthGuard requiredRole="org-admin">
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Register New Employee</h1>
            <p className="text-muted-foreground">Add a new employee and set up their security credentials</p>
          </div>

          <CreateEmployeeForm />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
