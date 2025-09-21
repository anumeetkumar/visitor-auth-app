import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "John Smith",
    action: "Accessed Room A-101",
    time: "2 minutes ago",
    status: "success",
    avatar: "JS",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "Failed access attempt - Room B-205",
    time: "15 minutes ago",
    status: "error",
    avatar: "SJ",
  },
  {
    id: 3,
    user: "Mike Wilson",
    action: "Visitor request approved",
    time: "1 hour ago",
    status: "pending",
    avatar: "MW",
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "New employee registered",
    time: "2 hours ago",
    status: "success",
    avatar: "ED",
  },
  {
    id: 5,
    user: "System",
    action: "Security alert resolved",
    time: "3 hours ago",
    status: "success",
    avatar: "SY",
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest security system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/generic-placeholder-icon.png?height=36&width=36`} alt={activity.user} />
                <AvatarFallback>{activity.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    activity.status === "success"
                      ? "default"
                      : activity.status === "error"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {activity.status}
                </Badge>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
