"use client"

import { useState, useEffect } from "react"
import { Shield, User, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AccessLogEntry = {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  action: "granted" | "denied" | "attempted"
  timestamp: string
  method: "rfid" | "face" | "manual"
  reason?: string
}

type AccessLogProps = {
  roomId: string
}

// Mock data - replace with actual API call
const mockAccessLog: AccessLogEntry[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Smith",
    action: "granted",
    timestamp: "2024-01-20T14:30:00Z",
    method: "rfid",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Johnson",
    action: "denied",
    timestamp: "2024-01-20T14:15:00Z",
    method: "face",
    reason: "Insufficient access level",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Mike Wilson",
    action: "granted",
    timestamp: "2024-01-20T13:45:00Z",
    method: "manual",
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emily Davis",
    action: "attempted",
    timestamp: "2024-01-20T13:30:00Z",
    method: "rfid",
    reason: "Card not recognized",
  },
]

export default function AccessLog({ roomId }: AccessLogProps) {
  const [accessLog, setAccessLog] = useState<AccessLogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAccessLog = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAccessLog(mockAccessLog)
      setLoading(false)
    }

    fetchAccessLog()
  }, [roomId])

  const getActionIcon = (action: AccessLogEntry["action"]) => {
    switch (action) {
      case "granted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "denied":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "attempted":
        return <Shield className="h-4 w-4 text-yellow-500" />
      default:
        return <Shield className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getActionColor = (action: AccessLogEntry["action"]) => {
    switch (action) {
      case "granted":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "denied":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "attempted":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getMethodIcon = (method: AccessLogEntry["method"]) => {
    switch (method) {
      case "rfid":
        return <Shield className="h-3 w-3" />
      case "face":
        return <User className="h-3 w-3" />
      case "manual":
        return <Clock className="h-3 w-3" />
      default:
        return <Shield className="h-3 w-3" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Log</CardTitle>
          <CardDescription>Recent access attempts and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="h-6 w-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Log</CardTitle>
        <CardDescription>Recent access attempts and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accessLog.map((entry) => (
            <div key={entry.id} className="flex items-center space-x-4 p-3 rounded-lg border">
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.userAvatar || "/placeholder.svg"} alt={entry.userName} />
                <AvatarFallback>
                  {entry.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{entry.userName}</p>
                  <Badge variant="outline" className="text-xs">
                    {getMethodIcon(entry.method)}
                    <span className="ml-1">{entry.method}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTimestamp(entry.timestamp)}
                </div>
                {entry.reason && <p className="text-xs text-muted-foreground">{entry.reason}</p>}
              </div>

              <div className="flex items-center gap-2">
                {getActionIcon(entry.action)}
                <Badge variant="outline" className={getActionColor(entry.action)}>
                  {entry.action}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
