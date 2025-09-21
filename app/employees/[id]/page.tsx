import AuthGuard from "@/components/AuthGuard"
import DashboardLayout from "@/components/DashboardLayout"
import EmployeeDetails from "@/components/employees/EmployeeDetails"

type Props = {
  params: { id: string }
}

export default function EmployeeDetailPage({ params }: Props) {
  return (
    <AuthGuard requiredRole="guard">
      <DashboardLayout>
        <EmployeeDetails employeeId={params.id} />
      </DashboardLayout>
    </AuthGuard>
  )
}
