import Link from "next/link"
import { Plus, UserPlus, Building, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const actions = [
  {
    title: "Add New Room",
    description: "Create a new secure access point",
    icon: Plus,
    href: "/rooms/new",
    color: "bg-primary text-primary-foreground",
  },
  {
    title: "Register Employee",
    description: "Add new employee to the system",
    icon: UserPlus,
    href: "/employees/new",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    title: "Create Organization",
    description: "Set up a new organization",
    icon: Building,
    href: "/organizations/new",
    color: "bg-accent text-accent-foreground",
  },
  {
    title: "Security Settings",
    description: "Configure system security",
    icon: Shield,
    href: "/settings/security",
    color: "bg-chart-1 text-white",
  },
]

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted bg-transparent"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
