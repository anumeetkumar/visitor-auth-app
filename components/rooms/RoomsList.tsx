"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Users, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Room = {
  id: string
  name: string
  code: string
  description: string
  capacity: number
  status: "active" | "inactive" | "maintenance"
  accessLevel: "low" | "medium" | "high"
  lastAccessed: string
  totalAccesses: number
}

// Mock data - replace with actual API call
const mockRooms: Room[] = [
  {
    id: "1",
    name: "Conference Room A",
    code: "CR-A-101",
    description: "Main conference room with video conferencing",
    capacity: 12,
    status: "active",
    accessLevel: "medium",
    lastAccessed: "2 hours ago",
    totalAccesses: 45,
  },
  {
    id: "2",
    name: "Server Room",
    code: "SR-B-001",
    description: "Primary server and network equipment room",
    capacity: 4,
    status: "active",
    accessLevel: "high",
    lastAccessed: "30 minutes ago",
    totalAccesses: 12,
  },
  {
    id: "3",
    name: "Storage Room C",
    code: "ST-C-205",
    description: "General storage and supplies",
    capacity: 2,
    status: "maintenance",
    accessLevel: "low",
    lastAccessed: "1 day ago",
    totalAccesses: 8,
  },
  {
    id: "4",
    name: "Executive Office",
    code: "EO-A-301",
    description: "CEO and executive meeting space",
    capacity: 6,
    status: "active",
    accessLevel: "high",
    lastAccessed: "1 hour ago",
    totalAccesses: 23,
  },
]

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchRooms = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRooms(mockRooms)
      setLoading(false)
    }

    fetchRooms()
  }, [])

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getAccessLevelColor = (level: Room["accessLevel"]) => {
    switch (level) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Card key={room.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <CardDescription className="text-sm font-mono">{room.code}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/rooms/${room.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{room.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
                <Badge variant="outline" className={getAccessLevelColor(room.accessLevel)}>
                  {room.accessLevel} security
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{room.capacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Accesses:</span>
                <span className="font-medium">{room.totalAccesses}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last accessed {room.lastAccessed}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href={`/rooms/${room.id}`} className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
              <Link href={`/rooms/${room.id}/access`}>
                <Button variant="default">
                  <Shield className="mr-2 h-4 w-4" />
                  Access
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
