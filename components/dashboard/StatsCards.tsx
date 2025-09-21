import { Shield, Users, Building2, UserCheck, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Access Points",
    value: "24",
    change: "+2 from last month",
    icon: Shield,
    color: "text-primary",
  },
  {
    title: "Active Employees",
    value: "156",
    change: "+12 from last month",
    icon: Users,
    color: "text-secondary",
  },
  {
    title: "Organizations",
    value: "8",
    change: "+1 from last month",
    icon: Building2,
    color: "text-accent",
  },
  {
    title: "Pending Visitors",
    value: "7",
    change: "3 approved today",
    icon: UserCheck,
    color: "text-chart-1",
  },
  {
    title: "Security Alerts",
    value: "3",
    change: "2 resolved today",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "System Status",
    value: "Online",
    change: "99.9% uptime",
    icon: CheckCircle,
    color: "text-green-500",
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
